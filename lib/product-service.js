'use strict';

const PRICE_LIST_URL = 'https://app.pangasinanblades.com/api/products/price-list';
const REQUEST_TIMEOUT_MS = 8000;
const CACHE_TTL_MS = 300000;

let cachedProducts = null;
let cacheExpiresAt = 0;
let pendingProducts = null;

function validateProducts(products) {
  if (!Array.isArray(products) || !products.length) {
    throw new Error('Product service returned an empty catalog');
  }

  const ids = new Set();
  const slugs = new Set();
  for (const product of products) {
    if (!Number.isInteger(Number(product.id)) || !product.slug || !product.name || !product.image || !product.details) {
      throw new Error(`Incomplete product data: ${product?.slug || product?.name || 'unknown'}`);
    }
    if (ids.has(Number(product.id))) throw new Error(`Duplicate product ID: ${product.id}`);
    if (slugs.has(product.slug)) throw new Error(`Duplicate product slug: ${product.slug}`);
    ids.add(Number(product.id));
    slugs.add(product.slug);
  }

  return products;
}

function fetchProducts(options = {}) {
  if (pendingProducts) return pendingProducts;
  if (!options.fresh && cachedProducts && Date.now() < cacheExpiresAt) return Promise.resolve(cachedProducts);
  pendingProducts = loadProducts(options).finally(() => { pendingProducts = null; });
  return pendingProducts;
}

async function loadProducts(options = {}) {
  const now = Date.now();
  if (!options.fresh && cachedProducts && now < cacheExpiresAt) return cachedProducts;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), options.timeoutMs || REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(PRICE_LIST_URL, {
      headers: { Accept: 'application/json' },
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Product service returned HTTP ${response.status}`);

    const payload = await response.json();
    if (!payload || payload.success !== true) {
      throw new Error('Product service returned an invalid response');
    }

    const products = validateProducts(payload.data);
    cachedProducts = products;
    cacheExpiresAt = Date.now() + CACHE_TTL_MS;
    return products;
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchProductById(productId, options = {}) {
  const id = Number(productId);
  if (!Number.isInteger(id) || id < 1) return null;
  const products = await fetchProducts(options);
  return products.find(product => Number(product.id) === id) || null;
}

module.exports = {
  PRICE_LIST_URL,
  fetchProducts,
  fetchProductById,
  validateProducts,
};

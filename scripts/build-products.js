'use strict';

const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://pangasinanblades.com';
const productsPath = path.join(ROOT, 'data', 'products.json');
const templatePath = path.join(ROOT, 'templates', 'product.html');
const browserDataPath = path.join(ROOT, 'js', 'products-data.js');
const sitemapPath = path.join(ROOT, 'sitemap.xml');
const productUrlsPath = path.join(ROOT, 'docs', 'PRODUCT-URLS.md');

const products = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

function validateProducts() {
  const ids = new Set();
  const slugs = new Set();
  for (const product of products) {
    if (!product.id || !product.slug || !product.name || !product.image || !product.details) throw new Error(`Incomplete product data: ${product.slug || product.name || 'unknown'}`);
    if (ids.has(product.id)) throw new Error(`Duplicate product ID: ${product.id}`);
    if (slugs.has(product.slug)) throw new Error(`Duplicate product slug: ${product.slug}`);
    ids.add(product.id);
    slugs.add(product.slug);
    if (!fs.existsSync(path.join(ROOT, product.image.replace(/^\//, '')))) throw new Error(`Missing product image: ${product.image}`);
  }
}

function build() {
  validateProducts();
  fs.mkdirSync(path.dirname(browserDataPath), { recursive: true });
  fs.writeFileSync(browserDataPath, `window.PANGASINAN_PRODUCTS = ${JSON.stringify(products, null, 2)};\n`);
  fs.mkdirSync(path.join(ROOT, 'collection'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'collection', 'index.html'), fs.readFileSync(templatePath, 'utf8'));

  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [`${SITE_URL}/`, ...products.map(product => `${SITE_URL}/collection/index.html?id=${product.id}`)];
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url, index) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}\n</urlset>\n`);
  fs.mkdirSync(path.dirname(productUrlsPath), { recursive: true });
  fs.writeFileSync(productUrlsPath, `# Generated Product URLs\n\n${products.map(product => `- ${SITE_URL}/collection/index.html?id=${product.id} - ${product.name}`).join('\n')}\n`);
  console.log(`Generated one dynamic product page for ${products.length} product IDs.`);
}

build();

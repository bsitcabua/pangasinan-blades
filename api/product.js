'use strict';

const fs = require('fs');
const path = require('path');
const { fetchProductById } = require('../lib/product-service');

const SITE_URL = 'https://www.pangasinanblades.com';

function escapeHtml(value = '') {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
}

function descriptionFor(product) {
  return product.description || product.desc || `${product.name} from the ${product.series}, crafted by Pangasinan Blades and configurable to your preferred specifications.`;
}

function absoluteAssetUrl(value) {
  const asset = String(value || '').trim();
  if (/^https?:\/\//i.test(asset)) return asset;
  return `${SITE_URL}/${asset.replace(/^\//, '')}`;
}

module.exports = async function renderProduct(request, response) {
  let product;
  try {
    product = await fetchProductById(request.query.id);
  } catch (error) {
    console.error('Unable to load product page data:', error);
    response.status(503).send('Product information is temporarily unavailable. Please try again shortly.');
    return;
  }

  if (!product) {
    response.status(404).send('Product not found.');
    return;
  }

  const title = `${product.name} | Pangasinan Blades`;
  const description = descriptionFor(product);
  const canonical = `${SITE_URL}/collection/?id=${product.id}`;
  const image = absoluteAssetUrl(product.image);
  const structuredData = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description,
    image: [image],
    category: product.series,
    brand: { '@type': 'Brand', name: 'Pangasinan Blades' },
    url: canonical,
    material: product.details.steel,
  }).replace(/</g, '\\u003c');

  const metadata = `
  <link rel="canonical" href="${escapeHtml(canonical)}">
  <meta property="og:type" content="product">
  <meta property="og:locale" content="en_PH">
  <meta property="og:site_name" content="Pangasinan Blades">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(canonical)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:alt" content="${escapeHtml(product.name)} blade">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
  <script type="application/ld+json">${structuredData}</script>`;

  const templatePath = path.join(process.cwd(), 'collection', 'index.html');
  let html = fs.readFileSync(templatePath, 'utf8');
  html = html
    .replace('<title>Blade Details | Pangasinan Blades</title>', `<title>${escapeHtml(title)}</title>`)
    .replace('<meta name="description" content="Configure a handcrafted Pangasinan blade for a made-to-order inquiry.">', `<meta name="description" content="${escapeHtml(description)}">`)
    .replace('</head>', `${metadata}\n</head>`);

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
  response.status(200).send(html);
};
'use strict';

const fs = require('fs');
const path = require('path');
const products = require('../data/products.json');

const SITE_URL = 'https://www.pangasinanblades.com';

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function descriptionFor(product) {
  return product.description
    || `${product.name} from the ${product.series}, crafted by Pangasinan Blades and configurable to your preferred specifications.`;
}

module.exports = function renderProduct(request, response) {
  const productId = Number(request.query.id);
  const product = products.find(item => Number(item.id) === productId);

  if (!product) {
    response.status(404).send('Product not found.');
    return;
  }

  const title = `${product.name} | Pangasinan Blades`;
  const description = descriptionFor(product);
  const canonical = `${SITE_URL}/collection/?id=${product.id}`;
  const image = `${SITE_URL}/${product.image.replace(/^\//, '')}`;
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
  response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400');
  response.status(200).send(html);
};

'use strict';

const products = require('../data/products.json');

const SITE_URL = 'https://www.pangasinanblades.com';
const SHARE_PREVIEW_VERSION = '3';

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

module.exports = function shareProduct(request, response) {
  const productId = Number(request.query.id);
  const product = products.find(item => Number(item.id) === productId);

  if (!product) {
    response.writeHead(302, { Location: `${SITE_URL}/#full-collection` });
    response.end();
    return;
  }

  const title = `${product.name} | Pangasinan Blades`;
  const description = descriptionFor(product);
  const destination = `${SITE_URL}/collection/?id=${product.id}`;
  const version = String(request.query.v || SHARE_PREVIEW_VERSION).replace(/[^a-zA-Z0-9._-]/g, '');
  const shareUrl = `${SITE_URL}/share/?id=${product.id}&v=${encodeURIComponent(version)}`;
  const image = `${SITE_URL}/${product.image.replace(/^\//, '')}`;
  const safeDestination = JSON.stringify(destination).replace(/</g, '\\u003c');

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Cache-Control', 'public, s-maxage=86400, stale-while-revalidate=604800');
  response.status(200).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">
  <link rel="canonical" href="${escapeHtml(shareUrl)}">
  <meta property="og:type" content="website">
  <meta property="og:locale" content="en_PH">
  <meta property="og:site_name" content="Pangasinan Blades">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(shareUrl)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:secure_url" content="${escapeHtml(image)}">
  <meta property="og:image:type" content="image/webp">
  <meta property="og:image:width" content="3664">
  <meta property="og:image:height" content="2691">
  <meta property="og:image:alt" content="${escapeHtml(product.name)} crafted blade">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">
</head>
<body>
  <p>Opening <a href="${escapeHtml(destination)}">${escapeHtml(product.name)}</a> at Pangasinan Blades.</p>
  <script>window.location.replace(${safeDestination});<\/script>
</body>
</html>`);
};

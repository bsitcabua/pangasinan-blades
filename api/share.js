'use strict';

const { fetchProductById } = require('../lib/product-service');

const SITE_URL = 'https://www.pangasinanblades.com';
const SHARE_PREVIEW_VERSION = '7';

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

module.exports = async function shareProduct(request, response) {
  let product;
  try {
    product = await fetchProductById(request.query.id);
  } catch (error) {
    console.error('Unable to load share preview data:', error);
    response.status(503).send('Share preview is temporarily unavailable.');
    return;
  }

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
  const image = absoluteAssetUrl(product.image);
  const safeDestination = JSON.stringify(destination).replace(/</g, '\\u003c');

  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  response.setHeader('Cache-Control', 'public, s-maxage=300, stale-while-revalidate=3600');
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
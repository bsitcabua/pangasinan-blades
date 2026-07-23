'use strict';

const fs = require('fs');
const http = require('http');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.pangasinanblades.com';
const PRODUCT_STATUSES = new Set(['made-to-order', 'ready-stock']);
const PRODUCT_CATEGORIES = new Set(['itak', 'bolo', 'moro', 'combat', 'outdoor', 'international', 'kitchen']);
const products = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'products.json'), 'utf8'));
const failures = [];

function fail(message) { failures.push(message); }
function read(relativePath) { return fs.readFileSync(path.join(ROOT, relativePath), 'utf8'); }
function activeHtml(html) { return html.replace(/<!--[\s\S]*?-->/g, ''); }

function validateIds(html, label) {
  const ids = [...activeHtml(html).matchAll(/\bid="([^"]+)"/g)].map(match => match[1]);
  const duplicates = [...new Set(ids.filter((id, index) => ids.indexOf(id) !== index))];
  if (duplicates.length) fail(`${label}: duplicate IDs ${duplicates.join(', ')}`);
}

function validateJsonLd(html, label) {
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!blocks.length) fail(`${label}: missing JSON-LD`);
  for (const block of blocks) {
    try { JSON.parse(block[1]); } catch (error) { fail(`${label}: invalid JSON-LD (${error.message})`); }
  }
}

function rootAssetExists(url, baseDirectory = '') {
  if (url === '/') return fs.existsSync(path.join(ROOT, 'index.html'));
  const clean = url.split('#')[0].split('?')[0];
  if (!clean || /^(?:https?:|mailto:|tel:|#)/.test(url)) return true;
  const direct = clean.startsWith('/')
    ? path.join(ROOT, clean.replace(/^\//, ''))
    : path.resolve(ROOT, baseDirectory, clean);
  if (!direct.startsWith(ROOT)) return false;
  return fs.existsSync(direct) || fs.existsSync(path.join(direct, 'index.html'));
}

function validateLinks(html, label, baseDirectory = '') {
  for (const match of html.matchAll(/(?:src|href)="([^"]+)"/g)) {
    if (!rootAssetExists(match[1], baseDirectory)) fail(`${label}: missing internal target ${match[1]}`);
  }
}

function validateProduct(product) {
  const relative = path.join('collection', 'index.html');
  if (!fs.existsSync(path.join(ROOT, relative))) return fail('Shared product page not generated');
  const html = read(relative);
  if ((activeHtml(html).match(/<h1\b/g) || []).length !== 1) fail('Shared product page: expected exactly one H1');
  if (!html.includes('../js/products-data.js')) fail('Shared product data is not loaded');
  if (html.includes('id="productData"')) fail('Static embedded product data remains');
  validateIds(html, 'shared product page');
  validateLinks(html, 'shared product page', path.dirname(relative));
}

async function validateHttp() {
  const server = http.createServer((request, response) => {
    const pathname = decodeURIComponent(new URL(request.url, 'http://127.0.0.1').pathname);
    let target = path.join(ROOT, pathname.replace(/^\//, ''));
    if (pathname.endsWith('/')) target = path.join(target, 'index.html');
    if (!target.startsWith(ROOT) || !fs.existsSync(target) || fs.statSync(target).isDirectory()) {
      response.writeHead(404); response.end('Not found'); return;
    }
    response.writeHead(200, { 'Content-Type': target.endsWith('.html') ? 'text/html; charset=utf-8' : 'application/octet-stream' });
    fs.createReadStream(target).pipe(response);
  });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const port = server.address().port;
  try {
    for (const pathname of ['/', '/collection/index.html?id=1']) {
      const response = await fetch(`http://127.0.0.1:${port}${pathname}`);
      if (!response.ok) fail(`${pathname}: HTTP ${response.status}`);
      const html = await response.text();
      if (!html.includes('<!DOCTYPE html>')) fail(`${pathname}: incomplete HTML response`);
    }
  } finally {
    await new Promise(resolve => server.close(resolve));
  }
}

async function validate() {
  if (!Array.isArray(products) || products.length === 0) fail('Product collection must be a non-empty array');
  const requiredDetails = ['bladeLength', 'steel', 'handle', 'sheath', 'hardness'];
  const ids = new Set();
  for (const [index, product] of products.entries()) {
    const label = `Product ${index + 1}`;
    if (!Number.isInteger(product.id) || product.id < 1) fail(`${label}: id must be a positive integer`);
    if (ids.has(product.id)) fail(`${label}: duplicate product ID ${product.id}`);
    ids.add(product.id);
    for (const key of ['slug', 'image', 'name', 'category', 'series', 'status']) {
      if (typeof product[key] !== 'string' || !product[key].trim()) fail(`${label}: ${key} is required`);
    }
    if (typeof product.featured !== 'boolean') fail(`${label}: featured must be boolean`);
    if (!PRODUCT_STATUSES.has(product.status)) fail(`${label}: unsupported status ${product.status}`);
    if (!PRODUCT_CATEGORIES.has(product.category)) fail(`${label}: unsupported category ${product.category}`);
    if (!product.details || typeof product.details !== 'object') fail(`${label}: details object is required`);
    else requiredDetails.forEach(key => {
      if (typeof product.details[key] !== 'string' || !product.details[key].trim()) fail(`${label}: details.${key} is required`);
    });
    if (product.image && !rootAssetExists(product.image)) fail(`${label}: missing product image ${product.image}`);
  }
  const slugs = products.map(product => product.slug);
  if (new Set(slugs).size !== slugs.length) fail('Duplicate product slugs found');
  validateProduct(products[0]);

  const homepage = read('index.html');
  validateIds(homepage, 'homepage');
  validateJsonLd(homepage, 'homepage');
  validateLinks(homepage, 'homepage');
  if ((activeHtml(homepage).match(/<h1\b/g) || []).length !== 1) fail('Homepage must contain exactly one H1');
  if (!homepage.includes(`${SITE_URL}/assets/favicon_io/android-chrome-512x512.png`)) fail('Organization logo URL remains incorrect');

  const sitemap = read('sitemap.xml');
  const locations = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
  const expected = [`${SITE_URL}/`, ...products.map(product => `${SITE_URL}/collection/?id=${product.id}`)];
  if (locations.length !== expected.length || expected.some(url => !locations.includes(url))) fail('Sitemap URL set is incomplete');
  if (locations.some(url => /#/.test(url))) fail('Sitemap contains hash URLs');

  const sharedInquiry = read(path.join('js', 'inquiry-list.js'));
  if (!sharedInquiry.includes("pangasinanBladesInquiryList")) fail('Shared inquiry storage key changed');
  const productPageScript = read(path.join('js', 'product-page.js'));
  if (!productPageScript.includes('function inquiryEditorMarkup(') || !productPageScript.includes('store.prepare({')) fail('Product-page Inquiry List editor is missing');
  const homepageScript = read('script.js');
  if (!homepageScript.includes('window.PANGASINAN_PRODUCTS')) fail('Homepage does not consume generated browser products');
  if (!homepageScript.includes("window.location.protocol === 'file:'") || !homepageScript.includes('collection/index.html${query}')) fail('Product links do not preserve local file navigation');
  if (!homepageScript.includes('function showFullCatalog()') || !homepageScript.includes('fullCatalogPushed: false')) fail('Full Catalog URL restoration logic is missing');
  if (!homepageScript.includes('function updateInquiryItem(') || !homepageScript.includes('inquiryEditorMarkup(item, index)')) fail('Homepage Inquiry List editor is missing');
  if (!homepageScript.includes('function updateInquiryActionAvailability()') || !homepageScript.includes('Save your item changes before copying or requesting a quote.')) fail('Homepage quote actions are not guarded during editing');
  if (homepageScript.includes("history.pushState({ modal: 'fullCatalog' }, '', '#full-collection')")) fail('Full Catalog still creates duplicate hash history entries');
  if (/role=["']link["']/.test(activeHtml(homepage))) fail('Homepage still contains generic role="link" product navigation');
  if (homepage.includes('Price: Low to High') || homepage.includes('Price: High to Low')) fail('Unavailable price sorting is still displayed');
  if (!homepage.includes('id="main-content"') || !homepage.includes('class="skip-link"')) fail('Homepage is missing its main landmark or skip link');

  const vercel = JSON.parse(read('vercel.json'));
  const rewrites = vercel.rewrites || [];
  if (!rewrites.some(rule => rule.source === '/collection/' && rule.destination === '/api/product')) fail('Server-rendered product rewrite is missing');
  if (!Array.isArray(vercel.headers) || !vercel.headers.length) fail('Vercel security headers are missing');
  const csp = vercel.headers.flatMap(rule => rule.headers || []).find(header => header.key === 'Content-Security-Policy')?.value || '';
  const hasInlineHandlers = /\son(?:click|input|change|mouseover|mouseout)=/.test(activeHtml(homepage)) || /\son(?:click|input|change)=/.test(homepageScript);
  if (hasInlineHandlers && !/script-src[^;]*'unsafe-inline'/.test(csp)) fail('CSP blocks inline handlers still used by the current UI');

  await validateHttp();
  if (failures.length) {
    console.error(failures.join('\n'));
    process.exitCode = 1;
    return;
  }
  console.log(`Validated homepage, one dynamic product page, ${products.length} product IDs, ${expected.length} sitemap URLs, internal assets, IDs, and direct HTTP responses.`);
}

validate().catch(error => { console.error(error); process.exitCode = 1; });

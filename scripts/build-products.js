'use strict';

const fs = require('fs');
const path = require('path');
const { fetchProducts } = require('../lib/product-service');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://www.pangasinanblades.com';
const templatePath = path.join(ROOT, 'templates', 'product.html');
const sitemapPath = path.join(ROOT, 'sitemap.xml');
const productUrlsPath = path.join(ROOT, 'docs', 'PRODUCT-URLS.md');

async function build() {
  const products = await fetchProducts({ fresh: true });

  fs.mkdirSync(path.join(ROOT, 'collection'), { recursive: true });
  fs.writeFileSync(path.join(ROOT, 'collection', 'index.html'), fs.readFileSync(templatePath, 'utf8'));

  const urls = [`${SITE_URL}/`, ...products.map(product => `${SITE_URL}/collection/?id=${product.id}`)];
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url, index) => `  <url>\n    <loc>${url}</loc>\n    <changefreq>${index === 0 ? 'weekly' : 'monthly'}</changefreq>\n    <priority>${index === 0 ? '1.0' : '0.8'}</priority>\n  </url>`).join('\n')}\n</urlset>\n`);
  fs.mkdirSync(path.dirname(productUrlsPath), { recursive: true });
  fs.writeFileSync(productUrlsPath, `# Generated Product URLs\n\n${products.map(product => `- ${SITE_URL}/collection/?id=${product.id} - ${product.name}`).join('\n')}\n`);
  console.log(`Generated one dynamic product page for ${products.length} database products.`);
}

build().catch(error => {
  console.error('Product build failed:', error);
  process.exitCode = 1;
});
'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const source = fs.readFileSync(path.join(root, 'js/catalog-service.js'), 'utf8');
const products = [{ id: 1, slug: 'test', name: 'Test blade', image: 'https://images.pangasinanblades.com/collection/test.webp', details: {} }];
const response = data => ({ ok: true, json: async () => ({ success: true, data }) });
const values = new Map();
const storage = { getItem: key => values.get(key) || null, setItem: (key, value) => values.set(key, value) };
let now = 1000000;
function client(fetch, sessionStorage = storage, pageLocation = { protocol: 'https:', hostname: 'www.pangasinanblades.com' }) {
  const context = vm.createContext({ window: {}, location: pageLocation, sessionStorage,
    Date: { now: () => now }, fetch, AbortController, setTimeout, clearTimeout });
  vm.runInContext(source, context);
  return context.window.PangasinanCatalog;
}

async function main() {
  let requestedUrl = '';
  const localStorage = { getItem: () => null, setItem() {} };
  const local = client(async url => { requestedUrl = url; return response(products); }, localStorage,
    { protocol: 'http:', hostname: 'localhost' });
  await local.getProducts();
  assert.equal(requestedUrl, 'https://www.pangasinanblades.com/api/catalog/',
    'A static localhost preview must use the production catalog API');
  const deployed = client(async url => { requestedUrl = url; return response(products); }, localStorage,
    { protocol: 'https:', hostname: 'www.pangasinanblades.com' });
  await deployed.getProducts();
  assert.equal(requestedUrl, '/api/catalog/', 'A deployed page must use its same-origin catalog API');

  let requests = 0;
  let finish;
  const home = client(() => { requests++; return new Promise(resolve => { finish = resolve; }); });
  const a = home.getProducts();
  const b = home.getProducts();
  assert.equal(a, b, 'Concurrent consumers must share one promise');
  assert.equal(requests, 1);
  finish(response(products));
  assert.deepEqual(await a, products);
  await home.getProducts();
  assert.equal(requests, 1, 'Fresh memory cache must avoid fetch');

  const detail = client(async () => { requests++; return response(products); });
  assert.equal((await detail.getProducts())[0].id, 1);
  assert.equal(requests, 1, 'New page must use the session catalog without fetch');
  now += 300001;
  await detail.getProducts();
  assert.equal(requests, 2, 'Expired data must refresh');
  await detail.refresh();
  assert.equal(requests, 3, 'Explicit refresh must bypass client freshness');

  now += 300001;
  const offline = client(async () => { throw new Error('offline'); });
  assert.equal((await offline.getProducts())[0].id, 1, 'Recent stale data should survive a transient failure');
  await assert.rejects(offline.refresh(), /offline/);
  now += 3600001;
  await assert.rejects(offline.getProducts(), /offline/, 'Stale fallback must be bounded');

  values.set('pangasinan.catalog.v1', '{broken');
  let retryCount = 0;
  const retry = client(async () => ++retryCount === 1 ? response([]) : response(products));
  await assert.rejects(retry.getProducts(), /Invalid catalog/);
  await retry.getProducts();
  assert.equal(retryCount, 2, 'Invalid responses must not poison the cache or pending promise');
  let noStorageRequests = 0;
  const noStorage = client(async () => { noStorageRequests++; return response(products); }, {
    getItem() { throw new Error('disabled'); }, setItem() { throw new Error('disabled'); },
  });
  await noStorage.getProducts();
  await noStorage.getProducts();
  assert.equal(noStorageRequests, 1, 'Memory caching must work without storage');

  const listeners = {};
  class Image {
    constructor() { this.dataset = { originalSrc: products[0].image }; this.removed = []; }
    removeAttribute(name) { this.removed.push(name); }
  }
  const imageContext = vm.createContext({ window: {}, location: { protocol: 'https:' }, HTMLImageElement: Image,
    document: { body: {}, querySelectorAll: () => [], addEventListener: (type, fn) => (listeners[type] ||= []).push(fn) },
    MutationObserver: class { observe() {} },
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'js/image-loader.js'), 'utf8'), imageContext);
  const attrs = imageContext.window.PangasinanImages.attributes(products[0].image);
  assert.match(attrs, /srcset=/);
  assert.match(attrs, /1440w/);
  assert.equal(attrs, imageContext.window.PangasinanImages.attributes(products[0].image), 'Image URLs must stay stable');
  assert.equal(imageContext.window.PangasinanImages.attributes('/assets/logo.png'), 'src="/assets/logo.png"');
  const img = new Image();
  let stopped = 0;
  listeners.error[0]({ target: img, stopImmediatePropagation: () => stopped++ });
  assert.equal(img.src, products[0].image);
  assert.deepEqual(img.removed, ['srcset', 'sizes']);
  listeners.error[0]({ target: img, stopImmediatePropagation: () => stopped++ });
  assert.equal(stopped, 1, 'Original fallback must not loop or suppress genuine image failures');

  let upstreamRequests = 0;
  const serviceContext = vm.createContext({ module: { exports: {} }, Date: { now: () => now },
    AbortController, setTimeout, clearTimeout,
    fetch: async () => { upstreamRequests++; return response(products); },
  });
  vm.runInContext(fs.readFileSync(path.join(root, 'lib/product-service.js'), 'utf8'), serviceContext);
  const server = serviceContext.module.exports;
  await Promise.all([server.fetchProducts(), server.fetchProductById(1), server.fetchProducts()]);
  assert.equal(upstreamRequests, 1, 'Server consumers must share the upstream request');
  now += 300001;
  await server.fetchProducts();
  assert.equal(upstreamRequests, 2);

  // Exercise collection navigation without a browser or external network.
  const homepage = fs.readFileSync(path.join(root, 'script.js'), 'utf8');
  const elements = new Map();
  function element() {
    return { style: {}, dataset: {}, value: '', scrollTop: 0, children: [],
      appendChild(child) { this.children.push(child); },
      replaceChildren() { this.children = []; }, setAttribute() {},
    };
  }
  const getElementById = id => {
    if (!elements.has(id)) elements.set(id, element());
    return elements.get(id);
  };
  const blades = [
    { ...products[0], category: 'itak', series: 'Itak Series', material: 'Steel', length: '19 in', featured: true },
    { ...products[0], id: 2, name: 'Another blade', category: 'bolo', featured: false },
  ];
  const navigation = vm.createContext({ COMPLETE_COLLECTION: blades,
    history: { state: { collectionView: { filter: 'itak', sort: 'name', search: 'Test', scroll: 420 } },
      replaceState(state) { this.state = state; } },
    location: { href: 'https://example.test/#full-collection' },
    document: { getElementById, createElement: element, addEventListener() {}, body: { style: {} } },
    window: { addEventListener() {}, PangasinanImages: { attributes: () => '' } },
    escapeHtml: String, truncateText: String, productDetailsUrl: id => `/collection/?id=${id}`,
    activateDialogFocus() {}, refreshCatalogFromApi() {},
  });
  vm.runInContext(homepage.slice(homepage.indexOf('let fcActiveFilter ='), homepage.indexOf("window.addEventListener('popstate'")), navigation);
  vm.runInContext('showFullCatalog()', navigation);
  const grid = getElementById('fcGrid');
  assert.equal(grid.children.length, 1, 'Back navigation must restore the selected series/search');
  assert.equal(getElementById('fcSearch').value, 'Test');
  assert.equal(getElementById('fcSort').value, 'name');
  assert.equal(getElementById('fullCatalogModal').scrollTop, 420);
  const previousCard = grid.children[0];
  vm.runInContext('showFullCatalog(); applyFCFilter();', navigation);
  assert.equal(grid.children[0], previousCard, 'Unchanged collections must reuse their DOM and images');
  getElementById('fullCatalogModal').scrollTop = 800;
  vm.runInContext('saveCollectionView()', navigation);
  assert.equal(navigation.history.state.collectionView.scroll, 800);
  const startup = homepage.slice(homepage.indexOf("document.addEventListener('DOMContentLoaded', function()"));
  assert.ok(startup.indexOf('setCatalogProducts(cachedCatalog)') < startup.indexOf('openFullCatalogFromHash()'),
    'Cached data must be installed before opening a direct collection link');

  const integrationSource = fs.readFileSync(path.join(root, 'js/production-integrations.js'), 'utf8');
  function loadedIntegrations(pageLocation) {
    const scripts = [];
    const integrationContext = vm.createContext({ window: {}, location: pageLocation,
      document: { createElement: () => ({}), head: { appendChild: script => scripts.push(script) } } });
    vm.runInContext(integrationSource, integrationContext);
    return scripts;
  }
  assert.equal(loadedIntegrations({ protocol: 'http:', hostname: 'localhost' }).length, 0,
    'Deployment-only scripts must stay disabled on localhost');
  assert.deepEqual(loadedIntegrations({ protocol: 'https:', hostname: 'www.pangasinanblades.com' }).map(script => script.src),
    ['/_vercel/insights/script.js', 'https://web3forms.com/client/script.js']);
  console.log('Caching validation passed: navigation reuse, expiration, refresh, failure recovery, storage fallback, image URLs/fallback, and server deduplication.');
}

main().catch(error => { console.error(error); process.exitCode = 1; });

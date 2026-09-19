(function () {
  'use strict';
  const KEY = 'pangasinan.catalog.v1';
  const TTL = 5 * 60 * 1000;
  const MAX_STALE = 60 * 60 * 1000;
  const PRODUCTION_ENDPOINT = 'https://www.pangasinanblades.com/api/catalog/';
  const localHost = ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  const localDevelopmentServer = location.protocol !== 'file:' && localHost;
  const endpoint = location.protocol === 'file:' ? PRODUCTION_ENDPOINT : '/api/catalog/';
  const fallbackEndpoint = localDevelopmentServer ? PRODUCTION_ENDPOINT : null;
  let cache = null;
  let pending = null;

  function valid(products) {
    return Array.isArray(products) && products.length > 0 && products.every(p =>
      p && Number.isInteger(Number(p.id)) && p.name && p.image && p.details);
  }
  function read() {
    try {
      const saved = JSON.parse(sessionStorage.getItem(KEY));
      if (saved && valid(saved.products) && Number.isFinite(saved.time) && saved.time <= Date.now()
          && (!cache || saved.time > cache.time)) cache = saved;
    } catch (_) { /* Storage may be disabled or full. */ }
    return cache;
  }
  function peek() {
    const saved = read();
    return saved && Date.now() - saved.time < TTL ? saved.products : null;
  }
  async function requestProducts(url, force) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' }, signal: controller.signal,
        cache: force ? 'reload' : 'default',
      });
      if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
      const payload = await response.json();
      if (payload.success !== true || !valid(payload.data)) throw new Error('Invalid catalog response');
      return payload.data;
    } finally {
      clearTimeout(timer);
    }
  }

  function getProducts({ force = false } = {}) {
    if (pending) return pending;
    const fresh = peek();
    if (!force && fresh) return Promise.resolve(fresh);
    pending = (async () => {
      try {
        let products;
        try {
          products = await requestProducts(endpoint, force);
        } catch (error) {
          if (!fallbackEndpoint) throw error;
          products = await requestProducts(fallbackEndpoint, force);
        }
        cache = { time: Date.now(), products };
        try { sessionStorage.setItem(KEY, JSON.stringify(cache)); } catch (_) { /* Memory cache still works. */ }
        return cache.products;
      } catch (error) {
        if (!force && cache && Date.now() - cache.time < MAX_STALE) return cache.products;
        throw error;
      } finally {
        pending = null;
      }
    })();
    return pending;
  }
  window.PangasinanCatalog = { getProducts, peek, refresh: () => getProducts({ force: true }) };
})();

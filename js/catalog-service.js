(function () {
  'use strict';
  const KEY = 'pangasinan.catalog.v1';
  const TTL = 5 * 60 * 1000;
  const MAX_STALE = 60 * 60 * 1000;
  const localPreview = location.protocol === 'file:'
    || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  const endpoint = localPreview
    ? 'https://www.pangasinanblades.com/api/catalog/' : '/api/catalog/';
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
  function getProducts({ force = false } = {}) {
    if (pending) return pending;
    const fresh = peek();
    if (!force && fresh) return Promise.resolve(fresh);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 10000);
    pending = (async () => {
      try {
        const response = await fetch(endpoint, {
          headers: { Accept: 'application/json' }, signal: controller.signal,
          cache: force ? 'reload' : 'default',
        });
        if (!response.ok) throw new Error(`Catalog request failed: ${response.status}`);
        const payload = await response.json();
        if (payload.success !== true || !valid(payload.data)) throw new Error('Invalid catalog response');
        cache = { time: Date.now(), products: payload.data };
        try { sessionStorage.setItem(KEY, JSON.stringify(cache)); } catch (_) { /* Memory cache still works. */ }
        return cache.products;
      } catch (error) {
        if (!force && cache && Date.now() - cache.time < MAX_STALE) return cache.products;
        throw error;
      } finally {
        clearTimeout(timer);
        pending = null;
      }
    })();
    return pending;
  }
  window.PangasinanCatalog = { getProducts, peek, refresh: () => getProducts({ force: true }) };
})();

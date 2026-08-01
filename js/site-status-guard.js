(function exposeSiteStatusGuard(root, factory) {
  'use strict';

  const guard = factory();
  if (typeof module === 'object' && module.exports) module.exports = guard;
  else {
    root.PangasinanSiteStatusGuard = guard;
    guard.apply(root);
  }
})(typeof globalThis !== 'undefined' ? globalThis : this, function createSiteStatusGuard() {
  'use strict';

  function resolve(config = {}, hostname = '') {
    const productionHosts = Array.isArray(config.productionHosts) ? config.productionHosts : [];
    const isProduction = productionHosts.includes(String(hostname).toLowerCase());
    if (config.productionOnly === true && !isProduction) return '';
    if (config.maintenance === true) return 'maintenance.html';
    if (config.comingSoon === true) return 'coming-soon.html';
    return '';
  }

  function normalizePath(pathname = '/') {
    const normalized = String(pathname)
      .replace(/\/index(?:\.html)?$/i, '')
      .replace(/\.html$/i, '')
      .replace(/\/+$/, '');
    return normalized || '/';
  }

  function apply(global) {
    const activePage = resolve(global.PANGASINAN_SITE_STATUS || {}, global.location.hostname);
    if (!activePage) return;

    const scriptUrl = global.document?.currentScript?.src;
    const siteRoot = scriptUrl ? new URL('../', scriptUrl) : new URL('./', global.location.href);
    const destination = new URL(activePage, siteRoot);
    const currentPath = normalizePath(global.location.pathname);
    const destinationPath = normalizePath(destination.pathname);
    if (currentPath === destinationPath) return;

    global.location.replace(destination.href);
  }

  return { resolve, normalizePath, apply };
});

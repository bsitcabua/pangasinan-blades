(function () {
  'use strict';
  const escape = value => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  const production = location.protocol === 'https:';
  function attributes(source, sizes = '(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1100px) 33vw, 25vw') {
    const original = escape(source);
    if (!production || !/^https:\/\/images\.pangasinanblades\.com\/collection\//.test(source)) return `src="${original}"`;
    const url = width => `/_vercel/image?url=${encodeURIComponent(source)}&w=${width}&q=85`;
    return `data-original-src="${original}" src="${escape(url(640))}" srcset="${[320, 640, 960, 1440].map(w => `${escape(url(w))} ${w}w`).join(', ')}" sizes="${escape(sizes)}"`;
  }
  // Register before page error handlers so an unavailable optimizer falls back once.
  document.addEventListener('error', event => {
    const img = event.target;
    if (!(img instanceof HTMLImageElement) || !img.dataset.originalSrc) return;
    event.stopImmediatePropagation();
    const original = img.dataset.originalSrc;
    delete img.dataset.originalSrc;
    img.removeAttribute('srcset');
    img.removeAttribute('sizes');
    img.src = original;
  }, true);
  function settle(event) {
    if (event.target instanceof HTMLImageElement) event.target.classList.remove('image-loading');
  }
  document.addEventListener('load', settle, true);
  document.addEventListener('error', settle, true);
  function watch(root) {
    root.querySelectorAll('img').forEach(img => {
      if (!img.complete || !img.naturalWidth) img.classList.add('image-loading');
    });
  }
  const observer = new MutationObserver(records => records.forEach(record => {
    record.addedNodes.forEach(node => {
      if (node.nodeType === 1) {
        if (node.matches('img') && (!node.complete || !node.naturalWidth)) node.classList.add('image-loading');
        watch(node);
      }
    });
  }));
  watch(document);
  observer.observe(document.body, { childList: true, subtree: true });
  window.PangasinanImages = { attributes };
})();

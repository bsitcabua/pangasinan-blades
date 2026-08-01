(function renderSiteStatusPage(global) {
  'use strict';

  const config = global.PANGASINAN_SITE_STATUS || {};
  const type = document.body.dataset.statusType === 'maintenance' ? 'maintenance' : 'comingSoon';
  const page = config.pages?.[type] || {};
  const brand = config.brand || {};
  const preview = new URLSearchParams(global.location.search).get('preview') === '1';

  if (!preview) {
    const activePage = global.PangasinanSiteStatusGuard?.resolve(config, global.location.hostname) || '';
    if (!activePage) {
      const scriptUrl = document.currentScript && document.currentScript.src;
      const siteRoot = scriptUrl ? new URL('../', scriptUrl) : new URL('./', global.location.href);
      global.location.replace(new URL('index.html', siteRoot).href);
      return;
    }
  }

  function setText(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) element.textContent = value;
  }

  const logo = document.querySelector('[data-status-logo]');
  if (logo && brand.logo) logo.src = brand.logo;

  setText('[data-status-brand]', brand.name);
  setText('[data-status-tagline]', brand.tagline);
  setText('[data-status-eyebrow]', page.eyebrow);
  setText('[data-status-title]', page.title);
  setText('[data-status-description]', page.description);
  setText('[data-status-contact-label]', brand.contactLabel);

  if (page.title) document.title = `${page.title} | ${brand.name || 'Pangasinan Blades'}`;
  if (page.backgroundColor) document.documentElement.style.setProperty('--status-background', page.backgroundColor);
  if (page.backgroundImage) document.documentElement.style.setProperty('--status-image', `url("${page.backgroundImage}")`);

  const email = document.querySelector('[data-status-email]');
  if (email && brand.contactEmail) {
    email.href = `mailto:${brand.contactEmail}`;
    email.textContent = brand.contactEmail;
  }

  const social = document.querySelector('[data-status-social]');
  if (social) {
    social.replaceChildren(...(brand.socialLinks || []).map(link => {
      const anchor = document.createElement('a');
      anchor.href = link.url;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.textContent = link.label;
      return anchor;
    }));
  }
})(window);

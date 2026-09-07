(function () {
  'use strict';
  const localPreview = location.protocol === 'file:'
    || ['localhost', '127.0.0.1', '::1'].includes(location.hostname);
  if (localPreview) return;

  window.va = window.va || function () {
    (window.vaq = window.vaq || []).push(arguments);
  };

  const analytics = document.createElement('script');
  analytics.src = '/_vercel/insights/script.js';
  analytics.defer = true;
  document.head.appendChild(analytics);

  const forms = document.createElement('script');
  forms.src = 'https://web3forms.com/client/script.js';
  forms.async = true;
  forms.defer = true;
  document.head.appendChild(forms);
})();

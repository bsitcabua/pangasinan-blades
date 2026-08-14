(function exposeSiteStatus(root, factory) {
  'use strict';

  const config = factory();
  if (typeof module === 'object' && module.exports) module.exports = config;
  else root.PANGASINAN_SITE_STATUS = config;
})(typeof globalThis !== 'undefined' ? globalThis : this, function createSiteStatusConfig() {
  'use strict';

  return Object.freeze({
    comingSoon: false,
    maintenance: false,
    productionOnly: true,
    productionHosts: ['pangasinanblades.com', 'www.pangasinanblades.com'],
    brand: {
      name: 'Pangasinan Blades',
      tagline: 'Forged with Passion',
      logo: 'assets/favicon_io/android-chrome-512x512.png',
      contactEmail: 'inquiry@pangasinanblades.com',
      contactLabel: 'Contact the workshop',
      socialLinks: [
        { label: 'Facebook', url: 'https://www.facebook.com/emcpangasinanblades' },
        { label: 'Messenger', url: 'https://m.me/emcpangasinanblades' },
      ],
    },
    pages: {
      comingSoon: {
        eyebrow: 'A New Online Workshop Is Taking Shape',
        title: 'Crafted with patience. Coming soon.',
        description: 'We are preparing a refined home for our handcrafted Filipino blades, custom commissions, and workshop stories. Follow Pangasinan Blades for launch updates.',
        backgroundImage: 'https://images.pangasinanblades.com/header/regular_ginunting.webp',
        backgroundColor: '#080808',
      },
      maintenance: {
        eyebrow: 'Workshop Update',
        title: 'We are sharpening the experience.',
        description: 'The Pangasinan Blades website is temporarily unavailable while we complete essential improvements. Please check back shortly or contact us for an urgent quotation.',
        backgroundImage: 'https://images.pangasinanblades.com/header/tactical_ginunting.webp',
        backgroundColor: '#080808',
      },
    },
  });
});

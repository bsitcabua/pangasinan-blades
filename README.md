# Pangasinan Blades

Static Pangasinan Blades website with data-driven product pages.

## Build

```bash
npm run build
npm run validate
```

`npm run build` reads `data/products.json`, then generates:

- `js/products-data.js` for the homepage catalog
- one shared `collection/index.html` product page
- `sitemap.xml`
- `docs/PRODUCT-URLS.md`

`js/product-page.js` reads the numeric ID from `/collection/?id={id}` and loads the matching record from `js/products-data.js`; `data/products.json` remains the only manually maintained product source.

## Add A Product

1. Add an optimized `.webp` product image under `assets/images/collection/`. PNG and JPG collection images are retained only as source assets and must not be referenced by product data.
2. Add one object to `data/products.json` with a unique numeric `id` and unique `slug`.
3. Include `name`, `image`, `category`, `series`, `featured`, `status`, and all `details` fields.
4. Run `npm run build` and `npm run validate`.
5. Review the generated page and sitemap entry before deployment.

Build validation rejects catalog products whose `image` value does not end in
`.webp`, ensuring the featured catalog, Full Collection, product pages, related
products, and Inquiry List all use the optimized format.

Supported `status` values currently used by the site are `made-to-order` and `ready-stock`.

## Vercel

- Framework preset: **Other**
- Root directory: repository root
- Install command: leave empty or use `npm install`
- Build command: `npm run build`
- Output directory: `.`
- Node.js: 18 or newer

`vercel.json` rewrites `/share/` to the dynamic social-preview endpoint and applies browser security headers. Product links use `/collection/?id={id}` on deployed hosting; the generated `collection/index.html?id={id}` path remains available for local `file:///` testing.

## Global Site Status

Edit `config/site-status.js` to control the whole public site:

```js
comingSoon: false,
maintenance: false,
productionOnly: true,
```

Routing priority is centralized in `js/site-status-guard.js`:

1. `maintenance: true` opens `maintenance.html`, regardless of `comingSoon`.
2. Otherwise, `comingSoon: true` opens `coming-soon.html`.
3. When both flags are `false`, the website loads normally.

With `productionOnly: true`, automatic routing runs only for the hostnames listed in `productionHosts`. Localhost and `file:///` development continue to load the normal website even when a status flag is enabled. When no production status is active, direct visits to the status pages return to the homepage. Preview either design locally with `/coming-soon.html?preview=1` or `/maintenance.html?preview=1`.

The same config file contains the editable brand name, tagline, logo, contact email, social links, titles, descriptions, background colors, and background images for both pages. The homepage and generated product page load the guard synchronously from their document heads.

## Public Form Integrations

The contact form submits to Web3Forms and the newsletter submits to Brevo. Their browser-facing keys and endpoints are necessarily public. Restrict Web3Forms submissions to the production domain in the provider dashboard and monitor both providers for abuse.

## QRCode.js

`js/vendor/qrcode.min.js` is QRCode.js 1.0.0, distributed under the MIT license. Source: https://github.com/davidshimjs/qrcodejs. Review upstream releases and replace the vendored file deliberately when updating.

## Product Data And Inquiry State

The homepage and product pages share the `pangasinanBladesInquiryList` localStorage key through `js/inquiry-list.js`. Existing stored inquiry entries remain compatible.

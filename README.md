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

`js/product-page.js` reads the numeric ID from `collection/index.html?id={id}` and loads the matching record from `js/products-data.js`; `data/products.json` remains the only manually maintained product source.

## Add A Product

1. Add the product image under `assets/images/collection/`.
2. Add one object to `data/products.json` with a unique numeric `id` and unique `slug`.
3. Include `name`, `image`, `category`, `series`, `featured`, `status`, and all `details` fields.
4. Run `npm run build` and `npm run validate`.
5. Review the generated page and sitemap entry before deployment.

Supported `status` values currently used by the site are `made-to-order` and `ready-stock`.

## Vercel

- Framework preset: **Other**
- Root directory: repository root
- Install command: leave empty or use `npm install`
- Build command: `npm run build`
- Output directory: `.`
- Node.js: 18 or newer

No rewrite configuration is required. Product links use `collection/index.html?id={id}` on deployed hosting and through `file:///`.

## Product Data And Inquiry State

The homepage and product pages share the `pangasinanBladesInquiryList` localStorage key through `js/inquiry-list.js`. Existing stored inquiry entries remain compatible.

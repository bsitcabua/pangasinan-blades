# Catalog and image performance

## Findings (September 8, 2026)

This is a static JavaScript site with Vercel server functions, not Angular. Full Collection is the homepage's `#full-collection` modal; `/collection/?id=...` is a product detail page.

- Home and product pages previously fetched the complete catalog independently.
- The server already cached upstream products for five minutes, but concurrent cache misses were not shared.
- Product images now use WebP on `images.pangasinanblades.com`; the previous PNG audit was obsolete. A public HEAD request for `collection/itak_series/itak_tagalog.webp` returned 305,666 bytes, `Cache-Control: max-age=14400`, ETag, and Last-Modified. Pixel dimensions were not remeasured.
- Listings and workshop gallery images already used native lazy loading and explicit dimensions. Listing frames already reserved their height. Thumbnails used the same source as full-size detail images.
- Opening Full Collection rebuilt cards and reset filters, search, sort, and scroll. Separate API fetch paths were confirmed in source; duplicate image body transfers were not established by a browser network trace.

## Implemented strategy

`js/catalog-service.js` shares catalog requests across page consumers. Memory and tab-scoped session storage retain data for five minutes, including full page navigation in the same tab. Concurrent callers share one promise. Deployed pages use the current origin; static localhost and file-based previews use the production API because simple static servers do not expose Vercel functions.

Expired data refreshes on page load, collection opening, and homepage restoration from the browser back/forward cache. On a transient request failure, data less than one hour old may be reused. Older data and explicit refresh failures surface an error. Invalid responses never replace valid data, and disabled/full storage falls back to memory. `PangasinanCatalog.refresh()` bypasses client freshness and the browser cache; server and edge caching may still apply, so this is not a database cache purge. No inquiry/customer data is stored in the catalog cache.

The catalog response explicitly allows five minutes of browser and edge caching with revalidation afterward. The server service now shares concurrent upstream requests. Separate server instances still have separate memory caches.

Full Collection retains unchanged DOM nodes and restores filters, search, sorting, and scroll from the current history entry when Back creates a new document. Native browser back/forward caching remains available. The first collection image is eager; remaining images use native lazy loading, which also loads images already visible in the viewport. No full-catalog image prefetch is added.

`js/image-loader.js` produces stable responsive thumbnail URLs using Vercel's native image optimizer. Listing, related-product, and inquiry images can use 320, 640, 960, or 1440 pixel variants, WebP quality 85, and a one-day minimum cache TTL. The source allow-list is restricted to the existing collection image host/path. Same source/size combinations reuse the same URL; different widths are intentional variants. Local HTTP/file viewing uses originals because the local server has no Vercel optimizer. An optimizer failure falls back to the original once.

Detail, zoom, and gallery views retain original image sources. Existing dimensions/lazy loading remain; a subtle static gradient provides loading placeholders without motion. Same-origin assets receive a one-day browser cache lifetime. Site-status configuration remains `no-store`.

External image host headers cannot be changed through this repository's Vercel configuration. Its verified four-hour browser policy already supports revisits. When replacing a product image, publish a new filename or stable revision query parameter through the product API so original and optimized caches invalidate immediately. Otherwise allow their cache lifetimes to expire. Never add random timestamps per render.

Configuration follows [Vercel image settings](https://vercel.com/docs/project-configuration/vercel-json#images) and the [image transformation API](https://vercel.com/docs/image-optimization). Optimized delivery becomes active after Vercel deployment and uses the project's image optimization allowance.

## Verification

- `npm run validate:caching`: concurrent sharing, cross-document cache reuse, expiry, refresh, bounded stale fallback, invalid-response retry, disabled storage, stable image URLs, fallback behavior, server deduplication, and collection navigation/DOM reuse.
- `npm run build`, `npm run validate`, `npm run validate:inquiry`: generated product template, catalog/product IDs, sitemap, internal links, direct HTTP responses, and inquiry/quotation behavior.
- JavaScript syntax and diff whitespace checks.

Local browser verification was blocked by automatic approval review reporting a usage limit. No before/after loading-time or visual-quality comparison is claimed. Vercel image optimization and its actual response headers require a preview deployment to verify.

## Deployment acceptance check

1. Keep DevTools caching enabled. Navigate Home → Full Collection → Product → Back. Within five minutes, the client should not fetch the catalog again on the product page or returning homepage. Server-rendered product HTML may separately use the shared server catalog service.
2. Scroll at mobile and desktop widths. Check thumbnail `currentSrc` uses an allowed optimizer width, while detail/zoom uses the original. Compare sharpness at 1x and 2x pixel density. Verify filters, search, sorting, and restored scroll.
3. Previously viewed identical image URLs should show memory/disk cache reuse or validation instead of another body download. Confirm optimizer responses are successful and cacheable.
4. Revisit after five minutes to verify catalog refresh. Check API failure and disabled session-storage behavior.
5. Compare cold/warm LCP, transferred image bytes, and layout shifts under the same viewport/network settings. Confirm visual quality in a Vercel preview before publishing.

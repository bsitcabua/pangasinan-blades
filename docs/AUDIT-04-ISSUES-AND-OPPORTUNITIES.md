# Website Audit: Issues and Improvement Opportunities

Reviewed: 2026-07-22

This document contains confirmed issues found during the Pangasinan Blades codebase audit. Optional ideas are labelled separately.

## Confirmed Issues

| Priority | Affected area | Issue | Why it matters | Recommended solution |
|---|---|---|---|---|
| High | `scripts/build-products.js`, `js/share.js`, homepage metadata, sitemap | Canonical domains disagree. Build and SEO files use the non-`www` domain, while sharing uses `www`. Sitemap product URLs also redirect because Vercel uses clean URLs and trailing slashes. | Redirect chains and conflicting canonical signals weaken SEO consistency and make social preview debugging harder. | Standardize on the final production origin, generate final `/collection/?id={id}` URLs, and update canonical, Open Graph, schema, sitemap, robots, documentation, and sharing constants together. |
| High | `templates/product.html`, `js/product-page.js` | Product title, description, canonical, Open Graph tags, and Product JSON-LD are added with browser JavaScript. | Crawlers may initially receive the same generic product shell for all IDs. Facebook required a separate preview endpoint for this reason. | When the site moves to a dynamic platform, render product metadata and structured data on the server using the requested product ID. |
| High | `assets/images/` | The 70 images total approximately 77 MB. PNG files account for about 74 MB, and some hero images exceed 4 MB. | Mobile users download unnecessarily large files, increasing LCP, bandwidth, and abandonment risk. | Generate AVIF/WebP derivatives and responsive widths. Use `picture`, `srcset`, and `sizes`; preload only the first hero slide and defer the rest. |
| High | `docs/CONTENT-CLAIMS-REVIEW.md`, homepage, FAQ, testimonials, policies | Heritage, warranty, authenticity, manufacturing, institutional attribution, lead-time, and testimonial claims remain unverified. | Unsupported claims create trust, reputation, and legal risk. | Obtain owner approval and evidence for every flagged claim. Rewrite or remove anything that cannot be substantiated. |
| High | `scripts/validate-build.js` | Validation requires exactly 37 products. | Adding a valid new product will fail validation even when its data and image are correct. | Replace the fixed count with schema validation, uniqueness checks, required fields, supported status/category values, and a non-empty collection check. |
| High | Full Collection, `script.js::applyFCSort()` | Price sorting is displayed, but every generated product price is `0`. The `Featured` option is only source order. | The controls appear functional but do not produce meaningful results, reducing confidence in the catalog. | Remove price sorting until numeric prices exist, or add real starting prices. Add an explicit `sortOrder` or featured rank instead of relying on JSON order. |
| Medium | Product configurator, `js/product-page.js::selectedBuild()` | The catalog promotes fully custom orders, but product pages do not capture finish, engraving, intended use, notes, or free-form customization. | Customers cannot communicate the flexibility promised by the catalog without manually rewriting the contact message. | Add approved fields and include them in duplicate detection, local storage, copied inquiry text, Messenger, and email. |
| Medium | Catalog and Full Collection cards, `script.js` | Cards are focusable generic elements with `role="link"` and contain a separate share button. | Generic link roles are less robust than semantic anchors and may create confusing keyboard or screen-reader behavior. | Use a real product anchor for the card destination and keep Share as a sibling button positioned over the card. |
| Medium | Mobile navigation, FAQ | Mobile navigation focuses the first item but does not fully trap focus. FAQ buttons lack `aria-controls`, answer IDs, and labelled region relationships. | Keyboard and screen-reader users can lose context or move behind an open dialog. | Add focus containment and focus restoration to mobile navigation. Give each FAQ trigger and panel unique, connected IDs. |
| Medium | Homepage document structure | There is no skip-to-content link, and the main homepage content is not wrapped consistently in a semantic `main`. | Keyboard users must traverse navigation on every visit and assistive technology receives a weaker page outline. | Add a visible-on-focus skip link and one `main` landmark containing the primary page sections. |
| Medium | `script.js`, `style.css`, `index.html` | The homepage uses roughly 1,800 JavaScript lines, 2,900 CSS lines, inline styles, inline handlers, globals, and duplicate interaction logic. | Small changes have a large regression surface and ownership boundaries are unclear. | Split code by feature, move inline presentation into CSS, replace global handlers with delegated listeners, and create shared modal/dialog utilities. |
| Medium | Quick View and Featured Masterpieces | Quick View HTML is commented out while drawer/zoom JavaScript and CSS remain. Featured Masterpieces is hidden but its large HTML/CSS payload remains. | Dead functionality increases download size and makes active behavior difficult to understand. | Remove inactive code or restore it intentionally behind a documented feature flag. |
| Medium | Contact, FAQ, policies, footer | The contact copy promises a 24-hour response and references WhatsApp, but no WhatsApp contact is presented. Policy content is duplicated across FAQ and guides. | Contradictory promises and channels weaken customer confidence and are difficult to maintain. | Approve one policy source, use consistent response times and contact methods, and link summaries back to the canonical policy section. |
| Medium | `vercel.json`, Web3Forms, Brevo | Form access keys and subscription endpoints are necessarily public, but security headers and documented domain restrictions are absent. | Public endpoints can be abused, and the site lacks browser-level mitigation against framing and injected resources. | Restrict Web3Forms to approved domains, monitor abuse, and configure CSP, `X-Content-Type-Options`, referrer, frame, and permissions policies after inventorying required third-party origins. |
| Low | `README.md`, `docs/CONTENT-CLAIMS-REVIEW.md` | Documentation says no Vercel rewrites are required and that the contact form has no backend integration. Both statements are stale. | Future maintenance decisions may be based on incorrect architecture notes. | Update documentation whenever deployment routes or integrations change. |
| Low | `scripts/build-products.js` | Every build gives every sitemap URL the current date. | Search engines are told that all product pages changed even when only one file changed. | Store real product modification dates or omit `lastmod` until accurate dates are available. |
| Low | `js/vendor/qrcode.min.js` | The QR library is committed as minified vendor code without documented package origin, license, or update process. | Dependency provenance and future security updates are harder to manage. | Record the library name, version, source, MIT license, and update procedure, or manage it through the build toolchain. |

## Missing or Incomplete States

- Product loading has an error state, but no loading state because data is currently delivered synchronously.
- Full Collection has an empty-search state and live result count.
- Inquiry List has empty, duplicate, removal, clear, copy success, and copy failure states.
- Contact and newsletter forms have loading, success, validation, and failure states.
- Product images have no dedicated broken-image fallback.
- Share QR generation reports an error through a generic copy-related message rather than a QR-specific failure message.
- Ready-stock status has no verification timestamp and can become stale.

## Optional Opportunities

- Add starting prices only after the business approves maintainable pricing data.
- Add availability timestamps and a `Confirm Availability` status for ready-stock products.
- Add inquiry reference IDs or downloadable inquiry summaries.
- Add consent-based analytics for catalog views, product shares, inquiry additions, and successful form submissions.
- Add server-rendered product routes when the planned dynamic platform is introduced.


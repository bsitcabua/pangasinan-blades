# Website and Catalog Review

Reviewed: 2026-07-28

## Current Status

The website is functional and substantially improved. The automated build,
product-route, asset, sitemap, and inquiry/quotation workflow validations pass.

The current experience includes:

- A responsive homepage and hero slideshow
- Featured and complete product collections
- Dynamic product pages using numeric product IDs
- Configurable made-to-order blade specifications
- A persistent Inquiry List with duplicate handling and editing
- Copy, Messenger, email, and contact-form quotation channels
- Workshop gallery and image lightbox
- Customer reviews linked to their confirmed Facebook source
- Shipping, legal, blade-care, FAQ, and contact content

## Highest-Priority Updates

### 1. Add Product-Specific Descriptions

All 37 products contain images and basic specifications, but the product data
does not store unique product descriptions. Product pages currently generate
generic text.

Add the following information to each product where applicable:

- Short product description
- Traditional origin or design context
- Recommended uses
- Blade profile and grind
- Overall length or approximate range
- Default finish
- Product-specific customization guidance

**Affected files:** `data/products.json`, `js/products-data.js`,
`js/product-page.js`

**Priority:** High

### 2. Confirm Technical Specifications

Every product publishes an exact hardness value, generally `57-60 HRC`.
Confirm whether each value is a measured result, a production target, or an
estimated range before continuing to present it as an exact specification.

Also confirm which steel, handle, scabbard, finish, and intended-use options
are appropriate for each blade rather than assuming every option applies to
every product.

**Affected files:** `data/products.json`, `collection/index.html`,
`js/product-page.js`

**Priority:** High

### 3. Improve Ready-Stock Accuracy

Two products are currently marked `ready-stock`, but the catalog has no:

- Last-confirmed date
- Available quantity
- Stock maintenance owner
- Rule for expiring old availability

Until a stock-management process exists, continue using cautious language such
as **Check Availability** rather than promising immediate availability.

**Affected files:** `data/products.json`, `script.js`, `js/product-page.js`

**Priority:** High

### 4. Complete Business Policy Approval

Payment, deposits, shipping, returns, repairs, international-order
responsibilities, and cancellation terms are published but still require final
business-owner approval as documented in `docs/CONTENT-CLAIMS-REVIEW.md`.

**Affected files:** `index.html`, `docs/CONTENT-CLAIMS-REVIEW.md`

**Priority:** High

### 5. Expand and Update the Product Catalog

More blade products are planned. Update the catalog data and supporting system
so new products can be added without manually changing several unrelated files.

For every new product, collect and add:

- Unique numeric ID and slug
- Product name, category, and series
- Featured status and explicit featured rank when applicable
- Made-to-order or ready-stock status
- Optimized product image and meaningful alt text
- Product-specific short and full descriptions
- Default blade length and overall length when available
- Default steel and expected hardness range
- Blade profile, grind, and intended uses
- Default handle and scabbard materials
- Default finish
- Available customization options
- Material or design limitations
- Ready-stock verification details when applicable

Catalog expansion should also:

- Generate category filters from the data
- Calculate product and featured counts dynamically
- Validate that IDs and slugs are unique
- Validate image paths and required specifications
- Update `js/products-data.js` and `sitemap.xml` through the build process
- Confirm product cards, search, sorting, related products, sharing, and inquiry
  generation for every new item
- Allow product 38 and later products without changing fixed counts or category
  lists in validators

Create and document a repeatable **Add a Product** checklist so future catalog
updates follow the same naming, image, content, and verification standards.

**Affected files:** `data/products.json`, `scripts/build-products.js`,
`scripts/validate-build.js`, `script.js`, `js/products-data.js`, `sitemap.xml`,
`README.md`

**Priority:** High

## Catalog Improvements

### 6. Add Explicit Featured Ranking

Featured sorting currently uses a Boolean `featured` value followed by product
ID. Add a numeric `featuredRank` field if the display order should be deliberate.

**Priority:** Medium

### 7. Generate Series Filters From Product Data

Full Collection categories and validator-supported categories are hardcoded.
Adding a new series therefore requires changes outside the product JSON.

Generate filters from product data or move supported category definitions into
one shared configuration source.

**Priority:** Medium

### 8. Make the Product Count Dynamic

The homepage contains a hardcoded `37` product statistic. Render this value
from the current product data so it remains accurate as the catalog grows.

**Affected file:** `index.html`

**Priority:** Medium

### 9. Link Reviews to Relevant Products

Blade names in customer reviews currently link only to the catalog section.
Where a matching product exists, link directly to its product page.

**Priority:** Medium

### 10. Connect Hero Slides to Product Pages

The hero slideshow highlights individual blades but does not provide a direct
route to those product details. Consider making the displayed blade title or a
small action link open the matching product page.

**Priority:** Medium

### 11. Add Customer Reviews Navigation

The customer review section is visible and sourced, but it is not linked from
the main navigation or footer. Add a **Reviews** or **Collector Stories** link
if this section should be part of the primary customer journey.

**Priority:** Low

## Product Page Improvements

### 12. Add a Clear Back-to-Collection Control

On mobile, the product navigation links are hidden. Add a clear **Back to Full
Collection** control so customers do not have to depend only on the breadcrumb.

**Priority:** Medium

### 13. Clarify Default Specifications

Explain that displayed specifications are starting defaults and that the final
quotation may change based on intended use, material availability, safety, and
workshop review.

**Priority:** High

### 14. Add Field-Specific Guidance

Clarify:

- Whether the dimension means blade length or overall length
- Which steels are suitable for each design
- Which sheath options apply to each product
- Which premium materials involve additional cost

**Priority:** Medium

### 15. Explain the Post-Inquiry Process

Add a concise sequence near the quotation actions:

1. Workshop review
2. Quotation and specification confirmation
3. Required deposit
4. Production queue
5. Final payment
6. Shipping

**Priority:** Medium

## Customer Feedback

### 16. Preserve Review Evidence

The Facebook Reviews source is confirmed and linked. Retain internal
screenshots or another record showing that every published quotation matches
its source in case Facebook content changes or becomes unavailable.

**Priority:** Medium

### 17. Confirm Personal-Detail Permission

Confirm permission where required before republishing customer locations,
occupations, or other personal details.

**Priority:** Medium

### 18. Improve Carousel Accessibility

Pause autoplay while keyboard focus is inside the testimonial carousel and
respect `prefers-reduced-motion`.

**Priority:** Medium

## Performance

### 19. Use Optimized Gallery Images

Gallery rendering still references large PNG/JPG originals even where WebP
copies exist. Use optimized assets for thumbnails.

**Affected files:** `script.js`, `assets/images/workshop/`

**Priority:** Medium

### 20. Add Responsive Image Sources

Add `srcset` and `sizes` for hero, catalog, product, heritage, and gallery
images so mobile devices do not download desktop-sized files unnecessarily.

**Priority:** Medium

### 21. Separate Thumbnails From Lightbox Images

Load smaller gallery thumbnails in the grid and request full-resolution images
only when the lightbox opens.

**Priority:** Medium

## SEO and Accessibility

### 22. Add a Product-Page Skip Link

The homepage has a skip link and semantic main landmark. Add the same keyboard
shortcut to the shared product page.

**Priority:** Medium

### 23. Confirm the Production Origin

Confirm that the permanent canonical origin is:

`https://www.pangasinanblades.com`

Ensure the non-`www` hostname redirects consistently and that canonical,
Open Graph, sitemap, QR, and share URLs continue to use the same origin.

**Priority:** High

### 24. Complete Systematic Viewport Testing

Test all pages and dialogs at:

- 320px
- 360px
- 390px
- 768px
- 1024px
- 1440px
- 200% browser zoom

Include keyboard navigation, focus restoration, modal scrolling, and Brave.

**Priority:** Medium

## Maintainability

### 25. Refresh Claims Documentation

`docs/CONTENT-CLAIMS-REVIEW.md` contains obsolete line references and claims
associated with content that has been removed or moved. Re-audit it against
the current homepage.

**Priority:** Medium

### 26. Consolidate Inquiry Rendering

The homepage and product page maintain separate Inquiry List rendering and
dialog behavior. Move more of this behavior into shared utilities to prevent
future inconsistencies.

**Priority:** Medium

### 27. Split the Main JavaScript File

Separate `script.js` into focused modules for:

- Hero slideshow
- Catalog and Full Collection
- Inquiry workflow
- Navigation
- Gallery and lightbox
- Testimonials
- Contact and newsletter forms

Regression tests should be expanded before this refactor.

**Priority:** Medium

### 28. Remove Inline Styles and Handlers Gradually

Move inline styles and event handlers into CSS and JavaScript modules. This is
required before the Content Security Policy can safely remove `'unsafe-inline'`.

**Priority:** Low until regression coverage improves

## Recommended Next Task

Start with **catalog expansion, product-specific content, and verified default
specifications**. Add the planned products while establishing a repeatable data
and validation process. This provides the largest immediate improvement in
customer confidence, product understanding, catalog scalability, and quotation
quality before undertaking larger refactoring or image optimization work.

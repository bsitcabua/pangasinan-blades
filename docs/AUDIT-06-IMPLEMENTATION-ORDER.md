# Website Audit: Suggested Implementation Order

Reviewed: 2026-07-22

This sequence prioritizes business risk and broken or misleading behavior before visual refinement and optional features.

## Phase 1: Critical and Broken Functionality

### Objectives

- Remove misleading controls and conflicting production URLs.
- Ensure the catalog can grow beyond 37 products.
- Resolve claims and policies that could create customer or legal risk.

### Tasks

1. Confirm the final production origin, including the `www` decision and trailing-slash format.
2. Update build URLs, sitemap URLs, robots, canonical tags, Open Graph tags, schema, share constants, and documentation together.
3. Remove price sorting until real numeric prices are available, or add approved starting prices.
4. Add explicit featured ranking if `Featured` sorting must remain.
5. Replace the validator's fixed product count with schema and supported-value validation.
6. Review every item in `docs/CONTENT-CLAIMS-REVIEW.md` with the business owner.
7. Correct unsupported heritage, testimonial, warranty, authenticity, manufacturing, pricing, and lead-time claims.
8. Reconcile contact promises, WhatsApp references, shipping language, return terms, and production estimates.

### Completion Criteria

- Production URLs resolve without unnecessary redirects.
- Search and sharing metadata use the same canonical origin.
- Every Full Collection sort option has a meaningful result.
- A 38th valid product passes build validation.
- Published commercial and historical claims are owner-approved.

## Phase 2: User Experience and Mobile Improvements

### Objectives

- Make custom-order inquiries complete and easy to submit.
- Ensure all dialogs and controls remain usable on small screens.
- Improve semantic interaction without changing the premium design.

### Tasks

1. Approve the complete list of custom-order fields and options.
2. Add finish, engraving, intended use, custom notes, and other approved specifications to product configuration.
3. Include every new specification in local storage, duplicate detection, inquiry rendering, copy text, Messenger, and email.
4. Replace role-link catalog cards with semantic anchors and sibling Share buttons.
5. Test 320, 360, 390, 768, 1024, and 1440px viewports.
6. Correct overflow, clipped headers, inaccessible close buttons, and safe-area spacing in every modal.
7. Normalize touch targets and compact mobile button typography.
8. Add ready-stock verification timestamps and consistent ordering-language badges.

### Completion Criteria

- A customer can describe a complete custom blade without rewriting the generated inquiry.
- All dialogs can be opened, used, and closed on narrow mobile screens.
- Product cards remain keyboard accessible and share controls do not trigger navigation.
- Ready-stock wording clearly indicates when availability was last confirmed.

## Phase 3: SEO, Accessibility, and Performance

### Objectives

- Reduce page weight and improve discovery.
- Strengthen keyboard and screen-reader behavior.
- Prepare product rendering for the future dynamic platform.

### Tasks

1. Generate responsive AVIF/WebP images and retain originals as source assets.
2. Implement `picture`, `srcset`, and `sizes` for hero, catalog, product, heritage, and gallery images.
3. Preload only the first hero image and defer later slides.
4. Measure LCP, CLS, total transfer size, and mobile CPU use before and after optimization.
5. Add a skip-to-content link and a semantic `main` landmark.
6. Add full FAQ trigger/panel ARIA relationships.
7. Add proper focus containment and restoration to mobile navigation and dialogs.
8. Configure security headers after documenting Web3Forms, Brevo, Google Fonts, social, and image requirements.
9. Design the future server-rendered product metadata contract around the existing numeric product ID.

### Completion Criteria

- Mobile users no longer download multi-megabyte desktop originals unnecessarily.
- Keyboard focus cannot escape active modal navigation.
- FAQ state and panel ownership are announced correctly.
- Product metadata can later move server-side without changing product data.

## Phase 4: Code Cleanup and Maintainability

### Objectives

- Reduce duplicated logic and make future changes safer.
- Remove inactive code and align documentation with production.

### Tasks

1. Add regression checks for catalog filtering, search, sorting, inquiry persistence, duplicate merging, forms, sharing, and navigation.
2. Split `script.js` into feature modules.
3. Consolidate homepage and product-page dialog/inquiry behavior around shared utilities.
4. Split CSS into tokens/base, layout, components, sections, dialogs, utilities, and responsive files.
5. Remove inline styles and inline event handlers.
6. Remove disabled Quick View and hidden Masterpieces code, or document and restore them intentionally.
7. Document the QRCode.js version, source, license, and update procedure.
8. Correct README and audit documentation that no longer matches deployment behavior.
9. Replace generated sitemap dates with accurate modification dates or omit them.

### Completion Criteria

- Active features have clear module ownership.
- No disabled feature leaves substantial unused HTML, CSS, or JavaScript.
- Homepage and product inquiry behavior use the same shared rules.
- Build, validation, and documentation agree with production.

## Phase 5: Optional Enhancements

### Objectives

- Improve operational efficiency and conversion measurement after the core experience is stable.

### Tasks

1. Add inquiry reference IDs.
2. Add downloadable or printable inquiry summaries.
3. Add consent-based conversion analytics.
4. Add dynamic availability management and timestamps.
5. Add approved starting-price ranges.
6. Add customer-selectable comparison or saved-product features only if analytics demonstrate demand.

### Completion Criteria

- Optional features solve a measured customer or operational need.
- New tracking respects the published privacy policy.
- Availability and pricing data have an assigned maintenance owner.

## Dependencies Summary

- Business-owner approval is required before publishing revised claims, prices, warranty terms, lead times, or policies.
- Product expertise is required for descriptions and customization options.
- Provider dashboard access is required for Web3Forms restrictions and Brevo monitoring.
- A future dynamic runtime is required for true server-rendered product metadata and administrative stock management.
- Regression tests should be established before the large JavaScript and CSS modularization work.


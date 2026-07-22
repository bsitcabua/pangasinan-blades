# Angular Migration Assessment

Reviewed: 2026-07-22

## Executive Summary

The Pangasinan Blades website can be converted to Angular. The conversion is technically feasible and aligns well with the site's increasingly application-like behavior, including its data-driven catalog, product configuration, persistent Inquiry List, forms, dialogs, sharing, and dynamic product pages.

The work should be treated as a structured migration rather than an automatic HTML-to-Angular conversion.

- **Overall feasibility:** High
- **Migration complexity:** Complex
- **Recommended architecture:** Angular standalone components with hybrid SSR/CSR
- **Recommended production direction:** Server-rendered public pages with hydrated client-side interactions

Angular is most valuable if the website will gain frequently changing inventory, administrative product management, dynamic pricing, order tracking, customer accounts, more advanced customization, additional pages, or multilingual content.

For the current static catalog alone, Angular is more infrastructure than strictly necessary. For the planned dynamic product system, it is a defensible and scalable choice when SSR is included from the beginning.

## Environment Requirements

The current `package.json` supports Node.js 18. Current supported Angular releases require a newer Node runtime.

As reviewed on 2026-07-22:

- Angular 22 requires Node.js `22.22.3+`, `24.15+`, or `26+`.
- Angular 21 supports Node.js `20.19+`, `22.12+`, or `24+`.

For a new migration, use Angular 22 with a compatible Node 22 runtime. Angular 21 LTS is the more conservative alternative.

Official references:

- [Angular overview](https://angular.dev/overview)
- [Angular version compatibility](https://angular.dev/reference/versions)
- [Angular routing](https://angular.dev/guide/routing)
- [Angular Signals](https://angular.dev/guide/signals)
- [Angular rendering strategies](https://angular.dev/guide/routing/rendering-strategies)
- [Angular hydration](https://angular.dev/guide/hydration)
- [Angular deployment](https://angular.dev/tools/cli/deployment)

## Recommended Project Structure

```text
src/app/
|-- core/
|   |-- models/
|   |-- services/
|   |-- storage/
|   `-- utilities/
|-- layout/
|   |-- header/
|   |-- mobile-menu/
|   `-- footer/
|-- pages/
|   |-- home/
|   `-- product-detail/
|-- features/
|   |-- catalog/
|   |-- product-configurator/
|   |-- inquiry-list/
|   |-- sharing/
|   |-- gallery/
|   |-- contact/
|   `-- newsletter/
`-- shared/
    |-- dialog/
    |-- product-card/
    |-- status-badge/
    `-- buttons/
```

## Current-to-Angular Component Mapping

| Current feature | Angular replacement |
|---|---|
| Hero slideshow and canvas | `HeroComponent` with a browser-only canvas directive or child component |
| Brand story | `BrandStoryComponent` |
| Featured catalog | `CatalogPreviewComponent` |
| Full Collection modal | `FullCollectionComponent` using Angular CDK Dialog or Overlay |
| Product cards | Reusable `ProductCardComponent` |
| Dynamic product shell | Routed `ProductDetailComponent` |
| Build Specifications | Reactive `ProductConfiguratorComponent` |
| Inquiry List | `InquiryListService` and dialog components |
| Sharing and QR | `ShareDialogComponent` and `ShareService` |
| Workshop gallery | `WorkshopGalleryComponent` and lightbox component |
| Testimonials | `TestimonialsComponent` |
| FAQ | Accessible `FaqComponent` |
| Shipping and care content | Content components or route sections |
| Web3Forms inquiry | Reactive `ContactFormComponent` |
| Brevo newsletter | `NewsletterComponent` |
| Header, footer, and mobile menu | Shared layout components |

## Product Data

`data/products.json` can remain the initial source of truth during migration.

Create typed models for:

- `Product`
- `ProductDetails`
- `ProductSelection`
- `InquiryItem`
- `ProductStatus`
- `ProductCategory`

The product data should eventually be provided through an Angular service. The service can initially load a bundled JSON asset, then later switch to an API without requiring catalog components to change.

## Inquiry List State

The current `js/inquiry-list.js` maps naturally to an Angular `InquiryListService`.

Recommended responsibilities:

- Hold inquiry items in an Angular signal.
- Expose a computed total quantity.
- Generate specification-based duplicate keys.
- Merge duplicate quantities only after confirmation.
- Save and restore items from `localStorage`.
- Format copied, Messenger, and email inquiry messages.
- Expose add, remove, clear, and quantity-update methods.

All browser APIs such as `localStorage`, `navigator`, `window`, and `document` must be guarded when server-side rendering is active.

## Routing

The existing dynamic URL can be preserved:

```text
/collection/?id=18
```

Angular Router can read the ID through `ActivatedRoute.queryParamMap`.

Recommended initial routes:

```text
/                       Home
/collection/?id=18      Product detail
/share/?id=18           Server-rendered social preview
/**                     Not-found page
```

The existing `#full-collection` fragment can remain compatible during migration. Angular can observe the route fragment and open the Full Collection dialog after navigation.

## Rendering Strategy

A client-only Angular SPA is not recommended because product SEO and Facebook previews have already required special handling.

Use hybrid rendering:

| Area | Recommended rendering |
|---|---|
| Homepage | SSR or prerendering |
| Product detail | SSR using product ID |
| Share route | SSR |
| Shipping, legal, and care content | SSR or prerendering |
| Product configurator | Hydrated client interaction |
| Inquiry List | Browser-only state after hydration |
| Dialogs and lightboxes | Client-side interaction |
| Gallery and testimonials | SSR markup with hydrated controls |

Angular hydration should reuse the server-rendered DOM instead of destroying and rebuilding it in the browser.

## Code Requiring Redesign

The largest migration effort is `script.js`, which currently relies heavily on:

- `document.querySelector()` and `getElementById()`
- Dynamic `innerHTML`
- Global functions
- Inline HTML handlers
- Direct `history` and `location` manipulation
- Manual dialog and focus state
- Global mutable catalog state
- Timers and animation loops
- `IntersectionObserver` and `MutationObserver`
- Direct canvas manipulation

These should become:

- Angular template bindings
- Component inputs and outputs
- Signals and computed state
- Injectable services
- Reactive forms
- Angular Router navigation
- Directives
- Lifecycle hooks
- Angular CDK dialog, overlay, and accessibility utilities

The current CSS can remain global during the first migration phase to preserve visual parity. Move styles into components only after the Angular version matches the existing site across desktop and mobile.

## Browser-Only Features

The following features need special SSR handling:

- Hero canvas particles
- Product image zoom
- QR code generation
- Clipboard API
- Native Web Share API
- Local and session storage
- Gallery and testimonial autoplay
- Browser visibility and resize listeners
- Brevo's DOM-oriented external script

Initialize these only in the browser, preferably after hydration or inside browser-only directives and services.

## Forms and Integrations

### Web3Forms

Convert the contact form to Angular Reactive Forms and submit with `HttpClient`. Preserve:

- Required fields
- Email validation
- Message length validation
- Consent checkbox
- Honeypot
- Loading state
- Success and error messages
- Double-submission protection

### Brevo

Keep the hosted subscription endpoint initially. Prefer managing validation and submission entirely through Angular rather than allowing both Angular and Brevo's DOM script to control the form.

### Social Sharing

Keep the existing social destinations and QR behavior. Wrap them in a `ShareService` that receives typed share data.

### Facebook Preview

The existing Vercel share endpoint can remain during migration. Once Angular SSR generates product metadata reliably, evaluate whether the separate endpoint is still required.

### QR Code

Wrap QR generation in a browser-only component. Replace the manually vendored minified file with a maintained npm dependency when the Angular workspace is created.

## Deployment

Angular supports Vercel deployment. The deployment must account for:

- SSR output
- Static assets
- Deep links
- Query-parameter product routes
- Social preview routes
- Production environment configuration
- Web3Forms and Brevo endpoints

The current `outputDirectory: "."` configuration will not be carried over unchanged. Angular builds into a `dist` output and SSR may require Vercel functions or framework-aware deployment configuration.

## Suggested Migration Sequence

### Phase 1: Foundation

1. Upgrade Node.js.
2. Scaffold a separate Angular workspace without deleting the existing website.
3. Configure standalone components, routing, SSR, hydration, environments, and testing.
4. Copy assets without changing paths prematurely.
5. Add typed product models and a product data service.

### Phase 2: Static Layout

1. Build the shared header, mobile navigation, footer, and page shell.
2. Migrate static homepage sections.
3. Keep existing global CSS for initial visual parity.
4. Verify desktop and mobile layouts before adding interactions.

### Phase 3: Catalog and Routing

1. Build reusable product cards.
2. Migrate featured and complete catalogs.
3. Add series filtering, live search, and meaningful sorting.
4. Add the `/collection/` route while preserving `?id={id}`.
5. Build the product detail page and configurator.

### Phase 4: Inquiry Workflow

1. Implement the Inquiry List service with signals.
2. Migrate local-storage persistence and duplicate handling.
3. Build shared accessible dialogs.
4. Migrate quantity controls, removal, clearing, copy, Messenger, and email.
5. Connect the product page to the homepage inquiry form.

### Phase 5: Secondary Interactions

1. Migrate sharing and QR generation.
2. Migrate gallery filters and lightbox.
3. Migrate testimonials, FAQ, reveal effects, statistics, and hero slideshow.
4. Rebuild the canvas and zoom as browser-only features.
5. Migrate Web3Forms and Brevo forms.

### Phase 6: SSR, SEO, and Deployment

1. Render homepage and product metadata on the server.
2. Add product JSON-LD using typed product data.
3. Generate the sitemap from the Angular data source.
4. Configure Vercel SSR and deep-link behavior.
5. Validate Facebook, Messenger, search crawlers, and direct product links.

### Phase 7: Verification and Cutover

1. Compare Angular and current screenshots at all supported breakpoints.
2. Test keyboard navigation, focus management, and screen readers.
3. Test local storage migration with existing Inquiry Lists.
4. Test every form and external integration.
5. Run performance and bundle analysis.
6. Switch production only after feature parity is confirmed.
7. Keep the current version available for rollback during the initial release.

## Migration Risks

| Risk | Mitigation |
|---|---|
| Visual regressions from componentizing CSS too early | Keep CSS global until parity is achieved. |
| Browser API failures during SSR | Guard browser APIs and initialize them after hydration. |
| Inquiry List data loss | Preserve the current local-storage key and item schema. |
| SEO regression | Enable SSR before production cutover and compare rendered HTML. |
| Social preview regression | Keep the working share endpoint until SSR previews are verified. |
| Mobile dialog regressions | Use Angular CDK accessibility utilities and viewport tests. |
| Large all-at-once rewrite | Migrate feature by feature in a separate workspace. |
| Broken direct URLs | Preserve query parameters and configure Vercel deep-link handling. |

## Recommendation

Proceed with Angular when the project is ready to become a dynamic product platform. Use SSR and hydration from the beginning, preserve numeric query-parameter product URLs during the first migration, and avoid replacing the current production site until the Angular implementation reaches functional and visual parity.

Do not begin with a direct rewrite of `index.html` into one Angular component. Establish the data model, route architecture, Inquiry List service, SSR strategy, and reusable component boundaries first.


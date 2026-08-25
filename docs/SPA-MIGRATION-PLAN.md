# SPA Migration Plan

## Recommendation

Migrate the current website to a lightweight Vite + React + React Router Single Page Application.

Keep the existing Vercel serverless endpoints for server-rendered product metadata and social previews. Do not migrate to Angular at this stage; the current project is not large enough to justify Angular's additional structure and configuration overhead.

The migration should be staged so the existing catalog, Inquiry List, quotation workflow, SEO metadata, and shared product links continue working throughout the process.

## Current Architecture

The current site is a static-first application with SPA-like behavior:

- `index.html` contains the homepage and major sections.
- `collection/index.html` is the shared product template.
- `script.js` handles homepage navigation, catalog rendering, dialogs, gallery, forms, and other interactions.
- `js/product-page.js` handles product rendering, configuration, image zoom, and product-page inquiry actions.
- `js/inquiry-list.js` manages shared inquiry persistence and quotation formatting.
- `js/share.js` manages sharing, QR codes, and social actions.
- `/api/catalog` provides database-backed catalog data.
- `/api/product` provides server-rendered product metadata.
- `/api/share` provides social crawler metadata and redirect behavior.
- `localStorage` stores inquiry items.
- `sessionStorage` stores customer information.
- Vercel rewrites support product and share URLs.

## Target Architecture

```text
src/
  app/
    App.jsx
    routes.jsx
    site-status.jsx
  components/
    Header.jsx
    MobileMenu.jsx
    Hero.jsx
    CatalogPreview.jsx
    FullCatalog.jsx
    ProductCard.jsx
    ProductDetails.jsx
    SpecificationBuilder.jsx
    InquiryList.jsx
    CustomerInformation.jsx
    ShareModal.jsx
    ConfirmationDialog.jsx
    Gallery.jsx
    ContactForm.jsx
  pages/
    HomePage.jsx
    ProductPage.jsx
    CollectionPage.jsx
  services/
    catalog-api.js
    quotation-format.js
    share-service.js
    web3forms.js
    brevo.js
  stores/
    catalog-store.js
    inquiry-store.js
    customer-store.js
    modal-store.js
  styles/
    tokens.css
    global.css
    components.css
  main.jsx

api/
  catalog.js
  product.js
  share.js

lib/
  product-service.js
```

## Phase 0: Freeze Current Behavior

Before migration, document and verify the current behavior:

- Homepage sections and navigation
- Hero slideshow
- Featured catalog
- Complete Collection
- Series filters and live search
- Product details and customization
- Inquiry List add, edit, remove, clear, and quantity behavior
- Duplicate detection and quantity merging
- Customer information
- Copy, Messenger, email, and contact-form quotation flows
- Gallery and lightbox
- Share modal and QR code
- Coming Soon and Maintenance routing
- Mobile navigation and responsive dialogs

Create a regression checklist for desktop, mobile, refresh, direct links, and Brave browser.

Do not remove the existing implementation during this phase.

## Phase 1: Create the SPA Foundation

Set up Vite and React while preserving the current design system and API endpoints.

Configure:

- Vite development server
- Production build
- Vercel output directory
- Existing image host
- Existing catalog API proxy
- Existing favicon and metadata assets
- Environment configuration where appropriate

Success criteria:

- `npm run dev` starts successfully.
- `npm run build` succeeds.
- Vercel deployment succeeds.
- The existing website remains available while the SPA is developed.

## Phase 2: Add Routing

Create these routes:

```text
/
/collection
/collection/:id
/share/:id
```

Continue supporting existing links:

```text
/collection/?id=1
/share/?id=1
```

Existing query-string links should redirect or internally resolve to the new route format.

Keep server-rendered metadata for product and share routes so Facebook, Messenger, LinkedIn, and search crawlers receive product-specific HTML.

Success criteria:

- Existing shared links continue working.
- Direct product URLs load correctly.
- Browser refresh does not return a 404.
- Facebook and Messenger previews remain functional.

## Phase 3: Create the Product API Service

Create one client service for catalog access:

- `getProducts()`
- `getProductById(id)`
- loading state
- error state
- response validation
- in-memory caching

The SPA must consume `/api/catalog` and must not import product JSON directly.

Success criteria:

- All products load from the database API.
- Invalid responses show a clear error.
- API failure does not produce an unhandled exception.
- Product IDs remain stable.
- Product image URLs remain valid.

## Phase 4: Centralize Application State

Create separate stores or contexts for:

- catalog data
- Inquiry List
- customer information
- modal/dialog state

The Inquiry List store must support:

- add item
- edit item
- remove item
- clear list
- quantity updates
- duplicate detection
- duplicate quantity merging
- localStorage persistence
- invalid-storage recovery
- empty states

The Customer Information store must support:

- first name
- last name
- email
- phone
- address
- additional notes
- sessionStorage persistence
- complete and incomplete states

Success criteria:

- Homepage and product page use the same Inquiry List state.
- Refresh preserves inquiry items.
- Customer details persist during the browser session.
- Duplicate builds merge correctly.
- Editing works from every entry point.

## Phase 5: Migrate the Application Shell

Create reusable components for:

- Header
- Desktop navigation
- Mobile navigation
- Footer
- Inquiry count
- Site status guard

Preserve:

- hamburger and close icon behavior
- cart/inquiry placement
- Escape-key handling
- outside-click handling
- focus restoration
- body scroll locking
- Coming Soon priority
- Maintenance priority

Routing priority must remain:

1. Maintenance mode
2. Coming Soon mode
3. Normal application

## Phase 6: Migrate Homepage Sections

Migrate these sections into independent components:

- Hero
- Brand Story
- Catalog Preview
- Custom Orders
- Art of Forging
- Why Pangasinan Blades
- Workshop Gallery
- Testimonials
- FAQ
- Contact Form
- Footer

Initially preserve the existing colors, typography, spacing, animations, and responsive behavior. Avoid redesigning while migrating functionality.

Success criteria:

- Each section renders independently.
- The homepage maintains one primary H1.
- Keyboard navigation remains functional.
- Mobile layouts have no overlap or horizontal scrolling.
- Existing content and imagery remain available.

## Phase 7: Migrate the Catalog

Create reusable components for:

- Product cards
- Series filters
- Live search
- Sorting
- Complete Collection
- Loading state
- Empty state
- API error state

Preserve:

- database-backed products
- product images
- description truncation
- product links
- sharing controls
- series filtering
- search and sorting
- status labels where applicable

Prices should remain available internally for quotation work but should not be displayed in catalog cards unless the business changes that decision.

## Phase 8: Migrate Product Details

Create components for:

- Product image and zoom
- Product specifications
- Related products
- Specification builder
- Quantity controls
- Request a Quote actions

The product page must:

- load product data by ID
- show loading and missing-product states
- display product-specific defaults
- show read-only specifications by default
- reveal customization controls when requested
- update hardness when steel changes
- support custom blade length
- support handle and scabbard selection
- support finish, intended use, and additional notes
- add the configured item to the Inquiry List

## Phase 9: Migrate Quotation Workflows

Create shared quotation components and one formatting service for:

- Copy Quote Request
- Send via Messenger
- Send via Email
- Submit Quote Request through the contact form

Every quotation should include:

- Product name
- Complete product link
- Blade length
- Blade material
- Hardness
- Handle
- Scabbard
- Finish
- Intended use
- Additional notes
- Quantity
- Customer information

All channels must use the same quotation data and formatting rules.

## Phase 10: Migrate Dialogs and Modals

Create reusable dialog components for:

- Inquiry List
- Share modal
- Copy success modal
- Duplicate confirmation
- Remove confirmation
- Clear-list confirmation
- Image lightbox

Centralize:

- Escape-key behavior
- outside-click behavior
- focus trapping
- focus restoration
- body scroll locking
- responsive sizing
- close button behavior

Verify mobile layouts carefully, especially modal headers, action buttons, customer information, and confirmation dialogs.

## Phase 11: Migrate Forms and Integrations

Move the contact and newsletter logic into reusable form components while preserving:

- Web3Forms submission
- Brevo subscription
- validation
- loading states
- success states
- failure states
- consent checkbox
- honeypot protection
- character counter
- duplicate-submit prevention

## Phase 12: Preserve SEO and Sharing

Keep server-side metadata generation for:

```text
/collection/:id
/share/:id
```

Validate:

- title
- description
- canonical URL
- Open Graph image
- secure image URL
- Twitter metadata
- Product JSON-LD
- redirect destination

Test with Facebook Sharing Debugger, Messenger previews, LinkedIn Post Inspector, and Twitter/X card tools.

## Phase 13: Migrate Styling

Initially reuse the current CSS. Later organize it into feature-based files:

```text
src/styles/
  tokens.css
  reset.css
  layout.css
  navigation.css
  catalog.css
  product.css
  inquiry.css
  dialogs.css
  forms.css
  responsive.css
```

Remove unused selectors only after the new application passes visual and interaction testing.

## Phase 14: Add Testing

Add automated tests for:

- product API mapping
- product ID lookup
- duplicate matching
- quantity merging
- invalid localStorage data
- customer session data
- quotation formatting
- hardness changes
- status routing
- URL compatibility

Add browser tests for:

- homepage loading
- catalog search
- product opening
- customization
- Inquiry List actions
- copy quotation
- email quotation
- Messenger quotation
- mobile navigation
- modal focus behavior
- refresh persistence

Test at 320, 375, 390, 768, 1024, and 1440 pixel widths.

## Phase 15: Run Parallel Verification

Temporarily run the old and new implementations side by side and compare:

- product counts
- product names
- images
- product links
- Inquiry List output
- customer information
- share URLs
- Open Graph metadata
- responsive screenshots

Do not delete the old implementation until the comparison passes.

## Phase 16: Deploy and Remove Legacy Code

Deployment order:

1. Deploy the SPA shell and API-compatible endpoints.
2. Confirm catalog loading in production.
3. Confirm product pages and social previews.
4. Confirm Inquiry List and quotation workflows.
5. Confirm mobile behavior.
6. Run production validation.
7. Monitor errors and failed API requests.
8. Remove legacy HTML and JavaScript only after successful verification.

## Main Risks

- Facebook and Messenger previews could stop working if metadata becomes client-only.
- Existing shared product links could break if redirects are not preserved.
- Inquiry List data could be lost if storage keys or item formats change.
- Customer information could be lost if sessionStorage handling changes.
- Duplicate and quantity behavior could diverge between homepage and product page.
- API failures could result in an empty catalog without a clear error state.
- Mobile dialogs could regress during component migration.
- Coming Soon and Maintenance routing could be bypassed.

## Recommended Migration Order

1. Freeze and document current behavior.
2. Create the Vite/React shell.
3. Add routing and preserve existing URLs.
4. Create the catalog API service.
5. Centralize Inquiry List and customer state.
6. Migrate the application shell and navigation.
7. Migrate the catalog.
8. Migrate product details and customization.
9. Migrate quotation channels.
10. Migrate dialogs and forms.
11. Preserve server-rendered SEO and social metadata.
12. Add automated and browser tests.
13. Run parallel verification.
14. Deploy and remove legacy code only after validation.

## Final Recommendation

Proceed with a staged Vite + React migration. Prioritize the Inquiry List and quotation workflow before migrating secondary visual sections. This provides SPA navigation and reusable components while protecting the existing product links, database catalog, social previews, customer information, and business-critical quotation process.
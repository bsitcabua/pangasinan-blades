# Website Audit: Recommended Task List

Reviewed: 2026-07-22

## Critical Fixes

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Standardize production URLs | Use one final `www` origin and clean URL format across generated URLs and metadata. | Build script, sitemap, robots, homepage/product metadata, schema, sharing | No redirect chains or conflicting canonical signals. | High | Moderate | Confirm final production domain |
| Verify business and heritage claims | Review every item in `CONTENT-CLAIMS-REVIEW.md` and approve, evidence, rewrite, or remove it. | Homepage, forging, why-us, testimonials, FAQ, policies | Trustworthy and legally defensible content. | High | Complex | Owner records and approvals |
| Make product validation data-driven | Remove the fixed 37-product assertion and validate schema and supported values. | `scripts/validate-build.js`, README | New valid products pass without changing validator code. | High | Easy | None |
| Fix ineffective sorting | Remove price sort options or supply approved numeric starting prices; define featured ranking explicitly. | Full Collection, product data, `applyFCSort()` | Every sort choice produces an understandable result. | High | Easy to Moderate | Pricing/ranking decision |

## User Experience Improvements

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Complete custom specification capture | Add finish, engraving, intended use, custom notes, and any approved material options. | Product configurator, inquiry list, email/Messenger formatting | Customers can submit a complete custom-build request. | High | Moderate | Approved options |
| Consolidate policy content | Establish one canonical source for shipping, payments, returns, production time, and warranty. | FAQ, guides, contact, footer | Consistent customer expectations and easier updates. | Medium | Moderate | Approved policies |
| Reconcile contact promises | Confirm response time and add WhatsApp details or remove WhatsApp references. | Contact section, FAQ, footer | Every advertised contact channel is usable. | Medium | Easy | Business contact decision |
| Improve ready-stock clarity | Add last-confirmed date and explain that availability is subject to confirmation. | Product data, badges, product pages | Reduced confusion around occasional stock. | Medium | Moderate | Stock maintenance process |
| Add image failure handling | Show a branded fallback when product or gallery images fail. | Catalog, product page, gallery, inquiry modal | Broken assets do not leave blank or distorted UI. | Low | Easy | Fallback asset |

## Mobile and Responsive Updates

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Run viewport regression QA | Test 320, 360, 390, 768, 1024, and 1440px layouts and document issues. | Entire frontend | No overlap, clipped controls, inaccessible modal headers, or horizontal scrolling. | High | Moderate | Browser test setup |
| Strengthen mobile dialog behavior | Verify safe-area padding, sticky headers, focus containment, and close controls. | Full Collection, inquiry, confirmation, share, gallery dialogs | Reliable dialog use on small screens and mobile browsers. | High | Moderate | Accessibility utility |
| Normalize touch targets | Ensure interactive controls remain at least 44x44px without oversized text. | Navigation, card sharing, filters, carousel, lightbox | Consistent and comfortable touch interaction. | Medium | Easy | None |

## Content Updates

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Add unique product descriptions | Store an approved description and intended-use summary for each product. | `data/products.json`, product pages, sharing | More useful product pages and stronger search/share text. | High | Complex | Product expertise |
| Clarify custom versus ready stock | Standardize `Made to Order`, `Ready Stock`, `Customizable`, and lead-time language. | Cards, product pages, FAQ, custom section | Visitors immediately understand ordering status. | Medium | Easy | Approved wording |
| Add policy effective dates and business identity | State policy effective date, responsible business contact, and jurisdiction where appropriate. | Shipping/legal/privacy content | More professional and accountable policies. | Medium | Moderate | Legal/business review |

## SEO and Accessibility Updates

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Server-render product metadata | Render title, canonical, Open Graph, and Product schema from the requested ID. | Future dynamic product route | Reliable indexing and social previews without crawler workarounds. | High | Complex | Dynamic platform |
| Use semantic card links | Replace generic role-link cards with anchors and separate Share buttons. | Featured and Full Collection cards | Better keyboard, browser, and screen-reader behavior. | Medium | Moderate | Card markup refactor |
| Add skip navigation and main landmark | Add a focus-visible skip link and one `main` container. | Homepage | Faster keyboard navigation and clearer landmarks. | Medium | Easy | None |
| Complete FAQ relationships | Add panel IDs, `aria-controls`, and `aria-labelledby`. | FAQ | Accordion state and ownership are announced correctly. | Medium | Easy | None |
| Trap mobile menu focus | Keep keyboard focus inside the open mobile navigation and restore it on close. | Mobile navigation | Dialog behavior matches its ARIA role. | Medium | Moderate | Shared dialog helper |

## Performance Improvements

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Build responsive images | Generate AVIF/WebP files at 640, 960, 1440, and 2200 widths. | All images | Substantially lower mobile transfer and improved LCP. | High | Complex | Image pipeline |
| Defer hero slides | Load the first hero image eagerly and later slides near their display time. | Hero slideshow | Faster first render and reduced initial bandwidth. | High | Moderate | Responsive images |
| Reduce inactive frontend payload | Remove hidden Masterpieces and disabled Quick View code when not needed. | HTML, CSS, JS | Smaller files and less parsing/execution. | Medium | Moderate | Product decision |
| Audit runtime work | Pause offscreen autoplay/animation and avoid redundant listeners. | Hero, canvas, testimonials, observers | Lower CPU and battery use. | Medium | Moderate | Performance measurements |

## Security Improvements

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Configure browser security headers | Add CSP, MIME sniffing protection, referrer policy, framing policy, and permissions policy. | `vercel.json` | Reduced injection, framing, and unnecessary capability exposure. | Medium | Moderate | Third-party origin inventory |
| Restrict form integrations | Apply Web3Forms domain restrictions and monitor Web3Forms/Brevo abuse. | Contact/newsletter integrations | Reduced spam and unauthorized endpoint use. | Medium | Easy | Provider dashboard access |
| Review dynamic HTML boundaries | Ensure all product/admin-supplied fields are escaped before `innerHTML`. | Catalog, modals, product page, API | Safer future CMS or dynamic-data adoption. | Medium | Moderate | Data-flow inventory |

## Code Cleanup and Maintainability

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Split homepage JavaScript | Move hero, catalog, inquiry, gallery, forms, navigation, and carousel into modules. | `script.js` | Clear feature ownership and smaller regression surface. | Medium | Complex | Regression tests |
| Split CSS by responsibility | Separate base, components, sections, dialogs, utilities, and responsive rules. | `style.css`, `product.css` | Easier maintenance and fewer conflicting media rules. | Medium | Complex | Visual regression checks |
| Remove inline handlers/styles | Replace `onclick`, `oninput`, `onchange`, and modal inline styling with classes/listeners. | `index.html`, `script.js`, CSS | Cleaner markup and stronger CSP compatibility. | Medium | Complex | JS/CSS modularization |
| Share inquiry/dialog logic | Reuse one implementation between homepage and product pages. | `script.js`, `product-page.js`, `inquiry-list.js` | Consistent behavior and fewer duplicate fixes. | Medium | Complex | Module architecture |
| Update project documentation | Correct rewrite, form, sharing, QR dependency, and URL guidance. | README and docs | Documentation matches production behavior. | Low | Easy | Complete after refactors |

## Optional Future Features

| Task | Description | Affected area | Expected result | Priority | Difficulty | Dependencies |
|---|---|---|---|---|---|---|
| Inquiry reference IDs | Generate a customer-visible reference when an inquiry is prepared or sent. | Inquiry List/contact workflow | Easier follow-up for customer and business. | Low | Moderate | Operational process |
| Downloadable inquiry summary | Export the configured list as a printable document or image. | Inquiry List | Easier offline review and sending. | Low | Moderate | Document design |
| Consent-based analytics | Track catalog views, product opens, shares, inquiry additions, and successful submissions. | Entire site | Measurable conversion funnel. | Low | Moderate | Privacy/analytics decision |
| Product availability management | Add an administrative source for current stock and timestamps. | Future dynamic platform | More trustworthy ready-stock status. | Medium | Complex | Backend/CMS |


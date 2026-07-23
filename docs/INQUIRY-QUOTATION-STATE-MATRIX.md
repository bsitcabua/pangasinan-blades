# Inquiry and Quotation State Matrix

Updated: 2026-07-22

This checklist covers the customer-facing states shared by the homepage and
product-page quotation workflows. Automated data checks are supplemented by
manual browser checks because clipboard, email-client, popup, focus, and visual
behavior depend on the browser environment.

## Functional States

| State | Homepage | Product page | Expected result | Verification |
|---|---|---|---|---|
| Empty list | Required | Required | Quote actions are disabled and an empty-state message is visible. | Code and project validation passed |
| Add item | Required | Required | Item appears, count updates, and `localStorage` is updated. | Shared-store automated check passed |
| Duplicate add | Required | Required | Styled confirmation dialog appears; Cancel changes nothing; Continue merges quantity. | Code and shared-store automated check passed |
| Edit item | Required | Required | Display switches to editor; Copy and Request a Quote are disabled until saved. | Code validation passed; manual interaction required |
| Duplicate after edit | Required | Required | Styled confirmation dialog appears; no native browser confirmation is used. | Code validation passed; manual interaction required |
| Remove item | Required | Required | Styled confirmation dialog appears and removes only after confirmation. | Code validation passed; manual interaction required |
| Clear list | Required | Required | Styled confirmation dialog appears; confirmation clears items and edit state. | Code validation passed; manual interaction required |
| Quantity minimum | Required | Required | Quantity never falls below one. | Shared-store automated check passed |
| Refresh persistence | Required | Required | Blade list remains after refresh; customer details remain only in the current tab session. | Shared-store automated check passed; manual refresh required |
| Copy success | Required | Required | Quote text is copied, button temporarily says `Copied!`, and success dialog opens. | Manual secure-context test required |
| Copy failure | Required | Required | Copy-specific error is announced without changing Email or Messenger status. | Code validation passed; manual failure simulation required |
| Messenger blocked | Required | Required | Messenger-specific popup message appears. | Manual popup-blocking test required |
| Messenger copy failure | Required | Required | Messenger-specific copy guidance appears. | Manual clipboard-denial test required |
| Email empty state | Required | Required | Email-specific empty-list message appears and no email client opens. | Code validation passed; manual interaction required |
| Contact validation | Required | N/A | Required fields and email format are reported before submission. | Browser validation present; manual interaction required |
| Form loading | Required | N/A | Button is disabled and displays `Sending Quote Request...`. | Code validation passed; manual network test required |
| Form success | Required | N/A | Success message appears, form resets, and session customer data is cleared. | Code validation passed; live Web3Forms test required |
| Form failure | Required | N/A | Error message appears and the submit button is restored. | Code validation passed; manual failure simulation required |

## Viewport and Browser Pass

Run the manual states above at the following targets before release:

| Target | Width | Status |
|---|---:|---|
| Small mobile | 320px | Pending manual QA |
| Common mobile | 360px | Pending manual QA |
| Large mobile | 390px | Pending manual QA |
| Tablet | 768px | Pending manual QA |
| Desktop | 1024px | Pending manual QA |
| Wide desktop | 1440px | Pending manual QA |
| Brave desktop | Current supported version | Pending manual QA |
| Brave mobile | Current supported version | Pending manual QA |

For every manual pass, verify that dialog headers and close buttons remain
visible, focus returns to the opening control, Escape closes the expected
dialog, no horizontal scrolling appears, and channel-specific status messages
do not overwrite one another.

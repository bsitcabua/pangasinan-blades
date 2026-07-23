(function initializeProductPage() {
  'use strict';

  const store = window.PangasinanInquiry;
  const products = Array.isArray(window.PANGASINAN_PRODUCTS) ? window.PANGASINAN_PRODUCTS : [];
  const productId = Number(new URLSearchParams(window.location.search).get('id'));
  const product = products.find(candidate => Number(candidate.id) === productId);
  if (!store || !product) {
    document.querySelector('main')?.replaceChildren(Object.assign(document.createElement('p'), {
      className: 'product-load-error',
      textContent: 'This blade could not be found. Return to the collection to choose another product.',
    }));
    return;
  }
  const hardnessBySteel = {
    '5160 Carbon Steel': '57-60 HRC',
    '304 Stainless Steel': '15-20 HRC (approximately 70-90 HRB)',
  };
  const inquiryOptions = {
    steel: ['5160 Carbon Steel', '304 Stainless Steel'],
    handle: ['Kamagong', 'Mahogany', 'Chico Wood', 'Carabao Horn', 'Buffalo Horn'],
    sheath: ['Mahogany', 'Chico Wood', 'Kamagong (With additional cost)', 'Kydex (With additional cost)'],
    finish: ['Standard Satin', 'Mirror Polish', 'Blackened Finish', 'Discuss With Bladesmith'],
    intendedUse: ['Collection / Display', 'Outdoor / Utility', 'Martial Arts Practice', 'Culinary Use', 'Other'],
  };
  let items = store.load();
  let pendingDuplicate = null;
  let pendingRemoveKey = null;
  let editingInquiryKey = null;
  let activeDialog = null;
  let returnFocus = null;

  const inquiryModal = document.getElementById('productInquiryModal');
  const duplicateModal = document.getElementById('productDuplicateModal');
  const removeModal = document.getElementById('productRemoveModal');
  const clearModal = document.getElementById('productClearModal');
  const copySuccessModal = document.getElementById('productCopySuccessModal');

  function getCustomer() {
    return store.loadCustomer?.() || {};
  }

  function populateCustomerControls(customer = getCustomer()) {
    document.querySelectorAll('[data-inquiry-customer-field]').forEach(control => {
      const value = customer[control.dataset.inquiryCustomerField] || '';
      if (control.value !== value) control.value = value;
    });
  }

  function saveCustomerControls() {
    if (!store.saveCustomer) return {};
    const customer = getCustomer();
    document.querySelectorAll('[data-inquiry-customer-field]').forEach(control => {
      customer[control.dataset.inquiryCustomerField] = control.value;
    });
    return store.saveCustomer(customer);
  }

  function quotationText(options = {}) {
    return store.quotation
      ? store.quotation(items, { customer: getCustomer(), ...options })
      : store.message(items);
  }

  function setChannelStatus(selector, message = '') {
    const status = document.querySelector(selector);
    if (!status) return;
    status.textContent = message;
    status.hidden = !message;
  }

  function assetPath(value = '') {
    if (!value || /^(?:https?:|data:|\/|\.\.\/|\.\/)/.test(value)) return value;
    return `../${value}`;
  }

  function productDescription(item) {
    return `${item.name} from the ${item.series}. Configure blade length, steel, handle, and scabbard materials for a made-to-order inquiry.`;
  }

  function orderingNote(item) {
    return item.status === 'ready-stock'
      ? 'A finished piece may be available. Request a quotation so we can confirm current stock; custom specifications can also be requested.'
      : 'Made after your specifications are confirmed. Final price and production timing are provided with your quotation.';
  }

  function setMeta(selector, attribute, value) {
    let element = document.head.querySelector(selector);
    if (!element) {
      element = document.createElement(attribute === 'href' ? 'link' : 'meta');
      if (selector.includes('canonical')) element.rel = 'canonical';
      else if (selector.includes('property=')) element.setAttribute('property', selector.match(/property="([^"]+)/)?.[1] || '');
      else element.name = selector.match(/name="([^"]+)/)?.[1] || '';
      document.head.appendChild(element);
    }
    element.setAttribute(attribute, value);
  }

  function renderProduct() {
    const details = product.details || {};
    const description = productDescription(product);
    const image = assetPath(product.image);
    document.title = `${product.name} | Pangasinan Blades`;
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelectorAll('[data-product-name]').forEach(element => { element.textContent = product.name; });
    document.querySelector('[data-product-series]').textContent = product.series;
    document.querySelector('[data-product-description]').textContent = description;
    document.querySelector('[data-product-ordering-note]').textContent = orderingNote(product);
    const productImage = document.querySelector('[data-product-image]');
    productImage.src = image;
    productImage.alt = product.name;
    productImage.addEventListener('error', () => {
      productImage.hidden = true;
      productImage.parentElement?.classList.add('product-image-unavailable');
      productImage.parentElement?.setAttribute('data-image-label', `${product.name} image unavailable`);
    }, { once: true });
    const availability = product.status === 'ready-stock' ? 'Check Availability' : 'Made to Order';
    const statusClass = product.status === 'ready-stock' ? 'is-ready' : 'is-made';
    document.querySelector('[data-product-statuses]').innerHTML = `<span class="product-status ${statusClass}"><i aria-hidden="true"></i>${availability}</span><span class="product-status is-custom"><i aria-hidden="true"></i>Custom Orders Welcome</span>`;
    ['steel', 'bladeLength', 'handle', 'sheath'].forEach(name => {
      const control = document.querySelector(`[data-product-field="${name}"]`);
      if (control && details[name]) control.value = details[name];
    });
    document.querySelector('[data-product-field="hardness"]').textContent = details.hardness || hardnessBySteel[details.steel] || 'Confirm with maker';

    const canonical = `https://www.pangasinanblades.com/collection/?id=${product.id}`;
    const absoluteImage = `https://www.pangasinanblades.com/${product.image.replace(/^\//, '')}`;
    setMeta('link[rel="canonical"]', 'href', canonical);
    setMeta('meta[property="og:title"]', 'content', `${product.name} | Pangasinan Blades`);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', absoluteImage);

    const related = products.filter(candidate => candidate.category === product.category && candidate.id !== product.id).slice(0, 3);
    document.querySelector('[data-related-products]').innerHTML = related.map(candidate => `<article class="product-related-card"><a href="index.html?id=${candidate.id}"><img src="${escapeHtml(assetPath(candidate.image))}" width="3664" height="2691" loading="lazy" decoding="async" alt="${escapeHtml(candidate.name)}"><span>${escapeHtml(candidate.series)}</span><h3>${escapeHtml(candidate.name)}</h3><span class="product-related-link">View Full Details &rarr;</span></a></article>`).join('');

    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'Product', name: product.name, image: [absoluteImage], description, category: product.series, brand: { '@type': 'Brand', name: 'Pangasinan Blades' }, material: details.steel });
    document.head.appendChild(schema);
  }

  function escapeHtml(value = '') {
    return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#039;');
  }

  function inquirySpecsMarkup(selection = {}, quantity) {
    const specs = [
      ['Blade Length', selection.bladeLength],
      ['Blade Material', selection.steel],
      ['Hardness', selection.hardness],
      ['Handle', selection.handle],
      ['Scabbard', selection.sheath],
      ['Finish', selection.finish],
      ['Intended Use', selection.intendedUse],
      ['Additional Notes', selection.customization],
      ['Quantity', quantity],
    ].filter(([, value]) => String(value || '').trim());
    return `<dl class="inquiry-specs">${specs.map(([label, value]) => `<div><dt>${escapeHtml(label)}</dt><dd>${escapeHtml(value)}</dd></div>`).join('')}</dl>`;
  }

  function optionsMarkup(options, selectedValue) {
    const values = options.includes(selectedValue) ? options : [selectedValue, ...options].filter(Boolean);
    return values.map(value => `<option value="${escapeHtml(value)}"${value === selectedValue ? ' selected' : ''}>${escapeHtml(value)}</option>`).join('');
  }

  function inquiryEditorMarkup(item) {
    const selection = item.selection || {};
    const hardness = hardnessBySteel[selection.steel] || selection.hardness || 'Confirm with maker';
    return `<div class="inquiry-item-editor" data-edit-item="${encodeURIComponent(item.key)}">
      <label><span>Blade Length</span><input data-edit-field="bladeLength" type="text" value="${escapeHtml(selection.bladeLength)}"></label>
      <label><span>Blade Material</span><select data-edit-field="steel">${optionsMarkup(inquiryOptions.steel, selection.steel || inquiryOptions.steel[0])}</select></label>
      <label><span>Hardness</span><output data-edit-field="hardness">${escapeHtml(hardness)}</output></label>
      <label><span>Handle</span><select data-edit-field="handle">${optionsMarkup(inquiryOptions.handle, selection.handle || inquiryOptions.handle[0])}</select></label>
      <label><span>Scabbard</span><select data-edit-field="sheath">${optionsMarkup(inquiryOptions.sheath, selection.sheath || inquiryOptions.sheath[0])}</select></label>
      <label><span>Finish</span><select data-edit-field="finish">${optionsMarkup(inquiryOptions.finish, selection.finish || inquiryOptions.finish[0])}</select></label>
      <label><span>Intended Use</span><select data-edit-field="intendedUse">${optionsMarkup(inquiryOptions.intendedUse, selection.intendedUse || inquiryOptions.intendedUse[0])}</select></label>
      <label><span>Quantity</span><input data-edit-field="quantity" type="number" min="1" value="${Math.max(1, Number(item.quantity) || 1)}"></label>
      <label class="inquiry-editor-wide"><span>Additional Notes</span><textarea data-edit-field="customization" maxlength="500" rows="3" placeholder="Add other preferences, questions, or information for the workshop">${escapeHtml(selection.customization)}</textarea></label>
    </div>`;
  }

  renderProduct();

  function initializeProductZoom() {
    const media = document.querySelector('.product-media');
    const sourceImage = document.querySelector('[data-product-image]');
    const lens = document.querySelector('.product-zoom-lens');
    const preview = document.querySelector('[data-product-zoom-preview]');
    const zoomImage = document.querySelector('[data-product-zoom-image]');
    const zoomScale = 3.5;
    const gap = 16;
    const viewportGap = 12;

    if (!media || !sourceImage || !lens || !preview || !zoomImage) return;
    zoomImage.src = sourceImage.src;
    zoomImage.alt = '';

    function hideZoom() {
      media.classList.remove('is-zooming');
      preview.classList.remove('is-visible');
    }

    function placement(mediaRect) {
      const rightSpace = window.innerWidth - mediaRect.right - gap - viewportGap;
      const leftSpace = mediaRect.left - gap - viewportGap;
      const useRight = rightSpace >= 320 || rightSpace >= leftSpace;
      const available = useRight ? rightSpace : leftSpace;
      const size = Math.min(600, available, window.innerHeight - viewportGap * 2);
      if (size < 320) return null;
      return {
        size,
        left: useRight ? mediaRect.right + gap : mediaRect.left - gap - size,
        top: Math.max(viewportGap, Math.min(mediaRect.top, window.innerHeight - size - viewportGap)),
      };
    }

    media.addEventListener('pointermove', event => {
      if (window.matchMedia('(max-width: 900px), (hover: none), (pointer: coarse)').matches) return hideZoom();
      const mediaRect = media.getBoundingClientRect();
      const imageRect = sourceImage.getBoundingClientRect();
      const target = placement(mediaRect);
      const insideImage = event.clientX >= imageRect.left && event.clientX <= imageRect.right
        && event.clientY >= imageRect.top && event.clientY <= imageRect.bottom;
      if (!target || !insideImage) return hideZoom();

      const x = event.clientX - imageRect.left;
      const y = event.clientY - imageRect.top;
      const lensWidth = Math.min(imageRect.width, target.size / zoomScale);
      const lensHeight = Math.min(imageRect.height, target.size / zoomScale);
      const imageLeftInMedia = imageRect.left - mediaRect.left;
      const imageTopInMedia = imageRect.top - mediaRect.top;
      const lensLeft = imageLeftInMedia + Math.min(imageRect.width - lensWidth, Math.max(0, x - lensWidth / 2));
      const lensTop = imageTopInMedia + Math.min(imageRect.height - lensHeight, Math.max(0, y - lensHeight / 2));

      lens.style.width = `${lensWidth}px`;
      lens.style.height = `${lensHeight}px`;
      lens.style.left = `${lensLeft}px`;
      lens.style.top = `${lensTop}px`;
      preview.style.width = `${target.size}px`;
      preview.style.height = `${target.size}px`;
      preview.style.left = `${target.left}px`;
      preview.style.top = `${target.top}px`;
      zoomImage.style.width = `${imageRect.width}px`;
      zoomImage.style.height = `${imageRect.height}px`;
      zoomImage.style.transform = `translate(${target.size / 2 - x * zoomScale}px, ${target.size / 2 - y * zoomScale}px) scale(${zoomScale})`;
      media.classList.add('is-zooming');
      preview.classList.add('is-visible');
    });

    media.addEventListener('pointerleave', hideZoom);
    media.addEventListener('pointercancel', hideZoom);
    window.addEventListener('scroll', hideZoom, { passive: true });
    window.addEventListener('resize', hideZoom);
  }

  initializeProductZoom();

  function field(name) {
    const control = document.querySelector(`[data-product-field="${name}"]`);
    return control ? control.value || control.textContent.trim() : '';
  }

  function selectedBuild() {
    return {
      steel: field('steel'),
      bladeLength: field('bladeLength'),
      hardness: field('hardness'),
      handle: field('handle'),
      sheath: field('sheath'),
      finish: field('finish'),
      intendedUse: field('intendedUse'),
      customization: field('customization'),
    };
  }

  function selectedQuantity() {
    return Math.max(1, Number(field('quantity')) || 1);
  }

  function currentItem() {
    return {
      id: product.id,
      name: product.name,
      image: product.image,
      series: product.series,
      status: product.status,
      selection: selectedBuild(),
      quantity: selectedQuantity(),
    };
  }

  function updateBadges() {
    const count = store.count(items);
    document.querySelectorAll('[data-inquiry-count]').forEach(badge => {
      badge.textContent = count ? String(count) : '';
      badge.hidden = count === 0;
    });
  }

  function focusable(dialog) {
    return Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
  }

  function openDialog(dialog) {
    if (!dialog) return;
    returnFocus = document.activeElement;
    activeDialog = dialog;
    dialog.classList.add('open');
    document.body.style.overflow = 'hidden';
    focusable(dialog)[0]?.focus();
  }

  function closeDialog(dialog) {
    if (!dialog) return;
    dialog.classList.remove('open');
    const remainingDialog = document.querySelector('.inquiry-list-modal.open, .duplicate-inquiry-modal.open');
    if (activeDialog === dialog) activeDialog = remainingDialog;
    if (!remainingDialog) document.body.style.overflow = '';
    returnFocus?.focus?.();
  }

  function imagePath(value) {
    if (!value || /^(?:https?:|data:)/.test(value)) return value;
    const normalized = value.replace(/^(?:\.\.\/)+/, '').replace(/^\.\//, '').replace(/^\//, '');
    return window.location.protocol === 'file:' ? `../${normalized}` : `/${normalized}`;
  }

  function renderInquiryList() {
    items = store.load();
    if (!items.length) editingInquiryKey = null;
    updateBadges();
    const body = document.querySelector('[data-inquiry-body]');
    const controls = document.querySelectorAll('[data-copy-inquiry], [data-clear-inquiry], [data-send-inquiry]');
    controls.forEach(control => {
      const requiresSavedEdit = control.matches('[data-copy-inquiry], [data-send-inquiry]');
      const blockedByEdit = requiresSavedEdit && Boolean(editingInquiryKey);
      control.disabled = items.length === 0 || blockedByEdit;
      control.toggleAttribute('data-tooltip-active', blockedByEdit);
      if (blockedByEdit) {
        const message = 'Save your item changes before copying or requesting a quote.';
        control.dataset.tooltip = message;
        control.title = message;
        control.setAttribute('aria-label', `${control.textContent.trim()}. ${message}`);
      } else {
        delete control.dataset.tooltip;
        control.removeAttribute('title');
        control.removeAttribute('aria-label');
      }
    });
    if (!body) return;
    if (!items.length) {
      body.innerHTML = '<div class="inquiry-list-empty"><strong>No blades added yet.</strong><span>Configure a blade and add it to begin your inquiry.</span></div>';
      return;
    }
    body.innerHTML = items.map(item => `<article class="inquiry-list-item"><div class="inquiry-list-thumb">${item.image ? `<img class="product-inquiry-image" src="${escapeHtml(imagePath(item.image))}" alt="${escapeHtml(item.name)}">` : ''}</div><div class="inquiry-list-info"><div class="inquiry-list-item-head"><span class="inquiry-list-series">${escapeHtml(item.series)}</span><div class="inquiry-item-actions"><button type="button" class="inquiry-edit-toggle${editingInquiryKey === item.key ? ' is-active' : ''}" data-edit-toggle="${encodeURIComponent(item.key)}" aria-expanded="${editingInquiryKey === item.key}" aria-label="${editingInquiryKey === item.key ? 'Save' : 'Edit'} specifications for ${escapeHtml(item.name)}" title="${editingInquiryKey === item.key ? 'Save changes' : 'Edit specifications'}"><span aria-hidden="true">${editingInquiryKey === item.key ? '&#10003;' : '&#9998;'}</span></button><button type="button" class="inquiry-list-remove" data-remove-item="${encodeURIComponent(item.key)}" aria-label="Remove ${escapeHtml(item.name)} from inquiry list" title="Remove item"><span aria-hidden="true">&times;</span></button></div></div><h3>${escapeHtml(item.name)}</h3><div ${editingInquiryKey === item.key ? 'hidden' : ''}>${inquirySpecsMarkup(item.selection, Math.max(1, Number(item.quantity) || 1))}</div><div ${editingInquiryKey === item.key ? '' : 'hidden'}>${inquiryEditorMarkup(item)}</div></div></article>`).join('');
  }

  function addCurrent(mode) {
    const result = store.add(items, currentItem());
    if (result.duplicateIndex >= 0) {
      pendingDuplicate = { type: 'add', item: result.item, index: result.duplicateIndex, mode };
      const existing = items[result.duplicateIndex];
      document.querySelector('[data-duplicate-body]').innerHTML = `<strong>${escapeHtml(result.item.name)}</strong><span>Existing quantity: ${existing.quantity}</span><span>Selected quantity: ${result.item.quantity}</span><span>Continue to combine these matching specifications.</span>`;
      openDialog(duplicateModal);
      return;
    }
    items = result.items;
    updateBadges();
    if (mode === 'inquire') return goToContact();
    renderInquiryList();
    openDialog(inquiryModal);
  }

  function goToContact() {
    const message = quotationText({ includeCustomer: false, includeGreeting: false, includeClosing: false });
    sessionStorage.setItem('pangasinanBladesContactPrefill', message);
    window.location.href = window.location.protocol === 'file:' ? '../index.html#contact' : '/#contact';
  }

  async function copyList() {
    if (!items.length) return;
    const button = document.querySelector('[data-copy-inquiry]');
    const errorMessage = document.querySelector('[data-copy-error]');
    const inquiryText = quotationText();
    if (errorMessage) errorMessage.hidden = true;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(inquiryText);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = inquiryText;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        if (!copied) throw new Error('Fallback copy command failed');
      }
      if (button) button.textContent = 'Copied!';
      setChannelStatus('[data-messenger-status]');
      setChannelStatus('[data-email-status]');
      openDialog(copySuccessModal);
    } catch (error) {
      if (button) button.textContent = 'Copy Failed';
      if (errorMessage) errorMessage.hidden = false;
    }
    window.clearTimeout(copyList.timer);
    copyList.timer = window.setTimeout(() => {
      if (button) button.textContent = 'Copy Quote Request';
    }, 2500);
  }

  document.querySelector('[data-product-field="steel"]')?.addEventListener('change', event => {
    const hardness = document.querySelector('[data-product-field="hardness"]');
    if (hardness) hardness.textContent = hardnessBySteel[event.target.value] || 'Confirm with maker';
  });

  document.querySelectorAll('[data-quantity-step]').forEach(button => button.addEventListener('click', () => {
    const input = document.querySelector('[data-product-field="quantity"]');
    input.value = Math.max(1, (Number(input.value) || 1) + Number(button.dataset.quantityStep));
  }));
  document.querySelector('[data-product-field="quantity"]')?.addEventListener('change', event => { event.target.value = Math.max(1, Number(event.target.value) || 1); });
  document.querySelector('[data-add-inquiry]')?.addEventListener('click', () => addCurrent('list'));
  document.querySelector('[data-inquire-now]')?.addEventListener('click', () => addCurrent('inquire'));
  document.querySelectorAll('[data-open-inquiry]').forEach(button => button.addEventListener('click', () => { renderInquiryList(); openDialog(inquiryModal); }));
  document.querySelectorAll('[data-close-inquiry]').forEach(button => button.addEventListener('click', () => closeDialog(inquiryModal)));
  document.querySelectorAll('[data-cancel-duplicate]').forEach(button => button.addEventListener('click', () => { pendingDuplicate = null; closeDialog(duplicateModal); }));
  document.querySelector('[data-confirm-duplicate]')?.addEventListener('click', () => {
    if (!pendingDuplicate) return;
    if (pendingDuplicate.type === 'edit') {
      const sourceIndex = items.findIndex(item => item.key === pendingDuplicate.sourceKey);
      const targetIndex = items.findIndex(item => item.key === pendingDuplicate.targetKey);
      if (sourceIndex >= 0 && targetIndex >= 0) {
        items[targetIndex].quantity = (Number(items[targetIndex].quantity) || 1) + pendingDuplicate.item.quantity;
        items.splice(sourceIndex, 1);
        items = store.save(items);
      }
      editingInquiryKey = null;
      pendingDuplicate = null;
      closeDialog(duplicateModal);
      renderInquiryList();
      return;
    }
    const mode = pendingDuplicate.mode;
    items = store.merge(items, pendingDuplicate.index, pendingDuplicate.item.quantity);
    pendingDuplicate = null;
    closeDialog(duplicateModal);
    updateBadges();
    if (mode === 'inquire') goToContact(); else { renderInquiryList(); openDialog(inquiryModal); }
  });
  document.querySelector('[data-copy-inquiry]')?.addEventListener('click', copyList);
  document.querySelectorAll('[data-close-copy-success]').forEach(control => control.addEventListener('click', () => {
    closeDialog(copySuccessModal);
    setChannelStatus('[data-messenger-status]');
    setChannelStatus('[data-email-status]');
    window.setTimeout(() => document.querySelector('[data-copy-inquiry]')?.focus(), 0);
  }));
  document.querySelector('[data-send-copy-email]')?.addEventListener('click', () => {
    items = store.load();
    const messages = store.STATUS_MESSAGES || {};
    if (!items.length) {
      setChannelStatus('[data-email-status]', messages.empty || 'Your Inquiry List is empty. Add at least one blade before continuing.');
      return;
    }
    setChannelStatus('[data-email-status]');
    const subject = 'Pangasinan Blades Product Inquiry';
    const body = quotationText();
    window.location.href = `mailto:inquire@pangasinanblades.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  });
  document.querySelector('[data-send-copy-messenger]')?.addEventListener('click', async event => {
    items = store.load();
    const messages = store.STATUS_MESSAGES || {};
    if (!items.length) {
      setChannelStatus('[data-messenger-status]', messages.empty || 'Your Inquiry List is empty. Add at least one blade before continuing.');
      return;
    }
    setChannelStatus('[data-messenger-status]');
    const button = event.currentTarget;
    const label = button.querySelector('span:last-child');
    const originalLabel = label?.textContent || 'Send via Messenger';
    if (label) label.textContent = 'Opening Messenger...';
    const messengerWindow = window.open('https://m.me/emcpangasinanblades', '_blank');
    if (!messengerWindow) {
      setChannelStatus('[data-messenger-status]', messages.messengerBlocked || 'Unable to open Messenger. Please allow pop-ups and try again.');
      if (label) label.textContent = originalLabel;
      return;
    }
    messengerWindow.opener = null;
    try {
      const message = quotationText();
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(message);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = message;
        textarea.setAttribute('readonly', '');
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        document.body.appendChild(textarea);
        textarea.select();
        const copied = document.execCommand('copy');
        textarea.remove();
        if (!copied) throw new Error('Fallback copy command failed');
      }
    } catch (error) {
      setChannelStatus('[data-messenger-status]', messages.messengerCopyFailed || 'Messenger opened, but the quote request could not be copied. Please copy it manually.');
    } finally {
      if (label) label.textContent = originalLabel;
    }
  });
  document.querySelector('[data-clear-inquiry]')?.addEventListener('click', () => {
    if (items.length) openDialog(clearModal);
  });
  document.querySelector('[data-send-inquiry]')?.addEventListener('click', goToContact);
  function saveInquiryEditor(editor) {
    if (!editor) return false;
    const originalKey = decodeURIComponent(editor.dataset.editItem);
    const itemIndex = items.findIndex(item => item.key === originalKey);
    if (itemIndex < 0) return false;
    const read = name => {
      const control = editor.querySelector(`[data-edit-field="${name}"]`);
      return control ? String(control.value || control.textContent || '').trim() : '';
    };
    const steel = read('steel');
    const hardness = hardnessBySteel[steel] || read('hardness') || 'Confirm with maker';
    const candidate = store.prepare({
      ...items[itemIndex],
      key: '',
      selection: {
        ...items[itemIndex].selection,
        steel,
        hardness,
        bladeLength: read('bladeLength'),
        handle: read('handle'),
        sheath: read('sheath'),
        finish: read('finish'),
        intendedUse: read('intendedUse'),
        customization: read('customization'),
      },
      quantity: Math.max(1, Number(read('quantity')) || 1),
    });
    const duplicateIndex = items.findIndex((item, index) => index !== itemIndex && store.createKey(item) === candidate.key);
    if (duplicateIndex >= 0) {
      const existing = items[duplicateIndex];
      pendingDuplicate = {
        type: 'edit',
        item: candidate,
        sourceKey: originalKey,
        targetKey: existing.key,
      };
      const duplicateBody = document.querySelector('[data-duplicate-body]');
      if (!duplicateBody) return false;
      duplicateBody.innerHTML = `<strong>${escapeHtml(candidate.name)}</strong><span>Matching specifications already exist.</span><span>Existing quantity: ${Number(existing.quantity) || 1}</span><span>Edited quantity: ${candidate.quantity}</span><span>Continue to merge both entries.</span>`;
      openDialog(duplicateModal);
      return false;
    }
    items[itemIndex] = candidate;
    editingInquiryKey = candidate.key;
    items = store.save(items);
    return true;
  }

  document.querySelector('[data-inquiry-body]')?.addEventListener('change', event => {
    if (event.target.dataset.editField !== 'steel') return;
    const editor = event.target.closest('[data-edit-item]');
    const output = editor?.querySelector('[data-edit-field="hardness"]');
    if (output) output.textContent = hardnessBySteel[event.target.value] || 'Confirm with maker';
  });
  document.querySelectorAll('[data-inquiry-customer-field]').forEach(control => {
    control.addEventListener('input', saveCustomerControls);
  });
  document.querySelector('[data-inquiry-body]')?.addEventListener('click', event => {
    const editButton = event.target.closest('[data-edit-toggle]');
    if (editButton) {
      const key = decodeURIComponent(editButton.dataset.editToggle);
      if (editingInquiryKey === key) {
        const editor = Array.from(document.querySelectorAll('[data-edit-item]')).find(element => decodeURIComponent(element.dataset.editItem) === key);
        if (saveInquiryEditor(editor)) editingInquiryKey = null;
      } else {
        editingInquiryKey = key;
      }
      renderInquiryList();
      if (editingInquiryKey) {
        const editor = Array.from(document.querySelectorAll('[data-edit-item]')).find(element => decodeURIComponent(element.dataset.editItem) === editingInquiryKey);
        editor?.querySelector('select, input, textarea')?.focus();
      }
      return;
    }
    const button = event.target.closest('[data-remove-item]');
    if (!button) return;
    const key = decodeURIComponent(button.dataset.removeItem);
    const item = items.find(entry => entry.key === key);
    const body = document.querySelector('[data-remove-body]');
    if (!item || !body) return;
    pendingRemoveKey = key;
    body.innerHTML = `<strong>${escapeHtml(item.name)}</strong><span>This blade and its selected specifications will be removed from your Inquiry List.</span>`;
    openDialog(removeModal);
  });
  document.querySelectorAll('[data-cancel-remove]').forEach(button => button.addEventListener('click', () => {
    pendingRemoveKey = null;
    closeDialog(removeModal);
  }));
  document.querySelector('[data-confirm-remove]')?.addEventListener('click', () => {
    if (!pendingRemoveKey) return;
    if (editingInquiryKey === pendingRemoveKey) editingInquiryKey = null;
    items = store.remove(items, pendingRemoveKey);
    pendingRemoveKey = null;
    closeDialog(removeModal);
    renderInquiryList();
  });
  document.querySelectorAll('[data-cancel-clear]').forEach(button => button.addEventListener('click', () => closeDialog(clearModal)));
  document.querySelector('[data-confirm-clear]')?.addEventListener('click', () => {
    items = store.save([]);
    editingInquiryKey = null;
    pendingDuplicate = null;
    pendingRemoveKey = null;
    closeDialog(clearModal);
    renderInquiryList();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && activeDialog) closeDialog(activeDialog);
    if (event.key !== 'Tab' || !activeDialog) return;
    const controls = focusable(activeDialog);
    if (!controls.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });

  populateCustomerControls();
  updateBadges();
})();

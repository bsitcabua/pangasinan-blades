/* ============================================================
   HERO IMAGE SLIDESHOW — assets/images/header/
   ============================================================
   Put your hero images inside:  assets/images/header/
   Then list the filenames below (in the order you want them
   to appear). Any common web image format works (.jpg, .png,
   .webp, etc). Add or remove lines as needed — 2 or more images
   will crossfade automatically; 1 image just displays statically.
   ============================================================ */
const HERO_SLIDES = [
  {
    image: 'assets/images/header/regular_ginunting.webp',
    name: 'Regular Ginunting',
    description: 'A traditional Filipino utility and fighting blade known for its balanced curved profile.'
  },
  {
    image: 'assets/images/header/tactical_ginunting.webp',
    name: 'Tactical Ginunting',
    description: 'A modern interpretation of the classic Ginunting, built for outdoor, tactical, and field use.'
  },
  {
    image: 'assets/images/header/modern_andres_bolo.webp',
    name: 'Modern Andres Bolo',
    description: 'A contemporary bolo designed for powerful cutting, bushcraft, and everyday utility.'
  },
  {
    image: 'assets/images/header/military_bolo.webp',
    name: 'Military Bolo',
    description: 'Inspired by service blades used for survival, clearing vegetation, and field work.'
  },
  {
    image: 'assets/images/header/itak_tagalog.webp',
    name: 'Itak Tagalog',
    description: 'A classic Tagalog blade valued for its versatility in farming, utility, and traditional use.'
  },
  {
    image: 'assets/images/header/itak_tinegre.webp',
    name: 'Itak Tinegre',
    description: 'A robust Filipino blade featuring a distinctive profile for powerful chopping performance.'
  },
  {
    image: 'assets/images/header/garab.webp',
    name: 'Garab',
    description: 'A traditional harvesting blade with a curved edge designed for efficient cutting.'
  },
  {
    image: 'assets/images/header/dahon_palay.webp',
    name: 'Dahon Palay',
    description: 'Named after the shape of a rice leaf, featuring an elegant profile and excellent balance.'
  },
  {
    image: 'assets/images/header/gayang.webp',
    name: 'Gayang',
    description: 'A long, graceful Filipino blade crafted for both traditional heritage and practical use.'
  },
  {
    image: 'assets/images/header/barong.webp',
    name: 'Barong',
    description: 'A leaf-shaped blade traditionally associated with the Moro peoples of the southern Philippines.'
  }
];

const HERO_SLIDESHOW_INTERVAL = 6000;

document.addEventListener('error', event => {
  const image = event.target;
  if (!(image instanceof HTMLImageElement)) return;
  const frame = image.parentElement;
  if (!frame) return;
  image.hidden = true;
  frame.classList.add('image-unavailable');
  frame.setAttribute('data-image-label', `${image.alt || 'Product'} image unavailable`);
}, true);

(function initHeroSlideshow() {
  const container = document.getElementById('heroSlideshow');
  const bladeName = document.getElementById('heroBladeName');

  if (!container || !bladeName || !HERO_SLIDES.length) return;

  HERO_SLIDES.forEach((item, i) => {
    const slide = document.createElement('div');

    slide.className = 'hero-slide' + (i === 0 ? ' active' : '');
    slide.dataset.backgroundImage = item.image;
    if (i === 0) slide.style.backgroundImage = `url('${item.image}')`;

    container.insertBefore(slide, bladeName);
  });

  const slides = container.querySelectorAll('.hero-slide');
  const bladeTitle = bladeName.querySelector('strong');
  const bladeDescription = document.getElementById('heroBladeDescription');

  function updateHeroSlideText(slide) {
    if (bladeTitle) bladeTitle.textContent = slide.name || '';

    if (!bladeDescription) return;
    const description = slide.description?.trim() || '';
    bladeDescription.textContent = description;
    bladeDescription.hidden = !description;
  }

  updateHeroSlideText(HERO_SLIDES[0]);

  if (slides.length < 2) return;

  let current = 0;

  setInterval(() => {
    const next = (current + 1) % slides.length;

    if (!slides[next].style.backgroundImage) {
      slides[next].style.backgroundImage = `url('${slides[next].dataset.backgroundImage}')`;
    }

    slides[current].classList.remove('active');
    slides[next].classList.add('active');

    bladeName.classList.add('changing');

    setTimeout(() => {
      updateHeroSlideText(HERO_SLIDES[next]);

      bladeName.classList.remove('changing');
    }, 250);

    current = next;
  }, HERO_SLIDESHOW_INTERVAL);
})();


const COMPLETE_COLLECTION = (window.PANGASINAN_PRODUCTS || []).map(makeCollectionBlade);

const CATALOG_PREVIEW = COMPLETE_COLLECTION.filter(blade => blade.featured);

function productDetailsUrl(productId) {
  const query = `?id=${encodeURIComponent(productId)}`;
  return window.location.protocol === 'file:'
    ? `collection/index.html${query}`
    : `/collection/${query}`;
}

function renderCatalogPreview() {
  const grid = document.getElementById('catalogGrid');
  const count = document.getElementById('filterCount');
  if (!grid) return;

  grid.innerHTML = '';
  CATALOG_PREVIEW.forEach((blade, index) => {
    const card = document.createElement('article');
    card.className = 'blade-card';
    card.setAttribute('data-category', blade.category);
    card.innerHTML = `
      <a class="blade-card-link" href="${productDetailsUrl(blade.id)}" aria-label="View details for ${blade.name}">
      <div class="blade-card-img">
        <div class="blade-card-img-inner">
          ${
            blade.image
              ? `<img src="${blade.image}" width="3664" height="2691" loading="lazy" decoding="async" alt="${blade.name}" class="blade-card-image">`
              : `
                <div class="blade-svg-wrap">
                  <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%">
                    ${blade.svgPath}
                  </svg>
                </div>
              `
          }
        </div>
      </div>
      <div class="blade-card-body">
        <span class="blade-badge">${blade.series}</span>
        <div class="product-status-row">${productStatusMarkup(blade)}</div>
        <h3 class="blade-name">${blade.name}</h3>
        <p class="blade-meta">${blade.length} · ${blade.material}</p>
      </div></a>
      <button class="share-card-button" type="button" data-share-trigger data-share-kind="product" data-share-product-id="${blade.id}" aria-label="Share ${blade.name}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.6 6.8-4.1M8.6 13.4l6.8 4.1"></path></svg>
      </button>`;
    grid.appendChild(card);
  });

  if (count) {
    count.textContent = `${CATALOG_PREVIEW.length} blades`;
  }
}

function makeCollectionBlade(product) {
  const { id, slug, image, name, category, series, featured, status, details } = product;
  return {
    id,
    slug,
    image,
    name,
    category,
    series,
    featured,
    material: details.steel,
    length: details.bladeLength,
    weight: 'Varies by final build',
    handle: details.handle,
    edge: 'Profile matched to intended use',
    hrc: details.hardness,
    sheath: details.sheath,
    price: 0,
    status,
    customizable: true,
    leadTime: status === 'ready-stock' ? 'Current stock and delivery timing confirmed with your quotation' : 'Lead time confirmed with your quotation',
    badge: status === 'ready-stock' ? 'Check Availability' : 'Made to Order',
    desc: `${name} is available as a made-to-order commission. Choose the materials, dimensions, and finishing details that best suit your intended use.`,
    bg: '#111111',
    gradColor: '#222222',
    svgPath: blankBladePlaceholder(name, series),
    details,
  };
}

function blankBladePlaceholder(name, series) {
  return `
    <rect width="300" height="200" fill="#111111"/>
    <radialGradient id="blank${name.replace(/[^a-z0-9]/gi, '')}" cx="50%" cy="48%" r="58%">
      <stop offset="0%" stop-color="#2E2E2E" stop-opacity="0.9"/>
      <stop offset="100%" stop-color="#080808" stop-opacity="0"/>
    </radialGradient>
    <rect width="300" height="200" fill="url(#blank${name.replace(/[^a-z0-9]/gi, '')})"/>
    <rect x="58" y="86" width="184" height="28" rx="14" fill="none" stroke="#7A5A22" stroke-width="1" opacity="0.75"/>
    <path d="M72 100 H228" stroke="#C8963C" stroke-width="1" opacity="0.5"/>
    <text x="150" y="132" text-anchor="middle" font-family="Georgia" font-size="13" fill="#F0EBE0" opacity="0.78">${name}</text>
    <text x="150" y="154" text-anchor="middle" font-family="Inter, Arial" font-size="8" fill="#C8963C" opacity="0.72" letter-spacing="2">${series.toUpperCase()}</text>`;
}

function formatBladePrice(blade) {
  return blade.price >= 1000 ? `₱${blade.price.toLocaleString()}` : 'Available Soon';
}

function productStatusMarkup(blade, className = 'product-status') {
  const ready = blade.status === 'ready-stock';
  return `<span class="${className} ${ready ? 'is-ready' : 'is-made'}"><i aria-hidden="true"></i>${ready ? 'Check Availability' : 'Made to Order'}</span>${blade.customizable ? `<span class="${className} is-custom"><i aria-hidden="true"></i>Custom Orders Welcome</span>` : ''}`;
}

const BUILD_OPTIONS = {
  steel: ['5160 Carbon Steel', '304 Stainless Steel'],
  handle: ['Kamagong', 'Mahogany', 'Chico Wood', 'Carabao Horn', 'Buffalo Horn'],
  sheath: ['Mahogany', 'Chico Wood', 'Kamagong (With additional cost)', 'Kydex (With additional cost)'],
  finish: ['Standard Satin', 'Mirror Polish', 'Blackened Finish', 'Discuss With Bladesmith'],
  intendedUse: ['Collection / Display', 'Outdoor / Utility', 'Martial Arts Practice', 'Culinary Use', 'Other'],
};

const STEEL_HARDNESS = {
  '5160 Carbon Steel': '57-60 HRC',
  '304 Stainless Steel': '15-20 HRC (approximately 70-90 HRB)',
};

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function getBladeDetails(blade) {
  return blade.details || {
    steel: blade.material,
    bladeLength: blade.length,
    hardness: blade.hrc,
    handle: blade.handle,
    sheath: blade.sheath,
  };
}

function buildOptionsMarkup(options, selectedValue) {
  const values = options.includes(selectedValue) ? options : [selectedValue, ...options];
  return values.map(value => `<option value="${escapeHtml(value)}"${value === selectedValue ? ' selected' : ''}>${escapeHtml(value)}</option>`).join('');
}

function quickBuildConfiguratorMarkup(blade) {
  const details = getBladeDetails(blade);
  const hardness = STEEL_HARDNESS[details.steel] || details.hardness;

  return `
    <div class="qd-configurator" data-blade-id="${blade.id}">
      <label class="qd-config-field">
        <span>Steel</span>
        <select class="qd-config-control" data-config-field="steel" onchange="updateQuickBuildHardness(${blade.id})">
          ${buildOptionsMarkup(BUILD_OPTIONS.steel, details.steel)}
        </select>
      </label>
      <label class="qd-config-field">
        <span>Blade Length</span>
        <input class="qd-config-control" data-config-field="bladeLength" type="text" value="${escapeHtml(details.bladeLength)}" placeholder="Example: 16 in">
      </label>
      <label class="qd-config-field">
        <span>Hardness</span>
        <output class="qd-config-control qd-config-output" data-config-field="hardness">${escapeHtml(hardness)}</output>
      </label>
      <label class="qd-config-field">
        <span>Handle</span>
        <select class="qd-config-control" data-config-field="handle">
          ${buildOptionsMarkup(BUILD_OPTIONS.handle, details.handle)}
        </select>
      </label>
      <label class="qd-config-field">
        <span>Sheath / Scabbard</span>
        <select class="qd-config-control" data-config-field="sheath">
          ${buildOptionsMarkup(BUILD_OPTIONS.sheath, details.sheath)}
        </select>
      </label>
      <div class="qd-quantity-field">
        <span>Quantity</span>
        <div class="qd-quantity-stepper">
          <button type="button" onclick="changeQuickBuildQuantity(${blade.id}, -1)" aria-label="Decrease quantity">-</button>
          <input class="qd-config-control" data-config-field="quantity" type="number" min="1" value="1" inputmode="numeric" onchange="setQuickBuildQuantity(${blade.id}, this.value)">
          <button type="button" onclick="changeQuickBuildQuantity(${blade.id}, 1)" aria-label="Increase quantity">+</button>
        </div>
      </div>
      <p class="qd-config-note">Defaults are loaded from this blade. Change any field to request a custom build.</p>
    </div>`;
}

function setQuickBuildQuantity(bladeId, value) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  const quantityInput = wrapper?.querySelector('[data-config-field="quantity"]');
  if (!quantityInput) return;
  quantityInput.value = Math.max(1, Number(value) || 1);
}

function changeQuickBuildQuantity(bladeId, step) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  const quantityInput = wrapper?.querySelector('[data-config-field="quantity"]');
  if (!quantityInput) return;
  setQuickBuildQuantity(bladeId, (Number(quantityInput.value) || 1) + step);
}

function updateQuickBuildHardness(bladeId) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  if (!wrapper) return;

  const steel = wrapper.querySelector('[data-config-field="steel"]')?.value;
  const hardness = wrapper.querySelector('[data-config-field="hardness"]');
  if (hardness) hardness.textContent = STEEL_HARDNESS[steel] || 'Confirm with maker';
}

function getQuickBuildSelection(bladeId) {
  const wrapper = document.querySelector(`.qd-configurator[data-blade-id="${bladeId}"]`);
  if (!wrapper) return null;

  const readField = field => {
    const control = wrapper.querySelector(`[data-config-field="${field}"]`);
    return control ? control.value || control.textContent.trim() : '';
  };

  return {
    steel: readField('steel'),
    bladeLength: readField('bladeLength'),
    hardness: readField('hardness'),
    handle: readField('handle'),
    sheath: readField('sheath'),
    engraving: readField('engraving'),
    customization: readField('customization'),
    quantity: Math.max(1, Number(readField('quantity')) || 1),
  };
}

function inquireQuickBuild(bladeId) {
  const blade = COMPLETE_COLLECTION.find(b => String(b.id) === String(bladeId));
  const selection = getQuickBuildSelection(bladeId);
  const buildText = selection
    ? `Custom build request:\n${formatBuildDetails(selection, selection.quantity)}`
    : '';

  closeDrawer();
  closeFullCatalog();
  scrollToContact(blade?.name || '', buildText);
}

const INQUIRY_STORE = window.PangasinanInquiry;
const INQUIRY_LIST_STORAGE_KEY = INQUIRY_STORE?.STORAGE_KEY || 'pangasinanBladesInquiryList';
let inquiryList = [];
let pendingDuplicateItem = null;
let pendingDuplicateIndex = -1;
let pendingDuplicateEdit = null;
let pendingRemoveInquiryKey = null;
const dialogFocusStack = [];

function getInquiryCustomer() {
  return INQUIRY_STORE?.loadCustomer?.() || {};
}

function populateInquiryCustomerControls(customer = getInquiryCustomer()) {
  document.querySelectorAll('[data-inquiry-customer-field]').forEach(control => {
    const value = customer[control.dataset.inquiryCustomerField] || '';
    if (control.value !== value) control.value = value;
  });
}

function saveInquiryCustomerFromControls() {
  if (!INQUIRY_STORE?.saveCustomer) return {};
  const customer = getInquiryCustomer();
  document.querySelectorAll('[data-inquiry-customer-field]').forEach(control => {
    customer[control.dataset.inquiryCustomerField] = control.value;
  });
  return INQUIRY_STORE.saveCustomer(customer);
}

document.addEventListener('input', event => {
  if (event.target.matches('[data-inquiry-customer-field]')) saveInquiryCustomerFromControls();
});

function getDialogControls(dialog) {
  return Array.from(dialog.querySelectorAll('a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'));
}

function activateDialogFocus(dialog, initialFocus) {
  if (!dialog || dialogFocusStack.some(entry => entry.dialog === dialog)) return;
  dialogFocusStack.push({ dialog, opener: document.activeElement });
  window.setTimeout(() => (initialFocus || getDialogControls(dialog)[0])?.focus?.(), 0);
}

function deactivateDialogFocus(dialog) {
  const index = dialogFocusStack.findIndex(entry => entry.dialog === dialog);
  if (index < 0) return;
  const [{ opener }] = dialogFocusStack.splice(index, 1);
  const activeEntry = dialogFocusStack[dialogFocusStack.length - 1];
  if (activeEntry) getDialogControls(activeEntry.dialog)[0]?.focus?.();
  else opener?.focus?.();
}

document.addEventListener('keydown', event => {
  if (event.key !== 'Tab' || !dialogFocusStack.length) return;
  const dialog = dialogFocusStack[dialogFocusStack.length - 1].dialog;
  const controls = getDialogControls(dialog);
  if (!controls.length) return;
  const first = controls[0];
  const last = controls[controls.length - 1];
  if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
});

function formatBuildDetails(selection, quantity) {
  if (INQUIRY_STORE) return INQUIRY_STORE.formatDetails(selection, quantity);
  return [
    `Blade Length: ${selection.bladeLength}`,
    `Blade Material: ${selection.steel}`,
    `Hardness: ${selection.hardness}`,
    `Handle: ${selection.handle}`,
    `Scabbard: ${selection.sheath}`,
    selection.finish ? `Finish: ${selection.finish}` : '',
    selection.intendedUse ? `Intended Use: ${selection.intendedUse}` : '',
    selection.customization ? `Additional Notes: ${selection.customization}` : '',
    quantity ? `Quantity: ${quantity}` : '',
  ].filter(Boolean).join('\n');
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

function inquiryEditorMarkup(item, index) {
  const selection = item.selection || {};
  const hardness = STEEL_HARDNESS[selection.steel] || selection.hardness || 'Confirm with maker';
  return `
    <div class="inquiry-item-editor" data-inquiry-editor="${index}">
      <label><span>Blade Length</span><input data-inquiry-field="bladeLength" type="text" value="${escapeHtml(selection.bladeLength)}"></label>
      <label><span>Blade Material</span><select data-inquiry-field="steel" onchange="updateInquiryEditorHardness(this)">${buildOptionsMarkup(BUILD_OPTIONS.steel, selection.steel || BUILD_OPTIONS.steel[0])}</select></label>
      <label><span>Hardness</span><output data-inquiry-field="hardness">${escapeHtml(hardness)}</output></label>
      <label><span>Handle</span><select data-inquiry-field="handle">${buildOptionsMarkup(BUILD_OPTIONS.handle, selection.handle || BUILD_OPTIONS.handle[0])}</select></label>
      <label><span>Scabbard</span><select data-inquiry-field="sheath">${buildOptionsMarkup(BUILD_OPTIONS.sheath, selection.sheath || BUILD_OPTIONS.sheath[0])}</select></label>
      <label><span>Finish</span><select data-inquiry-field="finish">${buildOptionsMarkup(BUILD_OPTIONS.finish, selection.finish || BUILD_OPTIONS.finish[0])}</select></label>
      <label><span>Intended Use</span><select data-inquiry-field="intendedUse">${buildOptionsMarkup(BUILD_OPTIONS.intendedUse, selection.intendedUse || BUILD_OPTIONS.intendedUse[0])}</select></label>
      <label><span>Quantity</span><input data-inquiry-field="quantity" type="number" min="1" value="${Math.max(1, Number(item.quantity) || 1)}"></label>
      <label class="inquiry-editor-wide"><span>Additional Notes</span><textarea data-inquiry-field="customization" maxlength="500" rows="3" placeholder="Add other preferences, questions, or information for the workshop">${escapeHtml(selection.customization)}</textarea></label>
    </div>`;
}

function getInquiryListCount() {
  return inquiryList.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
}

function normalizeSpecValue(value) {
  return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
}

function createInquiryItemKey(item) {
  if (INQUIRY_STORE) return INQUIRY_STORE.createKey(item);
  const selection = item.selection || {};
  const keyParts = {
    name: item.name,
    steel: selection.steel,
    bladeLength: selection.bladeLength,
    hardness: selection.hardness,
    handle: selection.handle,
    sheath: selection.sheath,
    finish: selection.finish,
    intendedUse: selection.intendedUse,
    customization: selection.customization,
    status: item.status,
  };
  return Object.entries(keyParts)
    .map(([key, value]) => `${key}:${normalizeSpecValue(value)}`)
    .join('|');
}

function refreshInquiryItemKeys() {
  inquiryList = inquiryList.map(item => ({
    ...item,
    key: item.key || createInquiryItemKey(item),
  }));
}

function saveInquiryList() {
  try {
    refreshInquiryItemKeys();
    inquiryList = INQUIRY_STORE ? INQUIRY_STORE.save(inquiryList) : inquiryList;
    if (!INQUIRY_STORE) localStorage.setItem(INQUIRY_LIST_STORAGE_KEY, JSON.stringify(inquiryList));
  } catch (error) {
    console.warn('Unable to save inquiry list:', error);
  }
}

function loadInquiryList() {
  if (INQUIRY_STORE) {
    inquiryList = INQUIRY_STORE.load();
    updateInquiryBadge();
    return;
  }
  try {
    const saved = localStorage.getItem(INQUIRY_LIST_STORAGE_KEY);
    const parsed = saved ? JSON.parse(saved) : [];
    inquiryList = Array.isArray(parsed)
      ? parsed
          .filter(item => item && item.id && item.name && item.selection)
          .map(item => ({
            ...item,
            quantity: Math.max(1, Number(item.quantity) || 1),
            key: item.key || createInquiryItemKey(item),
          }))
      : [];
  } catch (error) {
    inquiryList = [];
    localStorage.removeItem(INQUIRY_LIST_STORAGE_KEY);
  }

  updateInquiryBadge();
}

function updateInquiryBadge() {
  const count = getInquiryListCount();
  const badge = document.getElementById('inquiryListCount');
  const label = count ? String(count) : '';

  if (badge) {
    badge.textContent = label;
    badge.hidden = count === 0;
  }

}

function addCurrentBuildToInquiryList(bladeId) {
  const blade = COMPLETE_COLLECTION.find(b => String(b.id) === String(bladeId));
  const selection = getQuickBuildSelection(bladeId);
  if (!blade || !selection) return;

  const quantity = Math.max(1, Number(selection.quantity) || 1);
  delete selection.quantity;
  const item = {
    id: blade.id,
    name: blade.name,
    image: blade.image,
    series: blade.series || blade.category,
    status: blade.status,
    selection,
    quantity,
  };
  addInquiryItem(item);
}

function addInquiryItem(item) {
  const keyedItem = {
    ...item,
    quantity: Math.max(1, Number(item.quantity) || 1),
    key: item.key || createInquiryItemKey(item),
  };
  const existingIndex = inquiryList.findIndex(entry => (entry.key || createInquiryItemKey(entry)) === keyedItem.key);

  if (existingIndex >= 0) {
    showDuplicateInquiryConfirmation(keyedItem, existingIndex);
    return;
  }

  inquiryList.push(keyedItem);
  saveInquiryList();
  updateInquiryBadge();
  closeDrawer();
  openInquiryListModal();
}

function addCustomOrderToInquiryList(customOrder) {
  const selection = {
    steel: customOrder.steel || '',
    bladeLength: customOrder.bladeLength || '',
    hardness: customOrder.hardness || '',
    handle: customOrder.handle || '',
    sheath: customOrder.sheath || customOrder.scabbard || '',
    engraving: customOrder.engraving || '',
    customization: customOrder.customization || customOrder.notes || '',
  };

  addInquiryItem({
    id: customOrder.id || `custom-${Date.now()}`,
    name: customOrder.name || customOrder.bladeName || 'Custom Blade Order',
    image: customOrder.image || '',
    series: customOrder.series || 'Custom Order',
    status: customOrder.status || 'custom-order',
    selection,
    quantity: Math.max(1, Number(customOrder.quantity) || 1),
  });
}

function confirmDuplicateInquiryItem() {
  if (pendingDuplicateEdit) {
    const { sourceKey, targetKey, item } = pendingDuplicateEdit;
    const target = inquiryList.find(entry => (entry.key || createInquiryItemKey(entry)) === targetKey);
    if (target) {
      target.quantity = (Number(target.quantity) || 1) + (Number(item.quantity) || 1);
      inquiryList = inquiryList.filter(entry => (entry.key || createInquiryItemKey(entry)) !== sourceKey);
      saveInquiryList();
      updateInquiryBadge();
    }
    pendingDuplicateEdit = null;
    closeDuplicateInquiryModal();
    renderInquiryListModal();
    return;
  }

  if (!pendingDuplicateItem || pendingDuplicateIndex < 0) return;

  inquiryList[pendingDuplicateIndex] = {
    ...inquiryList[pendingDuplicateIndex],
    quantity: (Number(inquiryList[pendingDuplicateIndex].quantity) || 1) + (Number(pendingDuplicateItem.quantity) || 1),
  };
  pendingDuplicateItem = null;
  pendingDuplicateIndex = -1;
  closeDuplicateInquiryModal();
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
  closeDrawer();
  openInquiryListModal();
}

function cancelDuplicateInquiryItem() {
  pendingDuplicateItem = null;
  pendingDuplicateIndex = -1;
  pendingDuplicateEdit = null;
  closeDuplicateInquiryModal();
}

function showDuplicateInquiryConfirmation(item, existingIndex) {
  pendingDuplicateItem = item;
  pendingDuplicateIndex = existingIndex;
  const existing = inquiryList[existingIndex];
  const modal = document.getElementById('duplicateInquiryModal');
  const body = document.getElementById('duplicateInquiryBody');

  if (!modal || !body) return;

  body.innerHTML = `
    <strong>${escapeHtml(item.name)}</strong>
    <span>Existing quantity: ${Number(existing.quantity) || 1}</span>
    <span>Selected quantity: ${Number(item.quantity) || 1}</span>
    <span>Updated quantity after continue: ${(Number(existing.quantity) || 1) + (Number(item.quantity) || 1)}</span>
  `;
  modal.classList.add('open');
  activateDialogFocus(modal);
}

function closeDuplicateInquiryModal() {
  const modal = document.getElementById('duplicateInquiryModal');
  modal?.classList.remove('open');
  deactivateDialogFocus(modal);
}

function removeInquiryItem(itemKey) {
  const decodedKey = decodeURIComponent(itemKey);
  const item = inquiryList.find(entry => entry.key === decodedKey);
  const modal = document.getElementById('removeInquiryModal');
  const body = document.getElementById('removeInquiryBody');
  if (!item || !modal || !body) return;
  pendingRemoveInquiryKey = decodedKey;
  body.innerHTML = `<strong>${escapeHtml(item.name)}</strong><span>This blade and its selected specifications will be removed from your Inquiry List.</span>`;
  modal.classList.add('open');
  activateDialogFocus(modal);
}

function cancelRemoveInquiryItem() {
  pendingRemoveInquiryKey = null;
  const modal = document.getElementById('removeInquiryModal');
  modal?.classList.remove('open');
  deactivateDialogFocus(modal);
}

function confirmRemoveInquiryItem() {
  if (!pendingRemoveInquiryKey) return;
  inquiryList = inquiryList.filter(item => item.key !== pendingRemoveInquiryKey);
  pendingRemoveInquiryKey = null;
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
  const modal = document.getElementById('removeInquiryModal');
  modal?.classList.remove('open');
  deactivateDialogFocus(modal);
}

function setInquiryItemQuantity(itemKey, quantity) {
  itemKey = decodeURIComponent(itemKey);
  const item = inquiryList.find(entry => entry.key === itemKey);
  if (!item) return;

  item.quantity = Math.max(1, Number(quantity) || 1);
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
}

function updateInquiryActionAvailability() {
  const editing = Boolean(document.querySelector('.inquiry-item-editor:not([hidden])'));
  const message = editing ? 'Save your item changes before copying or requesting a quote.' : '';
  ['copyInquiryListBtn', 'sendInquiryListBtn'].forEach(id => {
    const button = document.getElementById(id);
    if (!button) return;
    button.disabled = !inquiryList.length || editing;
    button.toggleAttribute('data-tooltip-active', editing);
    if (editing) {
      button.dataset.tooltip = message;
      button.title = message;
      button.setAttribute('aria-label', `${button.textContent.trim()}. ${message}`);
    } else {
      delete button.dataset.tooltip;
      button.removeAttribute('title');
      button.removeAttribute('aria-label');
    }
  });
}

function updateInquiryItem(index, changedControl) {
  const item = inquiryList[index];
  const editor = changedControl?.closest('[data-inquiry-editor]');
  if (!item || !editor) return;

  const value = field => {
    const control = editor.querySelector(`[data-inquiry-field="${field}"]`);
    return control ? String(control.value || control.textContent || '').trim() : '';
  };
  const steel = value('steel');
  const hardness = STEEL_HARDNESS[steel] || value('hardness') || 'Confirm with maker';
  const hardnessOutput = editor.querySelector('[data-inquiry-field="hardness"]');
  if (hardnessOutput) hardnessOutput.textContent = hardness;

  const updatedItem = {
    ...item,
    selection: {
      ...item.selection,
      steel,
      hardness,
      bladeLength: value('bladeLength'),
      handle: value('handle'),
      sheath: value('sheath'),
      finish: value('finish'),
      intendedUse: value('intendedUse'),
      customization: value('customization'),
    },
    quantity: Math.max(1, Number(value('quantity')) || 1),
  };
  updatedItem.key = createInquiryItemKey(updatedItem);

  const duplicateIndex = inquiryList.findIndex((entry, entryIndex) => entryIndex !== index && createInquiryItemKey(entry) === updatedItem.key);
  if (duplicateIndex >= 0) {
    const modal = document.getElementById('duplicateInquiryModal');
    const body = document.getElementById('duplicateInquiryBody');
    if (!modal || !body) return false;
    const existing = inquiryList[duplicateIndex];
    pendingDuplicateEdit = {
      sourceKey: item.key || createInquiryItemKey(item),
      targetKey: existing.key || createInquiryItemKey(existing),
      item: updatedItem,
    };
    body.innerHTML = `<strong>${escapeHtml(updatedItem.name)}</strong><span>Matching specifications already exist.</span><span>Existing quantity: ${Number(existing.quantity) || 1}</span><span>Edited quantity: ${updatedItem.quantity}</span><span>Continue to merge both entries.</span>`;
    modal.classList.add('open');
    activateDialogFocus(modal);
    return false;
  }

  inquiryList[index] = updatedItem;
  saveInquiryList();
  updateInquiryBadge();
  const quantityControl = editor.querySelector('[data-inquiry-field="quantity"]');
  if (quantityControl) quantityControl.value = updatedItem.quantity;
  const count = document.getElementById('inquiryListModalCount');
  const total = getInquiryListCount();
  if (count) count.textContent = `${total} blade${total === 1 ? '' : 's'}`;
  return true;
}

function removeInquiryItemByIndex(index) {
  const item = inquiryList[index];
  if (item) removeInquiryItem(encodeURIComponent(item.key || createInquiryItemKey(item)));
}

function toggleInquiryItemEditor(index, button) {
  const editor = document.querySelector(`[data-inquiry-editor="${index}"]`);
  if (!editor) return;
  const willOpen = editor.hidden;
  if (!willOpen) {
    if (updateInquiryItem(index, editor.querySelector('select, input, textarea')) !== false) renderInquiryListModal();
    return;
  }
  const display = document.querySelector(`[data-inquiry-display="${index}"]`);
  if (display) display.hidden = true;
  editor.hidden = !willOpen;
  button?.setAttribute('aria-expanded', String(willOpen));
  button?.setAttribute('aria-label', `${willOpen ? 'Save' : 'Edit'} specifications for ${inquiryList[index]?.name || 'this blade'}`);
  if (button) button.title = willOpen ? 'Save changes' : 'Edit specifications';
  button?.classList.toggle('is-active', willOpen);
  const icon = button?.querySelector('[data-edit-icon]');
  if (icon) icon.innerHTML = '&#10003;';
  if (willOpen) editor.querySelector('select, input, textarea')?.focus();
  updateInquiryActionAvailability();
}

function updateInquiryEditorHardness(steelControl) {
  const editor = steelControl?.closest('[data-inquiry-editor]');
  const output = editor?.querySelector('[data-inquiry-field="hardness"]');
  if (output) output.textContent = STEEL_HARDNESS[steelControl.value] || 'Confirm with maker';
}

function clearInquiryList() {
  if (!inquiryList.length) return;
  const modal = document.getElementById('clearInquiryModal');
  if (!modal) return;
  modal.classList.add('open');
  activateDialogFocus(modal);
}

function cancelClearInquiryList() {
  const modal = document.getElementById('clearInquiryModal');
  modal?.classList.remove('open');
  deactivateDialogFocus(modal);
}

function confirmClearInquiryList() {
  inquiryList = [];
  pendingDuplicateItem = null;
  pendingDuplicateIndex = -1;
  pendingDuplicateEdit = null;
  pendingRemoveInquiryKey = null;
  saveInquiryList();
  updateInquiryBadge();
  renderInquiryListModal();
  cancelClearInquiryList();
}

function inquiryListMessage() {
  if (INQUIRY_STORE) return INQUIRY_STORE.message(inquiryList);
  return `Inquiry List\n\n${inquiryList.map(item => `${item.name}
${formatBuildDetails(item.selection, item.quantity)}`).join('\n\n')}`;
}

function quotationMessage(options = {}) {
  if (INQUIRY_STORE?.quotation) {
    return INQUIRY_STORE.quotation(inquiryList, { customer: getInquiryCustomer(), ...options });
  }
  return inquiryListMessage();
}

function sendInquiryList() {
  if (!inquiryList.length) return;

  const total = getInquiryListCount();
  const label = total === 1 ? inquiryList[0].name : `${total} selected blades`;
  closeInquiryListModal();

  const drawer = document.getElementById('quickDrawer');
  if (drawer) closeDrawer();

  const fullCatalog = document.getElementById('fullCatalogModal');
  if (fullCatalog && isFullCatalogOpen()) {
    fullCatalog.style.display = 'none';
    deactivateDialogFocus(fullCatalog);
    if (window.location.hash === '#full-collection') {
      history.replaceState(null, '', `${window.location.pathname}${window.location.search}#contact`);
    }
  }
  document.body.style.overflow = '';
  populateContactCustomer(getInquiryCustomer(), true);
  scrollToContact(label, quotationMessage({ includeCustomer: false, includeGreeting: false, includeClosing: false }));
}

function fallbackCopyText(text) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.setAttribute('readonly', '');
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  const copied = document.execCommand('copy');
  textarea.remove();
  return copied;
}

function openCopySuccessModal() {
  const modal = document.getElementById('copySuccessModal');
  if (!modal || modal.classList.contains('open')) return;
  setQuoteChannelStatus('messengerQuoteStatus');
  setQuoteChannelStatus('emailQuoteStatus');
  modal.classList.add('open');
  activateDialogFocus(modal);
}

function setQuoteChannelStatus(id, message = '') {
  const status = document.getElementById(id);
  if (!status) return;
  status.textContent = message;
  status.hidden = !message;
}

function sendCopiedInquiryViaEmail() {
  const messages = INQUIRY_STORE?.STATUS_MESSAGES || {};
  if (!inquiryList.length) {
    setQuoteChannelStatus('emailQuoteStatus', messages.empty || 'Your Inquiry List is empty. Add at least one blade before continuing.');
    return;
  }
  setQuoteChannelStatus('emailQuoteStatus');
  const subject = 'Pangasinan Blades Product Inquiry';
  const body = quotationMessage();
  window.location.href = `mailto:inquire@pangasinanblades.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildMessengerInquiryMessage() {
  return quotationMessage();
}

async function sendCopiedInquiryViaMessenger(button) {
  const messages = INQUIRY_STORE?.STATUS_MESSAGES || {};
  if (!inquiryList.length) {
    setQuoteChannelStatus('messengerQuoteStatus', messages.empty || 'Your Inquiry List is empty. Add at least one blade before continuing.');
    return;
  }
  setQuoteChannelStatus('messengerQuoteStatus');
  const originalLabel = button?.querySelector('span:last-child')?.textContent || 'Send via Messenger';
  const label = button?.querySelector('span:last-child');
  if (label) label.textContent = 'Opening Messenger...';
  const messengerUrl = INQUIRY_STORE?.messengerUrl?.() || 'https://www.facebook.com/messages/t/emcpangasinanblades';
  const messengerWindow = window.open(messengerUrl, '_blank');
  if (!messengerWindow) {
    setQuoteChannelStatus('messengerQuoteStatus', messages.messengerBlocked || 'Unable to open Messenger. Please allow pop-ups and try again.');
    if (label) label.textContent = originalLabel;
    return;
  }
  messengerWindow.opener = null;
  try {
    const message = buildMessengerInquiryMessage();
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(message);
    } else if (!fallbackCopyText(message)) {
      throw new Error('Fallback copy command failed');
    }
  } catch (error) {
    setQuoteChannelStatus('messengerQuoteStatus', messages.messengerCopyFailed || 'Messenger opened, but the quote request could not be copied. Please copy it manually.');
  } finally {
    if (label) label.textContent = originalLabel;
  }
}

function closeCopySuccessModal() {
  const modal = document.getElementById('copySuccessModal');
  if (!modal?.classList.contains('open')) return;
  modal.classList.remove('open');
  setQuoteChannelStatus('messengerQuoteStatus');
  setQuoteChannelStatus('emailQuoteStatus');
  deactivateDialogFocus(modal);
  window.setTimeout(() => document.getElementById('copyInquiryListBtn')?.focus(), 0);
}

async function copyInquiryList() {
  if (!inquiryList.length) return;

  const text = quotationMessage();
  const button = document.getElementById('copyInquiryListBtn');
  const errorMessage = document.getElementById('copyInquiryError');
  if (errorMessage) errorMessage.hidden = true;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
    } else if (!fallbackCopyText(text)) {
      throw new Error('Fallback copy command failed');
    }
    if (button) button.textContent = 'Copied!';
    openCopySuccessModal();
  } catch (error) {
    if (button) button.textContent = 'Copy Failed';
    if (errorMessage) errorMessage.hidden = false;
  }
  window.clearTimeout(copyInquiryList.timer);
  copyInquiryList.timer = window.setTimeout(() => {
    if (button) button.textContent = 'Copy Quote Request';
  }, 2500);
}

function renderInquiryListModal() {
  const body = document.getElementById('inquiryListBody');
  const count = document.getElementById('inquiryListModalCount');
  const sendButton = document.getElementById('sendInquiryListBtn');
  const clearButton = document.getElementById('clearInquiryListBtn');
  const copyButton = document.getElementById('copyInquiryListBtn');
  if (!body) return;

  const total = getInquiryListCount();
  if (count) count.textContent = `${total} blade${total === 1 ? '' : 's'}`;
  if (sendButton) sendButton.disabled = inquiryList.length === 0;
  if (clearButton) clearButton.disabled = inquiryList.length === 0;
  if (copyButton) copyButton.disabled = inquiryList.length === 0;

  if (!inquiryList.length) {
    body.innerHTML = `
      <div class="inquiry-list-empty">
        <strong>No blades added yet.</strong>
        <span>Choose a blade and add it to begin your quote request.</span>
      </div>`;
    updateInquiryActionAvailability();
    return;
  }

  body.innerHTML = inquiryList.map((item, index) => `
  <article class="inquiry-list-item">

    <div class="inquiry-list-thumb">
      ${
        item.image
          ? `
            <img
              src="${item.image}"
              width="3664"
              height="2691"
              loading="lazy"
              decoding="async"
              alt="${escapeHtml(item.name)}"
              class="inquiry-list-img">
          `
          : `
            <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
              <rect width="300" height="200" fill="${item.bg || '#111'}"/>
              <defs>
                <radialGradient id="inq${item.id}" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stop-color="${item.gradColor || '#777'}" stop-opacity=".8"/>
                  <stop offset="100%" stop-color="${item.bg || '#111'}"/>
                </radialGradient>
              </defs>

              <rect width="300" height="200" fill="url(#inq${item.id})"/>

              ${item.svgPath || ''}
            </svg>
          `
      }
    </div>


    <div class="inquiry-list-info">
      <div class="inquiry-list-item-head">
        <span class="inquiry-list-series">${escapeHtml(item.series)}</span>
        <div class="inquiry-item-actions">
          <button type="button" class="inquiry-edit-toggle" onclick="toggleInquiryItemEditor(${index}, this)" aria-expanded="false" aria-label="Edit specifications for ${escapeHtml(item.name)}" title="Edit specifications"><span data-edit-icon aria-hidden="true">&#9998;</span></button>
          <button type="button" class="inquiry-list-remove" onclick="removeInquiryItemByIndex(${index})" aria-label="Remove ${escapeHtml(item.name)} from inquiry list" title="Remove item"><span aria-hidden="true">&times;</span></button>
        </div>
      </div>

      <h3>${escapeHtml(item.name)}</h3>
      <div data-inquiry-display="${index}">${inquirySpecsMarkup(item.selection, Math.max(1, Number(item.quantity) || 1))}</div>
      ${inquiryEditorMarkup(item, index).replace('data-inquiry-editor=', 'hidden data-inquiry-editor=')}
    </div>

  </article>
`).join('');
  updateInquiryActionAvailability();
}

function openInquiryListModal() {
  renderInquiryListModal();
  const modal = document.getElementById('inquiryListModal');
  if (!modal) return;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
  activateDialogFocus(modal);
}

function closeInquiryListModal() {
  const modal = document.getElementById('inquiryListModal');
  if (!modal) return;
  modal.classList.remove('open');
  deactivateDialogFocus(modal);
  if (!isFullCatalogOpen() && document.getElementById('quickDrawer')?.style.transform !== 'translateX(0%)') {
    document.body.style.overflow = '';
  }
}

/* ============================================================
   FULL CATALOG ENGINE
   ============================================================ */
let fcActiveFilter = 'all';
let fcActiveSort   = 'default';
let fcSearchQuery  = '';
let fcSeriesData   = [...COMPLETE_COLLECTION];
let fcVisibleData  = [...COMPLETE_COLLECTION];

const FC_CATEGORIES = [
  { key:'all',    label:'All Series' },
  { key:'itak',   label:'Itak Series' },
  { key:'bolo',   label:'Bolo Series' },
  { key:'moro',   label:'Moro Series' },
  { key:'combat', label:'Combat Series' },
  { key:'outdoor', label:'Outdoor Series' },
  { key:'international', label:'International Series' },
  { key:'kitchen', label:'Kitchen Series' },
];

function buildFCFilters() {
  const bar = document.getElementById('fcFilters');
  bar.innerHTML = '';
  FC_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className  = 'filter-pill' + (cat.key === fcActiveFilter ? ' active' : '');
    btn.textContent = cat.label;
    btn.onclick = () => { fcActiveFilter = cat.key; applyFCFilter(); };
    bar.appendChild(btn);
  });
}

function applyFCFilter() {
  buildFCFilters();
  fcSeriesData = fcActiveFilter === 'all'
    ? [...COMPLETE_COLLECTION]
    : COMPLETE_COLLECTION.filter(b => b.category === fcActiveFilter);
  applyFCSearch(document.getElementById('fcSearch')?.value || '');
}

function applyFCSearch(value = '') {
  fcSearchQuery = String(value).trim().toLocaleLowerCase();
  fcVisibleData = !fcSearchQuery
    ? [...fcSeriesData]
    : fcSeriesData.filter(blade => [
        blade.name,
        blade.series,
        blade.material,
        blade.length,
        blade.status,
      ].some(field => String(field || '').toLocaleLowerCase().includes(fcSearchQuery)));
  applyFCSort(true);
}

function applyFCSort(skipRead) {
  if (!skipRead) fcActiveSort = document.getElementById('fcSort').value;
  const sorted = [...fcVisibleData];
  if (fcActiveSort === 'default')    sorted.sort((a,b) => Number(b.featured) - Number(a.featured) || a.id - b.id);
  if (fcActiveSort === 'name')       sorted.sort((a,b) => a.name.localeCompare(b.name));
  renderFCGrid(sorted);
}

function renderFCGrid(blades) {
  const grid  = document.getElementById('fcGrid');
  const empty = document.getElementById('fcEmpty');
  const count = document.getElementById('fcCount');
  const label = document.getElementById('fcCountLabel');

  grid.innerHTML = '';

  if (!blades.length) {
    empty.style.display = 'block';
    count.textContent   = '0 blades';
    label.textContent   = '0 blades';
    return;
  }
  empty.style.display = 'none';
  const seriesTotal = fcSeriesData.length;
  count.textContent = fcSearchQuery
    ? `Showing ${blades.length} of ${seriesTotal} blades in this series`
    : `Showing ${blades.length} of ${seriesTotal} blades`;
  label.textContent   = `${blades.length} blade${blades.length!==1?'s':''}`;

  blades.forEach((blade, idx) => {
    const card = document.createElement('article');
    card.className = 'fc-card';
    card.style.animationDelay = `${idx * 30}ms`;
    card.innerHTML = `
      <a class="fc-card-link" href="${productDetailsUrl(blade.id)}" aria-label="View details for ${blade.name}">
      <div class="fc-card-img">
        ${
          blade.image
            ? `<img src="${blade.image}" width="3664" height="2691" loading="lazy" decoding="async" alt="${blade.name}" class="fc-card-image">`
            : `
              <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                <rect width="300" height="200" fill="${blade.bg}"/>
                <defs>
                  <radialGradient id="fcg${blade.id}" cx="50%" cy="50%" r="48%">
                    <stop offset="0%" stop-color="${blade.gradColor}" stop-opacity=".7"/>
                    <stop offset="100%" stop-color="${blade.bg}"/>
                  </radialGradient>
                </defs>
                <rect width="300" height="200" fill="url(#fcg${blade.id})"/>
                ${blade.svgPath}
              </svg>
            `
        }
      </div>
      <div class="fc-card-body">
        <div class="product-status-row">${productStatusMarkup(blade, 'fc-status')}</div>
        <span class="fc-badge">${blade.series}</span>
        <h3 class="fc-name">${blade.name}</h3>
        <p class="fc-meta">${blade.material} · ${blade.length}</p>
      </div></a>
      <button class="share-card-button" type="button" data-share-trigger data-share-kind="product" data-share-product-id="${blade.id}" aria-label="Share ${blade.name}">
        <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><path d="m8.6 10.6 6.8-4.1M8.6 13.4l6.8 4.1"></path></svg>
      </button>`;
    grid.appendChild(card);
  });
}

function isFullCatalogOpen() {
  const modal = document.getElementById('fullCatalogModal');
  return modal && modal.style.display === 'block';
}

function showFullCatalog() {
  const modal = document.getElementById('fullCatalogModal');
  if (!modal) return;
  modal.style.display = 'block';
  document.body.style.overflow = 'hidden';
  fcActiveFilter = 'all';
  fcActiveSort   = 'default';
  fcSearchQuery  = '';
  fcSeriesData   = [...COMPLETE_COLLECTION];
  fcVisibleData  = [...COMPLETE_COLLECTION];
  buildFCFilters();
  renderFCGrid(COMPLETE_COLLECTION);
  modal.scrollTop = 0;
  document.getElementById('fcSort').value = 'default';
  document.getElementById('fcSearch').value = '';
  const title = document.getElementById('fcTitle');
  title.setAttribute('tabindex','-1');
  activateDialogFocus(modal, title);
}

function openFullCatalog(updateHistory = true) {
  const wasOpen = isFullCatalogOpen();
  showFullCatalog();
  if (wasOpen || !updateHistory) return;

  if (window.location.hash === '#full-collection') {
    history.replaceState({ ...(history.state || {}), modal: 'fullCatalog', fullCatalogPushed: false }, '', window.location.href);
    return;
  }

  history.pushState({ modal: 'fullCatalog', fullCatalogPushed: true }, '', '#full-collection');
}

function openFullCatalogFromHash() {
  if (window.location.hash !== '#full-collection') return;
  showFullCatalog();
  if (!history.state || history.state.modal !== 'fullCatalog') {
    history.replaceState({ ...(history.state || {}), modal: 'fullCatalog', fullCatalogPushed: false }, '', window.location.href);
  }
}

function hideFullCatalog() {
  const modal = document.getElementById('fullCatalogModal');
  if (!modal) return;
  modal.style.display = 'none';
  deactivateDialogFocus(modal);
  document.body.style.overflow = '';
}

function closeFullCatalog() {
  const state = history.state || {};
  hideFullCatalog();

  if (state.modal === 'fullCatalog' && state.fullCatalogPushed) {
    history.back();
    return;
  }

  if (window.location.hash === '#full-collection') {
    history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
  }
}

window.addEventListener('popstate', () => {
  if (window.location.hash === '#full-collection') {
    openFullCatalogFromHash();
    return;
  }
  if (isFullCatalogOpen()) hideFullCatalog();
});

window.addEventListener('hashchange', () => {
  if (window.location.hash === '#full-collection') openFullCatalogFromHash();
  else if (isFullCatalogOpen()) hideFullCatalog();
});

/* Close on Escape */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    if (document.getElementById('copySuccessModal')?.classList.contains('open')) {
      closeCopySuccessModal();
    } else if (document.getElementById('clearInquiryModal')?.classList.contains('open')) {
      cancelClearInquiryList();
    } else if (document.getElementById('removeInquiryModal')?.classList.contains('open')) {
      cancelRemoveInquiryItem();
    } else if (document.getElementById('duplicateInquiryModal')?.classList.contains('open')) {
      cancelDuplicateInquiryItem();
    } else if (document.getElementById('inquiryListModal')?.classList.contains('open')) {
      closeInquiryListModal();
    } else if (document.getElementById('quickDrawer')?.style.transform === 'translateX(0px)'
        || document.getElementById('quickDrawer')?.style.transform === 'translateX(0%)') {
      closeDrawer();
    } else if (isFullCatalogOpen()) {
      closeFullCatalog();
    }
  }
});

/* ============================================================
   QUICK VIEW DRAWER
   ============================================================ */
function openDrawer(id) {
  const blade = COMPLETE_COLLECTION.find(b => String(b.id) === String(id));
  if (!blade) return;
  const details = getBladeDetails(blade);

  document.getElementById('qdBody').innerHTML = `
    <div class="qd-blade-img" data-zoom-source>
      ${
        blade.image
          ? `<img src="${blade.image}" width="3664" height="2691" decoding="async" alt="${blade.name}" class="qd-blade-image">`
          : `
            <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" style="width:100%;height:100%;display:block;">
              <rect width="400" height="300" fill="${blade.bg}"/>
              <defs>
                <radialGradient id="qdg${blade.id}" cx="50%" cy="50%" r="52%">
                  <stop offset="0%" stop-color="${blade.gradColor}" stop-opacity=".8"/>
                  <stop offset="100%" stop-color="${blade.bg}"/>
                </radialGradient>
              </defs>
              <rect width="400" height="300" fill="url(#qdg${blade.id})"/>
              <g transform="scale(1.35) translate(10,25)">
                ${blade.svgPath}
              </g>
            </svg>
          `
      }
      <span class="qd-zoom-lens" aria-hidden="true"></span>
    </div>
    <span style="display:inline-flex;align-items:center;gap:4px;font-size:9px;font-weight:600;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:10px;">
      ✦ ${blade.badge}
    </span>
    <h2 class="qd-title" id="qdTitle">${blade.name}</h2>
    <p class="qd-meta">${blade.category.charAt(0).toUpperCase()+blade.category.slice(1)} · ${blade.material} · ${blade.length}</p>
    <p class="qd-desc">${blade.desc}</p>
    <p class="qd-order-note">${blade.status === 'ready-stock' ? 'A finished piece may be available. Request a quotation so we can confirm current stock.' : 'Made after your specifications and quotation are confirmed.'} ${blade.customizable ? 'Custom length, steel, handle, scabbard, and finish are available on request.' : ''}</p>
    <details class="qd-spec-details" open>
      <summary>Custom build details</summary>
      ${quickBuildConfiguratorMarkup(blade)}
      <table class="qd-specs qd-specs-compact">
        <tr><td>Default Edge Grind</td><td>${details.edge || blade.edge}</td></tr>
      </table>
    </details>
    <p class="qd-lead-time"><strong>Ordering:</strong> ${blade.leadTime}</p>
    <div class="qd-price">${formatBladePrice(blade)}</div>
    <div class="qd-ctas">
      <button class="btn-primary" onclick="addCurrentBuildToInquiryList(${blade.id})">
        Add to Inquiry List
      </button>
      <button class="btn-ghost" onclick="inquireQuickBuild(${blade.id})">Request a Quote</button>
      <a class="btn-ghost" href="collection/index.html?id=${blade.id}">View Full Details</a>
      <button class="btn-ghost" onclick="closeDrawer()">Continue Browsing</button>
    </div>`;

  const drawer   = document.getElementById('quickDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  drawer.scrollTop = 0;
  document.body.style.overflow = 'hidden';
  backdrop.style.display = 'block';
  // Force reflow then animate
  requestAnimationFrame(() => {
    drawer.scrollTop = 0;
    drawer.style.transform  = 'translateX(0%)';
  });

  initQuickViewZoom();
  activateDialogFocus(drawer);
}

function closeDrawer() {
  const drawer = document.getElementById('quickDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  if (!drawer) return;

  resetQuickViewZoom();
  drawer.style.transform = 'translateX(100%)';
  if (backdrop) backdrop.style.display = 'none';
  deactivateDialogFocus(drawer);

  const inquiryListOpen = document.getElementById('inquiryListModal')?.classList.contains('open');
  if (!isFullCatalogOpen() && !inquiryListOpen) {
    document.body.style.overflow = '';
  }
}

const QUICK_VIEW_ZOOM_SCALE = 3.5;
const QUICK_VIEW_ZOOM_GAP = 16;
const QUICK_VIEW_ZOOM_MIN_SIZE = 280;
const QUICK_VIEW_ZOOM_MAX_SIZE = 600;

function resetQuickViewZoom() {
  const source = document.querySelector('[data-zoom-source]');
  const preview = document.getElementById('qdZoomPreview');
  const previewContent = document.getElementById('qdZoomPreviewContent');

  source?.classList.remove('is-zooming');
  preview?.classList.remove('is-visible');
  if (previewContent) previewContent.replaceChildren();
}

function getQuickViewZoomPlacement() {
  const drawer = document.getElementById('quickDrawer');
  if (!drawer) return null;

  const drawerRect = drawer.getBoundingClientRect();
  const viewportGap = 12;
  const leftSpace = drawerRect.left - QUICK_VIEW_ZOOM_GAP - viewportGap;
  const rightSpace = window.innerWidth - drawerRect.right - QUICK_VIEW_ZOOM_GAP - viewportGap;
  const useLeft = leftSpace >= QUICK_VIEW_ZOOM_MIN_SIZE;
  const available = useLeft ? leftSpace : rightSpace;

  if (available < QUICK_VIEW_ZOOM_MIN_SIZE) return null;

  const size = Math.min(QUICK_VIEW_ZOOM_MAX_SIZE, available, window.innerHeight - viewportGap * 2);
  if (size < QUICK_VIEW_ZOOM_MIN_SIZE) return null;

  return {
    size,
    left: useLeft
      ? drawerRect.left - QUICK_VIEW_ZOOM_GAP - size
      : drawerRect.right + QUICK_VIEW_ZOOM_GAP
  };
}

function initQuickViewZoom() {
  resetQuickViewZoom();

  const source = document.querySelector('[data-zoom-source]');
  const visual = source?.querySelector('img, svg');
  const lens = source?.querySelector('.qd-zoom-lens');
  const preview = document.getElementById('qdZoomPreview');
  const previewContent = document.getElementById('qdZoomPreviewContent');

  if (!source || !visual || !lens || !preview || !previewContent) return;

  let zoomedVisual = null;
  let placement = null;

  const hideZoom = () => resetQuickViewZoom();

  source.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch') return;

    placement = getQuickViewZoomPlacement();
    if (!placement) return;

    const sourceRect = source.getBoundingClientRect();
    zoomedVisual = visual.cloneNode(true);
    zoomedVisual.removeAttribute('id');
    zoomedVisual.style.width = `${sourceRect.width}px`;
    zoomedVisual.style.height = `${sourceRect.height}px`;

    previewContent.replaceChildren(zoomedVisual);
    preview.style.width = `${placement.size}px`;
    preview.style.height = `${placement.size}px`;
    preview.style.left = `${placement.left}px`;
    preview.style.top = `${Math.min(
      Math.max(12, sourceRect.top),
      window.innerHeight - placement.size - 12
    )}px`;

    source.classList.add('is-zooming');
    preview.classList.add('is-visible');
  });

  source.addEventListener('pointermove', event => {
    if (!placement || !zoomedVisual || !preview.classList.contains('is-visible')) return;

    const sourceRect = source.getBoundingClientRect();
    const x = Math.min(sourceRect.width, Math.max(0, event.clientX - sourceRect.left));
    const y = Math.min(sourceRect.height, Math.max(0, event.clientY - sourceRect.top));
    const lensWidth = Math.min(sourceRect.width, placement.size / QUICK_VIEW_ZOOM_SCALE);
    const lensHeight = Math.min(sourceRect.height, placement.size / QUICK_VIEW_ZOOM_SCALE);
    const lensLeft = Math.min(sourceRect.width - lensWidth, Math.max(0, x - lensWidth / 2));
    const lensTop = Math.min(sourceRect.height - lensHeight, Math.max(0, y - lensHeight / 2));

    lens.style.width = `${lensWidth}px`;
    lens.style.height = `${lensHeight}px`;
    lens.style.left = `${lensLeft}px`;
    lens.style.top = `${lensTop}px`;

    zoomedVisual.style.transformOrigin = 'top left';
    zoomedVisual.style.transform = `translate(${placement.size / 2 - x * QUICK_VIEW_ZOOM_SCALE}px, ${
      placement.size / 2 - y * QUICK_VIEW_ZOOM_SCALE
    }px) scale(${QUICK_VIEW_ZOOM_SCALE})`;
  });

  source.addEventListener('pointerleave', hideZoom);
  source.addEventListener('pointercancel', hideZoom);
}

window.addEventListener('resize', resetQuickViewZoom);

(function() {
  const canvas = document.getElementById('heroCanvas');
  const ctx = canvas.getContext('2d');
  let W, H, particles = [], animId;

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x = W * 0.4 + (Math.random() - 0.5) * W * 0.3;
      this.y = H * 0.6 + Math.random() * H * 0.2;
      this.vx = (Math.random() - 0.5) * 1.2;
      this.vy = -Math.random() * 2.5 - 0.5;
      this.life = 1;
      this.decay = 0.006 + Math.random() * 0.010;
      this.size = Math.random() * 2.5 + 0.8;
      const hot = Math.random();
      if (hot > 0.7) {
        this.r = 255; this.g = 210 + Math.random()*45; this.b = 60;
      } else if (hot > 0.4) {
        this.r = 240; this.g = 140 + Math.random()*60; this.b = 20;
      } else {
        this.r = 200; this.g = 80 + Math.random()*60; this.b = 10;
      }
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy -= 0.015;
      this.vx *= 0.99;
      this.life -= this.decay;
      this.size *= 0.995;
      if (this.life <= 0) this.reset();
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = Math.max(0, this.life * 0.55);
      ctx.shadowColor = `rgba(${this.r},${this.g},${this.b},0.5)`;
      ctx.shadowBlur = 8;
      ctx.fillStyle = `rgb(${this.r},${this.g},${this.b})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Ember class for slower drifting coals
  class Ember {
    constructor() { this.reset(); }
    reset() {
      this.x = W * 0.3 + Math.random() * W * 0.4;
      this.y = H * 0.55 + Math.random() * H * 0.15;
      this.vx = (Math.random() - 0.5) * 0.3;
      this.vy = -Math.random() * 0.8 - 0.2;
      this.life = 1;
      this.decay = 0.003 + Math.random() * 0.005;
      this.size = Math.random() * 1.5 + 0.5;
      this.pulse = Math.random() * Math.PI * 2;
    }
    update() {
      this.x += this.vx + Math.sin(this.pulse) * 0.2;
      this.y += this.vy;
      this.pulse += 0.05;
      this.life -= this.decay;
      if (this.life <= 0 || this.y < 0) this.reset();
    }
    draw() {
      const alpha = Math.max(0, this.life * 0.4) * (0.7 + 0.3 * Math.sin(this.pulse));
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgb(200, 100, 20)`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function init() {
    particles = [];
    for (let i = 0; i < 80; i++) {
      const p = new Particle();
      p.life = Math.random();
      particles.push(p);
    }
    for (let i = 0; i < 40; i++) {
      const e = new Ember();
      e.life = Math.random();
      particles.push(e);
    }
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);

    // Forge glow — orange pool at bottom center
    const grd = ctx.createRadialGradient(W * 0.4, H * 0.72, 0, W * 0.4, H * 0.65, W * 0.3);
    grd.addColorStop(0, 'rgba(180, 80, 10, 0.22)');
    grd.addColorStop(0.5, 'rgba(130, 40, 5, 0.08)');
    grd.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grd;
    ctx.fillRect(0, 0, W, H);

    // Ambient dark vignette to deepen corners
    const vig = ctx.createRadialGradient(W/2, H/2, H * 0.2, W/2, H/2, H * 0.8);
    vig.addColorStop(0, 'rgba(0,0,0,0)');
    vig.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = vig;
    ctx.fillRect(0, 0, W, H);

    particles.forEach(p => { p.update(); p.draw(); });
    animId = requestAnimationFrame(draw);
  }

  resize();
  init();
  draw();

  window.addEventListener('resize', () => { resize(); init(); });

  // Pause when not visible
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(animId);
    else draw();
  });
})();

document.addEventListener('DOMContentLoaded', function() {
  loadInquiryList();
  populateInquiryCustomerControls();
  document.querySelectorAll('[data-messenger-link]').forEach(link => {
    link.href = INQUIRY_STORE?.messengerUrl?.() || link.href;
  });
  openFullCatalogFromHash();

  const contactPrefill = sessionStorage.getItem('pangasinanBladesContactPrefill');
  if (contactPrefill) {
    const subject = document.getElementById('inquiryType');
    const message = document.getElementById('message');
    if (subject) subject.value = 'Price Quotation';
    if (message) {
      message.value = contactPrefill;
      message.dispatchEvent(new Event('input', { bubbles: true }));
    }
    sessionStorage.removeItem('pangasinanBladesContactPrefill');
  }

  /* --- HERO ENTRANCE --- */
  setTimeout(() => {
    document.getElementById('heroRule').classList.add('animate');
    document.getElementById('heroEyebrow').classList.add('animate');
  }, 200);
  setTimeout(() => { document.getElementById('heroHeadline').classList.add('animate'); }, 500);
  setTimeout(() => { document.getElementById('heroSub').classList.add('animate'); }, 700);
  setTimeout(() => {
    document.getElementById('heroCtas').classList.add('animate');
    document.getElementById('heroScroll').classList.add('animate');
  }, 1000);

  /* --- STICKY NAV --- */
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', function() {
    nav.classList.toggle('scrolled', window.scrollY > 60);

    /* Back to top visibility */
    document.getElementById('backTop').classList.toggle('visible', window.scrollY > 700);
  }, { passive: true });

  /* --- ACTIVE NAV LINK (IntersectionObserver) --- */
  const sections = document.querySelectorAll('section[id], div[id]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => io.observe(s));

  /* --- SCROLL REVEAL --- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  }, { rootMargin: '0px 0px -80px 0px' });
  document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

  /* --- STAT COUNTER ANIMATION --- */
  const statObs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const el = e.target;
        const target = parseInt(el.getAttribute('data-count'));
        const suffix = el.getAttribute('data-suffix') || '';
        let start = 0;
        const duration = 1800;
        const step = Math.ceil(target / (duration / 16));
        const timer = setInterval(() => {
          start = Math.min(start + step, target);
          el.textContent = start + suffix;
          if (start >= target) clearInterval(timer);
        }, 16);
        statObs.unobserve(el);
      }
    });
  }, { rootMargin: '0px 0px -100px 0px' });
  document.querySelectorAll('.stat-number[data-count]').forEach(el => statObs.observe(el));

  /* --- MOBILE NAV --- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function setMobileMenu(open, restoreFocus = false) {
    mobileMenu.classList.toggle('open', open);
    mobileToggle.classList.toggle('is-open', open);
    mobileToggle.setAttribute('aria-expanded', String(open));
    mobileToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    mobileMenu.setAttribute('aria-hidden', String(!open));
    document.body.style.overflow = open ? 'hidden' : '';

    if (open) window.setTimeout(() => mobileLinks[0]?.focus(), 300);
    else if (restoreFocus) mobileToggle.focus();
  }

  mobileToggle.addEventListener('click', () => {
    setMobileMenu(!mobileMenu.classList.contains('open'));
  });

  mobileMenu.addEventListener('click', event => {
    if (event.target === mobileMenu) setMobileMenu(false, true);
  });

  document.addEventListener('click', event => {
    if (!mobileMenu.classList.contains('open')) return;
    if (mobileMenu.contains(event.target) || mobileToggle.contains(event.target)) return;
    setMobileMenu(false, true);
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      setMobileMenu(false, true);
    });
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && mobileMenu.classList.contains('open')) {
      setMobileMenu(false, true);
      return;
    }
    if (event.key === 'Tab' && mobileMenu.classList.contains('open')) {
      const focusableItems = Array.from(mobileMenu.querySelectorAll('a[href], button:not([disabled])'));
      if (!focusableItems.length) return;
      const first = focusableItems[0];
      const last = focusableItems[focusableItems.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && mobileMenu.classList.contains('open')) {
      setMobileMenu(false);
    }
  });

  /* --- FILTER PILLS (CATALOG) --- */
  renderCatalogPreview();
  const filterPills = document.querySelectorAll('.filter-bar .filter-pill');
  const bladeCards = document.querySelectorAll('.blade-card');
  const filterCount = document.getElementById('filterCount');

  bladeCards.forEach(card => {
    const image = card.querySelector('.blade-card-img');
    const arrow = card.querySelector('.blade-arrow');
    const bladeName = card.querySelector('.blade-name')?.textContent.trim();
    if (!bladeName) return;

    const openCardQuickView = e => {
      if (e.target.closest('button, a')) return;
      openQuickView(bladeName);
    };

    image?.addEventListener('click', openCardQuickView);
    arrow?.addEventListener('click', openCardQuickView);
  });

  filterPills.forEach(pill => {
    pill.addEventListener('click', function() {
      filterPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      if (!filter) return;
      let visible = 0;
      bladeCards.forEach(card => {
        const cat = card.getAttribute('data-category');
        const show = filter === 'all' || cat === filter;
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      });
      filterCount.textContent = `${visible} blade${visible !== 1 ? 's' : ''}`;
    });
  });

  /* --- FAQ ACCORDION --- */
  document.querySelectorAll('.faq-question').forEach((btn, index) => {
    const answer = btn.closest('.faq-item')?.querySelector('.faq-answer');
    if (answer) {
      const questionId = btn.id || `faq-question-${index + 1}`;
      const answerId = answer.id || `faq-answer-${index + 1}`;
      btn.id = questionId;
      btn.setAttribute('aria-controls', answerId);
      answer.id = answerId;
      answer.setAttribute('aria-labelledby', questionId);
    }
    btn.addEventListener('click', function() {
      const item = this.closest('.faq-item');
      const isOpen = item.classList.contains('open');

      // Close all
      document.querySelectorAll('.faq-item').forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });

      // Open clicked if was closed
      if (!isOpen) {
        item.classList.add('open');
        this.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* --- TESTIMONIALS CAROUSEL --- */
  const track = document.getElementById('testiTrack');
  const dots = document.querySelectorAll('.testi-dot');
  const cards = document.querySelectorAll('.testi-card');
  let currentSlide = 0;
  const totalSlides = 3;

  function goToSlide(n) {
    currentSlide = ((n % totalSlides) + totalSlides) % totalSlides;
    const cardW = cards[0].offsetWidth + 24;
    track.style.transform = `translateX(-${currentSlide * cardW}px)`;
    dots.forEach((d, i) => {
      d.classList.toggle('active', i === currentSlide);
      d.setAttribute('aria-selected', i === currentSlide ? 'true' : 'false');
    });
    cards.forEach((c, i) => c.classList.toggle('active', i === currentSlide));
  }

  document.getElementById('testiPrev').addEventListener('click', () => goToSlide(currentSlide - 1));
  document.getElementById('testiNext').addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach(d => d.addEventListener('click', () => goToSlide(+d.getAttribute('data-index'))));

  // Auto-advance
  let autoPlay = setInterval(() => goToSlide(currentSlide + 1), 6000);
  track.addEventListener('mouseenter', () => clearInterval(autoPlay));
  track.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => goToSlide(currentSlide + 1), 6000);
  });

  // Touch swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
  });

  /* --- GALLERY FILTER PILLS --- */
  const WORKSHOP_GALLERY = [
    { image: 'fire_forge.png', width: 1070, height: 1470, categories: 'forge workshop', title: 'Forge Fire', description: 'The intense heat that prepares high-carbon steel for shaping.', alt: 'Forge fire glowing inside the Pangasinan Blades workshop' },
    { image: 'forging_metal.png', width: 1024, height: 1536, categories: 'forge craftsmanship', title: 'Forging the Blade', description: 'Heated steel is shaped through controlled hammer work.', alt: 'A Pangasinan Blades craftsman forging heated blade steel' },
    { image: 'smoke_forge.png', width: 1023, height: 1537, categories: 'forge workshop', title: 'At the Forge', description: 'Smoke and heat mark the early stages of the blade-making process.', alt: 'Smoke rising from the working forge in the blade workshop' },
    { image: 'quenching.png', width: 1024, height: 1535, categories: 'forge finishing', title: 'Heat Treatment', description: 'The heated blade is quenched to develop strength and dependable edge performance.', alt: 'A heated blade being quenched during heat treatment' },
    { image: 'grinding.png', width: 1023, height: 1537, categories: 'finishing craftsmanship', title: 'Blade Grinding', description: 'The blade profile and bevels are refined with careful, even passes.', alt: 'A craftsman grinding the profile of a handmade blade' },
    { image: 'grinding_sparks.png', width: 992, height: 1586, categories: 'finishing craftsmanship', title: 'Precision Grinding', description: 'Controlled grinding removes material while preserving the intended geometry.', alt: 'Sparks flying during precision blade grinding' },
    { image: 'craftsmanship.png', width: 1023, height: 1537, categories: 'craftsmanship workshop', title: 'Hand Craftsmanship', description: 'Skilled hands guide each stage of a made-to-order blade.', alt: 'Hand craftsmanship inside the Pangasinan Blades workshop' },
    { image: 'craftsmanship2.png', width: 1023, height: 1537, categories: 'craftsmanship workshop', title: 'Workshop Craft', description: 'Traditional experience and modern precision come together at the bench.', alt: 'Traditional blade craftsmanship at the workshop bench' },
    { image: 'finished_1.jpg', width: 1536, height: 2048, categories: 'finished craftsmanship', title: 'Finished Blade', description: 'A completed Pangasinan blade prepared for final inspection.', alt: 'A completed handcrafted Pangasinan blade' },
    { image: 'finished_2.jpg', width: 1536, height: 2048, categories: 'finished craftsmanship', title: 'Hand-Finished Profile', description: 'A refined blade profile showing balanced proportions and a clean finish.', alt: 'Close view of a hand-finished blade profile' },
    { image: 'finished_3.jpg', width: 1728, height: 1296, categories: 'finished workshop', title: 'Completed Blade Selection', description: 'Finished work representing the range of traditional forms made in the workshop.', alt: 'A selection of completed blades from Pangasinan Blades' },
    { image: 'finished_4.jpg', width: 1536, height: 2048, categories: 'finished craftsmanship', title: 'Final Assembly', description: 'Blade, handle, and scabbard brought together as a complete piece.', alt: 'A fully assembled handcrafted blade and scabbard' },
    { image: 'finished_5.jpg', width: 1536, height: 2048, categories: 'finished craftsmanship', title: 'Ready for Inspection', description: 'A completed blade checked for finish, fit, and overall craftsmanship.', alt: 'A finished blade ready for workshop inspection' },
    { image: 'finished_6.jpg', width: 1536, height: 2048, categories: 'finished craftsmanship', title: 'Finished Craftsmanship', description: 'Careful hand finishing gives each made-to-order blade its individual character.', alt: 'Detailed craftsmanship on a completed Pangasinan blade' },
    { image: 'finished_7.jpg', width: 864, height: 648, categories: 'finished workshop', title: 'Workshop Selection', description: 'Completed pieces displaying the workshop’s practical and traditional blade forms.', alt: 'Finished blades displayed together in the workshop' }
  ];

  const galleryPills = document.querySelectorAll('.gallery-filters .filter-pill');
  const galleryGrid = document.getElementById('galleryGrid');
  if (galleryGrid) {
    galleryGrid.innerHTML = WORKSHOP_GALLERY.map((item) => `
      <article class="gallery-item" role="listitem" tabindex="0"
        data-gallery-category="${item.categories}"
        data-gallery-title="${item.title}"
        data-gallery-description="${item.description}"
        aria-label="View ${item.title}">
        <div class="gallery-item-bg">
          <img src="assets/images/workshop/${item.image}" width="${item.width}" height="${item.height}"
            alt="${item.alt}" loading="lazy" decoding="async">
        </div>
        <div class="gallery-item-hover" aria-hidden="true">
          <div class="gallery-item-meta">
            <strong>${item.title}</strong>
            <span>${item.description}</span>
          </div>
          <span class="gallery-expand">+</span>
        </div>
      </article>`).join('');
  }
  const galleryItems = document.querySelectorAll('.gallery-item[data-gallery-category]');
  const galleryLightbox = document.getElementById('galleryLightbox');
  const galleryLightboxImage = document.getElementById('galleryLightboxImage');
  const galleryLightboxTitle = document.getElementById('galleryLightboxTitle');
  const galleryLightboxDescription = document.getElementById('galleryLightboxDescription');
  const galleryLightboxCount = document.getElementById('galleryLightboxCount');
  const galleryLightboxClose = document.getElementById('galleryLightboxClose');
  const galleryLightboxPrev = document.getElementById('galleryLightboxPrev');
  const galleryLightboxNext = document.getElementById('galleryLightboxNext');
  let galleryActiveIndex = 0;

  function getVisibleGalleryItems() {
    return Array.from(galleryItems).filter(item => !item.classList.contains('is-hidden'));
  }

  function renderGalleryLightbox() {
    const visibleItems = getVisibleGalleryItems();
    const activeItem = visibleItems[galleryActiveIndex];
    if (!activeItem || !galleryLightboxImage) return;

    const sourceImage = activeItem.querySelector('img');
    const title = activeItem.dataset.galleryTitle || sourceImage?.alt || 'Gallery image';
    const description = activeItem.dataset.galleryDescription || '';
    galleryLightboxImage.innerHTML = '';
    if (sourceImage) {
      const fullImage = sourceImage.cloneNode();
      fullImage.removeAttribute('loading');
      galleryLightboxImage.appendChild(fullImage);
    }
    galleryLightboxTitle.textContent = title;
    galleryLightboxDescription.textContent = description;
    galleryLightboxCount.textContent = `${galleryActiveIndex + 1} / ${visibleItems.length}`;
  }

  function openGalleryLightbox(item) {
    const visibleItems = getVisibleGalleryItems();
    galleryActiveIndex = Math.max(0, visibleItems.indexOf(item));
    renderGalleryLightbox();
    galleryLightbox.classList.add('open');
    galleryLightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    activateDialogFocus(galleryLightbox, galleryLightboxClose);
  }

  function closeGalleryLightbox() {
    galleryLightbox.classList.remove('open');
    galleryLightbox.setAttribute('aria-hidden', 'true');
    galleryLightboxImage.innerHTML = '';
    deactivateDialogFocus(galleryLightbox);
    document.body.style.overflow = '';
  }

  function moveGalleryLightbox(direction) {
    const visibleItems = getVisibleGalleryItems();
    if (!visibleItems.length) return;
    galleryActiveIndex = (galleryActiveIndex + direction + visibleItems.length) % visibleItems.length;
    renderGalleryLightbox();
  }

  galleryPills.forEach(pill => {
    pill.addEventListener('click', function() {
      galleryPills.forEach(p => p.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-gallery-filter') || 'all';

      if (galleryGrid) {
        galleryGrid.classList.toggle('is-filtered', filter !== 'all');
      }

      galleryItems.forEach(item => {
        const categories = (item.getAttribute('data-gallery-category') || '').split(/\s+/);
        const show = filter === 'all' || categories.includes(filter);
        item.classList.toggle('is-hidden', !show);
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openGalleryLightbox(item));
    item.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      event.preventDefault();
      openGalleryLightbox(item);
    });
  });

  if (galleryLightbox) {
    galleryLightbox.addEventListener('click', e => {
      if (e.target === galleryLightbox) closeGalleryLightbox();
    });
    galleryLightboxClose.addEventListener('click', closeGalleryLightbox);
    galleryLightboxPrev.addEventListener('click', () => moveGalleryLightbox(-1));
    galleryLightboxNext.addEventListener('click', () => moveGalleryLightbox(1));
    document.addEventListener('keydown', e => {
      if (!galleryLightbox.classList.contains('open')) return;
      if (e.key === 'Escape') closeGalleryLightbox();
      if (e.key === 'ArrowLeft') moveGalleryLightbox(-1);
      if (e.key === 'ArrowRight') moveGalleryLightbox(1);
    });
  }

});

/* --- UTILITY FUNCTIONS --- */
function scrollToContact(bladeName, buildDetails = '') {
  const contact = document.getElementById('contact');
  if (!contact) return;

  contact.scrollIntoView({ behavior: 'smooth', block: 'start' });
  if (bladeName) {
    setTimeout(() => {
      const subjectEl = document.getElementById('inquiryType');
      if (subjectEl) {
        subjectEl.value = buildDetails ? 'Price Quotation' : 'Product Availability';
        const msgEl = document.getElementById('message');
        if (msgEl) {
          msgEl.value = buildDetails || `I'm interested in the ${bladeName}.`;
          msgEl.dispatchEvent(new Event('input', { bubbles: true }));
          msgEl.focus();
        }
      }
    }, 600);
  }
}

function populateContactCustomer(customer = getInquiryCustomer(), overwrite = false) {
  const fields = {
    firstName: customer.firstName,
    lastName: customer.lastName,
    email: customer.email,
    phone: customer.phone,
    address: customer.address,
  };
  Object.entries(fields).forEach(([id, value]) => {
    const control = document.getElementById(id);
    if (!control) return;
    if (overwrite) control.value = value || '';
    else if (value && !control.value) control.value = value;
  });
}

function openQuickView(bladeName) {
  const blade = COMPLETE_COLLECTION.find(b => b.name === bladeName);
  if (!blade) return;
  openDrawer(blade.id);
}

let contactFormSubmitting = false;

function setContactFormStatus(type = '', message = '') {
  const status = document.getElementById('formStatus');
  if (!status) return;
  status.className = `form-status${type ? ` is-visible is-${type}` : ''}`;
  status.textContent = message;
}

function setContactSubmitState(isLoading) {
  const button = document.getElementById('contactSubmit');
  if (!button) return;
  const label = button.querySelector('.contact-submit-label');
  button.disabled = isLoading;
  button.classList.toggle('is-loading', isLoading);
  button.setAttribute('aria-busy', String(isLoading));
  if (label) label.textContent = isLoading ? 'Sending Quote Request...' : 'Submit Quote Request';
}

async function handleFormSubmit(event) {
  event.preventDefault();
  if (contactFormSubmitting) return;

  const form = event.currentTarget;
  const message = form.elements.message;
  const trimmedMessage = message.value.trim();
  message.setCustomValidity(trimmedMessage.length < 10
    ? 'Please enter at least 10 characters.'
    : '');

  if (!form.checkValidity()) {
    setContactFormStatus('error', 'Please complete all required fields and check that your email and message are valid.');
    form.reportValidity();
    form.querySelector(':invalid')?.focus();
    return;
  }

  contactFormSubmitting = true;
  setContactFormStatus();
  setContactSubmitState(true);
  console.log('Submitting inquiry...');

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json().catch(() => ({}));
    if (!response.ok || result.success !== true) throw new Error(result.message || 'Submission failed');

    form.reset();
    INQUIRY_STORE?.clearCustomer?.();
    populateInquiryCustomerControls({});
    document.getElementById('messageCounter').textContent = '0 / 2000';
    setContactFormStatus('success', 'Thank you! Your quote request has been sent successfully. We will get back to you as soon as possible.');
    console.log('Inquiry submitted successfully.');
  } catch (error) {
    setContactFormStatus('error', "We couldn't send your quote request right now. Please try again later or contact us through Facebook Messenger.");
    console.error('Submission failed.', error);
  } finally {
    contactFormSubmitting = false;
    setContactSubmitState(false);
  }
}

function initializeContactForm() {
  const form = document.getElementById('contactForm');
  const message = document.getElementById('message');
  if (!form || form.dataset.initialized === 'true') return;

  form.dataset.initialized = 'true';
  populateContactCustomer();
  form.addEventListener('submit', handleFormSubmit);
  form.addEventListener('input', () => {
    const status = document.getElementById('formStatus');
    if (status?.classList.contains('is-error')) setContactFormStatus();

    if (INQUIRY_STORE?.saveCustomer) {
      const customer = getInquiryCustomer();
      customer.firstName = form.elements.first_name?.value || '';
      customer.lastName = form.elements.last_name?.value || '';
      customer.email = form.elements.email?.value || '';
      customer.phone = form.elements.phone?.value || '';
      customer.address = form.elements.complete_address?.value || '';
      INQUIRY_STORE.saveCustomer(customer);
      populateInquiryCustomerControls(customer);
    }
  });

  if (message) {
    message.addEventListener('input', () => {
      message.setCustomValidity('');
      const counter = document.getElementById('messageCounter');
      if (counter) counter.textContent = `${message.value.length} / 2000`;
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeContactForm, { once: true });
} else {
  initializeContactForm();
}

function initializeBrevoNewsletterState() {
  const form = document.getElementById('sib-form');
  const button = form?.querySelector('.newsletter-submit');
  const loader = button?.querySelector('.progress-indicator__icon');
  const email = document.getElementById('newsletterEmail');
  const fieldError = document.getElementById('newsletterFieldError');
  const success = document.getElementById('success-message');
  const error = document.getElementById('error-message');
  if (!form || !button || !email || form.dataset.stateSync === 'true') return;

  form.dataset.stateSync = 'true';
  let resetTimer = 0;

  function resetNewsletterButton() {
    window.clearTimeout(resetTimer);
    button.disabled = false;
    button.removeAttribute('aria-busy');
    loader?.classList.add('sib-hide-loader-icon');
  }

  function panelIsActive(panel) {
    return panel?.classList.contains('sib-form-message-panel--active')
      || panel?.getAttribute('aria-hidden') === 'false'
      || panel?.style.display === 'block';
  }

  function syncNewsletterState() {
    if (!panelIsActive(success) && !panelIsActive(error)) return;
    resetNewsletterButton();
    if (panelIsActive(success)) form.reset();
  }

  const observer = new MutationObserver(syncNewsletterState);
  [success, error].forEach(panel => {
    if (panel) observer.observe(panel, { attributes: true, childList: true, subtree: true });
  });

  function validateNewsletterEmail() {
    const value = email.value.trim();
    email.setCustomValidity('');
    const message = !value
      ? 'Please enter your email address.'
      : (email.validity.typeMismatch ? 'Please enter a valid email address.' : '');

    email.setCustomValidity(message);
    email.setAttribute('aria-invalid', String(Boolean(message)));
    if (fieldError) fieldError.textContent = message;
    return !message;
  }

  email.addEventListener('input', () => {
    email.setCustomValidity('');
    email.removeAttribute('aria-invalid');
    if (fieldError) fieldError.textContent = '';
  });

  form.addEventListener('submit', async event => {
    event.preventDefault();
    event.stopImmediatePropagation();

    if (!validateNewsletterEmail()) {
      resetNewsletterButton();
      email.focus();
      return;
    }

    button.disabled = true;
    button.setAttribute('aria-busy', 'true');
    loader?.classList.remove('sib-hide-loader-icon');
    success?.classList.remove('sib-form-message-panel--active');
    error?.classList.remove('sib-form-message-panel--active');
    window.clearTimeout(resetTimer);
    resetTimer = window.setTimeout(resetNewsletterButton, 15000);

    try {
      const response = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || result.success !== true) {
        throw new Error(result.message || 'Subscription failed');
      }

      form.reset();
      success?.classList.add('sib-form-message-panel--active');
      error?.classList.remove('sib-form-message-panel--active');
    } catch (submissionError) {
      console.error('Newsletter subscription failed.', submissionError);
      error?.classList.add('sib-form-message-panel--active');
      success?.classList.remove('sib-form-message-panel--active');
    } finally {
      resetNewsletterButton();
    }
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeBrevoNewsletterState, { once: true });
} else {
  initializeBrevoNewsletterState();
}


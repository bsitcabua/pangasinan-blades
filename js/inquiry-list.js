(function initializeInquiryStore(global) {
  'use strict';

  const STORAGE_KEY = 'pangasinanBladesInquiryList';
  const CUSTOMER_STORAGE_KEY = 'pangasinanBladesInquiryCustomer';
  const STATUS_MESSAGES = Object.freeze({
    empty: 'Your Inquiry List is empty. Add at least one blade before continuing.',
    copyFailed: 'Unable to copy the quote request. Please try again or copy it manually.',
    messengerBlocked: 'Unable to open Messenger. Please allow pop-ups and try again.',
    messengerCopyFailed: 'Messenger opened, but the quote request could not be copied. Please use Copy Quote Request and paste it manually.',
  });

  function normalize(value) {
    return String(value || '').trim().replace(/\s+/g, ' ').toLowerCase();
  }

  function createKey(item) {
    const selection = item.selection || {};
    const fields = {
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

    return Object.entries(fields)
      .map(([key, value]) => `${key}:${normalize(value)}`)
      .join('|');
  }

  function prepare(item) {
    return {
      ...item,
      quantity: Math.max(1, Number(item.quantity) || 1),
      key: item.key || createKey(item),
    };
  }

  function load() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed
        .filter(item => item && item.id && item.name && item.selection)
        .map(prepare);
    } catch (error) {
      localStorage.removeItem(STORAGE_KEY);
      return [];
    }
  }

  function save(items) {
    const prepared = Array.isArray(items) ? items.map(prepare) : [];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prepared));
    return prepared;
  }

  function count(items) {
    return items.reduce((total, item) => total + (Number(item.quantity) || 1), 0);
  }

  function prepareCustomer(customer = {}) {
    return {
      firstName: String(customer.firstName || '').trim(),
      lastName: String(customer.lastName || '').trim(),
      email: String(customer.email || '').trim(),
      phone: String(customer.phone || '').trim(),
      address: String(customer.address || '').trim(),
      notes: String(customer.notes || '').trim(),
    };
  }

  function loadCustomer() {
    try {
      const parsed = JSON.parse(sessionStorage.getItem(CUSTOMER_STORAGE_KEY) || '{}');
      return prepareCustomer(parsed && typeof parsed === 'object' ? parsed : {});
    } catch (error) {
      sessionStorage.removeItem(CUSTOMER_STORAGE_KEY);
      return prepareCustomer();
    }
  }

  function saveCustomer(customer) {
    const prepared = prepareCustomer(customer);
    try {
      sessionStorage.setItem(CUSTOMER_STORAGE_KEY, JSON.stringify(prepared));
    } catch (error) {
      // The quotation still works when private browsing blocks session storage.
    }
    return prepared;
  }

  function clearCustomer() {
    try {
      sessionStorage.removeItem(CUSTOMER_STORAGE_KEY);
    } catch (error) {
      // Nothing else is required when session storage is unavailable.
    }
    return prepareCustomer();
  }

  function findDuplicateIndex(items, item) {
    const key = item.key || createKey(item);
    return items.findIndex(entry => (entry.key || createKey(entry)) === key);
  }

  function add(items, item) {
    const nextItem = prepare(item);
    const duplicateIndex = findDuplicateIndex(items, nextItem);
    if (duplicateIndex >= 0) return { items, item: nextItem, duplicateIndex };
    const next = save([...items, nextItem]);
    return { items: next, item: nextItem, duplicateIndex: -1 };
  }

  function merge(items, index, quantity) {
    if (!items[index]) return save(items);
    const next = items.map((item, itemIndex) => itemIndex === index
      ? { ...item, quantity: (Number(item.quantity) || 1) + Math.max(1, Number(quantity) || 1) }
      : item);
    return save(next);
  }

  function remove(items, key) {
    return save(items.filter(item => (item.key || createKey(item)) !== key));
  }

  function setQuantity(items, key, quantity) {
    return save(items.map(item => (item.key || createKey(item)) === key
      ? { ...item, quantity: Math.max(1, Number(quantity) || 1) }
      : item));
  }

  function formatDetails(selection, quantity) {
    return [
      `Blade Length: ${selection.bladeLength || ''}`,
      `Blade Material: ${selection.steel || ''}`,
      `Hardness: ${selection.hardness || ''}`,
      `Handle: ${selection.handle || ''}`,
      `Scabbard: ${selection.sheath || ''}`,
      selection.finish ? `Finish: ${selection.finish}` : '',
      selection.intendedUse ? `Intended Use: ${selection.intendedUse}` : '',
      selection.customization ? `Additional Notes: ${selection.customization}` : '',
      quantity ? `Quantity: ${quantity}` : '',
    ].filter(Boolean).join('\n');
  }

  function message(items) {
    return `Inquiry List\n\n${items.map(item => `${item.name}\n${formatDetails(item.selection || {}, item.quantity)}`).join('\n\n')}`;
  }

  function formatRequestedBlades(items) {
    return items.map((item, index) => [
      `${index + 1}. ${item.name}`,
      formatDetails(item.selection || {}, item.quantity),
    ].filter(Boolean).join('\n')).join('\n\n');
  }

  function quotation(items, options = {}) {
    const preparedItems = Array.isArray(items) ? items.map(prepare) : [];
    const customer = prepareCustomer(options.customer || {});
    const customerName = [customer.firstName, customer.lastName].filter(Boolean).join(' ');
    const includeCustomer = options.includeCustomer !== false;
    const includeGreeting = options.includeGreeting !== false;
    const includeClosing = options.includeClosing !== false;
    const sections = [];

    if (includeGreeting) {
      sections.push('Hello Pangasinan Blades,\n\nI would like to request a quotation for the following item(s):');
    }

    if (includeCustomer) {
      sections.push([
        'Customer Information',
        '',
        `Name: ${customerName}`,
        `Email: ${customer.email}`,
        `Phone Number: ${customer.phone}`,
        `Complete Address: ${customer.address}`,
      ].join('\n'));
    }

    sections.push(`Requested Blades\n\n${formatRequestedBlades(preparedItems)}`);
    sections.push([
      'Quotation Requested For',
      '',
      '- Product availability',
      '- Total cost',
      '- Shipping fee',
      '- Estimated production time',
      '- Estimated delivery time',
    ].join('\n'));
    sections.push(`Additional Customer Notes:\n${customer.notes}`);

    if (includeClosing) sections.push('Thank you!\n\nBest regards,');

    return sections.join('\n\n--------------------------------------------------\n\n');
  }

  global.PangasinanInquiry = {
    STORAGE_KEY,
    CUSTOMER_STORAGE_KEY,
    STATUS_MESSAGES,
    createKey,
    prepare,
    load,
    save,
    count,
    prepareCustomer,
    loadCustomer,
    saveCustomer,
    clearCustomer,
    findDuplicateIndex,
    add,
    merge,
    remove,
    setQuantity,
    formatDetails,
    formatRequestedBlades,
    message,
    quotation,
  };
})(window);

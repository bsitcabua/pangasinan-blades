(function initializeInquiryStore(global) {
  'use strict';

  const STORAGE_KEY = 'pangasinanBladesInquiryList';

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
      engraving: selection.engraving,
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
      selection.engraving ? `Engraving: ${selection.engraving}` : '',
      selection.customization ? `Additional Notes: ${selection.customization}` : '',
      quantity ? `Quantity: ${quantity}` : '',
    ].filter(Boolean).join('\n');
  }

  function message(items) {
    return `Inquiry List\n\n${items.map(item => `${item.name}\n${formatDetails(item.selection || {}, item.quantity)}`).join('\n\n')}`;
  }

  global.PangasinanInquiry = {
    STORAGE_KEY,
    createKey,
    prepare,
    load,
    save,
    count,
    findDuplicateIndex,
    add,
    merge,
    remove,
    setQuantity,
    formatDetails,
    message,
  };
})(window);

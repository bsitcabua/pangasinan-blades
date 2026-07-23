'use strict';

const assert = require('node:assert/strict');

function memoryStorage() {
  const values = new Map();
  return {
    getItem: key => values.has(key) ? values.get(key) : null,
    setItem: (key, value) => values.set(key, String(value)),
    removeItem: key => values.delete(key),
    clear: () => values.clear(),
  };
}

global.window = global;
global.localStorage = memoryStorage();
global.sessionStorage = memoryStorage();
require('../js/inquiry-list.js');

const store = global.PangasinanInquiry;
const build = {
  id: 1,
  name: 'Kampilan',
  series: 'Moro Series',
  status: 'made-to-order',
  selection: {
    bladeLength: '28 in',
    steel: '5160 Carbon Steel',
    hardness: '57-60 HRC',
    handle: 'Kamagong',
    sheath: 'Mahogany',
    finish: 'Standard Satin',
    intendedUse: 'Collection / Display',
    customization: 'No engraving',
  },
  quantity: 1,
};

let items = [];
let result = store.add(items, build);
items = result.items;
assert.equal(items.length, 1, 'Adding a build should create one entry.');
assert.equal(store.load().length, 1, 'The saved build should survive a reload.');

result = store.add(items, { ...build, quantity: 2 });
assert.equal(result.duplicateIndex, 0, 'Matching specifications should be detected as a duplicate.');
items = store.merge(items, result.duplicateIndex, result.item.quantity);
assert.equal(items[0].quantity, 3, 'Continuing a duplicate should combine quantities.');

items = store.setQuantity(items, items[0].key, 0);
assert.equal(items[0].quantity, 1, 'Quantity should never fall below one.');

const customer = store.saveCustomer({
  firstName: 'Juan',
  lastName: 'Dela Cruz',
  email: 'juan@example.com',
  phone: '0912 345 6789',
  address: 'Pangasinan',
  notes: 'Please include shipping in the quotation.',
});
assert.deepEqual(store.loadCustomer(), customer, 'Customer details should persist for the current session.');

const quotation = store.quotation(items, { customer });
assert.match(quotation, /Name: Juan Dela Cruz/);
assert.match(quotation, /Email: juan@example\.com/);
assert.match(quotation, /1\. Kampilan/);
assert.match(quotation, /Quantity: 1/);
assert.match(quotation, /Please include shipping in the quotation\./);

items = store.remove(items, items[0].key);
assert.equal(items.length, 0, 'Removing the build should leave an empty list.');
store.clearCustomer();
assert.equal(store.loadCustomer().email, '', 'Clearing customer details should remove session data.');

localStorage.setItem(store.STORAGE_KEY, '{invalid json');
assert.deepEqual(store.load(), [], 'Invalid saved data should safely return an empty list.');

console.log('Inquiry and quotation state validation passed.');

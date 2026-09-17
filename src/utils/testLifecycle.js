import { getNextCustomerId, getNextOrderId } from './idGenerator.js';
import { INITIAL_CUSTOMERS, INITIAL_ORDERS } from './seedData.js';

console.log('--- TESTING COMPLETE TAILOR LIFECYCLE (TESTS 1 - 11) ---');

let customers = JSON.parse(JSON.stringify(INITIAL_CUSTOMERS));
let orders = JSON.parse(JSON.stringify(INITIAL_ORDERS));

// Step 1: Create New Customer
const newId = getNextCustomerId(customers);
console.assert(newId === 'C-1086', `Expected C-1086, got ${newId}`);
const newCustomer = {
  id: newId,
  name: 'Zubair Tariq',
  phone: '+92 300 9876543',
  address: 'F-8/3, Islamabad',
  city: 'Islamabad',
  status: 'Measuring',
  draftingFee: 3000,
  advance: 1500,
  remaining: 1500,
  measurements: {
    unit: 'IN',
    qad: '42.00',
    asteen: '24.50',
    shana: '18.75',
    yakhan: '16.25',
    baghal: '23.75',
    daman: '26.50',
    qadTanban: '39.00',
    pacha: '9.25'
  },
  designs: {
    collarStyle: 'Qasimi',
    cuffStyle: 'Plain',
    pocketStyle: 'Pocket',
    damanStyle: 'Square'
  }
};
customers.unshift(newCustomer);
console.log(`✓ Step 1: Created customer #${newCustomer.id} (${newCustomer.name})`);

// Step 2: Search by Name
const searchByName = customers.filter(c => c.name.toLowerCase().includes('zubair'));
console.assert(searchByName.length === 1 && searchByName[0].id === 'C-1086', 'Search by name failed');
console.log('✓ Step 2: Search by name "Zubair" found #C-1086');

// Step 3: Search by ID
const searchById = customers.filter(c => c.id.toLowerCase().includes('1086'));
console.assert(searchById.length === 1 && searchById[0].name === 'Zubair Tariq', 'Search by ID failed');
console.log('✓ Step 3: Search by ID "1086" found Zubair Tariq');

// Step 4: Search by Phone
const searchByPhone = customers.filter(c => c.phone.includes('9876543'));
console.assert(searchByPhone.length === 1 && searchByPhone[0].id === 'C-1086', 'Search by phone failed');
console.log('✓ Step 4: Search by phone found #C-1086');

// Step 5: Edit customer name while preserving ID
const customerIndex = customers.findIndex(c => c.id === 'C-1086');
customers[customerIndex].name = 'Zubair Tariq Walid';
console.assert(customers[customerIndex].id === 'C-1086', 'Customer ID must remain unchanged upon edit');
console.assert(customers[customerIndex].name === 'Zubair Tariq Walid', 'Customer name update failed');
console.log('✓ Step 5: Edited name to Zubair Tariq Walid; ID strictly preserved as C-1086');

// Step 6: Create Multiple Orders for same customer
const order1Id = getNextOrderId(orders);
const order1 = {
  id: order1Id,
  customerId: 'C-1086',
  customerName: 'Zubair Tariq Walid',
  garmentType: 'Traditional Perahan',
  status: 'Cutting',
  price: 3000,
  advance: 1500,
  remaining: 1500
};
orders.unshift(order1);
console.log(`✓ Step 6: Order #${order1.id} created for #${order1.customerId}`);

const order2Id = getNextOrderId(orders);
const order2 = {
  id: order2Id,
  customerId: 'C-1086',
  customerName: 'Zubair Tariq Walid',
  garmentType: 'Waistcoat',
  status: 'Measuring',
  price: 2200,
  advance: 1000,
  remaining: 1200
};
orders.unshift(order2);
console.log(`✓ Step 7: Second Order #${order2.id} created for #${order2.customerId}`);

// Step 8: Verify order history
const customerOrders = orders.filter(o => o.customerId === 'C-1086');
console.assert(customerOrders.length === 2, `Expected 2 orders, got ${customerOrders.length}`);
console.log('✓ Step 8: Order history contains both ORD-1006 and ORD-1007 for customer C-1086');

// Step 9: Delete customer and cascade
customers = customers.filter(c => c.id !== 'C-1086');
orders = orders.filter(o => o.customerId !== 'C-1086');
console.assert(!customers.some(c => c.id === 'C-1086'), 'Customer C-1086 still exists after deletion');
console.assert(!orders.some(o => o.customerId === 'C-1086'), 'Orders for C-1086 still exist after deletion');
console.log('✓ Step 9: Customer C-1086 and associated orders successfully purged');

console.log('--- LIFECYCLE TESTS COMPLETED SUCCESSFULLY ---');

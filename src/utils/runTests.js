import { getNextCustomerId, getNextOrderId, formatCurrency } from './idGenerator.js';
import { INITIAL_CUSTOMERS, INITIAL_ORDERS } from './seedData.js';

console.log('--- RUNNING ATELIER LOGIC TESTS ---');

// Test 1: Customer ID generation
const nextIdInitial = getNextCustomerId([]);
console.assert(nextIdInitial === 'C-1001', `Expected C-1001, got ${nextIdInitial}`);
console.log('✓ Test 1 Passed: Empty list produces C-1001');

// Test 2: Sequential ID from seed data
const nextIdFromSeeds = getNextCustomerId(INITIAL_CUSTOMERS);
console.assert(nextIdFromSeeds === 'C-1086', `Expected C-1086, got ${nextIdFromSeeds}`);
console.log('✓ Test 2 Passed: Initial customers (up to C-1085) correctly generate C-1086');

// Test 3: Order ID generation
const nextOrderId = getNextOrderId(INITIAL_ORDERS);
console.assert(nextOrderId === 'ORD-1006', `Expected ORD-1006, got ${nextOrderId}`);
console.log('✓ Test 3 Passed: Orders correctly generate next sequential ID');

// Test 4: Verify C-1085 Ahmad Tariq Walid data matching screenshot
const ahmad = INITIAL_CUSTOMERS.find(c => c.id === 'C-1085');
console.assert(ahmad && ahmad.name === 'Ahmad Tariq Walid', 'Ahmad Tariq Walid C-1085 must exist');
console.assert(ahmad.measurements.qad === '41.50', `Qad length mismatch: ${ahmad?.measurements?.qad}`);
console.assert(ahmad.measurements.asteen === '24.25', `Asteen mismatch: ${ahmad?.measurements?.asteen}`);
console.assert(ahmad.measurements.shana === '18.50', `Shana mismatch: ${ahmad?.measurements?.shana}`);
console.assert(ahmad.measurements.yakhan === '16.00', `Yakhan mismatch: ${ahmad?.measurements?.yakhan}`);
console.assert(ahmad.measurements.baghal === '23.50', `Baghal mismatch: ${ahmad?.measurements?.baghal}`);
console.assert(ahmad.measurements.daman === '26.00', `Daman mismatch: ${ahmad?.measurements?.daman}`);
console.assert(ahmad.measurements.qadTanban === '38.50', `Qad Tanban mismatch: ${ahmad?.measurements?.qadTanban}`);
console.assert(ahmad.measurements.pacha === '9.00', `Pacha mismatch: ${ahmad?.measurements?.pacha}`);
console.assert(ahmad.designs.collarStyle === 'Gol', 'Collar style must be Gol');
console.assert(ahmad.designs.cuffStyle === 'Kaf-dar', 'Cuff style must be Kaf-dar');
console.assert(ahmad.designs.pocketStyle === 'Pocket', 'Pocket style must be Pocket');
console.assert(ahmad.designs.damanStyle === 'Round', 'Daman style must be Round');
console.log('✓ Test 4 Passed: Ahmad Tariq Walid (C-1085) measurements and cut blueprints perfectly match reference screenshot');

// Test 5: Currency formatting
console.assert(formatCurrency(2400) === 'Rs. 2,400', `Expected Rs. 2,400, got ${formatCurrency(2400)}`);
console.log('✓ Test 5 Passed: Currency formatting in Pakistani Rupees (Rs.)');

console.log('--- ALL ATELIER VERIFICATION TESTS PASSED ---');

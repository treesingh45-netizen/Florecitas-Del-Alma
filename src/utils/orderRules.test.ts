import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateOrderTotals,
  formatCurrency,
  validateCheckoutDetails,
  validateCustomRequest,
  LOCAL_DELIVERY_FEE,
} from './orderRules.ts';

test('calculateOrderTotals computes subtotal and pickup without delivery fee', () => {
  const items = [
    {
      id: 'roses-1',
      name: 'Eternal Romance Red Roses',
      price: 65,
      quantity: 2,
      image: '',
    },
  ];

  const totals = calculateOrderTotals(items, 'pickup');
  assert.equal(totals.subtotal, 130);
  assert.equal(totals.deliveryFee, 0);
  assert.equal(totals.discount, 0);
  // Tax is 8.6% of 130 = 11.18
  assert.equal(totals.tax, 11.18);
  assert.equal(totals.total, 141.18);
});

test('calculateOrderTotals applies local delivery fee when delivery chosen', () => {
  const items = [
    {
      id: 'spring-1',
      name: 'Pastel Sunrise Bouquet',
      price: 50,
      variationPriceDelta: 15, // Deluxe
      quantity: 1,
      image: '',
    },
  ];

  const totals = calculateOrderTotals(items, 'delivery');
  assert.equal(totals.subtotal, 65);
  assert.equal(totals.deliveryFee, LOCAL_DELIVERY_FEE);
  // Tax is 8.6% of 65 = 5.59
  assert.equal(totals.tax, 5.59);
  // Total = 65 + 12 + 5.59 = 82.59
  assert.equal(totals.total, 82.59);
});

test('calculateOrderTotals applies promo code ALMA10 discount', () => {
  const items = [
    {
      id: 'roses-1',
      name: 'Eternal Romance Red Roses',
      price: 100,
      quantity: 1,
      image: '',
    },
  ];

  const totals = calculateOrderTotals(items, 'pickup', 'ALMA10');
  assert.equal(totals.subtotal, 100);
  assert.equal(totals.discount, 10);
  // Tax is 8.6% of 90 = 7.74
  assert.equal(totals.tax, 7.74);
  assert.equal(totals.total, 97.74);
});

test('formatCurrency formats USD correctly', () => {
  assert.equal(formatCurrency(65), '$65.00');
  assert.equal(formatCurrency(124.5), '$124.50');
});

test('validateCheckoutDetails validates delivery requirements strictly', () => {
  const invalidDelivery = validateCheckoutDetails({
    customerName: 'Maria G',
    customerPhone: '602-555-0199',
    customerEmail: 'maria@example.com',
    fulfillmentMethod: 'delivery',
    requestedDate: '2026-10-20',
    recipientName: '', // Missing
    recipientAddress: '', // Missing
  });

  assert.equal(invalidDelivery.isValid, false);
  assert.ok(invalidDelivery.errors.recipientName);
  assert.ok(invalidDelivery.errors.recipientAddress);

  const validDelivery = validateCheckoutDetails({
    customerName: 'Maria Garcia',
    customerPhone: '602-555-0199',
    customerEmail: 'maria@example.com',
    fulfillmentMethod: 'delivery',
    requestedDate: '2026-10-20',
    recipientName: 'Sofia Garcia',
    recipientAddress: '9200 W Van Buren St, Tolleson, AZ',
  });

  assert.equal(validDelivery.isValid, true);
  assert.equal(Object.keys(validDelivery.errors).length, 0);
});

test('validateCustomRequest enforces consent and valid budget', () => {
  const invalid = validateCustomRequest({
    customerName: 'Carlos',
    phone: '6027258055',
    email: 'carlos@yahoo.com',
    occasion: 'Anniversary',
    budget: -10,
    requestedDate: '2026-10-25',
    privacyConsent: false,
  });

  assert.equal(invalid.isValid, false);
  assert.ok(invalid.errors.budget);
  assert.ok(invalid.errors.privacyConsent);

  const valid = validateCustomRequest({
    customerName: 'Carlos Ramirez',
    phone: '602-725-8055',
    email: 'carlos@yahoo.com',
    occasion: 'Quinceañera & Anniversary',
    budget: 120,
    requestedDate: '2026-10-25',
    privacyConsent: true,
  });

  assert.equal(valid.isValid, true);
});

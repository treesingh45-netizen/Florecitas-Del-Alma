/**
 * Florecitas Del Alma - Order & Calculation Pure Logic
 * Decoupled for fast-feedback unit testing with node:test
 */

export interface CartItem {
  id: string;
  name: string;
  price: number;
  selectedVariation?: string;
  variationPriceDelta?: number;
  quantity: number;
  cardMessage?: string;
  colorPreference?: string;
  image: string;
}

export interface OrderTotals {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
}

export const LOCAL_DELIVERY_FEE = 12.00;
export const ARIZONA_SALES_TAX_RATE = 0.086; // 8.6% Maricopa County/Tolleson combined approximate

/**
 * Calculates item subtotal, delivery fee, tax, and grand total.
 */
export function calculateOrderTotals(
  items: CartItem[],
  fulfillmentMethod: 'delivery' | 'pickup' = 'pickup',
  promoCode?: string
): OrderTotals {
  const subtotal = items.reduce((sum, item) => {
    const unitPrice = item.price + (item.variationPriceDelta || 0);
    return sum + Math.max(0, unitPrice) * Math.max(1, item.quantity);
  }, 0);

  let discount = 0;
  if (promoCode) {
    const cleaned = promoCode.trim().toUpperCase();
    if (cleaned === 'ALMA10') {
      discount = subtotal * 0.10; // 10% off
    } else if (cleaned === 'TOLLESON') {
      discount = subtotal > 50 ? 5.00 : 0; // $5 off orders over $50
    }
  }

  const deliveryFee = fulfillmentMethod === 'delivery' ? LOCAL_DELIVERY_FEE : 0.00;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = Math.round(taxableAmount * ARIZONA_SALES_TAX_RATE * 100) / 100;
  const total = Math.max(0, Math.round((taxableAmount + deliveryFee + tax) * 100) / 100);

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    deliveryFee,
    discount: Math.round(discount * 100) / 100,
    tax,
    total,
  };
}

/**
 * Formats USD currency
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}

/**
 * Validates customer checkout details
 */
export function validateCheckoutDetails(details: {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  fulfillmentMethod: 'delivery' | 'pickup';
  requestedDate: string;
  recipientName?: string;
  recipientAddress?: string;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!details.customerName || details.customerName.trim().length < 2) {
    errors.customerName = 'Please enter your full name.';
  }

  const phoneDigits = (details.customerPhone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.customerPhone = 'Please provide a valid 10-digit telephone number.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!details.customerEmail || !emailRegex.test(details.customerEmail.trim())) {
    errors.customerEmail = 'Please provide a valid email address.';
  }

  if (!details.requestedDate) {
    errors.requestedDate = 'Please select a requested delivery or pickup date.';
  }

  if (details.fulfillmentMethod === 'delivery') {
    if (!details.recipientName || details.recipientName.trim().length < 2) {
      errors.recipientName = 'Please provide the recipient\'s name for delivery.';
    }
    if (!details.recipientAddress || details.recipientAddress.trim().length < 5) {
      errors.recipientAddress = 'Please enter the recipient\'s street address in Tolleson / West Valley.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates custom arrangement request form
 */
export function validateCustomRequest(form: {
  customerName: string;
  phone: string;
  email: string;
  occasion: string;
  budget: string | number;
  requestedDate: string;
  privacyConsent: boolean;
}): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!form.customerName || form.customerName.trim().length < 2) {
    errors.customerName = 'Customer name is required.';
  }

  const phoneDigits = (form.phone || '').replace(/\D/g, '');
  if (phoneDigits.length < 10) {
    errors.phone = 'Valid telephone number is required.';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || !emailRegex.test(form.email.trim())) {
    errors.email = 'Valid email address is required.';
  }

  if (!form.occasion || form.occasion.trim().length === 0) {
    errors.occasion = 'Please specify the occasion.';
  }

  const budgetNum = Number(form.budget);
  if (isNaN(budgetNum) || budgetNum <= 0) {
    errors.budget = 'Please enter an estimated budget in USD.';
  }

  if (!form.requestedDate) {
    errors.requestedDate = 'Requested fulfillment date is required.';
  }

  if (!form.privacyConsent) {
    errors.privacyConsent = 'You must agree to Florecitas Del Alma contact terms.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

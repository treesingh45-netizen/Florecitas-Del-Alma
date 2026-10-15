import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import {
  calculateOrderTotals,
  formatCurrency,
  validateCheckoutDetails,
} from '../utils/orderRules';
import { OrderRecord } from '../types';
import { X, CheckCircle2, MapPin, Calendar, Clock, AlertCircle, Phone, ArrowLeft, Heart } from 'lucide-react';

export const CheckoutModal: React.FC = () => {
  const {
    isCheckoutOpen,
    setIsCheckoutOpen,
    cart,
    createOrder,
  } = useShop();

  const [step, setStep] = useState<'form' | 'success'>('form');
  const [submittedOrder, setSubmittedOrder] = useState<OrderRecord | null>(null);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [requestedDate, setRequestedDate] = useState(() => {
    // Tomorrow as sensible default
    const d = new Date(Date.now() + 86400000);
    return d.toISOString().split('T')[0];
  });
  const [recipientName, setRecipientName] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');
  const [pickupTimePreference, setPickupTimePreference] = useState('Afternoon (1:00 PM – 4:00 PM)');
  const [cardMessage, setCardMessage] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [notes, setNotes] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isCheckoutOpen) return null;

  const totals = calculateOrderTotals(cart, fulfillmentMethod, promoCode);

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateCheckoutDetails({
      customerName,
      customerPhone,
      customerEmail,
      fulfillmentMethod,
      requestedDate,
      recipientName,
      recipientAddress,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const order = createOrder({
        customerName,
        customerPhone,
        customerEmail,
        fulfillmentMethod,
        requestedDate,
        recipientName: fulfillmentMethod === 'delivery' ? recipientName : undefined,
        recipientPhone: fulfillmentMethod === 'delivery' ? recipientPhone : undefined,
        recipientAddress: fulfillmentMethod === 'delivery' ? recipientAddress : undefined,
        deliveryInstructions: fulfillmentMethod === 'delivery' ? deliveryInstructions : undefined,
        pickupTimePreference: fulfillmentMethod === 'pickup' ? pickupTimePreference : undefined,
        cardMessage: cardMessage || undefined,
        promoCode: promoCode || undefined,
        notes: notes || undefined,
      });

      setSubmittedOrder(order);
      setStep('success');
      setIsSubmitting(false);
    }, 600);
  };

  const handleClose = () => {
    setIsCheckoutOpen(false);
    setStep('form');
    setSubmittedOrder(null);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-title"
    >
      <div className="relative w-full max-w-3xl bg-[#F8F5ED] rounded-md shadow-2xl border border-[#E9E0D4] overflow-hidden my-6">
        {/* Header */}
        <div className="p-5 border-b border-[#E9E0D4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <Heart className="w-5 h-5 text-[#B3202D]" />
            <h2 id="checkout-title" className="font-serif text-xl font-bold text-[#39251D]">
              {step === 'form' ? 'Complete Flower Order Request' : 'Order Request Submitted'}
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1.5 rounded-full text-[#795A47] hover:bg-[#E9E0D4] transition-colors"
            aria-label="Close checkout modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleSubmitOrder} className="p-6 max-h-[80vh] overflow-y-auto space-y-6">
            {/* Fulfillment choice banner */}
            <div className="bg-white p-4 rounded-sm border border-[#E9E0D4]">
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#39251D] mb-3">
                Choose Fulfillment Method
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFulfillmentMethod('delivery')}
                  className={`p-3 text-left rounded-sm border transition-all flex items-start gap-3 ${
                    fulfillmentMethod === 'delivery'
                      ? 'border-[#B3202D] bg-[#F8F5ED] ring-1 ring-[#B3202D]'
                      : 'border-[#E9E0D4] hover:border-[#795A47]'
                  }`}
                >
                  <MapPin className="w-5 h-5 text-[#B3202D] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-serif text-sm font-bold text-[#39251D]">
                      Local Tolleson Delivery
                    </span>
                    <span className="text-xs text-[#795A47]">
                      Delivered to recipient’s home or venue in Tolleson / West Valley (+$12.00)
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFulfillmentMethod('pickup')}
                  className={`p-3 text-left rounded-sm border transition-all flex items-start gap-3 ${
                    fulfillmentMethod === 'pickup'
                      ? 'border-[#B3202D] bg-[#F8F5ED] ring-1 ring-[#B3202D]'
                      : 'border-[#E9E0D4] hover:border-[#795A47]'
                  }`}
                >
                  <Clock className="w-5 h-5 text-[#647653] shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-serif text-sm font-bold text-[#39251D]">
                      Store Pickup in Tolleson
                    </span>
                    <span className="text-xs text-[#795A47]">
                      Pick up fresh from our shop in Tolleson, AZ (Free)
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Customer Contact Details */}
            <div className="bg-white p-4 rounded-sm border border-[#E9E0D4] space-y-3">
              <h3 className="font-serif text-base font-bold text-[#39251D] border-b border-[#E9E0D4] pb-2">
                1. Your Contact Information (Sender)
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={e => setCustomerName(e.target.value)}
                    placeholder="e.g. Maria Gonzalez"
                    className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                      errors.customerName ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                    }`}
                  />
                  {errors.customerName && (
                    <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Phone Number (for confirmation) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={customerPhone}
                    onChange={e => setCustomerPhone(e.target.value)}
                    placeholder="e.g. (602) 555-0199"
                    className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                      errors.customerPhone ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                    }`}
                  />
                  {errors.customerPhone && (
                    <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#39251D] mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={customerEmail}
                  onChange={e => setCustomerEmail(e.target.value)}
                  placeholder="e.g. maria@example.com"
                  className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                    errors.customerEmail ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                  }`}
                />
                {errors.customerEmail && (
                  <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.customerEmail}</p>
                )}
              </div>
            </div>

            {/* Recipient Details or Pickup info */}
            {fulfillmentMethod === 'delivery' ? (
              <div className="bg-white p-4 rounded-sm border border-[#E9E0D4] space-y-3">
                <h3 className="font-serif text-base font-bold text-[#39251D] border-b border-[#E9E0D4] pb-2">
                  2. Delivery Recipient Details
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Recipient Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={e => setRecipientName(e.target.value)}
                      placeholder="e.g. Sofia Morales"
                      className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                        errors.recipientName ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                      }`}
                    />
                    {errors.recipientName && (
                      <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.recipientName}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Recipient Phone (for driver coordination)
                    </label>
                    <input
                      type="tel"
                      value={recipientPhone}
                      onChange={e => setRecipientPhone(e.target.value)}
                      placeholder="e.g. (602) 555-0188"
                      className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Recipient Street Address (Tolleson / West Valley) *
                  </label>
                  <input
                    type="text"
                    required
                    value={recipientAddress}
                    onChange={e => setRecipientAddress(e.target.value)}
                    placeholder="e.g. 9100 W Van Buren St, Tolleson, AZ 85353"
                    className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                      errors.recipientAddress ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                    }`}
                  />
                  {errors.recipientAddress && (
                    <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.recipientAddress}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Special Delivery Instructions
                  </label>
                  <input
                    type="text"
                    value={deliveryInstructions}
                    onChange={e => setDeliveryInstructions(e.target.value)}
                    placeholder="e.g. Gate code #1234, leave in shade on front porch, ring bell"
                    className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-sm border border-[#E9E0D4] space-y-3">
                <h3 className="font-serif text-base font-bold text-[#39251D] border-b border-[#E9E0D4] pb-2">
                  2. Pickup Timing Preference
                </h3>
                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Preferred Window for Pickup
                  </label>
                  <select
                    value={pickupTimePreference}
                    onChange={e => setPickupTimePreference(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                  >
                    <option value="Morning (9:30 AM – 12:00 PM)">Morning (9:30 AM – 12:00 PM)</option>
                    <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Late Afternoon (4:00 PM – 6:00 PM)">Late Afternoon (4:00 PM – 6:00 PM)</option>
                  </select>
                  <p className="text-[11px] text-[#795A47] mt-1">
                    Location: Tolleson, Arizona. Exact address instructions sent upon confirmation.
                  </p>
                </div>
              </div>
            )}

            {/* Date & Card Message */}
            <div className="bg-white p-4 rounded-sm border border-[#E9E0D4] space-y-3">
              <h3 className="font-serif text-base font-bold text-[#39251D] border-b border-[#E9E0D4] pb-2">
                3. Requested Fulfillment Date & Gift Note
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Requested Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={requestedDate}
                    onChange={e => setRequestedDate(e.target.value)}
                    className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                      errors.requestedDate ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                    }`}
                  />
                  {errors.requestedDate && (
                    <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.requestedDate}</p>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Promo Code (optional)
                  </label>
                  <input
                    type="text"
                    value={promoCode}
                    onChange={e => setPromoCode(e.target.value)}
                    placeholder="e.g. ALMA10"
                    className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs uppercase focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#39251D] mb-1">
                  Gift Card Message (Included with arrangement)
                </label>
                <textarea
                  rows={2}
                  value={cardMessage}
                  onChange={e => setCardMessage(e.target.value)}
                  placeholder="Enter the words you would like handwritten or printed on the enclosure card..."
                  className="w-full text-xs p-3 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#39251D] mb-1">
                  Additional Notes or Requests for Florist
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  placeholder="e.g. Please use extra baby's breath, or call before arriving"
                  className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                />
              </div>
            </div>

            {/* Order Disclosures & Totals */}
            <div className="bg-[#E9E0D4]/40 p-4 rounded-sm border border-[#E9E0D4] space-y-2">
              <div className="flex justify-between text-xs text-[#795A47]">
                <span>Items Subtotal ({cart.length} bouquets):</span>
                <span className="font-medium text-[#39251D]">{formatCurrency(totals.subtotal)}</span>
              </div>
              {totals.discount > 0 && (
                <div className="flex justify-between text-xs text-[#647653]">
                  <span>Discount:</span>
                  <span>-{formatCurrency(totals.discount)}</span>
                </div>
              )}
              <div className="flex justify-between text-xs text-[#795A47]">
                <span>
                  {fulfillmentMethod === 'delivery' ? 'Local Tolleson Delivery Fee:' : 'Store Pickup:'}
                </span>
                <span className="font-medium text-[#39251D]">
                  {totals.deliveryFee === 0 ? 'FREE' : formatCurrency(totals.deliveryFee)}
                </span>
              </div>
              <div className="flex justify-between text-xs text-[#795A47]">
                <span>Sales Tax (AZ 8.6%):</span>
                <span className="font-medium text-[#39251D]">{formatCurrency(totals.tax)}</span>
              </div>
              <div className="pt-2 border-t border-[#795A47]/30 flex justify-between items-baseline font-serif">
                <span className="text-base font-bold text-[#39251D]">Estimated Total:</span>
                <span className="text-xl font-bold text-[#B3202D]">{formatCurrency(totals.total)}</span>
              </div>

              {/* Order policy disclosure */}
              <div className="pt-3 border-t border-[#795A47]/20 flex items-start gap-2 text-[11px] text-[#795A47] leading-relaxed">
                <AlertCircle className="w-4 h-4 text-[#B3202D] shrink-0 mt-0.5" />
                <span>
                  <strong>Order Request Disclosure:</strong> This submission initiates an order request. Florecitas Del Alma reviews each order individually to confirm flower freshness, delivery schedule, and arrange final payment via card or phone. No payment is charged online at this step.
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={handleClose}
                className="py-2.5 px-4 text-xs font-semibold text-[#795A47] hover:text-[#39251D] transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="py-3 px-6 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
              >
                {isSubmitting ? 'Submitting Your Request...' : 'Submit Flower Order Request'}
              </button>
            </div>
          </form>
        ) : (
          /* Confirmation State */
          <div className="p-6 sm:p-8 space-y-6 text-center">
            <div className="w-16 h-16 bg-[#647653]/15 text-[#647653] rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-[#647653] font-semibold">
                Order Request Received
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
                Thank You, {submittedOrder?.customerName}!
              </h3>
              <p className="font-serif italic text-base text-[#795A47]">
                “Más que flores, un sentimiento.”
              </p>
            </div>

            <div className="bg-white p-5 rounded-sm border border-[#E9E0D4] text-left max-w-lg mx-auto space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-[#E9E0D4]">
                <span className="text-[#795A47]">Order Reference:</span>
                <span className="font-mono font-bold text-sm text-[#39251D]">{submittedOrder?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#795A47]">Fulfillment:</span>
                <span className="font-semibold capitalize text-[#39251D]">
                  {submittedOrder?.fulfillmentMethod} ({submittedOrder?.requestedDate})
                </span>
              </div>
              {submittedOrder?.recipientAddress && (
                <div className="flex justify-between">
                  <span className="text-[#795A47]">Deliver To:</span>
                  <span className="font-medium text-[#39251D] text-right max-w-xs">
                    {submittedOrder.recipientName} • {submittedOrder.recipientAddress}
                  </span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-[#795A47]">Estimated Total:</span>
                <span className="font-serif font-bold text-[#B3202D] text-sm">
                  {formatCurrency(submittedOrder?.total || 0)}
                </span>
              </div>
            </div>

            {/* Official Confirmation Notice verbatim per brief */}
            <div className="bg-[#E9E0D4]/40 p-4 rounded-sm border border-[#E9E0D4] text-xs text-[#39251D] text-left max-w-lg mx-auto leading-relaxed space-y-2 font-sans">
              <p className="font-semibold text-[#39251D]">What Happens Next?</p>
              <p>
                Our floral artisans will review your flower selections and requested date. We will contact you at{' '}
                <strong className="text-[#B3202D]">{submittedOrder?.customerPhone}</strong> to confirm availability, fulfillment details, and finalize your order.
              </p>
              <p>
                For immediate assistance, please call Florecitas Del Alma directly at{' '}
                <a href="tel:+16027258055" className="text-[#B3202D] font-bold underline">
                  +1 602-725-8055
                </a>.
              </p>
            </div>

            <button
              onClick={handleClose}
              className="py-3 px-8 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              Back to Florecitas Del Alma
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

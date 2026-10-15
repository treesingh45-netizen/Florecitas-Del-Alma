import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency, calculateOrderTotals } from '../utils/orderRules';
import { X, Trash2, ArrowRight, ShoppingBag, ShieldCheck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    isCartOpen,
    setIsCartOpen,
    cart,
    removeFromCart,
    updateQuantity,
    setIsCheckoutOpen,
    setCurrentPage,
  } = useShop();

  const [promoCodeInput, setPromoCodeInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | undefined>(undefined);
  const [promoError, setPromoError] = useState<string | null>(null);

  if (!isCartOpen) return null;

  const totals = calculateOrderTotals(cart, 'pickup', appliedPromo);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError(null);
    const code = promoCodeInput.trim().toUpperCase();
    if (code === 'ALMA10' || code === 'TOLLESON') {
      setAppliedPromo(code);
      setPromoCodeInput('');
    } else {
      setPromoError('Invalid promo code. Try "ALMA10" for 10% off.');
    }
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
    >
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F8F5ED] shadow-2xl flex flex-col justify-between border-l border-[#E9E0D4]">
          {/* Header */}
          <div className="p-5 border-b border-[#E9E0D4] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#B3202D]" />
              <h2 id="cart-title" className="font-serif text-xl font-bold text-[#39251D]">
                Your Flower Order
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-[#795A47] hover:bg-[#E9E0D4] transition-colors"
              aria-label="Close flower order cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <ShoppingBag className="w-12 h-12 text-[#795A47]/40 mx-auto" />
                <h3 className="font-serif text-lg font-semibold text-[#39251D]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[#795A47] max-w-xs mx-auto">
                  Browse our fresh roses and curated floral collections to share a heartfelt sentiment.
                </p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    setCurrentPage('shop');
                  }}
                  className="inline-flex py-2 px-5 bg-[#39251D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#B3202D] transition-colors"
                >
                  Explore Flowers
                </button>
              </div>
            ) : (
              cart.map(item => {
                const itemTotal = (item.price + (item.variationPriceDelta || 0)) * item.quantity;
                return (
                  <div
                    key={item.cartId}
                    className="flex gap-3.5 p-3 bg-white border border-[#E9E0D4] rounded-sm shadow-2xs"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-24 object-cover rounded-xs border border-[#E9E0D4] shrink-0"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif text-sm font-bold text-[#39251D] leading-tight">
                            {item.name}
                          </h4>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-[#795A47] hover:text-[#B3202D] p-1 transition-colors"
                            aria-label={`Remove ${item.name}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-xs text-[#795A47] mt-0.5">
                          Size: <span className="font-medium text-[#39251D]">{item.variationName}</span>
                          {item.colorPreference && ` • ${item.colorPreference}`}
                        </p>
                        {item.cardMessage && (
                          <p className="text-[11px] text-[#795A47] italic mt-1 line-clamp-1 bg-[#F8F5ED] px-2 py-0.5 rounded-xs">
                            Card: "{item.cardMessage}"
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#E9E0D4]/60">
                        {/* Quantity controls */}
                        <div className="inline-flex items-center border border-[#E9E0D4] rounded-xs text-xs">
                          <button
                            onClick={() => updateQuantity(item.cartId, -1)}
                            className="px-2 py-0.5 text-[#39251D] hover:bg-[#E9E0D4]"
                            aria-label="Decrease item quantity"
                          >
                            -
                          </button>
                          <span className="px-2.5 py-0.5 font-semibold text-[#39251D]">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.cartId, 1)}
                            className="px-2 py-0.5 text-[#39251D] hover:bg-[#E9E0D4]"
                            aria-label="Increase item quantity"
                          >
                            +
                          </button>
                        </div>

                        <span className="font-serif text-sm font-bold text-[#B3202D]">
                          {formatCurrency(itemTotal)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}

            {/* Promo Code section */}
            {cart.length > 0 && (
              <div className="pt-2">
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <input
                    type="text"
                    value={promoCodeInput}
                    onChange={e => setPromoCodeInput(e.target.value)}
                    placeholder="Promo code (e.g. ALMA10)"
                    className="flex-1 text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-xs uppercase focus:outline-none focus:border-[#B3202D]"
                  />
                  <button
                    type="submit"
                    className="py-2 px-3 bg-[#39251D] hover:bg-[#795A47] text-white text-xs font-semibold rounded-xs transition-colors"
                  >
                    Apply
                  </button>
                </form>
                {promoError && (
                  <p className="text-[11px] text-[#B3202D] mt-1">{promoError}</p>
                )}
                {appliedPromo && (
                  <p className="text-[11px] text-[#647653] font-medium mt-1">
                    Promo code "{appliedPromo}" applied!
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Footer Summary & Proceed */}
          {cart.length > 0 && (
            <div className="p-5 bg-white border-t border-[#E9E0D4] space-y-3">
              <div className="space-y-1.5 text-xs text-[#795A47]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#39251D]">{formatCurrency(totals.subtotal)}</span>
                </div>
                {totals.discount > 0 && (
                  <div className="flex justify-between text-[#647653]">
                    <span>Discount ({appliedPromo})</span>
                    <span>-{formatCurrency(totals.discount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Local Taxes (AZ 8.6%)</span>
                  <span>{formatCurrency(totals.tax)}</span>
                </div>
                <div className="flex justify-between text-[11px] text-[#795A47]/80">
                  <span>Fulfillment (Tolleson Delivery or Pickup)</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="pt-2 border-t border-[#E9E0D4] flex justify-between items-baseline">
                <span className="font-serif text-base font-bold text-[#39251D]">Estimated Total</span>
                <span className="font-serif text-xl font-bold text-[#B3202D]">
                  {formatCurrency(totals.total)}
                </span>
              </div>

              <button
                onClick={handleProceedToCheckout}
                className="w-full py-3 px-4 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2"
              >
                <span>Continue to Fulfillment & Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-[#795A47]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#647653]" />
                <span>Personal shop confirmation with every order</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

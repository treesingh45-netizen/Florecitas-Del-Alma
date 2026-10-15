import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FlowerProduct } from '../types';
import { formatCurrency } from '../utils/orderRules';
import { CardSentimentAssistant } from './CardSentimentAssistant';
import { X, Check, Sparkles, MapPin, ShieldCheck, Heart } from 'lucide-react';

interface ProductDetailModalProps {
  product: FlowerProduct;
  onClose: () => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({ product, onClose }) => {
  const { addToCart } = useShop();

  const [selectedVariationIndex, setSelectedVariationIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(
    product.availableColors && product.availableColors.length > 0 ? product.availableColors[0] : ''
  );
  const [quantity, setQuantity] = useState(1);
  const [cardMessage, setCardMessage] = useState('');
  const [showAiAssistant, setShowAiAssistant] = useState(false);
  const [activeImage, setActiveImage] = useState(product.image);

  const currentVariation = product.variations[selectedVariationIndex] || {
    name: 'Standard',
    stemCount: 'Standard Bouquet',
    priceDelta: 0,
    description: '',
  };

  const calculatedUnitPrice = product.price + currentVariation.priceDelta;

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      variationName: currentVariation.name,
      variationPriceDelta: currentVariation.priceDelta,
      colorPreference: selectedColor || undefined,
      quantity,
      cardMessage: cardMessage.trim() || undefined,
      image: product.image,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#F8F5ED] rounded-md shadow-2xl border border-[#E9E0D4] overflow-hidden my-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-white/90 text-[#39251D] hover:bg-[#E9E0D4] transition-colors shadow-xs"
          aria-label="Close product view"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Visual Column */}
          <div className="bg-[#E9E0D4]/30 p-6 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E9E0D4]">
            <div className="space-y-4">
              <div className="aspect-4/5 w-full rounded-sm overflow-hidden border border-[#E9E0D4] bg-white shadow-xs">
                <img
                  src={activeImage}
                  alt={product.name}
                  className="w-full h-full object-cover transition-all duration-300"
                />
              </div>

              {/* Thumbnails if secondary available */}
              {product.secondaryImage && (
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveImage(product.image)}
                    className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all ${
                      activeImage === product.image ? 'border-[#B3202D]' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={product.image} alt="Primary angle" className="w-full h-full object-cover" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`w-16 h-16 rounded-xs overflow-hidden border-2 transition-all ${
                      activeImage === product.secondaryImage ? 'border-[#B3202D]' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="Secondary angle" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>

            {/* Local artisan reassurance badge */}
            <div className="mt-6 pt-4 border-t border-[#E9E0D4]/80 text-xs text-[#795A47] space-y-1.5">
              <div className="flex items-center gap-2 text-[#39251D] font-medium">
                <MapPin className="w-4 h-4 text-[#B3202D]" />
                <span>Handcrafted in Tolleson, Arizona</span>
              </div>
              <p className="text-[11px] text-[#795A47]">
                Every stem is trimmed and arranged fresh to order. Same-day & advance reservations available.
              </p>
            </div>
          </div>

          {/* Form & Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[85vh] overflow-y-auto">
            <form onSubmit={handleAddToCart} className="space-y-5">
              <div>
                <span className="text-xs uppercase tracking-widest text-[#795A47] font-semibold">
                  {product.category}
                </span>
                <h2
                  id="product-modal-title"
                  className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D] mt-1 leading-snug"
                >
                  {product.name}
                </h2>
                <div className="mt-2 flex items-baseline gap-3">
                  <span className="font-serif text-2xl font-bold text-[#B3202D]">
                    {formatCurrency(calculatedUnitPrice)}
                  </span>
                  {currentVariation.priceDelta > 0 && (
                    <span className="text-xs text-[#795A47]">
                      (includes +{formatCurrency(currentVariation.priceDelta)} {currentVariation.name} upgrade)
                    </span>
                  )}
                </div>
              </div>

              <p className="text-sm text-[#39251D]/90 leading-relaxed font-sans">
                {product.fullDescription}
              </p>

              {product.floralStemBreakdown && (
                <div className="p-3 bg-white border border-[#E9E0D4] rounded-xs text-xs text-[#795A47]">
                  <strong className="text-[#39251D] block mb-0.5">Florist Stem Composition:</strong>
                  {product.floralStemBreakdown}
                </div>
              )}

              {/* Variation Selection (Standard / Deluxe / Premium) */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#39251D] mb-2">
                  Select Size & Fullness
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {product.variations.map((v, idx) => (
                    <button
                      key={v.name}
                      type="button"
                      onClick={() => setSelectedVariationIndex(idx)}
                      className={`p-2.5 text-left rounded-xs border transition-all text-xs flex flex-col justify-between ${
                        selectedVariationIndex === idx
                          ? 'border-[#B3202D] bg-[#FFFFFF] ring-1 ring-[#B3202D]'
                          : 'border-[#E9E0D4] bg-white hover:border-[#795A47]'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-[#39251D]">
                        <span>{v.name}</span>
                        {selectedVariationIndex === idx && (
                          <Check className="w-3.5 h-3.5 text-[#B3202D]" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#795A47] mt-1">{v.stemCount}</span>
                      <span className="text-[11px] font-semibold text-[#B3202D] mt-1">
                        {v.priceDelta === 0 ? 'Standard' : `+${formatCurrency(v.priceDelta)}`}
                      </span>
                    </button>
                  ))}
                </div>
                {currentVariation.description && (
                  <p className="text-[11px] text-[#795A47] mt-1.5 italic">
                    {currentVariation.description}
                  </p>
                )}
              </div>

              {/* Color Preferences if available */}
              {product.availableColors && product.availableColors.length > 0 && (
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#39251D] mb-2">
                    Palette Preference
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.availableColors.map(color => (
                      <button
                        key={color}
                        type="button"
                        onClick={() => setSelectedColor(color)}
                        className={`px-3 py-1.5 text-xs rounded-full border transition-all ${
                          selectedColor === color
                            ? 'bg-[#39251D] text-white border-[#39251D]'
                            : 'bg-white text-[#39251D] border-[#E9E0D4] hover:border-[#795A47]'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#39251D] mb-2">
                  Quantity
                </label>
                <div className="inline-flex items-center border border-[#E9E0D4] bg-white rounded-xs">
                  <button
                    type="button"
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="px-3 py-1.5 text-base text-[#39251D] hover:bg-[#E9E0D4]/40"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-4 py-1.5 text-xs font-semibold text-[#39251D]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(q => q + 1)}
                    className="px-3 py-1.5 text-base text-[#39251D] hover:bg-[#E9E0D4]/40"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Recipient Gift Card Message */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#39251D]">
                    Complimentary Gift Card Message
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowAiAssistant(prev => !prev)}
                    className="text-xs text-[#B3202D] hover:underline flex items-center gap-1 font-medium"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{showAiAssistant ? 'Hide Message Advisor' : 'Help Me Write a Card Message'}</span>
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={cardMessage}
                  onChange={e => setCardMessage(e.target.value)}
                  placeholder="Include a heartfelt message for your recipient card (or use our sentiment advisor above)..."
                  className="w-full text-xs p-3 bg-white border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D] font-sans"
                />

                {/* AI Sentiment Assistant */}
                {showAiAssistant && (
                  <CardSentimentAssistant
                    flowerName={product.name}
                    onApplyMessage={msg => {
                      setCardMessage(msg);
                      setShowAiAssistant(false);
                    }}
                  />
                )}
              </div>

              {/* Actions */}
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs flex items-center justify-center gap-2"
                >
                  <Heart className="w-4 h-4 fill-white" />
                  <span>Add to Flower Order — {formatCurrency(calculatedUnitPrice * quantity)}</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-[#795A47] pt-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#647653]" />
                  Freshness Guarantee
                </span>
                <span>•</span>
                <span>Pickup or Local Tolleson Delivery</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

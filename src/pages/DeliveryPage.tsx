import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Truck, Clock, MapPin, Phone, Mail, ChevronDown, ChevronUp, Check, ArrowRight } from 'lucide-react';

export const DeliveryPage: React.FC = () => {
  const { navigateToPage } = useShop();

  // FAQ Accordion State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaq(prev => (prev === idx ? null : idx));
  };

  const faqs = [
    {
      q: 'How far in advance should I submit my flower order?',
      a: 'We recommend placing orders at least 24 to 48 hours in advance so our florists can source the freshest prime stems. For large celebrations, milestone anniversaries, or Quinceañeras, we advise reaching out 1 to 2 weeks ahead.',
    },
    {
      q: 'What areas in Arizona do you deliver to?',
      a: 'Our primary delivery area is Tolleson, Arizona (85353) and neighboring West Valley communities. For addresses outside this zone, please give us a call at (602) 725-8055 before ordering to confirm courier availability.',
    },
    {
      q: 'How much is local delivery in Tolleson?',
      a: 'Standard local delivery is a flat $12.00 fee. Store pickup is always completely free of charge.',
    },
    {
      q: 'How does store pickup work in Tolleson?',
      a: 'When placing your order, select "Store Pickup in Tolleson" as your fulfillment method and choose your preferred morning, afternoon, or evening window. Once your flowers are arranged and ready, we will text or call you with exact pickup instructions.',
    },
    {
      q: 'What happens if the recipient is not home during delivery?',
      a: 'Due to the Arizona climate, we never leave delicate fresh flowers in direct sunlight or extreme heat. If the recipient is unavailable, we will contact them or the sender by phone, leave the bouquet in a secure, shaded porch spot with water, or reschedule delivery.',
    },
    {
      q: 'Can I make changes or cancel an order after submitting?',
      a: 'Because cut flowers are perishable and prepared custom to order, changes or cancellations must be requested at least 24 hours prior to the fulfillment date by calling +1 602-725-8055.',
    },
    {
      q: 'Can I include a personalized card message?',
      a: 'Yes! Every arrangement includes a complimentary enclosure gift card. You can write your own message in the checkout or use our bespoke AI sentiment advisor to compose heartfelt words in English or Spanish.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
          Fulfillment & Service
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251D]">
          Your Flowers, Thoughtfully Delivered
        </h1>
        <p className="text-sm sm:text-base text-[#795A47] font-sans">
          We're here to help you arrange the perfect flowers for your special moment.
        </p>
      </div>

      {/* SECTION 1: HOW ORDERING WORKS */}
      <section className="bg-white rounded-sm border border-[#E9E0D4] p-8 sm:p-12 shadow-xs space-y-8">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#647653] font-semibold">
            Simple 4-Step Process
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
            How Ordering Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="p-4 bg-[#F8F5ED] rounded-xs border border-[#E9E0D4] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#B3202D]">1</span>
            <h3 className="font-serif text-base font-bold text-[#39251D]">
              Browse or Request
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              Browse our catalog of fresh roses and garden bouquets or submit a custom inquiry with your palette and budget.
            </p>
          </div>

          <div className="p-4 bg-[#F8F5ED] rounded-xs border border-[#E9E0D4] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#B3202D]">2</span>
            <h3 className="font-serif text-base font-bold text-[#39251D]">
              Choose Preferences
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              Select your bouquet size (Standard, Deluxe, Premium), add a personalized gift card note, and pick your requested date.
            </p>
          </div>

          <div className="p-4 bg-[#F8F5ED] rounded-xs border border-[#E9E0D4] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#B3202D]">3</span>
            <h3 className="font-serif text-base font-bold text-[#39251D]">
              Submit Order Request
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              Provide your contact details and recipient address. You will receive an immediate order reference confirmation.
            </p>
          </div>

          <div className="p-4 bg-[#F8F5ED] rounded-xs border border-[#E9E0D4] space-y-2">
            <span className="font-serif text-2xl font-bold text-[#B3202D]">4</span>
            <h3 className="font-serif text-base font-bold text-[#39251D]">
              Shop Confirmation
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              Our florist reviews the order, contacts you to confirm schedule & payment, and arranges your blooms fresh on the day.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 2 & 3: DELIVERY & PICKUP INFORMATION */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Delivery Box */}
        <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-[#B3202D]/10 rounded-full flex items-center justify-center text-[#B3202D]">
            <Truck className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#39251D]">
            Delivery Information
          </h3>
          <p className="text-xs sm:text-sm text-[#795A47] leading-relaxed">
            We provide local door-to-door floral delivery to homes, businesses, hospitals, and venues in Tolleson, Arizona and neighboring West Valley areas.
          </p>
          <ul className="space-y-2 text-xs text-[#39251D] pt-2 border-t border-[#E9E0D4]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#647653] shrink-0" />
              <span><strong>Flat Delivery Fee:</strong> $12.00 for local Tolleson/West Valley addresses.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#647653] shrink-0" />
              <span><strong>Care in Transit:</strong> Water vials & air-conditioned vehicle during transit.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#647653] shrink-0" />
              <span><strong>Recipient Notification:</strong> Direct phone call before drop-off when requested.</span>
            </li>
          </ul>
        </div>

        {/* Pickup Box */}
        <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 sm:p-8 space-y-4 shadow-xs">
          <div className="w-12 h-12 bg-[#647653]/10 rounded-full flex items-center justify-center text-[#647653]">
            <MapPin className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#39251D]">
            Store Pickup Information
          </h3>
          <p className="text-xs sm:text-sm text-[#795A47] leading-relaxed">
            Prefer to pick up your flowers in person? You can collect your arrangement fresh from our shop in Tolleson, Arizona at no extra charge.
          </p>
          <ul className="space-y-2 text-xs text-[#39251D] pt-2 border-t border-[#E9E0D4]">
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#647653] shrink-0" />
              <span><strong>Fee:</strong> Completely FREE.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#647653] shrink-0" />
              <span><strong>Flexible Windows:</strong> Morning, Afternoon, or Late Afternoon.</span>
            </li>
            <li className="flex items-center gap-2">
              <Check className="w-4 h-4 text-[#647653] shrink-0" />
              <span><strong>Presentation:</strong> Securely boxed with floral hydration ready for travel.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* SECTION 4: ORDER TIMING DISCLOSURE */}
      <div className="bg-[#E9E0D4]/40 rounded-sm border border-[#E9E0D4] p-6 sm:p-8 flex items-start gap-4">
        <Clock className="w-6 h-6 text-[#B3202D] shrink-0 mt-1" />
        <div className="space-y-1">
          <h4 className="font-serif text-lg font-bold text-[#39251D]">
            Order Timing & Availability
          </h4>
          <p className="text-xs sm:text-sm text-[#795A47] leading-relaxed font-sans">
            Because we prioritize farm-fresh flowers rather than pre-made shelf bouquets, all requested dates and special arrangements are subject to seasonal flower availability and final confirmation by our shop. We encourage advance booking to secure your preferred date and flower varieties.
          </p>
        </div>
      </div>

      {/* SECTION 5: FREQUENTLY ASKED QUESTIONS */}
      <section className="space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
            Common Questions
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#39251D]">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((item, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-sm border border-[#E9E0D4] overflow-hidden transition-all shadow-2xs"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 font-serif text-base font-bold text-[#39251D] hover:text-[#B3202D] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span>{item.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-[#795A47] shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#795A47] shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-[#795A47] leading-relaxed border-t border-[#E9E0D4]/60 font-sans">
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 6: CONTACT FOR ORDER ASSISTANCE & CTA */}
      <section className="bg-[#39251D] text-[#F8F5ED] rounded-sm p-8 sm:p-12 text-center space-y-6 shadow-xl">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F5ED]">
          Need Assistance with Your Delivery?
        </h2>
        <p className="text-xs sm:text-sm text-[#E9E0D4] max-w-md mx-auto leading-relaxed">
          Our team is here to help you plan the perfect timing, confirm delivery availability, or craft a custom bouquet for your loved one.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a
            href="tel:+16027258055"
            className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors font-medium"
          >
            <Phone className="w-4 h-4 text-[#B3202D]" />
            <span>+1 602-725-8055</span>
          </a>
          <span className="text-[#795A47] hidden sm:inline">•</span>
          <a
            href="mailto:Florcitasdelalma@yahoo.com"
            className="flex items-center gap-2 hover:text-[#FFFFFF] transition-colors"
          >
            <Mail className="w-4 h-4 text-[#B3202D]" />
            <span>Florcitasdelalma@yahoo.com</span>
          </a>
        </div>

        <div className="pt-2">
          <button
            onClick={() => navigateToPage('shop')}
            className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs inline-flex items-center gap-2"
          >
            <span>Place Your Flower Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

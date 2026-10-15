import React from 'react';
import { useShop } from '../context/ShopContext';
import { X, ShieldCheck, Truck, FileText } from 'lucide-react';

export const PolicyModal: React.FC = () => {
  const { activePolicyModal, setActivePolicyModal } = useShop();

  if (!activePolicyModal) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-4 lg:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-2xl bg-[#F8F5ED] rounded-md shadow-2xl border border-[#E9E0D4] overflow-hidden my-6">
        <div className="p-5 border-b border-[#E9E0D4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            {activePolicyModal === 'privacy' && <ShieldCheck className="w-5 h-5 text-[#647653]" />}
            {activePolicyModal === 'delivery' && <Truck className="w-5 h-5 text-[#B3202D]" />}
            {activePolicyModal === 'terms' && <FileText className="w-5 h-5 text-[#39251D]" />}
            <h2 className="font-serif text-xl font-bold text-[#39251D]">
              {activePolicyModal === 'privacy' && 'Privacy Policy'}
              {activePolicyModal === 'delivery' && 'Delivery, Pickup & Cancellation Policy'}
              {activePolicyModal === 'terms' && 'Terms and Conditions'}
            </h2>
          </div>
          <button
            onClick={() => setActivePolicyModal(null)}
            className="p-1.5 rounded-full text-[#795A47] hover:bg-[#E9E0D4] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-4 text-xs text-[#39251D] leading-relaxed font-sans">
          {activePolicyModal === 'privacy' && (
            <>
              <p>
                <strong>Florecitas Del Alma</strong> values your trust and respects your privacy. This policy outlines how we handle customer and recipient information for our floral services in Tolleson, Arizona.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Information Collected</h4>
              <p>
                We collect personal information necessary to fulfill floral orders and inquiries, including sender name, telephone number, email address, delivery address, recipient details, and personalized card messages.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">How We Use Your Information</h4>
              <p>
                Your information is used solely for order processing, arrangement customization, fulfillment coordination, and direct communication regarding your request. We never sell, rent, or trade your personal information to third parties.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Contact</h4>
              <p>
                For privacy inquiries, please contact us at <strong>Florcitasdelalma@yahoo.com</strong> or call <strong>+1 602-725-8055</strong>.
              </p>
            </>
          )}

          {activePolicyModal === 'delivery' && (
            <>
              <p>
                At <strong>Florecitas Del Alma</strong>, we handle every bouquet with utmost care to ensure your blooms arrive fresh and vibrant.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Service Area</h4>
              <p>
                We proudly provide delivery to Tolleson, Arizona and surrounding West Valley communities. Deliveries outside this region require prior confirmation with our shop.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Delivery Scheduling & Fees</h4>
              <p>
                Standard local delivery is $12.00. While we make every effort to accommodate preferred morning or afternoon windows, arrival times are subject to traffic and weather conditions, especially during extreme Arizona summer heat.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Store Pickup</h4>
              <p>
                Pickups are free of charge at our Tolleson, Arizona location. Confirmed pickup times will be arranged via phone or email once your bouquet is prepared.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Cancellations & Flower Care</h4>
              <p>
                Because fresh flowers are perishable goods cut specifically for your order, cancellation requests must be received at least 24 hours prior to the requested fulfillment date. If a recipient is not home, bouquets will be left in a shaded, safe location or coordinated directly with the recipient.
              </p>
            </>
          )}

          {activePolicyModal === 'terms' && (
            <>
              <p>
                Welcome to <strong>Florecitas Del Alma</strong>. By browsing our website, submitting order requests, or requesting custom floral arrangements, you agree to these terms.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Order Requests & Freshness Substitutions</h4>
              <p>
                Flowers are seasonal natural products. While we make every attempt to match photographs accurately, occasional substitutions of equivalent or higher value stems may occur due to market availability and seasonal prime blooms.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Pricing & Confirmation</h4>
              <p>
                Submitting an order request online does not constitute a charged transaction until our floral team confirms availability and processes your order directly with you.
              </p>
              <h4 className="font-serif text-sm font-bold text-[#39251D] pt-2">Intellectual Property</h4>
              <p>
                All brand marks, logos, photography, and copy of Florecitas Del Alma are protected and may not be reproduced without written permission.
              </p>
            </>
          )}
        </div>

        <div className="p-4 bg-white border-t border-[#E9E0D4] flex justify-end">
          <button
            onClick={() => setActivePolicyModal(null)}
            className="py-2 px-5 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold rounded-xs transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

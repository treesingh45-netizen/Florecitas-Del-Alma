import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Phone, Mail, MapPin, Instagram, CheckCircle2, MessageSquare, Send, Clock, ArrowRight } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { createContactMessage, createOrder } = useShop();

  const [activeTab, setActiveTab] = useState<'contact' | 'quick-order'>('contact');

  // Contact Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [inquiryType, setInquiryType] = useState<any>('General Question');
  const [message, setMessage] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactReference, setContactReference] = useState('');

  // Quick Order State
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickEmail, setQuickEmail] = useState('');
  const [quickProduct, setQuickProduct] = useState('Eternal Romance Red Roses (12 Stems)');
  const [quickSize, setQuickSize] = useState('Standard');
  const [quickDate, setQuickDate] = useState(() => {
    const d = new Date(Date.now() + 86400000);
    return d.toISOString().split('T')[0];
  });
  const [quickFulfillment, setQuickFulfillment] = useState<'delivery' | 'pickup'>('delivery');
  const [quickRecipientName, setQuickRecipientName] = useState('');
  const [quickRecipientAddress, setQuickRecipientAddress] = useState('');
  const [quickCardMessage, setQuickCardMessage] = useState('');
  const [quickNotes, setQuickNotes] = useState('');
  const [quickSubmitted, setQuickSubmitted] = useState(false);
  const [quickOrderRef, setQuickOrderRef] = useState('');

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!privacyConsent) return;

    const res = createContactMessage({
      fullName,
      email,
      phone,
      inquiryType,
      message,
    });

    setContactReference(res.id);
    setContactSubmitted(true);
    setFullName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setPrivacyConsent(false);
  };

  const handleQuickOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const order = createOrder({
      customerName: quickName,
      customerPhone: quickPhone,
      customerEmail: quickEmail,
      fulfillmentMethod: quickFulfillment,
      requestedDate: quickDate,
      recipientName: quickFulfillment === 'delivery' ? quickRecipientName : undefined,
      recipientAddress: quickFulfillment === 'delivery' ? quickRecipientAddress : undefined,
      cardMessage: quickCardMessage || undefined,
      notes: `Quick Order Request: ${quickProduct} (${quickSize}). ${quickNotes}`,
    });

    setQuickOrderRef(order.orderId);
    setQuickSubmitted(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
          Get in Touch
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251D]">
          Let's Make Something Beautiful
        </h1>
        <p className="text-sm sm:text-base text-[#795A47] font-sans">
          Have a question or looking for something special? Get in touch with Florecitas Del Alma, and let's find the right flowers for your occasion.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Business Contact Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-4 border-b border-[#E9E0D4] pb-6">
              <img
                src="/logo.jpg"
                alt="Florecitas Del Alma Logo"
                className="w-16 h-16 rounded-full object-cover border border-[#E9E0D4]"
              />
              <div>
                <h2 className="font-serif text-xl font-bold uppercase text-[#39251D]">
                  Florecitas Del Alma
                </h2>
                <p className="font-serif italic text-xs text-[#795A47]">
                  “Más que flores, un sentimiento.”
                </p>
                <p className="text-[11px] uppercase tracking-wider text-[#647653] font-semibold mt-1">
                  Tolleson, Arizona
                </p>
              </div>
            </div>

            <div className="space-y-4 text-xs text-[#39251D]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#B3202D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#39251D]">Location</span>
                  <span className="text-[#795A47]">Tolleson, Arizona, United States</span>
                  <span className="text-[11px] text-[#795A47] block mt-0.5">
                    Serving Tolleson & surrounding West Valley
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#B3202D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#39251D]">Telephone</span>
                  <a
                    href="tel:+16027258055"
                    className="text-[#B3202D] font-bold text-sm hover:underline"
                  >
                    +1 602-725-8055
                  </a>
                  <span className="text-[11px] text-[#795A47] block mt-0.5">
                    Click to call directly for orders & questions
                  </span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#B3202D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#39251D]">Direct Email</span>
                  <a
                    href="mailto:Florcitasdelalma@yahoo.com"
                    className="text-[#39251D] hover:text-[#B3202D] underline break-all font-medium"
                  >
                    Florcitasdelalma@yahoo.com
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Instagram className="w-4 h-4 text-[#B3202D] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block text-[#39251D]">Social Profiles</span>
                  <div className="flex items-center gap-3 mt-1">
                    <a
                      href="https://www.instagram.com/florecitas.delalma/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#B3202D] hover:underline font-medium"
                    >
                      Instagram (@florecitas.delalma)
                    </a>
                    <span>•</span>
                    <a
                      href="https://www.facebook.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#795A47] hover:underline"
                    >
                      Facebook
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E9E0D4] bg-[#F8F5ED] p-4 rounded-xs">
              <span className="block font-serif text-sm font-bold text-[#39251D] mb-1">
                Store Hours & Timing
              </span>
              <p className="text-xs text-[#795A47] leading-relaxed">
                We accept advance orders and same-day requests based on seasonal flower stock. Please call ahead to confirm immediate pickup times.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Forms (General Inquiry vs Quick Order) */}
        <div className="lg:col-span-7 bg-white rounded-sm border border-[#E9E0D4] p-6 sm:p-8 shadow-xs">
          {/* Tab Selector */}
          <div className="flex border-b border-[#E9E0D4] mb-6">
            <button
              onClick={() => setActiveTab('contact')}
              className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 mr-6 ${
                activeTab === 'contact'
                  ? 'border-[#B3202D] text-[#B3202D]'
                  : 'border-transparent text-[#795A47] hover:text-[#39251D]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Contact & Inquiry Form</span>
            </button>

            <button
              onClick={() => setActiveTab('quick-order')}
              className={`pb-3 text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all flex items-center gap-2 border-b-2 ${
                activeTab === 'quick-order'
                  ? 'border-[#B3202D] text-[#B3202D]'
                  : 'border-transparent text-[#795A47] hover:text-[#39251D]'
              }`}
            >
              <Send className="w-4 h-4" />
              <span>Quick Order Request</span>
            </button>
          </div>

          {/* TAB 1: GENERAL CONTACT FORM */}
          {activeTab === 'contact' && (
            <div>
              {contactSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#647653]/15 text-[#647653] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#39251D]">
                    Message Received!
                  </h3>
                  <p className="text-xs text-[#795A47] max-w-sm mx-auto leading-relaxed">
                    Thank you for reaching out to Florecitas Del Alma. Your inquiry (Ref #{contactReference}) has been received and our team will get back to you shortly.
                  </p>
                  <button
                    onClick={() => setContactSubmitted(false)}
                    className="py-2 px-5 bg-[#39251D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={e => setFullName(e.target.value)}
                        placeholder="e.g. Maria Gonzalez"
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={e => setPhone(e.target.value)}
                        placeholder="e.g. (602) 555-0199"
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="e.g. maria@example.com"
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Inquiry Type *
                      </label>
                      <select
                        value={inquiryType}
                        onChange={e => setInquiryType(e.target.value as any)}
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D]"
                      >
                        <option value="General Question">General Question</option>
                        <option value="Existing Order">Existing Order Status</option>
                        <option value="Custom Arrangement">Custom Floral Arrangement</option>
                        <option value="Delivery Inquiry">Delivery Area / Timing Question</option>
                        <option value="Other">Other Request</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Your Message *
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={message}
                      onChange={e => setMessage(e.target.value)}
                      placeholder="How can we help make your floral moment unforgettable?"
                      className="w-full text-xs p-3 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D] font-sans"
                    />
                  </div>

                  <div>
                    <label className="flex items-start gap-2 text-xs text-[#39251D] cursor-pointer">
                      <input
                        type="checkbox"
                        required
                        checked={privacyConsent}
                        onChange={e => setPrivacyConsent(e.target.checked)}
                        className="mt-0.5 rounded text-[#B3202D] focus:ring-[#B3202D]"
                      />
                      <span>
                        I consent to Florecitas Del Alma storing my contact information to respond to this message in accordance with the Privacy Policy. *
                      </span>
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                  >
                    Send Message
                  </button>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: STREAMLINED QUICK ORDER REQUEST */}
          {activeTab === 'quick-order' && (
            <div>
              {quickSubmitted ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-14 h-14 bg-[#647653]/15 text-[#647653] rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#39251D]">
                    Quick Order Request Submitted!
                  </h3>
                  <p className="text-xs text-[#795A47] max-w-sm mx-auto leading-relaxed">
                    Order Reference #{quickOrderRef}. We have received your quick order request. Our shop will call you to confirm availability and payment details.
                  </p>
                  <button
                    onClick={() => setQuickSubmitted(false)}
                    className="py-2 px-5 bg-[#39251D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
                  >
                    Submit Another Order Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleQuickOrderSubmit} className="space-y-4">
                  <p className="text-xs text-[#795A47]">
                    Already know what you need? Fill in the details below and we will prepare your floral request.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={quickName}
                        onChange={e => setQuickName(e.target.value)}
                        placeholder="e.g. Carlos Ramirez"
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Your Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={quickPhone}
                        onChange={e => setQuickPhone(e.target.value)}
                        placeholder="e.g. (602) 725-8055"
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Flower Arrangement or Product *
                      </label>
                      <input
                        type="text"
                        required
                        value={quickProduct}
                        onChange={e => setQuickProduct(e.target.value)}
                        placeholder="e.g. Eternal Romance Red Roses or Peonies"
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Size / Fullness *
                      </label>
                      <select
                        value={quickSize}
                        onChange={e => setQuickSize(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                      >
                        <option value="Standard">Standard</option>
                        <option value="Deluxe">Deluxe (+Volume)</option>
                        <option value="Premium">Premium Grand</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Requested Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={quickDate}
                        onChange={e => setQuickDate(e.target.value)}
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#39251D] mb-1">
                        Fulfillment Preference
                      </label>
                      <select
                        value={quickFulfillment}
                        onChange={e => setQuickFulfillment(e.target.value as any)}
                        className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                      >
                        <option value="delivery">Delivery in Tolleson / West Valley (+$12)</option>
                        <option value="pickup">Store Pickup in Tolleson, AZ (Free)</option>
                      </select>
                    </div>
                  </div>

                  {quickFulfillment === 'delivery' && (
                    <div className="p-3 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs space-y-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#39251D] mb-1">
                          Recipient Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={quickRecipientName}
                          onChange={e => setQuickRecipientName(e.target.value)}
                          placeholder="e.g. Rosa Ramirez"
                          className="w-full text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#39251D] mb-1">
                          Recipient Address in Tolleson / West Valley *
                        </label>
                        <input
                          type="text"
                          required
                          value={quickRecipientAddress}
                          onChange={e => setQuickRecipientAddress(e.target.value)}
                          placeholder="e.g. 9150 W Van Buren St, Tolleson, AZ"
                          className="w-full text-xs px-3 py-2 bg-white border border-[#E9E0D4] rounded-xs focus:outline-none"
                        />
                      </div>
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Gift Card Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={quickCardMessage}
                      onChange={e => setQuickCardMessage(e.target.value)}
                      placeholder="Note for the enclosure card..."
                      className="w-full text-xs p-3 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none font-sans"
                    />
                  </div>

                  <div className="p-3 bg-[#E9E0D4]/40 rounded-xs text-[11px] text-[#795A47]">
                    * Note: This quick order is a submitted request. We will contact you at your phone number to confirm final pricing and fulfillment.
                  </div>

                  <button
                    type="submit"
                    className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                  >
                    Submit Quick Order Request
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>

      {/* FINAL CONTACT SECTION */}
      <section className="bg-[#E9E0D4] rounded-sm p-8 sm:p-12 text-center space-y-4 border border-[#795A47]/30">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
          Need Help Choosing the Right Flowers?
        </h2>
        <p className="text-xs sm:text-sm text-[#795A47] max-w-xl mx-auto leading-relaxed font-sans">
          Contact us to discuss your floral needs, ask about available arrangements, or request a personalized bouquet.
        </p>
        <div className="pt-2">
          <a
            href="tel:+16027258055"
            className="py-3 px-8 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" />
            <span>Call +1 602-725-8055</span>
          </a>
        </div>
      </section>
    </div>
  );
};

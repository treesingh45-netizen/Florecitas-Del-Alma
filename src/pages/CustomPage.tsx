import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { validateCustomRequest, formatCurrency } from '../utils/orderRules';
import { CustomArrangementInquiry } from '../types';
import { Phone, Upload, CheckCircle2, AlertCircle, Sparkles, Image as ImageIcon, X } from 'lucide-react';

export const CustomPage: React.FC = () => {
  const { createCustomInquiry, navigateToPage } = useShop();

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [occasion, setOccasion] = useState('Birthday / Milestone');
  const [preferredFlowers, setPreferredFlowers] = useState('Red Ecuadorian Roses & Garden Florals');
  const [preferredColors, setPreferredColors] = useState('Classic Crimson & Soft Blush');
  const [budget, setBudget] = useState('95');
  const [requestedDate, setRequestedDate] = useState(() => {
    const d = new Date(Date.now() + 86400000 * 2);
    return d.toISOString().split('T')[0];
  });
  const [fulfillmentMethod, setFulfillmentMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [designDetails, setDesignDetails] = useState('');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  // Inspiration image upload preview
  const [inspirationImageName, setInspirationImageName] = useState<string | undefined>(undefined);
  const [inspirationImageData, setInspirationImageData] = useState<string | undefined>(undefined);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submittedInquiry, setSubmittedInquiry] = useState<CustomArrangementInquiry | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUploadError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Please select a valid image file (JPG, PNG, WebP).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError('Inspiration image must be under 5MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setInspirationImageData(reader.result as string);
      setInspirationImageName(file.name);
    };
    reader.readAsDataURL(file);
  };

  const removeInspirationImage = () => {
    setInspirationImageName(undefined);
    setInspirationImageData(undefined);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const validation = validateCustomRequest({
      customerName,
      phone,
      email,
      occasion,
      budget,
      requestedDate,
      privacyConsent,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      const inquiry = createCustomInquiry({
        customerName,
        phone,
        email,
        occasion,
        preferredFlowers,
        preferredColors,
        budget: Number(budget),
        requestedDate,
        fulfillmentMethod,
        designDetails,
        inspirationImageName,
        inspirationImageData,
      });

      setSubmittedInquiry(inquiry);
      setIsSubmitting(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
          Tailored Artistry
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251D]">
          Your Vision, Beautifully Arranged
        </h1>
        <p className="text-sm sm:text-base text-[#795A47] font-sans">
          Tell us about your special occasion, preferred flowers, colors, and budget. Let's create an arrangement that feels personal to you.
        </p>
      </div>

      {submittedInquiry ? (
        /* Successful Submission State */
        <div className="max-w-2xl mx-auto bg-white rounded-sm border border-[#E9E0D4] p-8 sm:p-10 text-center space-y-6 shadow-md">
          <div className="w-16 h-16 bg-[#647653]/15 text-[#647653] rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs uppercase tracking-widest text-[#647653] font-semibold">
              Request Received
            </span>
            <h2 className="font-serif text-3xl font-bold text-[#39251D]">
              Thank You, {submittedInquiry.customerName}!
            </h2>
            <p className="text-xs text-[#795A47]">
              Reference #{submittedInquiry.id} • Created on {new Date(submittedInquiry.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div className="bg-[#F8F5ED] p-4 rounded-sm border border-[#E9E0D4] text-xs text-left space-y-2">
            <div className="flex justify-between">
              <span className="text-[#795A47]">Occasion:</span>
              <span className="font-semibold text-[#39251D]">{submittedInquiry.occasion}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#795A47]">Preferred Colors:</span>
              <span className="font-semibold text-[#39251D]">{submittedInquiry.preferredColors}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#795A47]">Approximate Budget:</span>
              <span className="font-semibold text-[#B3202D]">{formatCurrency(submittedInquiry.budget)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#795A47]">Requested Fulfillment:</span>
              <span className="font-semibold capitalize text-[#39251D]">
                {submittedInquiry.fulfillmentMethod} ({submittedInquiry.requestedDate})
              </span>
            </div>
          </div>

          {/* Policy clarification */}
          <div className="bg-[#E9E0D4]/50 p-4 rounded-sm border border-[#E9E0D4] text-xs text-[#39251D] text-left leading-relaxed">
            <strong className="block text-[#39251D] mb-1">Important Confirmation Note:</strong>
            Custom requests are subject to seasonal flower availability and shop confirmation. A request does not automatically guarantee an accepted order or a confirmed delivery date until our florist reviews it and speaks with you.
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setSubmittedInquiry(null)}
              className="py-2.5 px-6 border border-[#795A47]/40 text-[#39251D] text-xs font-semibold uppercase tracking-wider rounded-xs hover:bg-[#E9E0D4]/40"
            >
              Submit Another Inquiry
            </button>
            <button
              onClick={() => navigateToPage('shop')}
              className="py-2.5 px-6 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      ) : (
        /* Form Section */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Form */}
          <div className="lg:col-span-8 bg-white rounded-sm border border-[#E9E0D4] p-6 sm:p-8 shadow-xs">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Contact Fields */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#39251D] border-b border-[#E9E0D4] pb-2">
                  1. Your Information
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      placeholder="e.g. Sofia Morales"
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
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="e.g. (602) 725-8055"
                      className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                        errors.phone ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                      }`}
                    />
                    {errors.phone && (
                      <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="e.g. sofia@example.com"
                      className={`w-full text-xs px-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                        errors.email ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.email}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Design & Occasion Details */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-[#39251D] border-b border-[#E9E0D4] pb-2">
                  2. Arrangement Details & Budget
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Type of Occasion *
                    </label>
                    <select
                      value={occasion}
                      onChange={e => setOccasion(e.target.value)}
                      className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                    >
                      <option value="Birthday / Milestone">Birthday / Milestone</option>
                      <option value="Anniversary / Romance">Anniversary / Romance</option>
                      <option value="Quinceañera / Sweet 16">Quinceañera / Sweet 16</option>
                      <option value="Wedding / Engagement">Wedding / Engagement</option>
                      <option value="Sympathy & Remembrance">Sympathy & Remembrance</option>
                      <option value="Celebration / Graduation">Celebration / Graduation</option>
                      <option value="Just Because / Thinking of You">Just Because / Thinking of You</option>
                      <option value="Other Custom Project">Other Custom Project</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Approximate Budget (USD) *
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs text-[#795A47] font-semibold">
                        $
                      </span>
                      <input
                        type="number"
                        min="40"
                        step="5"
                        required
                        value={budget}
                        onChange={e => setBudget(e.target.value)}
                        placeholder="e.g. 95"
                        className={`w-full text-xs pl-7 pr-3 py-2 bg-[#F8F5ED] border rounded-xs focus:outline-none ${
                          errors.budget ? 'border-[#B3202D]' : 'border-[#E9E0D4]'
                        }`}
                      />
                    </div>
                    {errors.budget && (
                      <p className="text-[11px] text-[#B3202D] mt-0.5">{errors.budget}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Preferred Flower Types
                    </label>
                    <input
                      type="text"
                      value={preferredFlowers}
                      onChange={e => setPreferredFlowers(e.target.value)}
                      placeholder="e.g. Red roses, peonies, eucalyptus, sunflowers"
                      className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Preferred Color Palette
                    </label>
                    <input
                      type="text"
                      value={preferredColors}
                      onChange={e => setPreferredColors(e.target.value)}
                      placeholder="e.g. Deep red & white, pastels, warm jewel tones"
                      className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Requested Fulfillment Date *
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
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#39251D] mb-1">
                      Delivery or Pickup Preference
                    </label>
                    <select
                      value={fulfillmentMethod}
                      onChange={e => setFulfillmentMethod(e.target.value as any)}
                      className="w-full text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none"
                    >
                      <option value="delivery">Delivery in Tolleson / West Valley</option>
                      <option value="pickup">Store Pickup in Tolleson, AZ</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Additional Design Details or Special Meaning
                  </label>
                  <textarea
                    rows={3}
                    value={designDetails}
                    onChange={e => setDesignDetails(e.target.value)}
                    placeholder="Tell us any special wishes (e.g. satin ribbon color, recipient's favorite flower, vase preference, or card message)..."
                    className="w-full text-xs p-3 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none font-sans"
                  />
                </div>

                {/* Optional Inspiration Image Upload */}
                <div>
                  <label className="block text-xs font-semibold text-[#39251D] mb-1">
                    Optional Inspiration Photo (Max 5MB)
                  </label>
                  {!inspirationImageData ? (
                    <label className="border-2 border-dashed border-[#E9E0D4] hover:border-[#795A47] rounded-sm p-4 text-center cursor-pointer flex flex-col items-center justify-center transition-colors bg-[#F8F5ED]">
                      <Upload className="w-6 h-6 text-[#795A47] mb-1" />
                      <span className="text-xs font-semibold text-[#39251D]">
                        Upload an inspiration image
                      </span>
                      <span className="text-[11px] text-[#795A47]">
                        PNG, JPG, or WebP up to 5MB
                      </span>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/webp"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="flex items-center gap-3 p-3 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs">
                      <img
                        src={inspirationImageData}
                        alt="Uploaded inspiration preview"
                        className="w-14 h-14 object-cover rounded-xs border border-[#E9E0D4]"
                      />
                      <div className="flex-1 text-xs">
                        <span className="font-semibold text-[#39251D] block truncate max-w-xs">
                          {inspirationImageName}
                        </span>
                        <span className="text-[11px] text-[#647653]">Image attached for florist review</span>
                      </div>
                      <button
                        type="button"
                        onClick={removeInspirationImage}
                        className="p-1 text-[#795A47] hover:text-[#B3202D]"
                        aria-label="Remove uploaded image"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {uploadError && (
                    <p className="text-[11px] text-[#B3202D] mt-1">{uploadError}</p>
                  )}
                </div>
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#39251D] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={privacyConsent}
                    onChange={e => setPrivacyConsent(e.target.checked)}
                    className="mt-0.5 rounded text-[#B3202D] focus:ring-[#B3202D]"
                  />
                  <span>
                    I agree to be contacted by Florecitas Del Alma regarding this custom floral inquiry, and I understand that custom requests are subject to seasonal flower availability and final shop confirmation. *
                  </span>
                </label>
                {errors.privacyConsent && (
                  <p className="text-[11px] text-[#B3202D] mt-1">{errors.privacyConsent}</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto py-3.5 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                >
                  {isSubmitting ? 'Submitting Custom Request...' : 'Submit Custom Flower Request'}
                </button>
              </div>
            </form>
          </div>

          {/* Side Info & Phone alternative */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-[#F8F5ED] rounded-sm border border-[#E9E0D4] p-6 space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#39251D]">
                Prefer to Discuss by Phone?
              </h3>
              <p className="text-xs text-[#795A47] leading-relaxed">
                We love speaking directly with our clients about their colors, favorite flowers, and budget. Call our floral team anytime:
              </p>
              <a
                href="tel:+16027258055"
                className="py-3 px-4 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call +1 602-725-8055</span>
              </a>
            </div>

            <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 space-y-3">
              <h4 className="font-serif text-base font-bold text-[#39251D]">
                How Custom Orders Work
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-xs text-[#795A47] leading-relaxed">
                <li>Submit your preferences, colors, and approximate budget.</li>
                <li>Our florist reviews seasonal flower market availability.</li>
                <li>We contact you to confirm the design, fulfillment date, and total.</li>
                <li>Your bouquet is freshly arranged and wrapped on the day of delivery.</li>
              </ol>
            </div>

            <div className="aspect-4/3 rounded-sm overflow-hidden border border-[#E9E0D4]">
              <img
                src="https://images.unsplash.com/photo-1572454591674-2739f30d8c40?auto=format&fit=crop&w=700&q=80"
                alt="Florist artisan crafting a bespoke bouquet with fresh ribbons"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

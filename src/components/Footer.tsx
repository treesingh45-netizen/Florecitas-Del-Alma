import React from 'react';
import { useShop } from '../context/ShopContext';
import { PageRoute, FlowerCategory } from '../types';
import { Phone, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setCurrentPage, setSelectedCategory, setActivePolicyModal } = useShop();

  const handleCategoryClick = (category: FlowerCategory) => {
    setSelectedCategory(category);
    setCurrentPage('shop');
  };

  const categories: FlowerCategory[] = [
    'Rose Bouquets',
    'Mixed Flower Bouquets',
    'Birthday Flowers',
    'Anniversary Flowers',
    'Romantic Flowers',
    'Seasonal Arrangements',
    'Custom Bouquets',
  ];

  return (
    <footer className="bg-[#39251D] text-[#F8F5ED] pt-16 pb-12 border-t-4 border-[#B3202D]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#795A47]/40">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Florecitas Del Alma Logo"
                className="w-14 h-14 rounded-full object-cover border border-[#E9E0D4]/30"
              />
              <div>
                <h3 className="font-serif text-xl tracking-wider uppercase font-bold text-[#F8F5ED]">
                  Florecitas Del Alma
                </h3>
                <p className="text-xs tracking-widest text-[#E9E0D4] font-sans uppercase">
                  Boutique Florist
                </p>
              </div>
            </div>

            <p className="font-serif italic text-[#E9E0D4] text-base leading-relaxed">
              “Más que flores, un sentimiento.”
            </p>
            <p className="text-sm text-[#F8F5ED]/80 leading-relaxed font-sans">
              Handcrafted floral arrangements, fresh roses, and bespoke bouquets honoring life's meaningful moments in Tolleson, Arizona.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-medium">
              <a
                href="https://www.instagram.com/florecitas.delalma/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E9E0D4] hover:text-[#FFFFFF] underline transition-colors"
                aria-label="Visit Florecitas Del Alma on Instagram"
              >
                Instagram
              </a>
              <span className="text-[#795A47]">•</span>
              <a
                href="https://www.facebook.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E9E0D4] hover:text-[#FFFFFF] underline transition-colors"
                aria-label="Visit Florecitas Del Alma on Facebook"
              >
                Facebook
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#E9E0D4] tracking-wide mb-4">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => setCurrentPage('home')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('shop')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Shop Flowers
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('occasions')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Occasions & Milestones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('custom')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Custom Bouquets
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('story')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Our Story & Craft
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('delivery')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Delivery & Pickup Info
                </button>
              </li>
              <li>
                <button
                  onClick={() => setCurrentPage('contact')}
                  className="hover:text-[#E9E0D4] transition-colors"
                >
                  Contact & Orders
                </button>
              </li>
            </ul>
          </div>

          {/* Floral Categories */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#E9E0D4] tracking-wide mb-4">
              Arrangement Collections
            </h4>
            <ul className="space-y-2.5 text-sm">
              {categories.map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => handleCategoryClick(cat)}
                    className="hover:text-[#E9E0D4] text-left transition-colors"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Local Tolleson Contact */}
          <div>
            <h4 className="font-serif text-lg font-semibold text-[#E9E0D4] tracking-wide mb-4">
              Visit & Contact
            </h4>
            <div className="space-y-3.5 text-sm text-[#F8F5ED]/90">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#B3202D] shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-[#F8F5ED]">Tolleson, Arizona</p>
                  <p className="text-xs text-[#E9E0D4]">United States</p>
                  <p className="text-xs text-[#F8F5ED]/70 mt-0.5">Serving Tolleson & West Valley</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#B3202D] shrink-0" />
                <a
                  href="tel:+16027258055"
                  className="hover:text-[#E9E0D4] font-medium transition-colors"
                >
                  +1 602-725-8055
                </a>
              </div>

              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#B3202D] shrink-0" />
                <a
                  href="mailto:Florcitasdelalma@yahoo.com"
                  className="hover:text-[#E9E0D4] text-xs transition-colors break-all"
                >
                  Florcitasdelalma@yahoo.com
                </a>
              </div>

              <div className="pt-3 border-t border-[#795A47]/30">
                <p className="text-xs text-[#E9E0D4] leading-relaxed">
                  Bespoke orders welcome. Call or submit a custom inquiry to discuss your desired color palette and date.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Policies */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F8F5ED]/75">
          <p>
            © {new Date().getFullYear()} Florecitas Del Alma. All rights reserved. Tolleson, Arizona.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs">
            <button
              onClick={() => setActivePolicyModal('privacy')}
              className="hover:text-[#FFFFFF] underline transition-colors"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('terms')}
              className="hover:text-[#FFFFFF] underline transition-colors"
            >
              Terms & Conditions
            </button>
            <span>•</span>
            <button
              onClick={() => setActivePolicyModal('delivery')}
              className="hover:text-[#FFFFFF] underline transition-colors"
            >
              Delivery & Cancellation Policy
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentPage('admin')}
              className="hover:text-[#FFFFFF] text-[#E9E0D4] underline transition-colors"
            >
              Shop Administration
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

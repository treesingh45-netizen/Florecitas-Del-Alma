import React from 'react';
import { useShop } from '../context/ShopContext';
import { OCCASION_COLLECTIONS } from '../data/flowerCatalog';
import { FlowerCategory } from '../types';
import { ArrowRight, Heart, Calendar } from 'lucide-react';

export const OccasionsPage: React.FC = () => {
  const { navigateToPage } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
          Meaningful Milestones
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251D]">
          Flowers for Every Occasion
        </h1>
        <p className="text-sm sm:text-base text-[#795A47] font-sans">
          Whatever the moment, find flowers that express what words sometimes cannot.
        </p>
      </div>

      {/* Occasions List */}
      <div className="space-y-16">
        {OCCASION_COLLECTIONS.map((occasion, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={occasion.id}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-white rounded-sm border border-[#E9E0D4] p-6 sm:p-8 lg:p-10 shadow-xs"
            >
              {/* Image */}
              <div
                className={`lg:col-span-6 overflow-hidden rounded-xs border border-[#E9E0D4] ${
                  isEven ? 'order-1 lg:order-1' : 'order-1 lg:order-2'
                }`}
              >
                <div className="aspect-4/3 overflow-hidden bg-[#F8F5ED]">
                  <img
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                  />
                </div>
              </div>

              {/* Text Content */}
              <div
                className={`lg:col-span-6 space-y-4 ${
                  isEven ? 'order-2 lg:order-2' : 'order-2 lg:order-1'
                }`}
              >
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#E9E0D4]/60 rounded-full text-xs font-semibold text-[#795A47]">
                  <Calendar className="w-3.5 h-3.5 text-[#B3202D]" />
                  <span>Curated Collection</span>
                </div>

                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
                  {occasion.title}
                </h2>

                <p className="font-serif italic text-base text-[#B3202D]">
                  {occasion.subtitle}
                </p>

                <p className="text-sm text-[#39251D]/85 leading-relaxed font-sans">
                  {occasion.description}
                </p>

                <div className="pt-3">
                  <button
                    onClick={() =>
                      navigateToPage('shop', occasion.categoryFilter as FlowerCategory)
                    }
                    className="py-3 px-6 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center gap-2"
                  >
                    <span>Shop This Collection</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Request Banner */}
      <div className="bg-[#E9E0D4] rounded-sm p-8 sm:p-12 text-center space-y-4 border border-[#795A47]/30">
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
          Looking for a Bespoke Occasion Arrangement?
        </h3>
        <p className="text-xs sm:text-sm text-[#795A47] max-w-xl mx-auto font-sans">
          Whether you are preparing a Quinceañera, intimate wedding, memorial tribute, or corporate appreciation event in Tolleson, we are honored to collaborate directly with you.
        </p>
        <div className="pt-2">
          <button
            onClick={() => navigateToPage('custom')}
            className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
          >
            Request a Custom Arrangement
          </button>
        </div>
      </div>
    </div>
  );
};

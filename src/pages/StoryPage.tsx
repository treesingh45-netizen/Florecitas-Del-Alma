import React from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Heart, Sparkles, Check, MapPin } from 'lucide-react';

export const StoryPage: React.FC = () => {
  const { navigateToPage } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
          About Florecitas Del Alma
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251D]">
          A Little Flower, A Meaningful Feeling
        </h1>
        <p className="font-serif italic text-base sm:text-lg text-[#795A47]">
          “Más que flores, un sentimiento.”
        </p>
        <p className="text-sm sm:text-base text-[#39251D]/80 font-sans leading-relaxed">
          At Florecitas Del Alma, flowers are more than beautiful arrangements. They are a way to share feelings, celebrate people, and create lasting memories.
        </p>
      </div>

      {/* Hero Visual & Our Story */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6">
          <div className="relative">
            <div className="aspect-4/3 rounded-sm overflow-hidden border border-[#E9E0D4] shadow-md bg-white">
              <img
                src="https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=900&q=80"
                alt="Florist table with fresh roses, foliage, and shears in Tolleson AZ studio"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-4 -right-4 p-4 bg-white rounded-xs border border-[#E9E0D4] shadow-md hidden sm:flex items-center gap-3">
              <img src="/logo.jpg" alt="Logo" className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="font-serif text-xs font-bold text-[#39251D] uppercase">Florecitas Del Alma</p>
                <p className="text-[11px] text-[#795A47]">Tolleson, Arizona</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#647653] font-semibold">
            Our Story
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
            Rooted in Heart, Crafted with Care
          </h2>
          <p className="text-sm text-[#39251D]/85 leading-relaxed font-sans">
            Florecitas Del Alma was born from a deep love for the quiet magic of petals and the timeless tradition of expressing human affection through flowers. Serving the Tolleson, Arizona community and the surrounding West Valley, our flower shop is dedicated to crafting arrangements that feel deeply personal, genuine, and romantic.
          </p>
          <p className="text-sm text-[#39251D]/85 leading-relaxed font-sans">
            Whether welcoming a milestone birthday, honoring an anniversary, or sending a tender gesture of sympathy, every stem is handled with personal warmth. We believe that no celebration is too large and no heartfelt feeling is too small.
          </p>
        </div>
      </div>

      {/* Our Approach to Flowers */}
      <div className="bg-[#E9E0D4]/30 rounded-sm border border-[#E9E0D4] p-8 sm:p-12 space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
            Artisanal Standards
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#39251D]">
            Our Approach to Flowers
          </h2>
          <p className="text-xs text-[#795A47]">
            How we select, arrange, and present blooms for our clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-sm border border-[#E9E0D4] space-y-3 shadow-2xs">
            <span className="font-serif text-3xl font-bold text-[#B3202D]">01</span>
            <h3 className="font-serif text-lg font-bold text-[#39251D]">
              Carefully Sourced Fresh Stems
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              We hand-inspect each flower for optimal petal firmness, stem vitality, and unfurling potential, focusing on premium Ecuadorian roses and vibrant seasonal garden stems.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#E9E0D4] space-y-3 shadow-2xs">
            <span className="font-serif text-3xl font-bold text-[#B3202D]">02</span>
            <h3 className="font-serif text-lg font-bold text-[#39251D]">
              Thoughtful Balance & Proportion
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              Our arrangements follow natural botanical shapes—pairing focal roses with textured eucalyptus, delicate filler, and rich seasonal foliage that breathes life into any room.
            </p>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#E9E0D4] space-y-3 shadow-2xs">
            <span className="font-serif text-3xl font-bold text-[#B3202D]">03</span>
            <h3 className="font-serif text-lg font-bold text-[#39251D]">
              Artisanal Presentation & Ribbon
            </h3>
            <p className="text-xs text-[#795A47] leading-relaxed">
              From textured paper wraps and delicate satin ribbons to handwritten recipient cards, every bouquet is prepared as a gift that feels special from the very first glance.
            </p>
          </div>
        </div>
      </div>

      {/* Flowers for Meaningful Moments & Our Commitment */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-6 space-y-6">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
              The Purpose
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#39251D]">
              Flowers for Meaningful Moments
            </h2>
            <p className="text-sm text-[#39251D]/85 leading-relaxed font-sans">
              Life’s moments are fleeting, but the feeling of being loved and celebrated endures. Flowers accompany graduations, Quinceañeras, romantic anniversaries, unexpected reconciliations, and respectful goodbyes. We are honored to be entrusted with your stories.
            </p>
          </div>

          <div className="space-y-3 pt-3 border-t border-[#E9E0D4]">
            <span className="text-xs uppercase tracking-widest text-[#647653] font-semibold">
              Our Commitment
            </span>
            <h3 className="font-serif text-xl font-bold text-[#39251D]">
              Communication & Genuine Service
            </h3>
            <p className="text-sm text-[#39251D]/85 leading-relaxed font-sans">
              We pledge attentive customer care, clear and transparent pricing, accurate order review, and respect for your time. Every arrangement is prepared with the same devotion we would give our own families.
            </p>
          </div>

          <div className="pt-2">
            <button
              onClick={() => navigateToPage('shop')}
              className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <span>Explore Our Flower Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="aspect-4/3 rounded-sm overflow-hidden border border-[#E9E0D4] shadow-md">
            <img
              src="https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=900&q=80"
              alt="Romantic red rose bouquet wrapped in parchment with elegant red ribbon"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

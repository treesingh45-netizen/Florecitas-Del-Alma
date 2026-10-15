import React from 'react';
import { useShop } from '../context/ShopContext';
import { formatCurrency } from '../utils/orderRules';
import { OCCASION_COLLECTIONS } from '../data/flowerCatalog';
import { FlowerCategory, FlowerProduct } from '../types';
import { Heart, ArrowRight, Phone, Sparkles, MapPin, Check, Star, ShieldCheck } from 'lucide-react';

export const HomePage: React.FC = () => {
  const {
    products,
    navigateToPage,
    setSelectedProductForDetail,
    addToCart,
  } = useShop();

  const featuredCollections = OCCASION_COLLECTIONS.slice(0, 4);
  const bestSellers = products.filter(p => p.bestseller || p.featured).slice(0, 4);

  const handleQuickAdd = (product: FlowerProduct) => {
    addToCart({
      productId: product.id,
      name: product.name,
      price: product.price,
      variationName: product.variations[0]?.name || 'Standard',
      variationPriceDelta: 0,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div className="space-y-20 pb-16">
      {/* FULL-SCREEN LUXURY FLORAL HERO */}
      <section className="relative min-h-screen w-full flex flex-col items-center justify-center pt-32 sm:pt-36 lg:pt-40 pb-20 px-4 sm:px-6 lg:px-8 text-center overflow-hidden">
        {/* Full-screen authentic high-quality floral photograph background featuring beautiful red roses and fresh flowers in natural light */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1496062031456-07b8f162a322?auto=format&fit=crop&w=2400&q=85"
            alt="Authentic fresh red roses and natural florist flowers in gentle morning light"
            className="w-full h-full object-cover object-center"
          />
          {/* Subtle dark espresso brown overlay ensuring crystal-clear text readability */}
          <div className="absolute inset-0 bg-[#39251D]/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-[#39251D]/80 via-[#39251D]/55 to-[#39251D]/85" />
        </div>

        {/* Perfectly Centered Content (both vertically and horizontally) */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center space-y-6 sm:space-y-7">
          {/* Brand Tagline */}
          <p className="font-serif italic text-lg sm:text-2xl md:text-3xl text-[#E9E0D4] tracking-wide">
            “Más que flores, un sentimiento.”
          </p>

          {/* Main Heading */}
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal tracking-tight text-[#F8F5ED] leading-[1.08] max-w-3xl">
            Flowers That Speak From the Heart
          </h1>

          {/* Supporting Text */}
          <p className="font-sans text-sm sm:text-base md:text-lg lg:text-xl text-[#F8F5ED]/90 max-w-2xl mx-auto leading-relaxed font-light">
            Celebrate life's most meaningful moments with beautifully arranged flowers, thoughtfully designed to express love, joy, and heartfelt emotions.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-4 w-full sm:w-auto">
            <button
              onClick={() => navigateToPage('shop')}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-all shadow-lg hover:shadow-xl hover:scale-[1.02] cursor-pointer whitespace-nowrap"
            >
              Shop Flowers
            </button>

            <button
              onClick={() => navigateToPage('custom')}
              className="w-full sm:w-auto px-8 sm:px-10 py-3.5 sm:py-4 border border-[#E9E0D4] hover:bg-[#F8F5ED] hover:text-[#39251D] text-[#F8F5ED] text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-all backdrop-blur-xs cursor-pointer whitespace-nowrap"
            >
              Create a Custom Bouquet
            </button>
          </div>
        </div>
      </section>

      {/* SECTION C: FEATURED COLLECTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
          <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
            Curated For Every Feeling
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251D]">
            Featured Floral Collections
          </h2>
          <p className="text-sm text-[#795A47] font-sans">
            Explore our most requested flower arrangements, handpicked to celebrate life's heartfelt milestones.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCollections.map(col => (
            <div
              key={col.id}
              className="bg-white rounded-sm border border-[#E9E0D4] overflow-hidden group shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="aspect-4/3 overflow-hidden bg-[#F8F5ED]">
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-500"
                  />
                </div>
                <div className="p-5 space-y-2">
                  <h3 className="font-serif text-xl font-bold text-[#39251D]">
                    {col.title}
                  </h3>
                  <p className="text-xs text-[#795A47] leading-relaxed line-clamp-3">
                    {col.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <button
                  onClick={() => navigateToPage('shop', col.categoryFilter as FlowerCategory)}
                  className="w-full py-2 px-3 border border-[#795A47]/30 hover:border-[#B3202D] hover:bg-[#B3202D] hover:text-white text-[#39251D] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION D: BEST-SELLING FLOWERS */}
      <section className="bg-[#E9E0D4]/30 py-16 border-y border-[#E9E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
                Client Favorites
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251D] mt-1">
                Best-Selling Flowers
              </h2>
              <p className="text-xs sm:text-sm text-[#795A47] mt-1">
                Freshly spiraled and wrapped arrangements available for Tolleson delivery or store pickup.
              </p>
            </div>
            <button
              onClick={() => navigateToPage('shop')}
              className="text-xs font-semibold uppercase tracking-wider text-[#B3202D] hover:underline flex items-center gap-1"
            >
              <span>View Full Floral Catalog</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map(product => (
              <div
                key={product.id}
                className="bg-white rounded-sm border border-[#E9E0D4] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-4/5 overflow-hidden bg-[#F8F5ED]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-103 transition-transform duration-500"
                    />
                    {product.bestseller && (
                      <span className="absolute top-3 left-3 bg-[#39251D] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-xs">
                        Bestseller
                      </span>
                    )}
                  </div>

                  <div className="p-4 space-y-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#795A47] font-semibold">
                      {product.category}
                    </span>
                    <h3 className="font-serif text-lg font-bold text-[#39251D] leading-tight line-clamp-1">
                      {product.name}
                    </h3>
                    <p className="font-serif text-xl font-bold text-[#B3202D]">
                      {formatCurrency(product.price)}
                    </p>
                    <p className="text-xs text-[#795A47] line-clamp-2">
                      {product.shortDescription}
                    </p>
                    <div className="text-[11px] text-[#795A47]/80">
                      Variations: Standard, Deluxe, Premium
                    </div>
                  </div>
                </div>

                <div className="p-4 pt-0 space-y-2">
                  <button
                    onClick={() => setSelectedProductForDetail(product)}
                    className="w-full py-2 px-3 border border-[#795A47]/40 text-[#39251D] hover:bg-[#E9E0D4]/50 text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                  >
                    View Details
                  </button>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="w-full py-2 px-3 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Heart className="w-3.5 h-3.5 fill-white" />
                    <span>Add to Order</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION E: THE MEANING OF FLOWERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="aspect-4/5 rounded-sm overflow-hidden border border-[#E9E0D4] shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1567696911980-2eed69a46042?auto=format&fit=crop&w=900&q=80"
                  alt="Florist carefully arranging delicate garden blooms in artisan studio"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#39251D] text-[#F8F5ED] p-4 rounded-xs shadow-md max-w-xs hidden sm:block">
                <p className="font-serif italic text-sm">
                  “Flowers are the quiet messengers of affection when ordinary words fall short.”
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
              The Language of Petals
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251D]">
              Every Flower Has a Feeling
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-[#39251D]/85 leading-relaxed font-sans">
              <p>
                Throughout history, flowers have given voice to our deepest emotions. A red rose whispers unyielding devotion; sweet ranunculus conveys radiant charm; soft white lilies bring comfort and solace in moments of remembrance.
              </p>
              <p>
                At Florecitas Del Alma, we believe arranging flowers is an intimate craft. Every bouquet that leaves our Tolleson boutique is shaped with intention—honoring love, celebrating gratitude, and reminding someone special that they are always cherished.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-[#E9E0D4]">
              <div className="p-3 bg-white border border-[#E9E0D4] rounded-xs">
                <span className="block font-serif text-base font-bold text-[#B3202D]">Red Roses</span>
                <span className="text-xs text-[#795A47]">Devotion & Passion</span>
              </div>
              <div className="p-3 bg-white border border-[#E9E0D4] rounded-xs">
                <span className="block font-serif text-base font-bold text-[#B3202D]">Garden Peonies</span>
                <span className="text-xs text-[#795A47]">Prosperity & Soulmates</span>
              </div>
              <div className="p-3 bg-white border border-[#E9E0D4] rounded-xs">
                <span className="block font-serif text-base font-bold text-[#B3202D]">White Lilies</span>
                <span className="text-xs text-[#795A47]">Peace & Solace</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION F: CUSTOM FLORAL ARRANGEMENTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#39251D] text-[#F8F5ED] rounded-sm p-8 sm:p-12 lg:p-16 border-l-8 border-[#B3202D] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4 relative z-10">
            <span className="text-xs uppercase tracking-widest text-[#E9E0D4] font-semibold">
              Bespoke Floristry
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#F8F5ED]">
              Something Special, Made Just for You
            </h2>
            <p className="text-sm sm:text-base text-[#F8F5ED]/85 leading-relaxed font-sans">
              Have a specific vision, color theme, or special milestone? Tell us about your preferred flowers, budget, and occasion. We will personally curate a custom bouquet tailored to your heartfelt sentiment.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigateToPage('custom')}
                className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs inline-flex items-center gap-2"
              >
                <span>Request a Custom Arrangement</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION G: LOCAL SERVICE IN TOLLESON, AZ */}
      <section className="bg-white py-16 border-y border-[#E9E0D4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#647653]">
                <MapPin className="w-4 h-4 text-[#B3202D]" />
                <span>Local Arizona Roots</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251D]">
                Bringing Beautiful Flowers to Tolleson
              </h2>
              <p className="text-sm sm:text-base text-[#39251D]/85 leading-relaxed font-sans">
                Florecitas Del Alma is proud to be a dedicated local flower shop based right here in Tolleson, Arizona. We personally hand-arrange every bouquet and coordinate delivery to residences, schools, hospitals, and churches throughout Tolleson and surrounding West Valley communities.
              </p>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <a
                  href="tel:+16027258055"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#39251D] hover:bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  <span>Call (602) 725-8055</span>
                </a>
                <button
                  onClick={() => navigateToPage('delivery')}
                  className="text-xs font-semibold uppercase tracking-wider text-[#B3202D] hover:underline flex items-center gap-1 py-2"
                >
                  <span>Read Delivery Coverage & Policies</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#F8F5ED] p-6 rounded-sm border border-[#E9E0D4] space-y-4">
              <h3 className="font-serif text-lg font-bold text-[#39251D]">
                Local Tolleson Delivery Details
              </h3>
              <ul className="space-y-2.5 text-xs text-[#795A47]">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#647653] shrink-0 mt-0.5" />
                  <span><strong>Primary Service Area:</strong> Tolleson, Arizona (85353) and neighboring West Valley areas.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#647653] shrink-0 mt-0.5" />
                  <span><strong>Store Pickup:</strong> Free pickup arranged with the shop upon order review.</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#647653] shrink-0 mt-0.5" />
                  <span><strong>Climate Consideration:</strong> Fresh water reservoirs and climate-controlled transport during hot Arizona months.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION H: CUSTOMER TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto space-y-3 mb-10">
          <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
            Heartfelt Words
          </span>
          <h2 className="font-serif text-3xl font-bold text-[#39251D]">
            Loved by Our Tolleson Community
          </h2>
          <p className="text-xs text-[#795A47]">
            Real client feedback from our neighborhood celebrations, anniversaries, and personal surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-sm border border-[#E9E0D4] space-y-3 shadow-2xs">
            <div className="flex text-[#B3202D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B3202D]" />
              ))}
            </div>
            <p className="font-serif italic text-sm text-[#39251D] leading-relaxed">
              “The roses were so fresh and arranged with genuine passion. My wife was brought to tears when she read the card and saw the deep red blooms. Truly más que flores, un sentimiento.”
            </p>
            <div className="pt-2 border-t border-[#E9E0D4] text-xs">
              <span className="font-bold text-[#39251D]">Carlos R.</span>
              <span className="text-[#795A47] block text-[11px]">Tolleson, AZ • Anniversary Bouquet</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#E9E0D4] space-y-3 shadow-2xs">
            <div className="flex text-[#B3202D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B3202D]" />
              ))}
            </div>
            <p className="font-serif italic text-sm text-[#39251D] leading-relaxed">
              “Ordered a birthday garden mix for my mom. The attention to detail, ribbon wrapping, and personal customer service on the phone was the best in the West Valley.”
            </p>
            <div className="pt-2 border-t border-[#E9E0D4] text-xs">
              <span className="font-bold text-[#39251D]">Karla M.</span>
              <span className="text-[#795A47] block text-[11px]">Tolleson, AZ • Birthday Flowers</span>
            </div>
          </div>

          <div className="bg-white p-6 rounded-sm border border-[#E9E0D4] space-y-3 shadow-2xs">
            <div className="flex text-[#B3202D]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-[#B3202D]" />
              ))}
            </div>
            <p className="font-serif italic text-sm text-[#39251D] leading-relaxed">
              “They created a custom Quinceañera bouquet with white lilies and blush roses that matched our theme perfectly. Everyone at church asked where the flowers were from.”
            </p>
            <div className="pt-2 border-t border-[#E9E0D4] text-xs">
              <span className="font-bold text-[#39251D]">Veronica D.</span>
              <span className="text-[#795A47] block text-[11px]">West Valley, AZ • Custom Arrangement</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: FINAL CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#E9E0D4] rounded-sm p-10 sm:p-14 text-center space-y-4 border border-[#795A47]/30">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#39251D]">
            Make Someone's Day Beautiful
          </h2>
          <p className="text-sm sm:text-base text-[#795A47] max-w-lg mx-auto font-sans">
            Find the perfect flowers for someone special, hand-arranged with care right here in Tolleson.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateToPage('shop')}
              className="py-3 px-8 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs sm:text-sm font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs inline-flex items-center gap-2"
            >
              <span>Browse Flower Collections</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

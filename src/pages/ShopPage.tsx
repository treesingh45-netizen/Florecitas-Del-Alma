import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { FlowerCategory, FlowerProduct } from '../types';
import { formatCurrency } from '../utils/orderRules';
import { Search, SlidersHorizontal, Heart, ShoppingBag, Eye, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    setSelectedProductForDetail,
    addToCart,
    cartCount,
    cartSubtotal,
    setIsCartOpen,
  } = useShop();

  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name'>('featured');

  const categories: (FlowerCategory | 'All')[] = [
    'All',
    'Rose Bouquets',
    'Mixed Flower Bouquets',
    'Birthday Flowers',
    'Anniversary Flowers',
    'Romantic Flowers',
    'Seasonal Arrangements',
    'Custom Bouquets',
  ];

  // Filtering
  const filteredProducts = products.filter(product => {
    const matchesCategory =
      selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sorting
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    // 'featured'
    return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
  });

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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#B3202D] font-semibold">
          Florecitas Del Alma Catalog
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#39251D]">
          Shop Flowers
        </h1>
        <p className="text-sm sm:text-base text-[#795A47] font-sans">
          Discover beautiful arrangements for life's special moments. Handcrafted fresh in Tolleson, Arizona.
        </p>
      </div>

      {/* Sticky Quick Cart Pill if items exist */}
      {cartCount > 0 && (
        <div className="sticky top-22 z-30 flex justify-center">
          <button
            onClick={() => setIsCartOpen(true)}
            className="py-2.5 px-5 bg-[#39251D] text-white text-xs font-semibold rounded-full shadow-lg hover:bg-[#B3202D] transition-colors flex items-center gap-3 border border-[#E9E0D4]/30"
          >
            <ShoppingBag className="w-4 h-4 text-[#E9E0D4]" />
            <span>
              {cartCount} {cartCount === 1 ? 'item' : 'items'} in order • Subtotal: {formatCurrency(cartSubtotal)}
            </span>
            <span className="text-xs text-[#E9E0D4] underline ml-1">Review Cart →</span>
          </button>
        </div>
      )}

      {/* Controls: Search, Categories & Sort */}
      <div className="space-y-4">
        {/* Search & Sort Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-sm border border-[#E9E0D4]">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-[#795A47] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search roses, peonies, birthdays..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D]"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-[#795A47]" />
            <span className="text-xs text-[#795A47] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="text-xs px-3 py-2 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs focus:outline-none focus:border-[#B3202D] text-[#39251D]"
            >
              <option value="featured">Featured Arrangements</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A-Z)</option>
            </select>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs rounded-full border transition-all font-medium ${
                selectedCategory === cat
                  ? 'bg-[#39251D] text-white border-[#39251D] shadow-xs'
                  : 'bg-white text-[#39251D] border-[#E9E0D4] hover:border-[#795A47]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Product Grid */}
      {sortedProducts.length === 0 ? (
        <div className="text-center py-20 bg-white border border-[#E9E0D4] rounded-sm space-y-4">
          <p className="font-serif text-lg text-[#39251D]">
            No floral arrangements match your current search or category.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="py-2 px-5 bg-[#B3202D] text-white text-xs font-semibold uppercase tracking-wider rounded-xs"
          >
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sortedProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-sm border border-[#E9E0D4] overflow-hidden shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Photo & Quick badges */}
                <div className="relative aspect-4/5 overflow-hidden bg-[#F8F5ED]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  {product.bestseller && (
                    <span className="absolute top-3 left-3 bg-[#39251D] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                      Bestseller
                    </span>
                  )}
                  {product.featured && !product.bestseller && (
                    <span className="absolute top-3 left-3 bg-[#B3202D] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs">
                      Featured
                    </span>
                  )}
                </div>

                {/* Details */}
                <div className="p-4 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-[#795A47] font-semibold">
                    {product.category}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-[#39251D] leading-snug line-clamp-1">
                    {product.name}
                  </h3>
                  <div className="flex items-baseline justify-between">
                    <span className="font-serif text-xl font-bold text-[#B3202D]">
                      {formatCurrency(product.price)}
                    </span>
                    <span className="text-[11px] text-[#795A47]">
                      {product.variations.length} sizes available
                    </span>
                  </div>
                  <p className="text-xs text-[#795A47] line-clamp-2">
                    {product.shortDescription}
                  </p>
                </div>
              </div>

              {/* Actions */}
              <div className="p-4 pt-0 space-y-2">
                <button
                  onClick={() => setSelectedProductForDetail(product)}
                  className="w-full py-2 px-3 border border-[#795A47]/40 hover:bg-[#E9E0D4]/50 text-[#39251D] text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details & Options</span>
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
      )}
    </div>
  );
};

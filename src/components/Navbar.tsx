import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { PageRoute } from '../types';
import { ShoppingBag, Phone, Menu, X, ShieldCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage, cartCount, setIsCartOpen } = useShop();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isHomeTransparent = currentPage === 'home' && !isScrolled;

  const navLinks: { label: string; page: PageRoute }[] = [
    { label: 'Home', page: 'home' },
    { label: 'Shop Flowers', page: 'shop' },
    { label: 'Occasions', page: 'occasions' },
    { label: 'Custom Flowers', page: 'custom' },
    { label: 'Our Story', page: 'story' },
    { label: 'Delivery & Pickup', page: 'delivery' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: PageRoute) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isHomeTransparent
          ? 'bg-gradient-to-b from-black/60 via-black/20 to-transparent text-[#F8F5ED] border-b border-white/10'
          : 'bg-[#F8F5ED]/95 backdrop-blur-md text-[#39251D] border-b border-[#E9E0D4] shadow-xs'
      }`}
    >
      {/* Top announcement bar - Single horizontal line */}
      <div
        className={`py-1.5 px-3 sm:px-6 text-[10.5px] sm:text-xs font-medium tracking-wide transition-colors ${
          isHomeTransparent
            ? 'bg-black/35 backdrop-blur-xs text-[#F8F5ED]'
            : 'bg-[#39251D] text-[#F8F5ED]'
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 sm:gap-3 md:gap-4 lg:gap-5 whitespace-nowrap overflow-x-auto no-scrollbar">
          <span className="italic font-serif text-[#E9E0D4] shrink-0">
            “Más que flores, un sentimiento.”
          </span>
          <span className="text-[#E9E0D4]/50 shrink-0">•</span>
          <span className="opacity-90 shrink-0">
            Tolleson, Arizona
          </span>
          <span className="text-[#E9E0D4]/50 shrink-0">•</span>
          <a
            href="tel:+16027258055"
            className="flex items-center gap-1 hover:text-[#E9E0D4] transition-colors font-medium shrink-0"
            aria-label="Call Florecitas Del Alma at +1 602-725-8055"
          >
            <Phone className="w-3 h-3 text-[#E9E0D4] shrink-0" />
            <span>(602) 725-8055</span>
          </a>
          <span className="text-[#E9E0D4]/50 shrink-0">•</span>
          <button
            onClick={() => handleNavClick('admin')}
            className={`hover:text-[#E9E0D4] flex items-center gap-1 transition-colors opacity-85 hover:opacity-100 shrink-0 cursor-pointer ${
              currentPage === 'admin' ? 'underline font-semibold' : ''
            }`}
            title="Shop Staff Order Portal"
            aria-label="Shop Administration"
          >
            <ShieldCheck className="w-3 h-3 text-[#647653] shrink-0" />
            <span>Shop Portal</span>
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-3 xl:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20 gap-1 lg:gap-1.5 xl:gap-3 flex-nowrap w-full">
          {/* Brand Logo & Name */}
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-1.5 sm:gap-2 lg:gap-2 xl:gap-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-[#B3202D]/40 rounded-sm shrink-0 whitespace-nowrap cursor-pointer"
            aria-label="Florecitas Del Alma Homepage"
          >
            <img
              src="/logo.jpg"
              alt="Florecitas Del Alma Official Logo"
              className="w-8 h-8 sm:w-9 sm:h-9 lg:w-9 lg:h-9 xl:w-11 xl:h-11 rounded-full object-cover border border-white/40 shadow-xs group-hover:scale-102 transition-transform shrink-0"
            />
            <div className="flex flex-col whitespace-nowrap shrink-0">
              <span
                className={`font-serif text-xs sm:text-sm lg:text-[12.5px] xl:text-base 2xl:text-lg font-bold tracking-wide uppercase leading-tight transition-colors whitespace-nowrap ${
                  isHomeTransparent ? 'text-white' : 'text-[#39251D]'
                }`}
              >
                Florecitas Del Alma
              </span>
              <span
                className={`text-[7.5px] sm:text-[8px] lg:text-[7.5px] xl:text-[9.5px] tracking-widest uppercase font-sans transition-colors whitespace-nowrap ${
                  isHomeTransparent ? 'text-[#E9E0D4]' : 'text-[#795A47]'
                }`}
              >
                Tolleson, Arizona
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links - Single line guaranteed */}
          <nav
            className="hidden lg:flex items-center flex-nowrap gap-0.5 lg:gap-0.5 xl:gap-2 2xl:gap-3.5 shrink-0"
            aria-label="Main Navigation"
          >
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-[10px] lg:text-[10.5px] xl:text-[12px] 2xl:text-[13px] tracking-tight xl:tracking-wide transition-colors py-1 px-1 lg:px-1 xl:px-2 relative font-medium whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? isHomeTransparent
                        ? 'text-white font-semibold'
                        : 'text-[#B3202D] font-semibold'
                      : isHomeTransparent
                      ? 'text-[#F8F5ED]/90 hover:text-white'
                      : 'text-[#39251D] hover:text-[#B3202D]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                  {isActive && (
                    <span
                      className={`absolute bottom-0 left-1 right-1 h-0.5 rounded-full ${
                        isHomeTransparent ? 'bg-white' : 'bg-[#B3202D]'
                      }`}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 lg:gap-1.5 xl:gap-2.5 shrink-0 flex-nowrap">
            {/* Order Flowers CTA */}
            <button
              onClick={() => handleNavClick('shop')}
              className="hidden sm:inline-flex items-center justify-center px-2 sm:px-2.5 lg:px-2.5 xl:px-4 py-1.5 lg:py-1.5 xl:py-2 text-[9px] sm:text-[9.5px] lg:text-[10px] xl:text-xs font-semibold tracking-wider uppercase text-white bg-[#B3202D] hover:bg-[#971a25] transition-all rounded-xs shadow-xs focus:ring-2 focus:ring-[#B3202D]/50 whitespace-nowrap shrink-0 cursor-pointer"
            >
              Order Flowers
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className={`relative p-1.5 sm:p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#B3202D] shrink-0 cursor-pointer ${
                isHomeTransparent
                  ? 'text-white hover:bg-white/15'
                  : 'text-[#39251D] hover:bg-[#E9E0D4]/60'
              }`}
              aria-label={`View Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#B3202D] text-white text-[9px] sm:text-[10px] font-bold w-4 h-4 sm:w-4.5 sm:h-4.5 rounded-full flex items-center justify-center shadow-xs">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile hamburger menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(prev => !prev)}
              className={`lg:hidden p-1.5 sm:p-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#B3202D] shrink-0 cursor-pointer ${
                isHomeTransparent ? 'text-white hover:bg-white/10' : 'text-[#39251D] hover:bg-[#E9E0D4]'
              }`}
              aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#F8F5ED] border-b border-[#E9E0D4] px-4 pt-3 pb-6 shadow-md transition-all">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navLinks.map(link => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`text-left px-3 py-2 text-base font-medium rounded-sm transition-colors ${
                    isActive
                      ? 'bg-[#E9E0D4] text-[#B3202D] font-semibold'
                      : 'text-[#39251D] hover:bg-[#E9E0D4]/50'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </button>
              );
            })}
            <div className="pt-3 border-t border-[#E9E0D4] flex flex-col gap-2">
              <button
                onClick={() => handleNavClick('shop')}
                className="w-full py-2.5 text-center text-sm font-semibold tracking-wider uppercase text-white bg-[#B3202D] rounded-sm hover:bg-[#971a25]"
              >
                Order Flowers Online
              </button>
              <a
                href="tel:+16027258055"
                className="w-full py-2 text-center text-sm font-medium text-[#39251D] border border-[#795A47]/40 rounded-sm hover:bg-[#E9E0D4]/50 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-[#B3202D]" />
                Call (602) 725-8055
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

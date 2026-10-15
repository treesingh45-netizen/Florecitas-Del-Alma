import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ProductDetailModal } from './components/ProductDetailModal';
import { PolicyModal } from './components/PolicyModal';
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { OccasionsPage } from './pages/OccasionsPage';
import { CustomPage } from './pages/CustomPage';
import { StoryPage } from './pages/StoryPage';
import { DeliveryPage } from './pages/DeliveryPage';
import { ContactPage } from './pages/ContactPage';
import { AdminPage } from './pages/AdminPage';
import { Check } from 'lucide-react';

const MainLayout: React.FC = () => {
  const {
    currentPage,
    selectedProductForDetail,
    setSelectedProductForDetail,
    toastMessage,
  } = useShop();

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'shop':
        return <ShopPage />;
      case 'occasions':
        return <OccasionsPage />;
      case 'custom':
        return <CustomPage />;
      case 'story':
        return <StoryPage />;
      case 'delivery':
        return <DeliveryPage />;
      case 'contact':
        return <ContactPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F5ED] text-[#39251D] font-sans">
      <Navbar />

      <main className={`flex-1 ${currentPage === 'home' ? '' : 'pt-24 sm:pt-28'}`} id="main-content">
        {renderCurrentPage()}
      </main>

      <Footer />

      {/* Global Modals & Drawers */}
      <CartDrawer />
      <CheckoutModal />
      <PolicyModal />

      {selectedProductForDetail && (
        <ProductDetailModal
          product={selectedProductForDetail}
          onClose={() => setSelectedProductForDetail(null)}
        />
      )}

      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#39251D] text-white px-4 py-3 rounded-xs shadow-xl border border-[#E9E0D4]/30 flex items-center gap-2.5 text-xs font-medium animate-in fade-in slide-in-from-bottom-3 duration-200"
        >
          <div className="w-5 h-5 rounded-full bg-[#647653] flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5 text-white" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <ShopProvider>
      <MainLayout />
    </ShopProvider>
  );
}

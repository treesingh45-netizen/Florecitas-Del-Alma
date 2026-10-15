import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  PageRoute,
  FlowerCategory,
  FlowerProduct,
  CartItem,
  OrderRecord,
  OrderStatus,
  CustomArrangementInquiry,
  ContactMessage,
} from '../types';
import { INITIAL_PRODUCTS } from '../data/flowerCatalog';
import { calculateOrderTotals } from '../utils/orderRules';

interface ShopContextType {
  currentPage: PageRoute;
  setCurrentPage: (page: PageRoute) => void;
  navigateToPage: (page: PageRoute, categoryFilter?: FlowerCategory | 'All') => void;
  products: FlowerProduct[];
  setProducts: React.Dispatch<React.SetStateAction<FlowerProduct[]>>;
  updateProduct: (product: FlowerProduct) => void;
  selectedCategory: FlowerCategory | 'All';
  setSelectedCategory: (cat: FlowerCategory | 'All') => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'cartId'>) => void;
  removeFromCart: (cartId: string) => void;
  updateQuantity: (cartId: string, deltaOrQuantity: number, isAbsolute?: boolean) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  selectedProductForDetail: FlowerProduct | null;
  setSelectedProductForDetail: (product: FlowerProduct | null) => void;
  orders: OrderRecord[];
  createOrder: (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    fulfillmentMethod: 'delivery' | 'pickup';
    requestedDate: string;
    recipientName?: string;
    recipientPhone?: string;
    recipientAddress?: string;
    deliveryInstructions?: string;
    pickupTimePreference?: string;
    cardMessage?: string;
    promoCode?: string;
    notes?: string;
  }) => OrderRecord;
  updateOrderStatus: (orderId: string, newStatus: OrderStatus) => void;
  customInquiries: CustomArrangementInquiry[];
  createCustomInquiry: (inquiryData: Omit<CustomArrangementInquiry, 'id' | 'createdAt' | 'status'>) => CustomArrangementInquiry;
  updateInquiryStatus: (id: string, status: CustomArrangementInquiry['status']) => void;
  contactMessages: ContactMessage[];
  createContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => ContactMessage;
  activePolicyModal: 'privacy' | 'terms' | 'delivery' | null;
  setActivePolicyModal: (policy: 'privacy' | 'terms' | 'delivery' | null) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'florecitas_cart_v1',
  PRODUCTS: 'florecitas_products_v1',
  ORDERS: 'florecitas_orders_v1',
  INQUIRIES: 'florecitas_inquiries_v1',
  MESSAGES: 'florecitas_messages_v1',
};

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Sync URL hash with currentPage for real browser back/forward and deep linking
  const getInitialPage = (): PageRoute => {
    const hash = window.location.hash.replace('#', '') as PageRoute;
    const valid: PageRoute[] = ['home', 'shop', 'occasions', 'custom', 'story', 'delivery', 'contact', 'admin'];
    return valid.includes(hash) ? hash : 'home';
  };

  const [currentPage, setCurrentPageRaw] = useState<PageRoute>(getInitialPage);
  const [selectedCategory, setSelectedCategory] = useState<FlowerCategory | 'All'>('All');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<FlowerProduct | null>(null);
  const [activePolicyModal, setActivePolicyModal] = useState<'privacy' | 'terms' | 'delivery' | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Products
  const [products, setProducts] = useState<FlowerProduct[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  // Cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Orders
  const [orders, setOrders] = useState<OrderRecord[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      if (saved) return JSON.parse(saved);
      // Seed with sample initial records so shop owners see the admin workflow
      return [
        {
          orderId: 'FDA-8055-101',
          createdAt: new Date(Date.now() - 3600000 * 20).toISOString(),
          status: 'Confirmed',
          customerName: 'Gabriela Ramirez',
          customerPhone: '(602) 555-0142',
          customerEmail: 'gabriela.r@example.com',
          fulfillmentMethod: 'delivery',
          requestedDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          recipientName: 'Rosa Elena Ramirez',
          recipientPhone: '(602) 555-0199',
          recipientAddress: '9150 W Van Buren St, Tolleson, AZ 85353',
          deliveryInstructions: 'Ring bell and place safely under shaded porch.',
          cardMessage: 'Feliz cumpleaños Mamá, gracias por todo tu amor. ¡Te queremos mucho!',
          items: [
            {
              cartId: 'item-demo-1',
              productId: 'fl-roses-01',
              name: 'Eternal Romance Red Roses',
              price: 75.00,
              variationName: 'Deluxe',
              variationPriceDelta: 25.00,
              colorPreference: 'Classic Red',
              quantity: 1,
              image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=400&q=80',
            }
          ],
          subtotal: 100.00,
          deliveryFee: 12.00,
          tax: 8.60,
          discount: 0.00,
          total: 120.60,
        }
      ];
    } catch {
      return [];
    }
  });

  // Custom Inquiries
  const [customInquiries, setCustomInquiries] = useState<CustomArrangementInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      if (saved) return JSON.parse(saved);
      return [
        {
          id: 'INQ-204',
          createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
          customerName: 'Mateo Ortiz',
          phone: '(602) 725-8055',
          email: 'mateo.ortiz@example.com',
          occasion: '15th Birthday / Quinceañera',
          preferredFlowers: 'Roses, White Lilies, Baby’s Breath',
          preferredColors: 'Blush pink, white, soft gold ribbon',
          budget: 150,
          requestedDate: new Date(Date.now() + 86400000 * 5).toISOString().split('T')[0],
          fulfillmentMethod: 'pickup',
          designDetails: 'Bouquet for Quinceañera mass presentation. Needs delicate stem wrap with pearl pins if possible.',
          status: 'Contacted',
        }
      ];
    } catch {
      return [];
    }
  });

  // Contact Messages
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MESSAGES);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Keep state synced with localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(customInquiries));
  }, [customInquiries]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(contactMessages));
  }, [contactMessages]);

  // Handle URL hash changes
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '') as PageRoute;
      const valid: PageRoute[] = ['home', 'shop', 'occasions', 'custom', 'story', 'delivery', 'contact', 'admin'];
      if (valid.includes(hash)) {
        setCurrentPageRaw(hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const setCurrentPage = (page: PageRoute) => {
    setCurrentPageRaw(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPage = (page: PageRoute, categoryFilter?: FlowerCategory | 'All') => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    setCurrentPage(page);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 4000);
  };

  const addToCart = (item: Omit<CartItem, 'cartId'>) => {
    const cartId = `cart-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    setCart(prev => [...prev, { ...item, cartId }]);
    showToast(`Added "${item.name}" (${item.variationName}) to your flower order.`);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartId: string) => {
    setCart(prev => prev.filter(i => i.cartId !== cartId));
  };

  const updateQuantity = (cartId: string, val: number, isAbsolute = false) => {
    setCart(prev =>
      prev
        .map(item => {
          if (item.cartId === cartId) {
            const next = isAbsolute ? val : item.quantity + val;
            return next > 0 ? { ...item, quantity: next } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const updateProduct = (updated: FlowerProduct) => {
    setProducts(prev => prev.map(p => (p.id === updated.id ? updated : p)));
    showToast(`Updated product "${updated.name}".`);
  };

  const createOrder = (orderData: {
    customerName: string;
    customerPhone: string;
    customerEmail: string;
    fulfillmentMethod: 'delivery' | 'pickup';
    requestedDate: string;
    recipientName?: string;
    recipientPhone?: string;
    recipientAddress?: string;
    deliveryInstructions?: string;
    pickupTimePreference?: string;
    cardMessage?: string;
    promoCode?: string;
    notes?: string;
  }): OrderRecord => {
    const totals = calculateOrderTotals(cart, orderData.fulfillmentMethod, orderData.promoCode);
    const orderNumber = `FDA-${Math.floor(1000 + Math.random() * 9000)}`;

    const newOrder: OrderRecord = {
      orderId: orderNumber,
      createdAt: new Date().toISOString(),
      status: 'Pending Review',
      customerName: orderData.customerName,
      customerPhone: orderData.customerPhone,
      customerEmail: orderData.customerEmail,
      fulfillmentMethod: orderData.fulfillmentMethod,
      requestedDate: orderData.requestedDate,
      recipientName: orderData.recipientName,
      recipientPhone: orderData.recipientPhone,
      recipientAddress: orderData.recipientAddress,
      deliveryInstructions: orderData.deliveryInstructions,
      pickupTimePreference: orderData.pickupTimePreference,
      cardMessage: orderData.cardMessage,
      items: [...cart],
      subtotal: totals.subtotal,
      deliveryFee: totals.deliveryFee,
      tax: totals.tax,
      discount: totals.discount,
      total: totals.total,
      promoCode: orderData.promoCode,
      notes: orderData.notes,
    };

    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev =>
      prev.map(o => (o.orderId === orderId ? { ...o, status: newStatus } : o))
    );
    showToast(`Order ${orderId} status set to ${newStatus}.`);
  };

  const createCustomInquiry = (inquiryData: Omit<CustomArrangementInquiry, 'id' | 'createdAt' | 'status'>) => {
    const newInq: CustomArrangementInquiry = {
      ...inquiryData,
      id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'New Inquiry',
    };
    setCustomInquiries(prev => [newInq, ...prev]);
    return newInq;
  };

  const updateInquiryStatus = (id: string, status: CustomArrangementInquiry['status']) => {
    setCustomInquiries(prev =>
      prev.map(i => (i.id === id ? { ...i, status } : i))
    );
    showToast(`Inquiry ${id} status updated to ${status}.`);
  };

  const createContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `MSG-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toISOString(),
      status: 'Unread',
    };
    setContactMessages(prev => [newMsg, ...prev]);
    return newMsg;
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => {
    const unitPrice = item.price + (item.variationPriceDelta || 0);
    return sum + unitPrice * item.quantity;
  }, 0);

  return (
    <ShopContext.Provider
      value={{
        currentPage,
        setCurrentPage,
        navigateToPage,
        products,
        setProducts,
        updateProduct,
        selectedCategory,
        setSelectedCategory,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartSubtotal,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        selectedProductForDetail,
        setSelectedProductForDetail,
        orders,
        createOrder,
        updateOrderStatus,
        customInquiries,
        createCustomInquiry,
        updateInquiryStatus,
        contactMessages,
        createContactMessage,
        activePolicyModal,
        setActivePolicyModal,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};

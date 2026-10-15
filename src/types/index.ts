export type PageRoute =
  | 'home'
  | 'shop'
  | 'occasions'
  | 'custom'
  | 'story'
  | 'delivery'
  | 'contact'
  | 'admin';

export type FlowerCategory =
  | 'Rose Bouquets'
  | 'Mixed Flower Bouquets'
  | 'Birthday Flowers'
  | 'Anniversary Flowers'
  | 'Romantic Flowers'
  | 'Seasonal Arrangements'
  | 'Custom Bouquets';

export interface ProductVariation {
  name: 'Standard' | 'Deluxe' | 'Premium';
  stemCount: string;
  priceDelta: number;
  description: string;
}

export interface FlowerProduct {
  id: string;
  name: string;
  slug: string;
  category: FlowerCategory;
  price: number;
  featured: boolean;
  bestseller: boolean;
  shortDescription: string;
  fullDescription: string;
  image: string;
  secondaryImage?: string;
  availableColors?: string[];
  variations: ProductVariation[];
  inStock: boolean;
  floralStemBreakdown?: string;
}

export interface CartItem {
  cartId: string;
  productId: string;
  name: string;
  price: number;
  variationName: string;
  variationPriceDelta: number;
  colorPreference?: string;
  quantity: number;
  cardMessage?: string;
  image: string;
}

export type OrderStatus =
  | 'Pending Review'
  | 'Confirmed'
  | 'Preparing'
  | 'Ready for Pickup'
  | 'Out for Delivery'
  | 'Completed'
  | 'Cancelled';

export interface OrderRecord {
  orderId: string;
  createdAt: string;
  status: OrderStatus;
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
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  tax: number;
  discount: number;
  total: number;
  promoCode?: string;
  notes?: string;
}

export interface CustomArrangementInquiry {
  id: string;
  createdAt: string;
  customerName: string;
  phone: string;
  email: string;
  occasion: string;
  preferredFlowers: string;
  preferredColors: string;
  budget: number;
  requestedDate: string;
  fulfillmentMethod: 'delivery' | 'pickup';
  designDetails: string;
  inspirationImageName?: string;
  inspirationImageData?: string;
  status: 'New Inquiry' | 'Contacted' | 'Quoted' | 'Accepted' | 'Archived';
}

export interface ContactMessage {
  id: string;
  createdAt: string;
  fullName: string;
  email: string;
  phone: string;
  inquiryType: 'General Question' | 'Existing Order' | 'Custom Arrangement' | 'Delivery Inquiry' | 'Other';
  message: string;
  status: 'Unread' | 'Replied' | 'Resolved';
}

import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { OrderRecord, OrderStatus, FlowerProduct } from '../types';
import { formatCurrency } from '../utils/orderRules';
import { ShieldCheck, Package, Clock, CheckCircle2, User, Phone, Mail, MapPin, Eye, FileText, Edit2, AlertCircle } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const {
    orders,
    updateOrderStatus,
    customInquiries,
    updateInquiryStatus,
    contactMessages,
    products,
    updateProduct,
    navigateToPage,
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'custom' | 'messages' | 'catalog'>('orders');
  const [selectedOrder, setSelectedOrder] = useState<OrderRecord | null>(orders[0] || null);
  const [editingProduct, setEditingProduct] = useState<FlowerProduct | null>(null);

  const statuses: OrderStatus[] = [
    'Pending Review',
    'Confirmed',
    'Preparing',
    'Ready for Pickup',
    'Out for Delivery',
    'Completed',
    'Cancelled',
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Top Banner */}
      <div className="bg-[#39251D] text-[#F8F5ED] rounded-sm p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-l-4 border-[#B3202D] shadow-md">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#647653]" />
            <span className="text-xs uppercase tracking-widest text-[#E9E0D4] font-semibold">
              Authorized Personnel Portal
            </span>
          </div>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold mt-1">
            Florecitas Del Alma — Shop Administration
          </h1>
          <p className="text-xs text-[#E9E0D4]/80 mt-0.5">
            Manage incoming flower order requests, custom inquiries, and product catalog for Tolleson, AZ operations.
          </p>
        </div>

        <button
          onClick={() => navigateToPage('shop')}
          className="py-2 px-4 bg-[#B3202D] hover:bg-[#971a25] text-white text-xs font-semibold rounded-xs transition-colors shrink-0"
        >
          View Live Storefront
        </button>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap border-b border-[#E9E0D4] gap-2">
        <button
          onClick={() => setActiveTab('orders')}
          className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider rounded-t-sm transition-colors flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-white border-t-2 border-x border-[#E9E0D4] text-[#B3202D]'
              : 'text-[#795A47] hover:text-[#39251D]'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('custom')}
          className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider rounded-t-sm transition-colors flex items-center gap-2 ${
            activeTab === 'custom'
              ? 'bg-white border-t-2 border-x border-[#E9E0D4] text-[#B3202D]'
              : 'text-[#795A47] hover:text-[#39251D]'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Custom Inquiries ({customInquiries.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('messages')}
          className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider rounded-t-sm transition-colors flex items-center gap-2 ${
            activeTab === 'messages'
              ? 'bg-white border-t-2 border-x border-[#E9E0D4] text-[#B3202D]'
              : 'text-[#795A47] hover:text-[#39251D]'
          }`}
        >
          <Mail className="w-4 h-4" />
          <span>Messages ({contactMessages.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('catalog')}
          className={`py-2 px-4 text-xs font-semibold uppercase tracking-wider rounded-t-sm transition-colors flex items-center gap-2 ${
            activeTab === 'catalog'
              ? 'bg-white border-t-2 border-x border-[#E9E0D4] text-[#B3202D]'
              : 'text-[#795A47] hover:text-[#39251D]'
          }`}
        >
          <Edit2 className="w-4 h-4" />
          <span>Product Catalog ({products.length})</span>
        </button>
      </div>

      {/* TAB 1: ORDERS MANAGEMENT */}
      {activeTab === 'orders' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Order List */}
          <div className="lg:col-span-5 space-y-3">
            <h2 className="font-serif text-lg font-bold text-[#39251D]">
              All Orders & Requests
            </h2>

            {orders.length === 0 ? (
              <div className="p-8 bg-white rounded-sm border border-[#E9E0D4] text-center text-xs text-[#795A47]">
                No orders placed yet.
              </div>
            ) : (
              orders.map(order => (
                <div
                  key={order.orderId}
                  onClick={() => setSelectedOrder(order)}
                  className={`p-4 bg-white rounded-sm border transition-all cursor-pointer space-y-2 ${
                    selectedOrder?.orderId === order.orderId
                      ? 'border-[#B3202D] ring-1 ring-[#B3202D] shadow-sm'
                      : 'border-[#E9E0D4] hover:border-[#795A47]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-xs text-[#39251D]">
                      {order.orderId}
                    </span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                        order.status === 'Confirmed'
                          ? 'bg-[#647653]/15 text-[#647653]'
                          : order.status === 'Pending Review'
                          ? 'bg-[#B3202D]/15 text-[#B3202D]'
                          : 'bg-[#E9E0D4] text-[#39251D]'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>

                  <div className="text-xs text-[#39251D]">
                    <span className="font-bold">{order.customerName}</span>
                    <span className="text-[#795A47] block text-[11px]">
                      {order.fulfillmentMethod.toUpperCase()} • Requested {order.requestedDate}
                    </span>
                  </div>

                  <div className="flex justify-between items-baseline pt-1 border-t border-[#E9E0D4] text-xs">
                    <span className="text-[#795A47]">{order.items.length} arrangement(s)</span>
                    <span className="font-serif font-bold text-[#B3202D]">
                      {formatCurrency(order.total)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Order Details & Notifications Preview */}
          <div className="lg:col-span-7">
            {selectedOrder ? (
              <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 space-y-6 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#E9E0D4] pb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#795A47]">
                      Order Record
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-[#39251D]">
                      {selectedOrder.orderId}
                    </h3>
                    <p className="text-xs text-[#795A47]">
                      Submitted: {new Date(selectedOrder.createdAt).toLocaleString()}
                    </p>
                  </div>

                  {/* Status Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#795A47] font-medium">Status:</span>
                    <select
                      value={selectedOrder.status}
                      onChange={e => updateOrderStatus(selectedOrder.orderId, e.target.value as OrderStatus)}
                      className="text-xs font-semibold px-3 py-1.5 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs text-[#39251D] focus:outline-none focus:border-[#B3202D]"
                    >
                      {statuses.map(st => (
                        <option key={st} value={st}>
                          {st}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Customer & Fulfillment Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3 bg-[#F8F5ED] rounded-xs border border-[#E9E0D4] space-y-1">
                    <span className="font-bold text-[#39251D] block mb-1">Customer / Sender:</span>
                    <p className="font-medium text-[#39251D]">{selectedOrder.customerName}</p>
                    <p className="text-[#795A47] flex items-center gap-1.5">
                      <Phone className="w-3 h-3" />
                      <a href={`tel:${selectedOrder.customerPhone}`} className="hover:underline">
                        {selectedOrder.customerPhone}
                      </a>
                    </p>
                    <p className="text-[#795A47] flex items-center gap-1.5">
                      <Mail className="w-3 h-3" />
                      <span>{selectedOrder.customerEmail}</span>
                    </p>
                  </div>

                  <div className="p-3 bg-[#F8F5ED] rounded-xs border border-[#E9E0D4] space-y-1">
                    <span className="font-bold text-[#39251D] block mb-1">Fulfillment Details:</span>
                    <p className="capitalize font-semibold text-[#B3202D]">
                      {selectedOrder.fulfillmentMethod} on {selectedOrder.requestedDate}
                    </p>
                    {selectedOrder.fulfillmentMethod === 'delivery' ? (
                      <>
                        <p className="text-[#39251D]">Recipient: {selectedOrder.recipientName}</p>
                        <p className="text-[#795A47]">{selectedOrder.recipientAddress}</p>
                        {selectedOrder.deliveryInstructions && (
                          <p className="text-[11px] text-[#795A47] italic">
                            Notes: {selectedOrder.deliveryInstructions}
                          </p>
                        )}
                      </>
                    ) : (
                      <p className="text-[#795A47]">
                        Window: {selectedOrder.pickupTimePreference || 'Store Hours'}
                      </p>
                    )}
                  </div>
                </div>

                {/* Items in Order */}
                <div className="space-y-3">
                  <span className="font-serif text-base font-bold text-[#39251D]">
                    Arrangements Ordered:
                  </span>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, idx) => (
                      <div
                        key={idx}
                        className="flex items-center gap-3 p-2.5 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs text-xs"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-14 object-cover rounded-xs"
                        />
                        <div className="flex-1">
                          <span className="font-bold text-[#39251D] block">{item.name}</span>
                          <span className="text-[#795A47]">
                            Size: {item.variationName} • Qty: {item.quantity}
                          </span>
                          {item.cardMessage && (
                            <p className="text-[11px] text-[#795A47] italic">
                              Card: "{item.cardMessage}"
                            </p>
                          )}
                        </div>
                        <span className="font-serif font-bold text-[#B3202D]">
                          {formatCurrency((item.price + (item.variationPriceDelta || 0)) * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 border-t border-[#E9E0D4] text-xs text-[#795A47] space-y-1">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-semibold text-[#39251D]">{formatCurrency(selectedOrder.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fulfillment Fee:</span>
                      <span>{formatCurrency(selectedOrder.deliveryFee)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Taxes:</span>
                      <span>{formatCurrency(selectedOrder.tax)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-serif font-bold text-[#39251D] pt-1 border-t border-[#E9E0D4]">
                      <span>Grand Total:</span>
                      <span className="text-[#B3202D]">{formatCurrency(selectedOrder.total)}</span>
                    </div>
                  </div>
                </div>

                {/* SECTION 6: EXACT PROFESSIONAL NOTIFICATIONS PREVIEW */}
                <div className="p-4 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm font-bold text-[#39251D] flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-[#B3202D]" />
                      <span>Customer Email Notification Preview (Brief Section 6)</span>
                    </span>
                    <span className="text-[10px] text-[#795A47] uppercase font-semibold">
                      {selectedOrder.status === 'Confirmed' ? 'Confirmation Mode' : 'Request Mode'}
                    </span>
                  </div>

                  <div className="p-3 bg-white border border-[#E9E0D4] rounded-xs text-[11px] font-mono whitespace-pre-line text-[#39251D] leading-relaxed">
                    {selectedOrder.status === 'Confirmed' ? (
                      `Subject: Your Florecitas Del Alma Order Is Confirmed

Hello ${selectedOrder.customerName},

Your order has been confirmed by Florecitas Del Alma.

Order number: ${selectedOrder.orderId}
Order details: ${selectedOrder.items.map(i => `${i.quantity}x ${i.name} (${i.variationName})`).join(', ')}
Fulfillment method: ${selectedOrder.fulfillmentMethod.toUpperCase()}
Confirmed date: ${selectedOrder.requestedDate}

Please keep this message for your records. For assistance with your order, contact us at +1 602-725-8055.

Thank you for trusting us with your special moment.

Florecitas Del Alma`
                    ) : (
                      `Subject: We Received Your Flower Order Request

Hello ${selectedOrder.customerName},

Thank you for choosing Florecitas Del Alma. We have received your flower order request and appreciate the opportunity to be part of your special moment.

Our team will review your selections and requested date. We will contact you to confirm availability, fulfillment details, and any applicable charges.

If you have any questions, please call us at +1 602-725-8055.

With appreciation,
Florecitas Del Alma
Más que flores, un sentimiento.`
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-white border border-[#E9E0D4] text-center text-xs text-[#795A47]">
                Select an order from the left to view details and customer notification preview.
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: CUSTOM INQUIRIES */}
      {activeTab === 'custom' && (
        <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#39251D]">
            Bespoke Floral Inquiries
          </h2>
          <div className="divide-y divide-[#E9E0D4]">
            {customInquiries.map(inq => (
              <div key={inq.id} className="py-5 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <span className="font-mono font-bold text-xs text-[#39251D] mr-3">
                      #{inq.id}
                    </span>
                    <span className="font-bold text-sm text-[#39251D]">{inq.customerName}</span>
                    <span className="text-xs text-[#795A47] ml-2">({inq.occasion})</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs text-[#795A47]">Status:</span>
                    <select
                      value={inq.status}
                      onChange={e => updateInquiryStatus(inq.id, e.target.value as any)}
                      className="text-xs px-2 py-1 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs"
                    >
                      <option value="New Inquiry">New Inquiry</option>
                      <option value="Contacted">Contacted</option>
                      <option value="Quoted">Quoted</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Archived">Archived</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs bg-[#F8F5ED] p-3 rounded-xs">
                  <div>
                    <span className="text-[#795A47] block">Contact:</span>
                    <a href={`tel:${inq.phone}`} className="font-semibold text-[#B3202D] hover:underline">
                      {inq.phone}
                    </a>
                    <span className="block text-[#795A47]">{inq.email}</span>
                  </div>

                  <div>
                    <span className="text-[#795A47] block">Preferences:</span>
                    <span className="text-[#39251D] font-medium block">{inq.preferredColors}</span>
                    <span className="text-[#795A47]">{inq.preferredFlowers}</span>
                  </div>

                  <div>
                    <span className="text-[#795A47] block">Fulfillment & Budget:</span>
                    <span className="font-semibold text-[#B3202D] block">
                      Budget: {formatCurrency(inq.budget)}
                    </span>
                    <span className="text-[#39251D] capitalize">
                      {inq.fulfillmentMethod} on {inq.requestedDate}
                    </span>
                  </div>
                </div>

                {inq.designDetails && (
                  <p className="text-xs text-[#39251D] leading-relaxed">
                    <strong>Design Notes:</strong> {inq.designDetails}
                  </p>
                )}

                {inq.inspirationImageData && (
                  <div className="flex items-center gap-3 pt-1">
                    <img
                      src={inq.inspirationImageData}
                      alt="Customer inspiration"
                      className="w-16 h-16 object-cover rounded-xs border border-[#E9E0D4]"
                    />
                    <span className="text-xs text-[#795A47]">
                      Attached inspiration image: {inq.inspirationImageName}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CONTACT MESSAGES */}
      {activeTab === 'messages' && (
        <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 space-y-6">
          <h2 className="font-serif text-xl font-bold text-[#39251D]">
            Customer Inquiries & Messages
          </h2>
          {contactMessages.length === 0 ? (
            <p className="text-xs text-[#795A47]">No general contact messages yet.</p>
          ) : (
            <div className="space-y-4">
              {contactMessages.map(msg => (
                <div key={msg.id} className="p-4 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs space-y-2 text-xs">
                  <div className="flex justify-between items-baseline">
                    <span className="font-bold text-sm text-[#39251D]">{msg.fullName}</span>
                    <span className="text-[#795A47]">{new Date(msg.createdAt).toLocaleString()}</span>
                  </div>
                  <div className="text-[#795A47]">
                    Type: <strong className="text-[#39251D]">{msg.inquiryType}</strong> • Phone:{' '}
                    <a href={`tel:${msg.phone}`} className="text-[#B3202D] underline">
                      {msg.phone}
                    </a>{' '}
                    • Email: {msg.email}
                  </div>
                  <p className="p-3 bg-white border border-[#E9E0D4] rounded-xs text-[#39251D] whitespace-pre-line">
                    {msg.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: PRODUCT CATALOG MANAGEMENT */}
      {activeTab === 'catalog' && (
        <div className="bg-white rounded-sm border border-[#E9E0D4] p-6 space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-serif text-xl font-bold text-[#39251D]">
              Manage Floral Products & Pricing
            </h2>
            <span className="text-xs text-[#795A47]">
              Changes persist instantly across the website.
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {products.map(prod => (
              <div
                key={prod.id}
                className="p-4 bg-[#F8F5ED] border border-[#E9E0D4] rounded-xs flex gap-3 text-xs"
              >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-16 h-20 object-cover rounded-xs border border-[#E9E0D4] shrink-0"
                />
                <div className="flex-1 space-y-1">
                  <span className="font-bold text-sm text-[#39251D] block">{prod.name}</span>
                  <span className="text-[#795A47] block">{prod.category}</span>
                  <span className="font-serif font-bold text-[#B3202D] text-sm block">
                    Base: {formatCurrency(prod.price)}
                  </span>
                  <div className="pt-2 flex items-center gap-2">
                    <button
                      onClick={() => {
                        const newPrice = prompt(`Enter new price for ${prod.name}:`, prod.price.toString());
                        if (newPrice && !isNaN(Number(newPrice))) {
                          updateProduct({ ...prod, price: Number(newPrice) });
                        }
                      }}
                      className="px-2 py-1 bg-white border border-[#795A47]/40 text-[#39251D] rounded-xs hover:bg-[#E9E0D4]"
                    >
                      Edit Price
                    </button>
                    <button
                      onClick={() => {
                        updateProduct({ ...prod, bestseller: !prod.bestseller });
                      }}
                      className={`px-2 py-1 rounded-xs border ${
                        prod.bestseller
                          ? 'bg-[#39251D] text-white border-[#39251D]'
                          : 'bg-white text-[#795A47] border-[#E9E0D4]'
                      }`}
                    >
                      {prod.bestseller ? '★ Bestseller' : 'Mark Bestseller'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

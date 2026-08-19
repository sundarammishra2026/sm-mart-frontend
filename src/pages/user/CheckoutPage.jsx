import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { orderService } from '../../services/orderService';
import { paymentService } from '../../services/paymentService';
import toast from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shippingAddress: user?.address || '',
    paymentMethod: 'Cash on Delivery',
    notes: ''
  });

  const subtotal = totalPrice;
  const shipping = subtotal > 499 ? 0 : 50;
  const tax = subtotal * 0.12;
  const total = subtotal + shipping + tax;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.shippingAddress) {
      toast.error('Please enter shipping address');
      return;
    }
    
    setLoading(true);
    try {
      const orderData = {
        items: items.map(item => ({
          productId: item.productId,
          quantity: item.quantity
        })),
        shippingAddress: formData.shippingAddress,
        paymentMethod: formData.paymentMethod,
        notes: formData.notes
      };

      const order = await orderService.create(orderData);
      
      if (formData.paymentMethod === 'Razorpay') {
        // ✅ Open Razorpay Payment Modal
        await handleRazorpayPayment(order);
      } else {
        // ✅ Cash on Delivery
        clearCart();
        toast.success('Order placed successfully! 🎉');
        navigate(`/order/${order.id}`);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  const handleRazorpayPayment = async (order) => {
    try {
      const paymentOrder = await paymentService.createOrder(order.id);
      
      // ✅ Check if Razorpay is loaded
      if (typeof window.Razorpay === 'undefined') {
        toast.error('Razorpay SDK not loaded. Please refresh and try again.');
        return;
      }

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY || 'rzp_test_YourKey',
        amount: paymentOrder.amount,
        currency: paymentOrder.currency,
        name: 'SM Mart',
        description: `Order #${order.orderNumber}`,
        order_id: paymentOrder.orderId,
        handler: async (response) => {
          await paymentService.verifyPayment({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            receipt: order.orderNumber
          });
          clearCart();
          toast.success('Payment successful! 🎉');
          navigate(`/order/${order.id}`);
        },
        prefill: {
          name: user.fullName,
          email: user.email,
          contact: user.phone || ''
        },
        theme: {
          color: '#12233D'
        },
        modal: {
          ondismiss: () => {
            toast.error('Payment cancelled');
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Razorpay error:', error);
      toast.error('Payment initiation failed');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-24 h-24 bg-[#12233D]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">🛒</span>
          </div>
          <h2 className="text-2xl font-bold text-[#12233D]">Your cart is empty</h2>
          <p className="text-gray-400 text-sm mt-2">Add some products to your cart first</p>
          <Link to="/products" className="inline-block mt-4 px-6 py-2.5 bg-[#12233D] text-white rounded-full hover:bg-[#0F6E6E] transition-all">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF6ED] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-mono text-[#0F6E6E] font-bold tracking-widest">CHECKOUT</span>
          <h1 className="text-3xl font-extrabold text-[#12233D]">Complete Your Order</h1>
          <p className="text-gray-400 text-sm mt-1">Fill in the details to place your order</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-[#12233D]/5 p-6">
              <form onSubmit={handleSubmit}>
                <h2 className="text-lg font-bold text-[#12233D] flex items-center gap-2 mb-4">
                  <span className="text-[#0F6E6E]">📍</span> Shipping Address
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-[#12233D] mb-1">Full Name</label>
                    <input
                      type="text"
                      value={user?.fullName || ''}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-600"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-[#12233D] mb-1">Email</label>
                    <input
                      type="email"
                      value={user?.email || ''}
                      className="w-full px-4 py-3 bg-gray-100 rounded-xl text-sm text-gray-600"
                      disabled
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-[#12233D] mb-1">Shipping Address *</label>
                  <textarea
                    value={formData.shippingAddress}
                    onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                    className="w-full px-4 py-3 border border-[#12233D]/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E] transition-shadow"
                    rows="3"
                    required
                    placeholder="Enter your complete shipping address"
                  />
                </div>

                <h2 className="text-lg font-bold text-[#12233D] flex items-center gap-2 mt-6 mb-4">
                  <span className="text-[#0F6E6E]">💳</span> Payment Method
                </h2>
                
                <div className="space-y-3">
                  <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === 'Cash on Delivery' 
                      ? 'border-[#0F6E6E] bg-[#0F6E6E]/5' 
                      : 'border-[#12233D]/10 hover:border-[#12233D]/30'
                  }`}>
                    <input
                      type="radio"
                      value="Cash on Delivery"
                      checked={formData.paymentMethod === 'Cash on Delivery'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-[#0F6E6E] focus:ring-[#0F6E6E]"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#12233D]">💵 Cash on Delivery</span>
                      <p className="text-xs text-gray-400">Pay when you receive the order</p>
                    </div>
                    {formData.paymentMethod === 'Cash on Delivery' && (
                      <span className="text-xs text-emerald-600 font-semibold">✓ Selected</span>
                    )}
                  </label>

                  <label className={`flex items-center gap-3 p-4 border rounded-xl cursor-pointer transition-all ${
                    formData.paymentMethod === 'Razorpay' 
                      ? 'border-[#0F6E6E] bg-[#0F6E6E]/5' 
                      : 'border-[#12233D]/10 hover:border-[#12233D]/30'
                  }`}>
                    <input
                      type="radio"
                      value="Razorpay"
                      checked={formData.paymentMethod === 'Razorpay'}
                      onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                      className="w-4 h-4 text-[#0F6E6E] focus:ring-[#0F6E6E]"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-[#12233D]">💰 Razorpay (Online)</span>
                      <p className="text-xs text-gray-400">Credit/Debit Card, UPI, Net Banking</p>
                    </div>
                    {formData.paymentMethod === 'Razorpay' && (
                      <span className="text-xs text-emerald-600 font-semibold">✓ Selected</span>
                    )}
                  </label>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-semibold text-[#12233D] mb-1">Order Notes (Optional)</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-4 py-3 border border-[#12233D]/10 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                    rows="2"
                    placeholder="Any special instructions..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !formData.shippingAddress}
                  className={`w-full mt-6 py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${
                    loading || !formData.shippingAddress
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-[#12233D] text-white hover:bg-[#0F6E6E] hover:scale-[1.02] shadow-lg'
                  }`}
                >
                  {loading ? 'Placing Order...' : 'Place Order'}
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#12233D]/5 p-6 sticky top-24">
              <h2 className="text-lg font-bold text-[#12233D] flex items-center gap-2 mb-4">
                <span className="text-[#0F6E6E]">📦</span> Order Summary
              </h2>

              <div className="space-y-2 text-sm max-h-60 overflow-y-auto">
                {items.map((item) => (
                  <div key={item.productId} className="flex justify-between py-2 border-b border-[#12233D]/5">
                    <span className="text-gray-600 truncate">{item.name} × {item.quantity}</span>
                    <span className="font-mono font-bold text-[#12233D]">₹{(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 space-y-2 text-sm border-t border-[#12233D]/5 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-mono font-bold">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Shipping</span>
                  <span className={`font-mono font-bold ${shipping === 0 ? 'text-emerald-600' : ''}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Tax (12%)</span>
                  <span className="font-mono font-bold">₹{tax.toFixed(2)}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t-2 border-[#12233D]">
                <div className="flex justify-between text-lg font-bold text-[#12233D]">
                  <span>Total</span>
                  <span className="font-mono text-[#0F6E6E]">₹{total.toFixed(2)}</span>
                </div>
                {shipping === 0 && (
                  <p className="text-xs text-emerald-600 font-mono mt-1">✓ Free shipping applied</p>
                )}
              </div>

              <Link to="/cart" className="block text-center mt-3 text-xs text-gray-400 hover:text-[#0F6E6E] transition-colors">
                ← Back to Cart
              </Link>

              <div className="mt-4 pt-4 border-t border-[#12233D]/5 flex justify-center gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1">🔒 Secure</span>
                <span className="flex items-center gap-1">🛡️ Encrypted</span>
                <span className="flex items-center gap-1">✅ Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
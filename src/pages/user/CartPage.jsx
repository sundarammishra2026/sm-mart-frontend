import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingBagIcon, 
  TrashIcon, 
  PlusIcon, 
  MinusIcon,
  ArrowRightIcon,
  ShoppingCartIcon,
  XMarkIcon,
  TagIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowPathIcon,
  HeartIcon,
  ClockIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const CartPage = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeItem(productId);
    toast.success('Item removed from cart');
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart();
      toast.success('Cart cleared');
    }
  };

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }
    navigate('/checkout');
  };

  // Calculate totals
  const subtotal = totalPrice;
  const shipping = subtotal > 499 ? 0 : 50;
  const tax = subtotal * 0.12;
  const discount = subtotal > 999 ? 50 : 0;
  const total = subtotal + shipping + tax - discount;

  // Suggested Products
  const suggestedProducts = [
    { id: 1, name: 'Wireless Headphones', price: 1999, image: 'https://placehold.co/200x200/12233D/FBF6ED?text=Headphones' },
    { id: 2, name: 'Smart Watch', price: 4999, image: 'https://placehold.co/200x200/12233D/FBF6ED?text=Watch' },
    { id: 3, name: 'Backpack', price: 1299, image: 'https://placehold.co/200x200/12233D/FBF6ED?text=Backpack' },
  ];

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] bg-[#FBF6ED] flex items-center justify-center px-4 py-12">
        <div className="text-center max-w-2xl">
          <div className="w-32 h-32 bg-[#12233D]/5 rounded-full flex items-center justify-center mx-auto mb-6">
            <ShoppingCartIcon className="w-16 h-16 text-[#12233D]/30" />
          </div>
          <span className="inline-block px-4 py-1 bg-[#FFB627]/20 text-[#12233D] text-xs font-mono font-bold rounded-full mb-4">
            CART EMPTY
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-[#12233D] mb-3">
            Your Cart is Empty 🛒
          </h2>
          <p className="text-gray-400 mb-8 text-sm max-w-md mx-auto">
            Looks like you haven't added anything to your cart yet.
            Start exploring our collections and find your perfect items!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/products" className="inline-block bg-[#12233D] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#0F6E6E] transition-all hover:scale-105 shadow-lg shadow-[#12233D]/20">
              Browse Products
            </Link>
            <Link to="/" className="inline-block border-2 border-[#12233D]/20 text-[#12233D] px-8 py-3.5 rounded-full font-semibold hover:bg-[#12233D]/5 transition-all">
              Go Home
            </Link>
          </div>

          {/* Suggested Products */}
          <div className="mt-12">
            <p className="text-sm text-gray-400 font-mono mb-4">✨ You might also like</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {suggestedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                  <img src={product.image} alt={product.name} className="w-full h-24 object-cover rounded-lg mb-2" />
                  <h4 className="text-sm font-semibold text-[#12233D]">{product.name}</h4>
                  <p className="text-sm font-mono text-[#0F6E6E]">₹{product.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF6ED] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 bg-[#FFB627]/20 text-[#12233D] text-xs font-mono font-bold rounded-full mb-2">
              YOUR CART
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#12233D] flex items-center gap-3">
              <ShoppingBagIcon className="w-8 h-8 text-[#0F6E6E]" />
              Shopping Cart
              <span className="text-sm font-mono bg-[#12233D] text-white px-3 py-1 rounded-full">
                {totalItems} items
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={handleClearCart}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-[#E23E3E] transition-colors font-mono"
            >
              <TrashIcon className="w-4 h-4" />
              Clear Cart
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.productId} className="group bg-white rounded-2xl shadow-sm border border-[#12233D]/5 hover:shadow-lg transition-all duration-300 overflow-hidden">
                <div className="flex flex-col sm:flex-row gap-4 p-4 sm:p-5">
                  {/* Image */}
                  <div className="relative sm:w-28 h-28 sm:h-28 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl overflow-hidden flex-shrink-0">
                    <img
                      src={item.imageUrl || 'https://placehold.co/200x200/12233D/FBF6ED?text=No+Image'}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://placehold.co/200x200/12233D/FBF6ED?text=No+Image';
                      }}
                    />
                    <button
                      onClick={() => handleRemoveItem(item.productId)}
                      className="absolute -top-2 -right-2 sm:top-2 sm:right-2 bg-white/90 backdrop-blur-sm p-1.5 rounded-full shadow-md hover:bg-white transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <XMarkIcon className="w-4 h-4 text-gray-500 hover:text-[#E23E3E]" />
                    </button>
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-[#12233D] text-base truncate">{item.name}</h3>
                      <p className="text-xs text-gray-400 font-mono mt-0.5">SKU: SM-{String(item.productId).padStart(4, '0')}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-mono font-bold text-[#0F6E6E] text-lg">
                          ₹{item.price}
                        </span>
                      </div>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 bg-[#FBF6ED] rounded-xl p-1">
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <MinusIcon className="w-4 h-4 text-[#12233D]" />
                      </button>
                      <span className="w-8 text-center font-mono font-bold text-[#12233D] text-sm">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                      >
                        <PlusIcon className="w-4 h-4 text-[#12233D]" />
                      </button>
                    </div>

                    {/* Total */}
                    <div className="flex items-center gap-3 sm:flex-col sm:items-end">
                      <span className="font-mono font-bold text-[#12233D] text-lg">
                        ₹{(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Continue Shopping */}
            <Link to="/products" className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-[#0F6E6E] transition-colors font-mono">
              <ArrowPathIcon className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm border border-[#12233D]/5 p-5 md:p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <TagIcon className="w-5 h-5 text-[#FFB627]" />
                <h2 className="text-xl font-bold text-[#12233D]">Order Summary</h2>
              </div>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between py-2 border-b border-[#12233D]/5">
                  <span className="text-gray-500">Subtotal ({totalItems} items)</span>
                  <span className="font-mono font-bold text-[#12233D]">₹{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#12233D]/5">
                  <span className="text-gray-500 flex items-center gap-1.5">
                    <TruckIcon className="w-4 h-4" />
                    Shipping
                  </span>
                  <span className={`font-mono font-bold ${shipping === 0 ? 'text-emerald-600' : 'text-[#12233D]'}`}>
                    {shipping === 0 ? 'Free' : `₹${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-[#12233D]/5">
                  <span className="text-gray-500">Tax (12%)</span>
                  <span className="font-mono font-bold text-[#12233D]">₹{tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between py-2 border-b border-[#12233D]/5 text-emerald-600">
                    <span className="flex items-center gap-1.5">
                      <span className="text-xs">🎉</span> Discount
                    </span>
                    <span className="font-mono font-bold">-₹{discount.toFixed(2)}</span>
                  </div>
                )}

                <div className="pt-3 mt-3 border-t-2 border-[#12233D]">
                  <div className="flex justify-between text-lg font-bold text-[#12233D]">
                    <span>Total</span>
                    <span className="font-mono text-[#0F6E6E] text-xl">₹{total.toFixed(2)}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-emerald-600 font-mono mt-1 flex items-center gap-1">
                      <CheckBadgeIcon className="w-3 h-3" />
                      Free shipping applied
                    </p>
                  )}
                  {discount > 0 && (
                    <p className="text-xs text-emerald-600 font-mono mt-0.5 flex items-center gap-1">
                      🎉 ₹50 discount applied
                    </p>
                  )}
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full mt-6 bg-[#12233D] text-white py-3.5 rounded-xl font-bold text-sm hover:bg-[#0F6E6E] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg shadow-[#12233D]/20"
              >
                Proceed to Checkout
                <ArrowRightIcon className="w-4 h-4" />
              </button>

              <Link to="/products" className="block text-center mt-3 text-xs text-gray-400 hover:text-[#0F6E6E] transition-colors font-mono">
                Continue Shopping →
              </Link>

              {/* Trust Badges */}
              <div className="mt-6 pt-6 border-t border-[#12233D]/10 grid grid-cols-3 gap-2 text-center">
                <div className="flex flex-col items-center">
                  <ShieldCheckIcon className="w-5 h-5 text-[#0F6E6E]" />
                  <span className="text-[9px] text-gray-400 font-mono mt-1">Secure</span>
                </div>
                <div className="flex flex-col items-center">
                  <ClockIcon className="w-5 h-5 text-[#0F6E6E]" />
                  <span className="text-[9px] text-gray-400 font-mono mt-1">Fast</span>
                </div>
                <div className="flex flex-col items-center">
                  <HeartIcon className="w-5 h-5 text-[#0F6E6E]" />
                  <span className="text-[9px] text-gray-400 font-mono mt-1">Trusted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
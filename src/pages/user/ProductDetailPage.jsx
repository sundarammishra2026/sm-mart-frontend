import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import { StarIcon, HeartIcon, ShareIcon, ShoppingBagIcon, TruckIcon, ShieldCheckIcon, ArrowPathIcon, CheckCircleIcon, MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // Mock Products Data
  const mockProducts = [
    { id: 1, name: 'Gaming Laptop', description: 'High performance gaming laptop with 16GB RAM, 1TB SSD, and RTX 4060', sku: 'LAP001', category: { name: 'Electronics' }, price: 79999.99, discountPrice: 74999.99, stockQuantity: 15, imageUrl: 'https://placehold.co/400x300/4F46E5/FFFFFF?text=Laptop', rating: 4.8, reviews: 127 },
    { id: 2, name: 'Wireless Headphones', description: 'Noise cancelling headphones with 40hr battery life', sku: 'HP001', category: { name: 'Electronics' }, price: 2999.99, discountPrice: 2499.99, stockQuantity: 30, imageUrl: 'https://placehold.co/400x300/4F46E5/FFFFFF?text=Headphones', rating: 4.5, reviews: 89 },
    { id: 3, name: 'Smart Watch', description: 'Fitness smart watch with heart rate monitor and GPS', sku: 'SW001', category: { name: 'Electronics' }, price: 4999.99, discountPrice: 4499.99, stockQuantity: 20, imageUrl: 'https://placehold.co/400x300/4F46E5/FFFFFF?text=Watch', rating: 4.3, reviews: 56 },
    { id: 4, name: 'Cotton T-Shirt', description: 'Premium cotton t-shirt with comfortable fit', sku: 'TS001', category: { name: 'Fashion' }, price: 999.99, discountPrice: 799.99, stockQuantity: 50, imageUrl: 'https://placehold.co/400x300/EC4899/FFFFFF?text=TShirt', rating: 4.2, reviews: 34 },
    { id: 5, name: 'Classic Jeans', description: 'Classic blue jeans with stretchable fabric', sku: 'JN001', category: { name: 'Fashion' }, price: 1999.99, discountPrice: 1699.99, stockQuantity: 35, imageUrl: 'https://placehold.co/400x300/EC4899/FFFFFF?text=Jeans', rating: 4.0, reviews: 23 },
    { id: 6, name: 'Bestseller Novel', description: 'Bestseller fiction novel with gripping storyline', sku: 'BK001', category: { name: 'Books' }, price: 499.99, discountPrice: 399.99, stockQuantity: 40, imageUrl: 'https://placehold.co/400x300/F59E0B/FFFFFF?text=Novel', rating: 4.7, reviews: 45 },
    { id: 7, name: 'Indian Cookbook', description: 'Authentic Indian recipes for every home', sku: 'BK002', category: { name: 'Books' }, price: 599.99, discountPrice: 499.99, stockQuantity: 25, imageUrl: 'https://placehold.co/400x300/F59E0B/FFFFFF?text=Cookbook', rating: 4.4, reviews: 12 },
    { id: 8, name: 'Coffee Maker', description: 'Automatic coffee maker with 12 cup capacity', sku: 'HM001', category: { name: 'Home' }, price: 6999.99, discountPrice: 6499.99, stockQuantity: 10, imageUrl: 'https://placehold.co/400x300/10B981/FFFFFF?text=Coffee', rating: 4.6, reviews: 78 }
  ];

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      
      // Try API first
      let data = await productService.getById(id);
      
      // If API returns empty or null, use mock data
      if (!data || !data.id) {
        const found = mockProducts.find(p => p.id === parseInt(id));
        data = found || mockProducts[0];
      }
      
      setProduct(data);
    } catch (error) {
      console.error('Error loading product:', error);
      // Use mock data on error
      const found = mockProducts.find(p => p.id === parseInt(id));
      setProduct(found || mockProducts[0]);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.stockQuantity === 0) {
      toast.error('Out of stock!');
      return;
    }
    addItem(product, quantity);
    toast.success(`${quantity} item(s) added to cart! 🎉`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#12233D] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-2xl mb-2">🔍</p>
          <h2 className="text-2xl font-bold text-[#12233D]">Product not found</h2>
          <p className="text-gray-400 text-sm mt-2">The product you're looking for doesn't exist</p>
          <Link to="/products" className="inline-block mt-4 px-6 py-2.5 bg-[#12233D] text-white rounded-full hover:bg-[#0F6E6E] transition-all">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#FBF6ED] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="text-sm text-gray-500 mb-6 font-mono">
          <Link to="/" className="hover:text-[#0F6E6E]">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-[#0F6E6E]">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-[#12233D]">{product.name}</span>
        </nav>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
            {/* Product Image */}
            <div className="relative bg-gray-50 rounded-xl overflow-hidden h-80 md:h-96">
              <img
                src={product.imageUrl || 'https://placehold.co/500x500/12233D/FBF6ED?text=No+Image'}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.src = 'https://placehold.co/500x500/12233D/FBF6ED?text=No+Image';
                }}
              />
              {product.discountPrice && (
                <span className="absolute top-4 left-4 bg-[#E23E3E] text-white text-xs font-mono font-bold px-3 py-1.5 rounded-full shadow-lg">
                  {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                </span>
              )}
            </div>

            {/* Product Info */}
            <div>
              <span className="text-xs font-mono font-bold text-[#0F6E6E] uppercase tracking-wider">
                {product.category?.name || 'General'}
              </span>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#12233D] mt-1">
                {product.name}
              </h1>
              <p className="text-xs text-gray-400 font-mono mt-1">SKU: {product.sku || 'N/A'}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-3">
                <div className="flex items-center">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      className={`w-4 h-4 ${star <= Math.round(product.rating || 4.5) ? 'text-[#FFB627] fill-current' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <span className="text-sm font-bold text-[#12233D]">{product.rating || '4.5'}</span>
                <span className="text-sm text-gray-400">({product.reviews || 0} reviews)</span>
              </div>

              {/* Price */}
              <div className="mt-4">
                {product.discountPrice ? (
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-extrabold text-[#0F6E6E]">₹{product.discountPrice}</span>
                    <span className="text-lg text-gray-400 line-through">₹{product.price}</span>
                  </div>
                ) : (
                  <span className="text-3xl font-extrabold text-[#0F6E6E]">₹{product.price}</span>
                )}
              </div>

              {/* Stock */}
              <div className="mt-3 flex items-center gap-2">
                {product.stockQuantity > 0 ? (
                  <>
                    <CheckCircleIcon className="w-5 h-5 text-emerald-500" />
                    <span className="text-emerald-600 font-medium">In Stock ({product.stockQuantity} available)</span>
                  </>
                ) : (
                  <span className="text-[#E23E3E] font-medium">Out of Stock</span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 text-sm leading-relaxed mt-4">
                {product.description || 'No description available.'}
              </p>

              {/* Quantity */}
              <div className="mt-5 flex items-center gap-4">
                <span className="text-sm font-semibold text-[#12233D]">Quantity:</span>
                <div className="flex items-center gap-1 bg-[#FBF6ED] rounded-xl p-1">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                    disabled={quantity <= 1}
                  >
                    <MinusIcon className="w-4 h-4 text-[#12233D]" />
                  </button>
                  <span className="w-10 text-center font-mono font-bold text-[#12233D]">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                    className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-white transition-colors"
                    disabled={quantity >= product.stockQuantity}
                  >
                    <PlusIcon className="w-4 h-4 text-[#12233D]" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className={`mt-5 w-full py-3.5 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 ${product.stockQuantity === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#12233D] text-white hover:bg-[#0F6E6E] hover:scale-[1.02] shadow-lg'}`}
              >
                <ShoppingBagIcon className="w-5 h-5" />
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
              </button>

              {/* Trust Badges */}
              <div className="mt-5 grid grid-cols-3 gap-2 pt-4 border-t border-[#12233D]/5">
                <div className="flex flex-col items-center text-center">
                  <TruckIcon className="w-5 h-5 text-[#0F6E6E]" />
                  <span className="text-[10px] text-gray-500 font-mono mt-1">Free Shipping ₹499+</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ShieldCheckIcon className="w-5 h-5 text-[#0F6E6E]" />
                  <span className="text-[10px] text-gray-500 font-mono mt-1">Secure Payment</span>
                </div>
                <div className="flex flex-col items-center text-center">
                  <ArrowPathIcon className="w-5 h-5 text-[#0F6E6E]" />
                  <span className="text-[10px] text-gray-500 font-mono mt-1">7 Days Return</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
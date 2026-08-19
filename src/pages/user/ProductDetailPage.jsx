import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
import { StarIcon, HeartIcon, ShareIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const data = await productService.getById(id);
      setProduct(data);
    } catch (error) {
      toast.error('Product not found');
      navigate('/products');
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
    toast.success(`${quantity} item(s) added to cart!`);
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!product) {
    return <div className="text-center py-10">Product not found</div>;
  }

  return (
    <div className="max-w-6xl mx-auto bg-[#FBF6ED] py-8 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-8">
          {/* Product Image */}
          <div className="relative">
            <img
              src={product.imageUrl || 'https://placehold.co/500x500/12233D/FBF6ED?text=No+Image'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-xl"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-[#12233D]">{product.name}</h1>
            <p className="text-gray-400 text-sm font-mono mt-1">{product.category?.name}</p>

            <div className="mt-4">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-[#0F6E6E]">₹{product.discountPrice}</span>
                  <span className="text-lg text-gray-400 line-through ml-2">₹{product.price}</span>
                  <span className="ml-2 bg-[#E23E3E] text-white text-xs px-2 py-1 rounded-full">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-[#0F6E6E]">₹{product.price}</span>
              )}
            </div>

            <p className="text-gray-600 mt-4">{product.description}</p>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex items-center gap-2 border rounded-xl p-2">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-1 hover:bg-gray-100 rounded">-</button>
                <span className="w-8 text-center">{quantity}</span>
                <button onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))} className="px-3 py-1 hover:bg-gray-100 rounded">+</button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={product.stockQuantity === 0}
                className={`flex-1 py-3 rounded-xl font-bold text-sm transition-all ${product.stockQuantity === 0 ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 'bg-[#12233D] text-white hover:bg-[#0F6E6E]'}`}
              >
                {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart 🛒'}
              </button>
            </div>

            <div className="mt-4 text-sm text-gray-500">
              {product.stockQuantity > 0 ? (
                <span className="text-green-600">✓ In Stock ({product.stockQuantity} available)</span>
              ) : (
                <span className="text-red-600">✗ Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
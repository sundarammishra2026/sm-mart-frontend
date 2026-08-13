import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { productService } from '../../services/productService';
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
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="p-6">
            <img
              src={product.imageUrl || 'https://via.placeholder.com/500x500'}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Info */}
          <div className="p-6">
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-4">{product.category?.name}</p>

            {/* Price */}
            <div className="mb-4">
              {product.discountPrice ? (
                <>
                  <span className="text-3xl font-bold text-primary-600">₹{product.discountPrice}</span>
                  <span className="text-lg text-gray-400 line-through ml-2">₹{product.price}</span>
                  <span className="ml-2 bg-green-100 text-green-800 text-sm px-2 py-1 rounded">
                    {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-primary-600">₹{product.price}</span>
              )}
            </div>

            {/* Stock */}
            <p className="mb-4">
              {product.stockQuantity > 0 ? (
                <span className="text-green-600">✓ In Stock ({product.stockQuantity} available)</span>
              ) : (
                <span className="text-red-600">✗ Out of Stock</span>
              )}
            </p>

            {/* Description */}
            <p className="text-gray-700 mb-4">{product.description}</p>

            {/* Weight & Size */}
            <div className="flex gap-4 mb-4 text-sm text-gray-600">
              {product.weight && <span>Weight: {product.weight}</span>}
              {product.size && <span>Size: {product.size}</span>}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-4">
              <label className="font-medium">Quantity:</label>
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  -
                </button>
                <span className="px-4 py-1">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(product.stockQuantity, quantity + 1))}
                  className="px-3 py-1 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button
              onClick={handleAddToCart}
              disabled={product.stockQuantity === 0}
              className={`btn-primary w-full py-3 text-lg ${product.stockQuantity === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart 🛒'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
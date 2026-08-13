import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const data = await productService.getAll();
      setFeaturedProducts(data.filter(p => p.isFeatured).slice(0, 4));
    } catch (error) {
      console.error('Failed to load products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-800 text-white rounded-2xl p-12 mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to SM Mart! 🛒
        </h1>
        <p className="text-xl mb-6">Your one-stop shop for everything!</p>
        <Link to="/products" className="bg-white text-primary-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop Now
        </Link>
      </div>

      {/* Categories Section */}
      <div className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Electronics', 'Fashion', 'Books', 'Home & Kitchen'].map((cat) => (
            <div key={cat} className="bg-white p-6 rounded-lg shadow text-center hover:shadow-lg transition cursor-pointer">
              <div className="text-4xl mb-2">
                {cat === 'Electronics' && '💻'}
                {cat === 'Fashion' && '👗'}
                {cat === 'Books' && '📚'}
                {cat === 'Home & Kitchen' && '🏠'}
              </div>
              <h3 className="font-semibold">{cat}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Products */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card p-4">
                <img
                  src={product.imageUrl || 'https://via.placeholder.com/300x200'}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-lg"
                />
                <h3 className="font-semibold mt-2">{product.name}</h3>
                <p className="text-primary-600 font-bold">₹{product.price}</p>
                <Link to={`/product/${product.id}`} className="btn-primary w-full block text-center mt-2">
                  View Details
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';
import { 
  MagnifyingGlassIcon, 
  StarIcon, 
  XMarkIcon, 
  AdjustmentsHorizontalIcon,
  FunnelIcon,
  ChevronUpDownIcon
} from '@heroicons/react/24/outline';

// Premium Color Palette
const ACCENTS = {
  'Electronics': '#4F46E5',   // Indigo
  'Fashion': '#EC4899',       // Pink
  'Books': '#F59E0B',         // Amber
  'Home': '#10B981',          // Emerald
  'Kitchen': '#14B8A6',       // Teal
  'Mobile': '#8B5CF6',        // Violet
  'Laptop': '#3B82F6',        // Blue
  'Clothing': '#EC4899',      // Pink
  'Shoes': '#F97316',         // Orange
  'Accessories': '#8B5CF6',   // Violet
  'Groceries': '#22C55E',     // Green
  'Toys': '#F43F5E',          // Rose
  'Sports': '#14B8A6',        // Teal
  'Beauty': '#EC4899'         // Pink
};

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 100000 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getAll()
      ]);
      setProducts(productsData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = useMemo(() => {
    let result = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           product.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || product.categoryId === parseInt(selectedCategory);
      const matchesPrice = (product.discountPrice || product.price) >= priceRange.min && 
                          (product.discountPrice || product.price) <= priceRange.max;
      return matchesSearch && matchesCategory && matchesPrice;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
    } else if (sortBy === 'name') {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'rating') {
      result = [...result].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }
    return result;
  }, [products, searchTerm, selectedCategory, sortBy, priceRange]);

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 100000 });
  };

  const hasActiveFilters = searchTerm || selectedCategory || priceRange.min > 0 || priceRange.max < 100000;

  const getCategoryColor = (categoryName) => {
    return ACCENTS[categoryName] || '#6B7280';
  };

  return (
    <div className="bg-[#FBF6ED] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-mono text-[#0F6E6E] font-bold tracking-widest mb-1">FULL CATALOG</p>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#12233D]">All Products</h1>
            <span className="text-xs font-mono bg-[#12233D] text-white px-3 py-1.5 rounded-full">
              {loading ? '…' : `${filteredProducts.length} item${filteredProducts.length !== 1 ? 's' : ''}`}
            </span>
          </div>
        </div>

        {/* Search + Sort + Filter Toggle */}
        <div className="flex flex-col md:flex-row gap-3 mb-5">
          <div className="relative flex-1">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-[#12233D]/10 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#0F6E6E] transition-shadow"
            />
          </div>
          <div className="flex gap-2">
            <div className="relative">
              <AdjustmentsHorizontalIcon className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-10 pr-8 py-3 rounded-full bg-white border border-[#12233D]/10 text-sm font-mono text-[#12233D] focus:outline-none focus:ring-2 focus:ring-[#0F6E6E] cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name">Name: A–Z</option>
                <option value="rating">Rating: High to Low</option>
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-full border transition-colors flex items-center gap-2 ${
                showFilters ? 'bg-[#12233D] text-white border-[#12233D]' : 'bg-white border-[#12233D]/10 text-[#12233D] hover:border-[#12233D]/40'
              }`}
            >
              <FunnelIcon className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="bg-white rounded-2xl p-6 mb-6 border border-[#12233D]/10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-2">Price Range</label>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="Min"
                    value={priceRange.min || ''}
                    onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) || 0 })}
                    className="w-24 px-3 py-2 rounded-lg border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="number"
                    placeholder="Max"
                    value={priceRange.max || ''}
                    onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) || 100000 })}
                    className="w-24 px-3 py-2 rounded-lg border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                >
                  <option value="">All Categories</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm text-[#E23E3E] font-semibold hover:underline"
                >
                  Clear All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filters */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 mb-5">
            {searchTerm && (
              <span className="inline-flex items-center gap-1 bg-[#12233D]/10 text-[#12233D] text-xs px-3 py-1.5 rounded-full">
                Search: {searchTerm}
                <button onClick={() => setSearchTerm('')} className="hover:text-[#E23E3E]">
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedCategory && (
              <span className="inline-flex items-center gap-1 bg-[#12233D]/10 text-[#12233D] text-xs px-3 py-1.5 rounded-full">
                Category: {categories.find(c => c.id === parseInt(selectedCategory))?.name}
                <button onClick={() => setSelectedCategory('')} className="hover:text-[#E23E3E]">
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
            {(priceRange.min > 0 || priceRange.max < 100000) && (
              <span className="inline-flex items-center gap-1 bg-[#12233D]/10 text-[#12233D] text-xs px-3 py-1.5 rounded-full">
                ₹{priceRange.min} - ₹{priceRange.max}
                <button onClick={() => setPriceRange({ min: 0, max: 100000 })} className="hover:text-[#E23E3E]">
                  <XMarkIcon className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}

        {/* Category Pills */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-1 scrollbar-hide">
          <button
            onClick={() => setSelectedCategory('')}
            className={`shrink-0 text-xs font-mono font-bold px-4 py-2 rounded-full border transition-colors ${
              !selectedCategory
                ? 'bg-[#12233D] text-white border-[#12233D]'
                : 'bg-white text-[#12233D] border-[#12233D]/15 hover:border-[#12233D]/40'
            }`}
          >
            All
          </button>
          {categories.map((cat) => {
            const active = selectedCategory === String(cat.id);
            const color = getCategoryColor(cat.name);
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(active ? '' : String(cat.id))}
                className={`shrink-0 text-xs font-mono font-bold px-4 py-2 rounded-full border transition-all ${
                  active 
                    ? 'text-white' 
                    : 'bg-white text-[#12233D] hover:bg-[#12233D]/5'
                }`}
                style={active ? { backgroundColor: color, borderColor: color } : { borderColor: color + '55' }}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {[1, 2, 3, 4, 5, 6, 7, 8].map(i => (
              <div key={i} className="bg-gray-200 animate-pulse h-72 rounded-2xl"></div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl">
            <p className="text-2xl mb-2">🔍</p>
            <p className="font-bold text-[#12233D] text-lg mb-1">No products found</p>
            <p className="text-gray-400 text-sm mb-5">Try adjusting your filters or search terms</p>
            <button
              onClick={clearFilters}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#12233D] text-white rounded-full font-semibold text-sm hover:bg-[#0F6E6E] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const color = getCategoryColor(product.category?.name);
              return (
                <div
                  key={product.id}
                  className="group relative bg-white rounded-2xl overflow-hidden border border-[#12233D]/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1.5"
                >
                  <div className="relative h-40 sm:h-48 overflow-hidden bg-gray-100">
                    <img
                      src={product.imageUrl || 'https://placehold.co/400x300/12233D/FBF6ED?text=No+Image'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => { e.target.src = 'https://placehold.co/400x300/12233D/FBF6ED?text=No+Image'; }}
                    />
                    {product.discountPrice && (
                      <span
                        style={{ backgroundColor: color }}
                        className="absolute top-3 left-3 text-white text-xs font-mono font-bold px-2.5 py-1 rounded-full shadow-lg"
                      >
                        {Math.round(((product.price - product.discountPrice) / product.price) * 100)}% OFF
                      </span>
                    )}
                    <button className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-md hover:bg-white transition-colors">
                      <svg className="w-4 h-4 text-[#12233D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                  </div>
                  <div className="p-4">
                    <span
                      style={{ color }}
                      className="text-xs font-mono font-bold tracking-wide uppercase"
                    >
                      {product.category?.name || 'General'}
                    </span>
                    <h3 className="font-bold text-[#12233D] text-sm mt-0.5 line-clamp-1">{product.name}</h3>
                    <div className="flex items-baseline gap-2 mt-1.5 font-mono">
                      {product.discountPrice ? (
                        <>
                          <span className="text-[#0F6E6E] font-bold text-lg">₹{product.discountPrice}</span>
                          <span className="text-gray-400 line-through text-xs">₹{product.price}</span>
                        </>
                      ) : (
                        <span className="text-[#0F6E6E] font-bold text-lg">₹{product.price}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs font-mono px-2 py-0.5 rounded-full ${
                        product.stockQuantity > 0 ? 'bg-[#0F6E6E]/10 text-[#0F6E6E]' : 'bg-red-100 text-red-700'
                      }`}>
                        {product.stockQuantity > 0 ? 'In Stock' : 'Out of Stock'}
                      </span>
                      <div className="flex items-center">
                        <span className="text-[#FFB627]">★</span>
                        <span className="text-gray-500 ml-1 font-mono text-xs">{product.rating || '4.5'}</span>
                      </div>
                    </div>
                    <Link
                      to={`/product/${product.id}`}
                      className="mt-3 w-full inline-block text-center bg-[#12233D] text-white text-sm font-semibold py-2.5 rounded-full hover:bg-[#0F6E6E] transition-colors"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
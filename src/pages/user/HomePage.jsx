import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { categoryService } from '../../services/categoryService';

import {
  ShoppingBagIcon,
  StarIcon,
  TruckIcon,
  ShieldCheckIcon,
  ArrowRightIcon,
  TagIcon,
  BoltIcon,
  HeartIcon,
  CheckCircleIcon,
  SparklesIcon,
  FireIcon,
  ClockIcon,
} from '@heroicons/react/24/outline';

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, categoriesData] = await Promise.all([
        productService.getAll(),
        categoryService.getActive(),
      ]);

      const featured = productsData.filter((p) => p.isFeatured);

      setFeaturedProducts(
        featured.length > 0
          ? featured.slice(0, 8)
          : productsData.slice(0, 8)
      );

      setCategories(categoriesData || []);
    } catch (error) {
      console.error('Failed to load data:', error);

      setCategories([
        { id: 1, name: 'Electronics', productCount: 25 },
        { id: 2, name: 'Fashion', productCount: 42 },
        { id: 3, name: 'Books', productCount: 18 },
        { id: 4, name: 'Home', productCount: 31 },
        { id: 5, name: 'Beauty', productCount: 20 },
        { id: 6, name: 'Sports', productCount: 15 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  };

  const getCategoryIcon = (name = '') => {
    const icons = {
      Electronics: '💻',
      Fashion: '👗',
      Books: '📚',
      Home: '🏠',
      Kitchen: '🍳',
      Mobile: '📱',
      Laptop: '💻',
      Clothing: '👕',
      Shoes: '👟',
      Accessories: '👜',
      Groceries: '🛒',
      Toys: '🧸',
      Sports: '⚽',
      Beauty: '💄',
    };

    return icons[name] || '📦';
  };

  const benefits = [
    {
      icon: TruckIcon,
      title: 'Fast Delivery',
      description: 'Quick & reliable delivery',
    },
    {
      icon: ShieldCheckIcon,
      title: 'Secure Payment',
      description: '100% secure checkout',
    },
    {
      icon: CheckCircleIcon,
      title: 'Quality Products',
      description: 'Handpicked for you',
    },
    {
      icon: ArrowRightIcon,
      title: 'Easy Returns',
      description: '7-day return policy',
    },
  ];

  const tickerItems = [
    'FREE DELIVERY ABOVE ₹499',
    'SECURE PAYMENTS',
    '7 DAYS EASY RETURNS',
    'PREMIUM QUALITY',
    'NEW PRODUCTS EVERY WEEK',
  ];

  return (
    <div className="min-h-screen bg-[#FAF7F0] text-[#14213D]">

      {/* =========================================================
          GLOBAL STYLES
      ========================================================= */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;700&display=swap');

        .font-display {
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        .font-body {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }

        .font-mono {
          font-family: 'JetBrains Mono', monospace;
        }

        .hero-pattern {
          background-image:
            radial-gradient(circle at 20% 20%, rgba(255,182,39,.15) 0, transparent 25%),
            radial-gradient(circle at 80% 70%, rgba(15,110,110,.18) 0, transparent 25%);
        }

        .grid-pattern {
          background-image:
            linear-gradient(rgba(255,255,255,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.04) 1px, transparent 1px);
          background-size: 35px 35px;
        }

        .soft-grid {
          background-image:
            linear-gradient(rgba(20,33,61,.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(20,33,61,.04) 1px, transparent 1px);
          background-size: 35px 35px;
        }

        @keyframes float {
          0%,100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float-animation {
          animation: float 5s ease-in-out infinite;
        }

        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }

        .marquee {
          animation: marquee 25s linear infinite;
        }

        .marquee:hover {
          animation-play-state: paused;
        }

        .glass {
          background: rgba(255,255,255,.08);
          backdrop-filter: blur(14px);
          border: 1px solid rgba(255,255,255,.12);
        }
      `}</style>

      <div className="font-body">

        {/* =========================================================
            HERO SECTION
        ========================================================= */}
        <section className="relative overflow-hidden bg-[#14213D] hero-pattern">

          <div className="absolute inset-0 grid-pattern opacity-40" />

          <div className="relative max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

            <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[680px] py-16 lg:py-20">

              {/* LEFT */}
              <div className="text-center lg:text-left">

                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFB627]/10 border border-[#FFB627]/30 text-[#FFB627] font-mono text-xs font-bold mb-6">
                  <SparklesIcon className="w-4 h-4" />
                  INDIA'S EVERYDAY BAZAAR
                </div>

                <h1 className="font-display font-extrabold text-white text-5xl sm:text-6xl lg:text-7xl leading-[0.95] tracking-tight">

                  Everything you
                  <span className="block text-[#FFB627] mt-2">
                    need.
                  </span>

                  <span className="block">
                    One smart cart.
                  </span>

                </h1>

                <p className="mt-7 text-white/65 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                  Discover handpicked products across fashion, electronics,
                  home, books and more — all in one place.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 mt-9 justify-center lg:justify-start">

                  <Link
                    to="/products"
                    className="group inline-flex items-center justify-center gap-3 bg-[#FFB627] text-[#14213D] px-7 py-4 rounded-2xl font-bold hover:bg-white transition-all duration-300 shadow-xl shadow-[#FFB627]/10"
                  >
                    Start Shopping
                    <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Link>

                  <Link
                    to="/products"
                    className="inline-flex items-center justify-center gap-3 px-7 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:bg-white/10 transition-all"
                  >
                    Explore Categories
                  </Link>

                </div>

                {/* TRUST */}
                <div className="flex flex-wrap justify-center lg:justify-start gap-6 mt-9">

                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <StarIcon className="w-5 h-5 text-[#FFB627] fill-[#FFB627]" />
                    <span>4.8 Rated</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <CheckCircleIcon className="w-5 h-5 text-[#38B2AC]" />
                    <span>500+ Customers</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/70 text-sm">
                    <TruckIcon className="w-5 h-5 text-[#38B2AC]" />
                    <span>Fast Delivery</span>
                  </div>

                </div>
              </div>

              {/* RIGHT VISUAL */}
              <div className="relative hidden md:block h-[480px]">

                {/* Main card */}
                <div className="absolute inset-10 lg:inset-0 flex items-center justify-center">

                  <div className="relative w-[340px] h-[420px] rounded-[40px] bg-gradient-to-br from-white to-[#F3E8D4] shadow-2xl rotate-3 overflow-hidden">

                    <div className="absolute inset-0 bg-gradient-to-br from-[#FFB627]/20 via-transparent to-[#0F6E6E]/20" />

                    <div className="relative p-8 h-full flex flex-col justify-between">

                      <div className="flex justify-between items-start">

                        <div>
                          <p className="font-mono text-xs text-[#0F6E6E] font-bold">
                            SM MART
                          </p>

                          <h3 className="font-display text-3xl font-extrabold mt-2">
                            Smart
                            <br />
                            Shopping
                          </h3>
                        </div>

                        <div className="w-12 h-12 rounded-2xl bg-[#14213D] text-[#FFB627] flex items-center justify-center">
                          <ShoppingBagIcon className="w-6 h-6" />
                        </div>

                      </div>

                      <div className="relative">

                        <div className="w-full h-48 rounded-3xl bg-[#14213D] overflow-hidden flex items-center justify-center">

                          <div className="text-center text-white">
                            <div className="text-7xl">🛍️</div>
                            <p className="font-mono text-xs text-white/50 mt-3">
                              SHOP • SAVE • SMILE
                            </p>
                          </div>

                        </div>

                        <div className="absolute -right-5 -top-5 w-20 h-20 rounded-full bg-[#FFB627] flex items-center justify-center rotate-12 shadow-xl">

                          <div className="text-center">
                            <p className="font-mono text-[9px] font-bold">
                              UP TO
                            </p>

                            <p className="font-display font-extrabold text-xl">
                              40%
                            </p>
                          </div>

                        </div>

                      </div>

                      <div className="flex justify-between items-end">

                        <div>
                          <p className="text-xs text-gray-400">
                            THIS WEEK
                          </p>

                          <p className="font-display font-bold text-lg">
                            Fresh Deals
                          </p>
                        </div>

                        <div className="font-mono text-[#0F6E6E] font-bold">
                          ₹499+
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

                {/* Floating tags */}

                <div className="float-animation absolute top-8 right-0 bg-[#FFB627] rounded-2xl px-5 py-4 shadow-2xl rotate-6">

                  <p className="font-mono text-[10px] font-bold text-[#14213D]/60">
                    DEAL OF THE DAY
                  </p>

                  <p className="font-display text-xl font-extrabold text-[#14213D]">
                    Up to 40% OFF
                  </p>

                </div>

                <div
                  className="float-animation absolute bottom-10 left-0 glass rounded-2xl px-5 py-4 shadow-xl -rotate-6"
                  style={{ animationDelay: '1s' }}
                >

                  <div className="flex items-center gap-3">

                    <div className="w-10 h-10 rounded-xl bg-[#0F6E6E] flex items-center justify-center">
                      <TruckIcon className="w-5 h-5 text-white" />
                    </div>

                    <div>
                      <p className="text-white font-bold text-sm">
                        Free Delivery
                      </p>

                      <p className="text-white/50 text-xs">
                        On orders ₹499+
                      </p>
                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>
        </section>

        {/* =========================================================
            MARQUEE
        ========================================================= */}
        <div className="bg-[#0F6E6E] overflow-hidden">

          <div className="flex whitespace-nowrap marquee py-4">

            {[...tickerItems, ...tickerItems].map((item, index) => (

              <div
                key={index}
                className="flex items-center gap-7 mx-7 text-white font-mono text-xs sm:text-sm font-bold"
              >
                {item}

                <span className="text-[#FFB627] text-lg">
                  ◆
                </span>

              </div>

            ))}

          </div>

        </div>

        {/* =========================================================
            CATEGORY SECTION
        ========================================================= */}
        <section className="py-20 lg:py-24 soft-grid">

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

              <div>

                <div className="flex items-center gap-2 text-[#0F6E6E] font-mono text-xs font-bold tracking-widest mb-3">
                  <TagIcon className="w-4 h-4" />
                  SHOP BY CATEGORY
                </div>

                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#14213D]">
                  Find what you love.
                </h2>

                <p className="text-gray-500 mt-3">
                  Explore our most popular categories.
                </p>

              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-[#0F6E6E] font-bold hover:text-[#14213D] transition"
              >
                View all
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

            </div>

            {loading ? (

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

                {[1, 2, 3, 4, 5, 6].map((item) => (

                  <div
                    key={item}
                    className="h-44 bg-white rounded-3xl animate-pulse"
                  />

                ))}

              </div>

            ) : (

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

                {categories.slice(0, 6).map((category) => (

                  <Link
                    key={category.id}
                    to={`/products?category=${category.id}`}
                    className="group bg-white rounded-3xl p-6 text-center border border-[#14213D]/5 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300"
                  >

                    <div className="w-16 h-16 mx-auto rounded-2xl bg-[#FAF7F0] flex items-center justify-center text-4xl group-hover:bg-[#FFB627]/20 group-hover:scale-110 transition-all">

                      {getCategoryIcon(category.name)}

                    </div>

                    <h3 className="font-display font-bold text-[#14213D] mt-4">
                      {category.name}
                    </h3>

                    <p className="font-mono text-[10px] text-gray-400 mt-2">
                      {category.productCount || 0} PRODUCTS
                    </p>

                  </Link>

                ))}

              </div>

            )}

          </div>

        </section>

        {/* =========================================================
            BENEFITS
        ========================================================= */}
        <section className="pb-20">

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

            <div className="bg-white rounded-[32px] shadow-xl border border-[#14213D]/5 overflow-hidden">

              <div className="grid grid-cols-2 lg:grid-cols-4">

                {benefits.map((benefit, index) => {

                  const Icon = benefit.icon;

                  return (

                    <div
                      key={index}
                      className={`p-6 sm:p-8 flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center sm:items-start lg:items-center xl:items-start gap-4 text-center sm:text-left lg:text-center xl:text-left
                      ${index !== benefits.length - 1 ? 'border-b sm:border-b-0 sm:border-r border-[#14213D]/10' : ''}
                      ${index === 1 ? 'border-r-0 lg:border-r' : ''}
                      `}
                    >

                      <div className="w-12 h-12 rounded-2xl bg-[#0F6E6E]/10 text-[#0F6E6E] flex items-center justify-center flex-shrink-0">

                        <Icon className="w-6 h-6" />

                      </div>

                      <div>

                        <h3 className="font-display font-bold text-[#14213D] text-sm">
                          {benefit.title}
                        </h3>

                        <p className="text-xs text-gray-400 mt-1">
                          {benefit.description}
                        </p>

                      </div>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            FEATURED PRODUCTS
        ========================================================= */}
        <section className="py-20 bg-white">

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5 mb-10">

              <div>

                <div className="flex items-center gap-2 text-[#E23E3E] font-mono text-xs font-bold tracking-widest mb-3">

                  <FireIcon className="w-4 h-4" />

                  TRENDING NOW

                </div>

                <h2 className="font-display font-extrabold text-4xl sm:text-5xl text-[#14213D]">
                  Featured Products
                </h2>

                <p className="text-gray-500 mt-3">
                  Handpicked products our customers love.
                </p>

              </div>

              <Link
                to="/products"
                className="inline-flex items-center gap-2 text-[#0F6E6E] font-bold"
              >
                Shop all
                <ArrowRightIcon className="w-4 h-4" />
              </Link>

            </div>

            {loading ? (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {[1, 2, 3, 4].map((item) => (

                  <div
                    key={item}
                    className="h-[440px] bg-gray-100 rounded-3xl animate-pulse"
                  />

                ))}

              </div>

            ) : featuredProducts.length === 0 ? (

              <div className="py-20 text-center bg-[#FAF7F0] rounded-3xl">

                <ShoppingBagIcon className="w-12 h-12 mx-auto text-gray-300" />

                <p className="text-gray-500 mt-4">
                  No products available right now.
                </p>

              </div>

            ) : (

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                {featuredProducts.map((product) => {

                  const discount =
                    product.discountPrice && product.price
                      ? Math.round(
                          ((product.price - product.discountPrice) /
                            product.price) *
                            100
                        )
                      : 0;

                  const isWishlisted = wishlist.includes(product.id);

                  return (

                    <div
                      key={product.id}
                      className="group bg-[#FAF7F0] rounded-[28px] overflow-hidden border border-[#14213D]/5 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
                    >

                      {/* IMAGE */}
                      <div className="relative h-64 bg-[#EFE9DD] overflow-hidden">

                        <img
                          src={
                            product.imageUrl ||
                            'https://placehold.co/600x500/14213D/FAF7F0?text=SM+MART'
                          }
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.currentTarget.src =
                              'https://placehold.co/600x500/14213D/FAF7F0?text=SM+MART';
                          }}
                        />

                        {/* DISCOUNT */}
                        {discount > 0 && (

                          <div className="absolute top-4 left-4 bg-[#E23E3E] text-white px-3 py-1.5 rounded-full font-mono text-[10px] font-bold shadow-lg">

                            {discount}% OFF

                          </div>

                        )}

                        {/* WISHLIST */}
                        <button
                          onClick={() => toggleWishlist(product.id)}
                          className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md transition-all
                            ${
                              isWishlisted
                                ? 'bg-[#E23E3E] text-white'
                                : 'bg-white/90 text-[#14213D] hover:bg-white'
                            }`}
                        >

                          <HeartIcon
                            className={`w-5 h-5 ${
                              isWishlisted ? 'fill-current' : ''
                            }`}
                          />

                        </button>

                        {/* QUICK LABEL */}
                        <div className="absolute bottom-4 left-4 bg-[#14213D]/90 text-white px-3 py-1.5 rounded-full font-mono text-[9px] flex items-center gap-1">

                          <BoltIcon className="w-3 h-3 text-[#FFB627]" />

                          FEATURED

                        </div>

                      </div>

                      {/* CONTENT */}
                      <div className="p-5">

                        <p className="font-mono text-[10px] uppercase tracking-wider text-[#0F6E6E] font-bold">

                          {product.category?.name || 'SM MART'}

                        </p>

                        <h3 className="font-display font-bold text-[#14213D] text-lg mt-2 line-clamp-1">

                          {product.name}

                        </h3>

                        <div className="flex items-center gap-1 mt-2">

                          <div className="flex text-[#FFB627]">

                            {[1, 2, 3, 4, 5].map((star) => (

                              <StarIcon
                                key={star}
                                className="w-3.5 h-3.5 fill-current"
                              />

                            ))}

                          </div>

                          <span className="text-xs text-gray-400">
                            4.5
                          </span>

                        </div>

                        {/* PRICE */}
                        <div className="flex items-center gap-3 mt-4">

                          {product.discountPrice ? (

                            <>
                              <span className="font-display text-2xl font-extrabold text-[#0F6E6E]">

                                ₹{product.discountPrice}

                              </span>

                              <span className="text-sm text-gray-400 line-through">

                                ₹{product.price}

                              </span>
                            </>

                          ) : (

                            <span className="font-display text-2xl font-extrabold text-[#0F6E6E]">

                              ₹{product.price}

                            </span>

                          )}

                        </div>

                        {/* STOCK */}
                        <div className="mt-3">

                          {product.stockQuantity > 0 ? (

                            <span className="inline-flex items-center gap-1.5 text-xs text-[#0F6E6E] font-semibold">

                              <span className="w-2 h-2 rounded-full bg-[#0F6E6E]" />

                              In Stock

                            </span>

                          ) : (

                            <span className="inline-flex items-center gap-1.5 text-xs text-[#E23E3E] font-semibold">

                              <span className="w-2 h-2 rounded-full bg-[#E23E3E]" />

                              Out of Stock

                            </span>

                          )}

                        </div>

                        {/* BUTTON */}
                        <Link
                          to={`/product/${product.id}`}
                          className="mt-5 w-full flex items-center justify-center gap-2 bg-[#14213D] text-white py-3 rounded-xl font-semibold text-sm hover:bg-[#0F6E6E] transition-colors"
                        >
                          View Product
                          <ArrowRightIcon className="w-4 h-4" />
                        </Link>

                      </div>

                    </div>

                  );

                })}

              </div>

            )}

          </div>

        </section>

        {/* =========================================================
            PROMO BANNER
        ========================================================= */}
        <section className="py-20 bg-[#FAF7F0]">

          <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">

            <div className="relative overflow-hidden rounded-[36px] bg-[#14213D] p-8 sm:p-12 lg:p-16">

              <div className="absolute inset-0 hero-pattern" />

              <div className="relative grid lg:grid-cols-2 gap-10 items-center">

                <div>

                  <div className="inline-flex items-center gap-2 bg-[#E23E3E] text-white px-4 py-2 rounded-full font-mono text-xs font-bold">

                    <ClockIcon className="w-4 h-4" />

                    LIMITED TIME DEAL

                  </div>

                  <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mt-6 leading-tight">

                    Big savings.
                    <span className="block text-[#FFB627]">
                      Small prices.
                    </span>

                  </h2>

                  <p className="text-white/60 mt-5 max-w-lg">
                    Grab your favourites before they're gone.
                    Fresh deals are added every week.
                  </p>

                  <Link
                    to="/products"
                    className="inline-flex items-center gap-2 mt-8 bg-[#FFB627] text-[#14213D] px-7 py-4 rounded-2xl font-bold hover:bg-white transition-all"
                  >
                    Shop Deals
                    <ArrowRightIcon className="w-5 h-5" />
                  </Link>

                </div>

                <div className="hidden lg:flex justify-center">

                  <div className="relative">

                    <div className="w-72 h-72 rounded-full bg-[#FFB627] flex items-center justify-center rotate-6 shadow-2xl">

                      <div className="text-center -rotate-6">

                        <p className="font-mono text-sm font-bold text-[#14213D]/60">
                          SAVE UP TO
                        </p>

                        <p className="font-display text-8xl font-extrabold text-[#14213D]">
                          40%
                        </p>

                        <p className="font-mono text-xs font-bold text-[#14213D]">
                          ON SELECTED PRODUCTS
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* =========================================================
            NEWSLETTER
        ========================================================= */}
        <section className="relative bg-[#0F6E6E] py-20 overflow-hidden">

          <div className="absolute inset-0 opacity-10 soft-grid" />

          <div className="relative max-w-3xl mx-auto px-5 text-center">

            <div className="w-14 h-14 mx-auto rounded-2xl bg-[#FFB627] text-[#14213D] flex items-center justify-center mb-6">

              <SparklesIcon className="w-7 h-7" />

            </div>

            <p className="font-mono text-[#FFB627] text-xs font-bold tracking-widest">
              STAY IN THE LOOP
            </p>

            <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-white mt-3">
              Don't miss the next deal.
            </h2>

            <p className="text-white/60 mt-4">
              Get weekly deals, new arrivals and exclusive offers directly
              in your inbox.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-8 max-w-xl mx-auto">

              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-5 py-4 rounded-2xl bg-white text-[#14213D] placeholder-gray-400 outline-none focus:ring-4 focus:ring-[#FFB627]/30"
              />

              <button className="px-7 py-4 rounded-2xl bg-[#FFB627] text-[#14213D] font-bold hover:bg-white transition-colors">
                Subscribe
              </button>

            </div>

            <p className="text-white/30 text-xs mt-4">
              No spam. Unsubscribe anytime.
            </p>

          </div>

        </section>

      </div>
    </div>
  );
};

export default HomePage;
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  StarIcon, 
  TruckIcon, 
  ShieldCheckIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const AboutPage = () => {
  const features = [
    { icon: <ShoppingBagIcon className="w-6 h-6" />, title: 'Wide Selection', desc: '10+ categories, 50+ products' },
    { icon: <StarIcon className="w-6 h-6" />, title: 'Quality Assurance', desc: 'Best quality products' },
    { icon: <TruckIcon className="w-6 h-6" />, title: 'Fast Delivery', desc: 'Free delivery on ₹499+' },
    { icon: <ShieldCheckIcon className="w-6 h-6" />, title: 'Secure Shopping', desc: '100% safe transactions' }
  ];

  return (
    <div className="bg-[#FBF6ED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#12233D] px-6 py-12 text-center">
            <h1 className="text-4xl font-extrabold text-white">
              About <span className="text-[#FFB627]">SM Mart</span>
            </h1>
            <p className="text-white/70 mt-2 font-mono text-sm">INDIA'S EVERYDAY BAZAAR</p>
          </div>
          
          <div className="p-8">
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Welcome to <strong className="text-[#12233D]">SM Mart</strong> — your one-stop destination for 
              everything you need. From fashion to electronics, books to home essentials, 
              we bring you the best products at unbeatable prices.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 bg-[#FBF6ED] rounded-xl">
                  <div className="text-[#0F6E6E]">{feature.icon}</div>
                  <div>
                    <h3 className="font-bold text-[#12233D]">{feature.title}</h3>
                    <p className="text-sm text-gray-500">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-[#12233D]/5 rounded-xl">
              <p className="text-center text-sm text-[#12233D]">
                <HeartIcon className="w-5 h-5 inline text-[#E23E3E]" /> 
                {' '}Made with love for our customers
              </p>
            </div>

            <div className="mt-8 text-center">
              <Link to="/products" className="inline-block px-6 py-3 bg-[#12233D] text-white rounded-full font-semibold hover:bg-[#0F6E6E] transition-colors">
                Start Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
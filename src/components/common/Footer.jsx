import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaTwitter, 
  FaYoutube,
  FaLinkedin,
  FaPinterest
} from 'react-icons/fa';
import { 
  ShoppingBagIcon, 
  TruckIcon, 
  ShieldCheckIcon, 
  HeartIcon 
} from '@heroicons/react/24/outline';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Footer Links Data
  const footerLinks = {
    quickLinks: [
      { name: 'About Us', path: '/about' },
      { name: 'Contact', path: '/contact' },
      { name: 'Privacy Policy', path: '/privacy' },
      { name: 'Terms & Conditions', path: '/terms' },
      { name: 'Return Policy', path: '/returns' },
      { name: 'FAQs', path: '/faqs' }
    ],
    customerService: [
      { name: 'Help Center', path: '/help' },
      { name: 'Track Order', path: '/orders' },
      { name: 'Shipping Info', path: '/shipping' },
      { name: 'Returns & Refunds', path: '/returns' },
      { name: 'Payment Methods', path: '/payment' },
      { name: 'Contact Us', path: '/contact' }
    ],
    shop: [
      { name: 'All Products', path: '/products' },
      { name: 'Electronics', path: '/products?category=1' },
      { name: 'Fashion', path: '/products?category=2' },
      { name: 'Books', path: '/products?category=3' },
      { name: 'Home & Kitchen', path: '/products?category=4' },
      { name: 'Beauty', path: '/products?category=5' }
    ]
  };

  const socialLinks = [
    { icon: <FaFacebook className="w-5 h-5" />, url: 'https://facebook.com', label: 'Facebook' },
    { icon: <FaInstagram className="w-5 h-5" />, url: 'https://instagram.com', label: 'Instagram' },
    { icon: <FaTwitter className="w-5 h-5" />, url: 'https://twitter.com', label: 'Twitter' },
    { icon: <FaYoutube className="w-5 h-5" />, url: 'https://youtube.com', label: 'YouTube' },
    { icon: <FaLinkedin className="w-5 h-5" />, url: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: <FaPinterest className="w-5 h-5" />, url: 'https://pinterest.com', label: 'Pinterest' }
  ];

  return (
    <footer className="bg-[#12233D] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="text-2xl font-extrabold inline-block">
              <span className="text-[#FFB627]">SM</span> Mart
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              India's everyday bazaar. Shop smart, save big.
            </p>
            <div className="flex space-x-3">
              {socialLinks.slice(0, 4).map((social, idx) => (
                <a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#FFB627] hover:text-[#12233D] flex items-center justify-center transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#FFB627] mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#FFB627] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#FFB627] mb-4">
              Customer Service
            </h3>
            <ul className="space-y-2">
              {footerLinks.customerService.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#FFB627] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-bold text-sm uppercase tracking-wider text-[#FFB627] mb-4">
              Shop
            </h3>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-[#FFB627] transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-10 pt-6 border-t border-white/10">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div className="flex flex-col items-center">
              <ShoppingBagIcon className="w-6 h-6 text-[#FFB627]" />
              <span className="text-xs text-gray-400 mt-1">100% Authentic</span>
            </div>
            <div className="flex flex-col items-center">
              <TruckIcon className="w-6 h-6 text-[#FFB627]" />
              <span className="text-xs text-gray-400 mt-1">Free Shipping ₹499+</span>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheckIcon className="w-6 h-6 text-[#FFB627]" />
              <span className="text-xs text-gray-400 mt-1">Secure Payments</span>
            </div>
            <div className="flex flex-col items-center">
              <HeartIcon className="w-6 h-6 text-[#FFB627]" />
              <span className="text-xs text-gray-400 mt-1">Loved by 500+</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>
            © {currentYear} <span className="text-[#FFB627]">SM Mart</span>. All rights reserved.
          </p>
          <div className="flex items-center gap-4 mt-2 sm:mt-0">
            <Link to="/privacy" className="hover:text-[#FFB627] transition-colors">
              Privacy
            </Link>
            <Link to="/terms" className="hover:text-[#FFB627] transition-colors">
              Terms
            </Link>
            <Link to="/sitemap" className="hover:text-[#FFB627] transition-colors">
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
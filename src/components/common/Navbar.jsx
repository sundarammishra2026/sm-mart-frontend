import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  Bars3Icon, 
  XMarkIcon,
  HomeIcon,
  ShoppingBagIcon,
  ClipboardDocumentListIcon,
  InformationCircleIcon,
  EnvelopeIcon,
  QuestionMarkCircleIcon,
  ShieldCheckIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  ArrowRightOnRectangleIcon,
  UserPlusIcon
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  // Menu Items
  const menuItems = [
    { name: 'Home', path: '/', icon: <HomeIcon className="w-4 h-4" /> },
    { name: 'Products', path: '/products', icon: <ShoppingBagIcon className="w-4 h-4" /> },
    { name: 'About', path: '/about', icon: <InformationCircleIcon className="w-4 h-4" /> },
    { name: 'Contact', path: '/contact', icon: <EnvelopeIcon className="w-4 h-4" /> },
  ];

  const footerPages = [
    { name: 'Privacy Policy', path: '/privacy', icon: <ShieldCheckIcon className="w-4 h-4" /> },
    { name: 'Terms & Conditions', path: '/terms', icon: <DocumentTextIcon className="w-4 h-4" /> },
    { name: 'Returns Policy', path: '/returns', icon: <ArrowPathIcon className="w-4 h-4" /> },
    { name: 'FAQs', path: '/faqs', icon: <QuestionMarkCircleIcon className="w-4 h-4" /> },
  ];

  return (
    <nav className="bg-[#12233D] shadow-lg sticky top-0 z-50 border-b border-[#FFB627]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2" onClick={() => setIsMenuOpen(false)}>
            <span className="text-2xl font-extrabold text-white">
              <span className="text-[#FFB627]">SM</span> Mart
            </span>
            <span className="hidden sm:inline text-[10px] font-mono text-[#FFB627]/60 tracking-widest">
              BAZAAR
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="px-3 py-2 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5"
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            {/* Pages Dropdown */}
            <div 
              className="relative group"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button className="px-3 py-2 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5">
                <DocumentTextIcon className="w-4 h-4" />
                Pages
                <svg className="w-3 h-3 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className={`absolute right-0 mt-1 w-56 bg-white rounded-xl shadow-2xl py-2 border border-[#12233D]/5 ${isDropdownOpen ? 'block' : 'hidden'}`}>
                {footerPages.map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="block px-4 py-2.5 text-sm text-[#12233D] hover:bg-[#FBF6ED] transition-colors flex items-center gap-2.5"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    <span className="text-[#0F6E6E]">{item.icon}</span>
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Cart */}
            <Link to="/cart" className="relative px-3 py-2 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5">
              <ShoppingCartIcon className="w-5 h-5" />
              <span className="hidden lg:inline">Cart</span>
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FFB627] text-[#12233D] text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Login/Register OR User Menu */}
            {user ? (
              <div className="relative group ml-1">
                <button className="flex items-center gap-2 px-3 py-2 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all">
                  <UserIcon className="w-5 h-5" />
                  <span className="text-sm font-medium max-w-[80px] truncate">{user.fullName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl py-2 hidden group-hover:block border border-[#12233D]/5">
                  <Link to="/profile" className="block px-4 py-2.5 text-sm text-[#12233D] hover:bg-[#FBF6ED] transition-colors flex items-center gap-2">
                    <UserIcon className="w-4 h-4" /> Profile
                  </Link>
                  <Link to="/orders" className="block px-4 py-2.5 text-sm text-[#12233D] hover:bg-[#FBF6ED] transition-colors flex items-center gap-2">
                    <ClipboardDocumentListIcon className="w-4 h-4" /> Orders
                  </Link>
                  {user.role === 'Admin' && (
                    <Link to="/admin" className="block px-4 py-2.5 text-sm text-[#12233D] hover:bg-[#FBF6ED] transition-colors border-t border-gray-100 mt-1 pt-2 flex items-center gap-2">
                      ⚙️ Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2.5 text-sm text-[#E23E3E] hover:bg-[#FBF6ED] transition-colors border-t border-gray-100 mt-1 pt-2 font-semibold flex items-center gap-2">
                    <ArrowRightOnRectangleIcon className="w-4 h-4" /> Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-1 ml-1">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-1.5"
                >
                  <ArrowRightOnRectangleIcon className="w-4 h-4" />
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-[#FFB627] text-[#12233D] rounded-lg font-bold text-sm hover:bg-white transition-all shadow-lg shadow-[#FFB627]/20 flex items-center gap-1.5"
                >
                  <UserPlusIcon className="w-4 h-4" />
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white/80 hover:text-[#FFB627]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10 space-y-1 max-h-[80vh] overflow-y-auto">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="block px-4 py-3 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-2.5"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}

            <div className="border-t border-white/10 my-2 pt-2">
              <p className="px-4 py-2 text-xs text-white/30 font-mono tracking-wider">PAGES</p>
              {footerPages.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2.5 text-white/70 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm flex items-center gap-2.5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="text-[#FFB627]">{item.icon}</span>
                  {item.name}
                </Link>
              ))}
            </div>

            <Link to="/cart" className="block px-4 py-3 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
              <ShoppingCartIcon className="w-5 h-5" /> Cart 
              {totalItems > 0 && <span className="bg-[#FFB627] text-[#12233D] text-xs font-bold px-2 py-0.5 rounded-full ml-auto">{totalItems}</span>}
            </Link>

            {user ? (
              <>
                <Link to="/profile" className="block px-4 py-3 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
                  <UserIcon className="w-4 h-4" /> Profile
                </Link>
                <Link to="/orders" className="block px-4 py-3 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-2.5" onClick={() => setIsMenuOpen(false)}>
                  <ClipboardDocumentListIcon className="w-4 h-4" /> Orders
                </Link>
                {user.role === 'Admin' && (
                  <Link to="/admin" className="block px-4 py-3 text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium" onClick={() => setIsMenuOpen(false)}>
                    ⚙️ Admin Panel
                  </Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left px-4 py-3 text-[#E23E3E] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center gap-2.5">
                  <ArrowRightOnRectangleIcon className="w-4 h-4" /> Logout
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-2 px-4 pt-2">
                <Link to="/login" className="w-full px-4 py-3 text-center text-white/80 hover:text-[#FFB627] hover:bg-white/5 rounded-lg transition-all text-sm font-medium flex items-center justify-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <ArrowRightOnRectangleIcon className="w-4 h-4" /> Login
                </Link>
                <Link to="/register" className="w-full px-4 py-3 text-center bg-[#FFB627] text-[#12233D] rounded-lg font-bold text-sm hover:bg-white transition-all flex items-center justify-center gap-2" onClick={() => setIsMenuOpen(false)}>
                  <UserPlusIcon className="w-4 h-4" /> Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
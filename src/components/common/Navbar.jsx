import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { ShoppingCartIcon, UserIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            SM Mart
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-700 hover:text-primary-600">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600">Products</Link>
            
            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCartIcon className="w-6 h-6 text-gray-700 hover:text-primary-600" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {user ? (
              <div className="relative group">
                <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                  <UserIcon className="w-6 h-6" />
                  <span>{user.fullName}</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 hidden group-hover:block">
                  <Link to="/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/orders" className="block px-4 py-2 hover:bg-gray-100">Orders</Link>
                  {user?.role === 'Admin' && (
                    <Link to="/admin" className="block px-4 py-2 hover:bg-gray-100">Admin Panel</Link>
                  )}
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <Link to="/login" className="btn-primary">Login</Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <XMarkIcon className="w-6 h-6" /> : <Bars3Icon className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <Link to="/" className="block py-2 hover:text-primary-600">Home</Link>
            <Link to="/products" className="block py-2 hover:text-primary-600">Products</Link>
            <Link to="/cart" className="block py-2 hover:text-primary-600">Cart ({totalItems})</Link>
            {user ? (
              <>
                <Link to="/profile" className="block py-2 hover:text-primary-600">Profile</Link>
                <Link to="/orders" className="block py-2 hover:text-primary-600">Orders</Link>
                {user?.role === 'Admin' && (
                  <Link to="/admin" className="block py-2 hover:text-primary-600">Admin</Link>
                )}
                <button onClick={handleLogout} className="block w-full text-left py-2 text-red-600">Logout</button>
              </>
            ) : (
              <Link to="/login" className="block py-2 btn-primary text-center">Login</Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
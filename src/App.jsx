import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Toaster } from 'react-hot-toast';

// Layout
import Layout from './components/common/Layout';

// User Pages
import HomePage from './pages/user/HomePage';
import ProductsPage from './pages/user/ProductsPage';
import ProductDetailPage from './pages/user/ProductDetailPage';
import CartPage from './pages/user/CartPage';
import CheckoutPage from './pages/user/CheckoutPage';
import LoginPage from './pages/user/LoginPage';
import RegisterPage from './pages/user/RegisterPage';
import ProfilePage from './pages/user/ProfilePage';
import OrderHistoryPage from './pages/user/OrderHistoryPage';
import OrderDetailPage from './pages/user/OrderDetailPage';
import AboutPage from './pages/user/AboutPage';
import ContactPage from './pages/user/ContactPage';

// New Pages
import PrivacyPage from './pages/user/PrivacyPage';
import TermsPage from './pages/user/TermsPage';
import ReturnsPage from './pages/user/ReturnsPage';
import FAQsPage from './pages/user/FAQsPage';

// Payment Pages
import PaymentSuccessPage from './pages/user/PaymentSuccessPage';
import PaymentFailedPage from './pages/user/PaymentFailedPage';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminCategories from './pages/admin/AdminCategories';
import AdminUsers from './pages/admin/AdminUsers';

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/login" />;
};

// Admin Route Component
const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" />;
  return isAdmin ? children : <Navigate to="/" />;
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Layout>
            <Toaster position="top-right" />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/product/:id" element={<ProductDetailPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* New Pages */}
              <Route path="/privacy" element={<PrivacyPage />} />
              <Route path="/terms" element={<TermsPage />} />
              <Route path="/returns" element={<ReturnsPage />} />
              <Route path="/faqs" element={<FAQsPage />} />

              {/* Payment Pages */}
              <Route path="/payment/success" element={<PaymentSuccessPage />} />
              <Route path="/payment/failed" element={<PaymentFailedPage />} />

              {/* Protected Routes */}
              <Route path="/checkout" element={
                <ProtectedRoute><CheckoutPage /></ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute><ProfilePage /></ProtectedRoute>
              } />
              <Route path="/orders" element={
                <ProtectedRoute><OrderHistoryPage /></ProtectedRoute>
              } />
              <Route path="/order/:id" element={
                <ProtectedRoute><OrderDetailPage /></ProtectedRoute>
              } />

              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminRoute><AdminDashboard /></AdminRoute>
              } />
              <Route path="/admin/products" element={
                <AdminRoute><AdminProducts /></AdminRoute>
              } />
              <Route path="/admin/orders" element={
                <AdminRoute><AdminOrders /></AdminRoute>
              } />
              <Route path="/admin/categories" element={
                <AdminRoute><AdminCategories /></AdminRoute>
              } />
              <Route path="/admin/users" element={
                <AdminRoute><AdminUsers /></AdminRoute>
              } />

              {/* 404 */}
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  ShoppingBagIcon, 
  ShoppingCartIcon, 
  UsersIcon, 
  TagIcon,
  CurrencyRupeeIcon
} from '@heroicons/react/24/outline';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    categories: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      setStats({
        products: 45,
        orders: 12,
        users: 50,
        categories: 6,
        revenue: 45999.99
      });
      setRecentOrders([
        { id: 1, orderNumber: 'ORD-20260813-001', customer: 'Test User', total: 2999.99, status: 'Processing', date: '2026-08-13' },
        { id: 2, orderNumber: 'ORD-20260812-002', customer: 'Demo User', total: 1499.00, status: 'Shipped', date: '2026-08-12' },
        { id: 3, orderNumber: 'ORD-20260811-003', customer: 'John Doe', total: 599.99, status: 'Delivered', date: '2026-08-11' }
      ]);
    } catch (error) {
      console.error('Failed to load dashboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats.products, icon: <ShoppingBagIcon className="w-6 h-6" />, color: 'bg-blue-50 text-blue-600', link: '/admin/products' },
    { label: 'Total Orders', value: stats.orders, icon: <ShoppingCartIcon className="w-6 h-6" />, color: 'bg-purple-50 text-purple-600', link: '/admin/orders' },
    { label: 'Total Users', value: stats.users, icon: <UsersIcon className="w-6 h-6" />, color: 'bg-emerald-50 text-emerald-600', link: '/admin/users' },
    { label: 'Categories', value: stats.categories, icon: <TagIcon className="w-6 h-6" />, color: 'bg-amber-50 text-amber-600', link: '/admin/categories' }
  ];

  const getStatusColor = (status) => {
    const colors = {
      'Pending': 'bg-yellow-100 text-yellow-800',
      'Processing': 'bg-blue-100 text-blue-800',
      'Shipped': 'bg-purple-100 text-purple-800',
      'Delivered': 'bg-emerald-100 text-emerald-800',
      'Cancelled': 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#12233D] mx-auto"></div>
          <p className="mt-4 text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6 bg-[#FBF6ED] min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-[#12233D] flex items-center gap-2">
            <span className="text-[#FFB627]">📊</span> Dashboard
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">Overview of your store performance</p>
        </div>
        <span className="text-xs font-mono bg-[#12233D] text-white px-3 py-1.5 rounded-full">
          {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
        </span>
      </div>

      {/* Revenue Card */}
      <div className="bg-gradient-to-r from-[#12233D] to-[#0F6E6E] rounded-2xl p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-white/70 text-sm font-medium">Total Revenue</p>
            <p className="text-3xl md:text-4xl font-extrabold mt-1">₹{stats.revenue.toFixed(2)}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-white/20 px-2.5 py-0.5 rounded-full">
                📈 +12.5%
              </span>
              <span className="text-white/50 text-xs">vs last month</span>
            </div>
          </div>
          <div className="p-4 bg-white/10 rounded-full">
            <CurrencyRupeeIcon className="w-8 h-8 md:w-10 md:h-10" />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, index) => (
          <Link key={index} to={stat.link} className="block">
            <div className={`${stat.color} rounded-xl p-5 border border-[#12233D]/5 hover:shadow-lg transition-all hover:-translate-y-1`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium opacity-70">{stat.label}</p>
                  <p className="text-xl md:text-2xl font-bold mt-0.5">{stat.value}</p>
                </div>
                <div className="p-2 bg-white/50 rounded-full">
                  {stat.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-sm border border-[#12233D]/5 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between flex-wrap gap-2">
          <h2 className="text-lg font-bold text-[#12233D]">🕐 Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-[#0F6E6E] hover:underline font-medium">
            View All →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-[#FBF6ED]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Order</th>
                <th className="px-4 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-mono font-bold text-[#12233D] uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-100">
              {recentOrders.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-8 text-center text-gray-500 text-sm">
                    No recent orders
                  </td>
                </tr>
              ) : (
                recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-[#FBF6ED] transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-[#0F6E6E]">#{order.orderNumber}</td>
                    <td className="px-4 py-3 text-sm text-[#12233D]">{order.customer}</td>
                    <td className="px-4 py-3 text-sm font-mono font-bold">₹{order.total.toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs font-mono text-gray-500">
                      {new Date(order.date).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
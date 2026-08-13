import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { productService } from '../../services/productService';
import { orderService } from '../../services/orderService';
import { categoryService } from '../../services/categoryService';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    categories: 0,
    revenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const [products, orders, categories] = await Promise.all([
        productService.getAll(),
        orderService.getAll(),
        categoryService.getAll()
      ]);

      const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);

      setStats({
        products: products.length,
        orders: orders.length,
        categories: categories.length,
        revenue: totalRevenue
      });
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  const StatCard = ({ title, value, color, link }) => (
    <Link to={link} className="block">
      <div className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${color} hover:shadow-lg transition`}>
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="text-3xl font-bold mt-2">{value}</p>
      </div>
    </Link>
  );

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Products"
          value={stats.products}
          color="border-blue-500"
          link="/admin/products"
        />
        <StatCard
          title="Total Orders"
          value={stats.orders}
          color="border-green-500"
          link="/admin/orders"
        />
        <StatCard
          title="Categories"
          value={stats.categories}
          color="border-purple-500"
          link="/admin/categories"
        />
        <StatCard
          title="Revenue"
          value={`₹${stats.revenue.toFixed(2)}`}
          color="border-yellow-500"
          link="/admin/orders"
        />
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-bold mb-4">Recent Orders</h2>
        <p className="text-gray-500">Order management coming soon...</p>
      </div>
    </div>
  );
};

export default AdminDashboard;
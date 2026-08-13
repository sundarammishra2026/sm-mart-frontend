import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { orderService } from '../../services/orderService';
import toast from 'react-hot-toast';

const OrderDetailPage = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadOrder();
  }, [id]);

  const loadOrder = async () => {
    try {
      const data = await orderService.getById(id);
      setOrder(data);
    } catch (error) {
      toast.error('Order not found');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (!order) return <div className="text-center py-10">Order not found</div>;

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex flex-wrap justify-between mb-4">
          <div>
            <p><span className="font-semibold">Order #:</span> {order.orderNumber}</p>
            <p><span className="font-semibold">Date:</span> {new Date(order.orderDate).toLocaleString()}</p>
          </div>
          <div>
            <p><span className="font-semibold">Status:</span> {order.status}</p>
            <p><span className="font-semibold">Payment:</span> {order.paymentStatus}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h3 className="font-semibold mb-2">Items</h3>
          {order.orderItems?.map((item) => (
            <div key={item.id} className="flex justify-between py-2 border-b">
              <span>{item.productName} × {item.quantity}</span>
              <span>₹{item.total.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="border-t pt-4 mt-4">
          <div className="space-y-1">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{order.subTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{order.shippingAmount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{order.taxAmount.toFixed(2)}</span>
            </div>
            {order.discountAmount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-₹{order.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 font-bold text-lg">
              <div className="flex justify-between">
                <span>Total</span>
                <span>₹{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-4">
          <h3 className="font-semibold mb-2">Shipping Address</h3>
          <p className="text-gray-600">{order.shippingAddress}</p>
        </div>

        <Link to="/orders" className="btn-outline mt-6 inline-block">
          ← Back to Orders
        </Link>
      </div>
    </div>
  );
};

export default OrderDetailPage;
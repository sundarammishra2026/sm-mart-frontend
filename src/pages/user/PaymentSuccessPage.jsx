import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/24/solid';

const PaymentSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/orders');
    }, 5000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircleIcon className="w-14 h-14 text-emerald-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#12233D] mb-2">Payment Successful! 🎉</h1>
        <p className="text-gray-500 text-sm mb-6">
          Your order has been placed successfully. You will receive a confirmation email shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/orders" className="px-6 py-3 bg-[#12233D] text-white rounded-xl font-semibold hover:bg-[#0F6E6E] transition-all">
            View Orders
          </Link>
          <Link to="/" className="px-6 py-3 border border-[#12233D]/20 text-[#12233D] rounded-xl font-semibold hover:bg-[#FBF6ED] transition-all">
            Continue Shopping
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4 font-mono">Redirecting to orders in 5 seconds...</p>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
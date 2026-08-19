import React from 'react';
import { Link } from 'react-router-dom';
import { XCircleIcon } from '@heroicons/react/24/solid';

const PaymentFailedPage = () => {
  return (
    <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 max-w-lg w-full text-center">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <XCircleIcon className="w-14 h-14 text-red-500" />
        </div>
        <h1 className="text-3xl font-extrabold text-[#12233D] mb-2">Payment Failed ❌</h1>
        <p className="text-gray-500 text-sm mb-6">
          Something went wrong with your payment. Please try again or use a different payment method.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/checkout" className="px-6 py-3 bg-[#12233D] text-white rounded-xl font-semibold hover:bg-[#0F6E6E] transition-all">
            Try Again
          </Link>
          <Link to="/cart" className="px-6 py-3 border border-[#12233D]/20 text-[#12233D] rounded-xl font-semibold hover:bg-[#FBF6ED] transition-all">
            Back to Cart
          </Link>
        </div>
        <p className="text-xs text-gray-400 mt-4 font-mono">Contact support if the issue persists</p>
      </div>
    </div>
  );
};

export default PaymentFailedPage;
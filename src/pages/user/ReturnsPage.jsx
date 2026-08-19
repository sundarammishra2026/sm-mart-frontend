import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowPathIcon } from '@heroicons/react/24/outline';

const ReturnsPage = () => {
  return (
    <div className="bg-[#FBF6ED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#12233D] px-6 py-8">
            <div className="flex items-center gap-3">
              <ArrowPathIcon className="w-8 h-8 text-[#FFB627]" />
              <h1 className="text-3xl font-extrabold text-white">Returns & Refunds</h1>
            </div>
            <p className="text-white/60 text-sm mt-1 font-mono">
              Last updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">Return Policy</h2>
              <p>We want you to love your purchase! If you're not satisfied, you can return items within <strong>7 days</strong> of delivery.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">Eligibility Criteria</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Items must be in original, unused condition</li>
                <li>Original tags and packaging must be intact</li>
                <li>Proof of purchase (order number) is required</li>
                <li>Some items (underwear, swimwear, etc.) cannot be returned</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">How to Initiate a Return</h2>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Login to your account and go to "Orders"</li>
                <li>Select the order with the item you want to return</li>
                <li>Click "Return Item" and select a reason</li>
                <li>Follow the instructions to ship the item back</li>
              </ol>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">Refund Process</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Refunds are processed within 5-7 business days</li>
                <li>Money is returned to original payment method</li>
                <li>Shipping charges are non-refundable</li>
                <li>You will receive an email confirmation when refund is processed</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">Return Shipping</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Free returns on defective or wrong items</li>
                <li>Customers are responsible for return shipping on non-defective items</li>
                <li>Use a trackable shipping method</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">Contact Us</h2>
              <p>For return assistance: <a href="mailto:returns@smmart.com" className="text-[#0F6E6E] hover:underline">returns@smmart.com</a></p>
            </section>

            <div className="bg-[#FBF6ED] rounded-xl p-4 text-center text-sm text-gray-500">
              <Link to="/" className="text-[#0F6E6E] hover:underline">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
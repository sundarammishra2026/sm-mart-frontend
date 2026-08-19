import React from 'react';
import { Link } from 'react-router-dom';
import { DocumentTextIcon } from '@heroicons/react/24/outline';

const TermsPage = () => {
  return (
    <div className="bg-[#FBF6ED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#12233D] px-6 py-8">
            <div className="flex items-center gap-3">
              <DocumentTextIcon className="w-8 h-8 text-[#FFB627]" />
              <h1 className="text-3xl font-extrabold text-white">Terms & Conditions</h1>
            </div>
            <p className="text-white/60 text-sm mt-1 font-mono">
              Last updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">1. Acceptance of Terms</h2>
              <p>By using SM Mart, you agree to these terms. If you don't agree, please don't use our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">2. Account Registration</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>You must provide accurate and complete information</li>
                <li>You are responsible for maintaining account security</li>
                <li>You must be at least 18 years old to create an account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">3. Orders and Payments</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>All orders are subject to product availability</li>
                <li>Prices are subject to change without notice</li>
                <li>We reserve the right to cancel or refuse orders</li>
                <li>Payment must be completed before order processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">4. Shipping and Delivery</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Delivery times are estimates and not guaranteed</li>
                <li>Shipping costs are calculated at checkout</li>
                <li>Free shipping applies to orders above ₹499</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">5. Returns and Refunds</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Items can be returned within 7 days of delivery</li>
                <li>Products must be in original condition</li>
                <li>Refunds are processed to original payment method</li>
                <li>Return shipping charges may apply</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">6. Intellectual Property</h2>
              <p>All content on this site is owned by SM Mart. You may not copy, distribute, or use our content without permission.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">7. Limitation of Liability</h2>
              <p>SM Mart is not liable for any indirect or consequential damages arising from use of our services.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">8. Contact</h2>
              <p>For questions about these terms, contact us at: <a href="mailto:legal@smmart.com" className="text-[#0F6E6E] hover:underline">legal@smmart.com</a></p>
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

export default TermsPage;
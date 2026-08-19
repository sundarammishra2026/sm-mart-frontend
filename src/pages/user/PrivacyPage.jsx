import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheckIcon } from '@heroicons/react/24/outline';

const PrivacyPage = () => {
  return (
    <div className="bg-[#FBF6ED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="bg-[#12233D] px-6 py-8">
            <div className="flex items-center gap-3">
              <ShieldCheckIcon className="w-8 h-8 text-[#FFB627]" />
              <h1 className="text-3xl font-extrabold text-white">Privacy Policy</h1>
            </div>
            <p className="text-white/60 text-sm mt-1 font-mono">
              Last updated: {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
            </p>
          </div>

          <div className="p-6 md:p-8 space-y-6 text-gray-600 text-sm leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">1. Information We Collect</h2>
              <p>We collect information you provide directly, such as when you create an account, place an order, or contact us. This includes:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Name and contact details</li>
                <li>Email address and phone number</li>
                <li>Shipping and billing addresses</li>
                <li>Payment information (processed securely)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">2. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and updates</li>
                <li>Improve our products and services</li>
                <li>Send promotional offers (you can opt-out anytime)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">3. Information Sharing</h2>
              <p>We do not sell or rent your personal information. We may share data with:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Payment processors (Razorpay, etc.)</li>
                <li>Delivery partners for order fulfillment</li>
                <li>Legal authorities when required by law</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">4. Data Security</h2>
              <p>We implement industry-standard security measures including:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>256-bit SSL encryption for all transactions</li>
                <li>Regular security audits and updates</li>
                <li>Secure storage of payment information</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">5. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-1">
                <li>Access, update, or delete your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Request data portability</li>
                <li>Withdraw consent at any time</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">6. Cookies</h2>
              <p>We use cookies to improve your experience. You can manage cookie preferences in your browser settings.</p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-[#12233D] mb-3">7. Contact Us</h2>
              <p>For privacy concerns or questions, email us at: <a href="mailto:privacy@smmart.com" className="text-[#0F6E6E] hover:underline">privacy@smmart.com</a></p>
            </section>

            <div className="bg-[#FBF6ED] rounded-xl p-4 text-center text-sm text-gray-500">
              <p>Last reviewed: {new Date().toLocaleDateString()}</p>
              <Link to="/" className="text-[#0F6E6E] hover:underline mt-2 inline-block">← Back to Home</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
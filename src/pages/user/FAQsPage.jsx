import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      q: "How do I place an order?",
      a: "Browse products, click 'Add to Cart', then proceed to checkout. Enter your shipping details and payment method to complete the order."
    },
    {
      q: "What payment methods are accepted?",
      a: "We accept credit/debit cards, UPI, Net Banking, Razorpay, and Cash on Delivery (COD) for eligible orders."
    },
    {
      q: "How long does delivery take?",
      a: "Delivery usually takes 3-5 business days depending on your location. You'll receive a tracking number once shipped."
    },
    {
      q: "Do you offer free shipping?",
      a: "Yes! We offer free shipping on all orders above ₹499. Standard shipping fee of ₹50 applies to orders below this amount."
    },
    {
      q: "What is your return policy?",
      a: "You can return items within 7 days of delivery. Items must be in original condition with tags and packaging intact."
    },
    {
      q: "How do I track my order?",
      a: "Login to your account, go to 'Orders', and click on the order number to view tracking details."
    },
    {
      q: "Can I cancel my order?",
      a: "Orders can be canceled within 1 hour of placement. Once processed, cancellations may not be possible."
    },
    {
      q: "How do I contact customer support?",
      a: "You can reach us via the Contact page, email at support@smmart.com, or call us at +91 98765 43210."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#FBF6ED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-[#12233D]">Frequently Asked Questions</h1>
          <p className="text-gray-400 text-sm mt-2 font-mono">Find answers to common questions about SM Mart</p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="divide-y divide-gray-100">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-100 last:border-b-0">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-4 flex justify-between items-center hover:bg-[#FBF6ED] transition-colors text-left"
                >
                  <span className="font-semibold text-[#12233D] text-sm">{faq.q}</span>
                  {openIndex === index ? (
                    <ChevronUpIcon className="w-5 h-5 text-[#0F6E6E] flex-shrink-0" />
                  ) : (
                    <ChevronDownIcon className="w-5 h-5 text-gray-400 flex-shrink-0" />
                  )}
                </button>
                {openIndex === index && (
                  <div className="px-6 pb-4 text-gray-600 text-sm leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Still have questions? <Link to="/contact" className="text-[#0F6E6E] font-semibold hover:underline">Contact us</Link></p>
        </div>
      </div>
    </div>
  );
};

export default FAQsPage;
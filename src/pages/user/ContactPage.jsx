import React, { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    { icon: <EnvelopeIcon className="w-6 h-6" />, label: 'Email', value: 'support@smmart.com' },
    { icon: <PhoneIcon className="w-6 h-6" />, label: 'Phone', value: '+91 98765 43210' },
    { icon: <MapPinIcon className="w-6 h-6" />, label: 'Address', value: '123, Bazaar Street, Mumbai, India' }
  ];

  return (
    <div className="bg-[#FBF6ED] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#12233D]">Get in Touch</h1>
          <p className="text-gray-500 mt-2 font-mono text-sm">We'd love to hear from you</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 space-y-4">
            {contactInfo.map((item, idx) => (
              <div key={idx} className="bg-white rounded-xl p-5 shadow-sm border border-[#12233D]/5">
                <div className="flex items-center gap-3">
                  <div className="text-[#0F6E6E]">{item.icon}</div>
                  <div>
                    <p className="text-xs text-gray-400 font-mono">{item.label}</p>
                    <p className="text-sm font-semibold text-[#12233D]">{item.value}</p>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="bg-[#12233D]/5 rounded-xl p-5 text-center">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-[#0F6E6E] mx-auto" />
              <p className="text-sm text-[#12233D] mt-2">Response within 24 hours</p>
            </div>
          </div>

          <div className="md:col-span-2 bg-white rounded-2xl shadow-xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-[#12233D] mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FBF6ED] rounded-xl border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#12233D] mb-1.5">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-[#FBF6ED] rounded-xl border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-1.5">Subject *</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FBF6ED] rounded-xl border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-1.5">Message *</label>
                <textarea
                  rows="5"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-[#FBF6ED] rounded-xl border border-[#12233D]/10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F6E6E] resize-none"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 bg-[#12233D] text-white rounded-xl font-bold text-sm transition-all hover:bg-[#0F6E6E] hover:scale-[1.01] ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
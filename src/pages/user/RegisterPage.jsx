import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  EnvelopeIcon, 
  LockClosedIcon, 
  UserIcon, 
  DevicePhoneMobileIcon,
  EyeIcon, 
  EyeSlashIcon,
  ArrowRightIcon,
  ShoppingBagIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password) {
      toast.error('Please fill in all required fields');
      return;
    }
    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (!agreeTerms) {
      toast.error('Please agree to the Terms & Conditions');
      return;
    }
    setLoading(true);
    try {
      await register(formData);
      toast.success('Account created successfully! 🎉');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-[#FBF6ED] flex items-center justify-center px-4 py-12">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;600;800&family=Plus+Jakarta+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');
        .font-display { font-family: 'Bricolage Grotesque', system-ui, sans-serif; }
        .font-body { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        .font-tag { font-family: 'JetBrains Mono', monospace; }
        
        .glass-effect {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .input-focus-ring {
          transition: all 0.3s ease;
        }
        .input-focus-ring:focus {
          box-shadow: 0 0 0 3px rgba(18, 35, 61, 0.1), 0 0 0 6px rgba(18, 35, 61, 0.05);
          border-color: #12233D;
        }
        
        .shimmer {
          background: linear-gradient(135deg, #12233D 0%, #0F6E6E 50%, #12233D 100%);
          background-size: 200% 200%;
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes shimmer {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        .float-animation {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

      <div className="font-body max-w-6xl w-full grid md:grid-cols-2 gap-8 items-center">

        {/* Left Side — Branding */}
        <div className="hidden md:flex flex-col items-start space-y-6">
          <div className="float-animation">
            <div className="w-20 h-20 bg-[#12233D] rounded-2xl flex items-center justify-center shadow-2xl">
              <ShoppingBagIcon className="w-10 h-10 text-[#FFB627]" />
            </div>
          </div>
          <h1 className="font-display text-4xl lg:text-5xl font-extrabold text-[#12233D] leading-tight">
            Join the
            <span className="block text-[#0F6E6E]">SM Mart family</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-sm">
            Create your account and start shopping with exclusive deals and offers.
          </p>
          
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <CheckBadgeIcon className="w-5 h-5 text-[#0F6E6E]" />
              <span className="text-sm text-gray-600">500+ happy customers</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckBadgeIcon className="w-5 h-5 text-[#0F6E6E]" />
              <span className="text-sm text-gray-600">10+ product categories</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckBadgeIcon className="w-5 h-5 text-[#0F6E6E]" />
              <span className="text-sm text-gray-600">Free delivery on ₹499+</span>
            </div>
          </div>

          {/* Decorative Elements */}
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-[#FFB627]/10 rounded-full blur-3xl"></div>
          <div className="absolute top-20 right-20 w-40 h-40 bg-[#0F6E6E]/10 rounded-full blur-3xl"></div>
        </div>

        {/* Right Side — Register Form */}
        <div className="glass-effect rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-2 -right-2 w-20 h-20 bg-[#FFB627] opacity-10 rounded-full blur-2xl"></div>
          <div className="absolute -bottom-2 -left-2 w-20 h-20 bg-[#0F6E6E] opacity-10 rounded-full blur-2xl"></div>

          <div className="relative">
            {/* Header */}
            <div className="mb-8">
              <span className="font-tag text-xs text-[#0F6E6E] font-bold tracking-widest">GET STARTED</span>
              <h2 className="font-display text-2xl font-bold text-[#12233D] mt-1">Create your account</h2>
              <p className="text-gray-400 text-sm mt-1">Fill in the details to get started</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <UserIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-[#12233D]/10 text-sm text-[#12233D] placeholder-gray-400 input-focus-ring outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-1.5">
                  Email Address *
                </label>
                <div className="relative">
                  <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-[#12233D]/10 text-sm text-[#12233D] placeholder-gray-400 input-focus-ring outline-none transition-all"
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-1.5">
                  Password *
                </label>
                <div className="relative">
                  <LockClosedIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min 6 characters"
                    className="w-full pl-11 pr-12 py-3.5 bg-white rounded-xl border border-[#12233D]/10 text-sm text-[#12233D] placeholder-gray-400 input-focus-ring outline-none transition-all"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#12233D] transition-colors"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold text-[#12233D] mb-1.5">
                  Phone Number (Optional)
                </label>
                <div className="relative">
                  <DevicePhoneMobileIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3.5 bg-white rounded-xl border border-[#12233D]/10 text-sm text-[#12233D] placeholder-gray-400 input-focus-ring outline-none transition-all"
                  />
                </div>
              </div>

              {/* Terms */}
              <div className="flex items-start gap-2 pt-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded border-[#12233D]/20 text-[#0F6E6E] focus:ring-2 focus:ring-[#0F6E6E] cursor-pointer mt-1"
                />
                <label htmlFor="terms" className="text-sm text-gray-500 cursor-pointer">
                  I agree to the{' '}
                  <Link to="/terms" className="text-[#0F6E6E] font-medium hover:underline">
                    Terms & Conditions
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" className="text-[#0F6E6E] font-medium hover:underline">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 shimmer text-white rounded-xl font-bold text-sm transition-all hover:scale-[1.02] flex items-center justify-center gap-2 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRightIcon className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-4 my-6">
              <div className="flex-1 h-px bg-[#12233D]/10"></div>
              <span className="text-xs text-gray-400 font-tag">OR</span>
              <div className="flex-1 h-px bg-[#12233D]/10"></div>
            </div>

            {/* Social Login */}
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-[#12233D]/10 rounded-xl text-sm font-medium text-[#12233D] hover:bg-[#12233D]/5 transition-colors">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                </svg>
                Google
              </button>
              <button className="flex items-center justify-center gap-2 py-3 bg-white border border-[#12233D]/10 rounded-xl text-sm font-medium text-[#12233D] hover:bg-[#12233D]/5 transition-colors">
                <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Facebook
              </button>
            </div>

            {/* Login Link */}
            <p className="text-center text-sm text-gray-500 mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-[#0F6E6E] font-semibold hover:underline">
                Sign in
              </Link>
            </p>

            {/* Security Badge */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <span className="text-xs text-gray-400 font-tag flex items-center gap-1">
                <LockClosedIcon className="w-3 h-3" />
                Secure · 256-bit encryption
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
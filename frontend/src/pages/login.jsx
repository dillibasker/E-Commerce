import { useState } from 'react';
import { Lock, Mail, User, LogIn, ArrowRight } from 'lucide-react';

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white z-50`}>
    {message}
  </div>
);

export default function Login({ onLogin = () => {}, goToSignup = () => {} }) {
  const [toast, setToast] = useState(null);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [captcha] = useState(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { a, b };
  });
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
          captchaAnswer: Number(answer),
          captchaExpected: captcha.a + captcha.b
        })
      });
      const data = await res.json();
      if (res.ok) {
        setToast({ message: 'Login successful!', type: 'success' });
        setTimeout(onLogin, 1800);
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Connection error. Please try again.', type: 'error' });
    }
  };

  const handleForgotPassword = async () => {
    if (!email) {
      setToast({ message: 'Please enter your registered email', type: 'error' });
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await res.json();
      if (res.ok) {
        setToast({ message: 'Password reset email sent!', type: 'success' });
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Connection error. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex w-full max-w-6xl mx-auto px-6 gap-12 items-center">
        {/* Left Side - Welcome Section */}
        <div className="hidden lg:flex flex-1 flex-col text-white">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Welcome to Our Platform</h1>
            <p className="text-xl text-slate-300 mb-6">
              Secure, fast, and reliable access to your account
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">Secure Authentication</h3>
                <p className="text-slate-400">Your data is protected with enterprise-grade security</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">Lightning Fast</h3>
                <p className="text-slate-400">Experience seamless performance across all devices</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-cyan-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">24/7 Support</h3>
                <p className="text-slate-400">Our team is always here to help you succeed</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-slate-800/50 backdrop-blur-sm rounded-2xl border border-slate-700">
            <p className="text-sm text-slate-400 mb-2">Trusted by over</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">10,000+</p>
            <p className="text-slate-300 mt-1">Active Users Worldwide</p>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 lg:w-[440px]">
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-8 rounded-3xl shadow-2xl border border-slate-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl mb-4 shadow-lg shadow-cyan-500/50">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">Welcome Back</h2>
            <p className="text-slate-400">Sign in to continue your journey</p>
          </div>

          {/* Username Input */}
          <div className="mb-5 group">
            <label className="block text-sm font-medium text-slate-300 mb-2">Username</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
              <input
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-slate-800 transition-all"
                placeholder="Enter your username"
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div className="mb-5 group">
            <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="email"
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-slate-800 transition-all"
                placeholder="Enter your email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="mb-3 group">
            <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-cyan-400 transition-colors" />
              <input
                type="password"
                className="w-full pl-12 pr-4 py-3 bg-slate-800/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent focus:bg-slate-800 transition-all"
                placeholder="Enter your password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="text-right mb-5">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-cyan-400 hover:text-cyan-300 font-medium transition-colors inline-flex items-center gap-1"
            >
              Forgot Password? <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          {/* Captcha */}
          <div className="mb-5 p-4 bg-slate-800/50 rounded-xl border border-slate-600">
            <p className="text-slate-300 mb-3 text-center text-sm font-medium">
              Verify you're human: <span className="font-bold text-cyan-400">{captcha.a} + {captcha.b} = ?</span>
            </p>
            <input
              type="number"
              className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all text-center"
              placeholder="Your answer"
              value={answer}
              onChange={e => setAnswer(e.target.value)}
            />
          </div>

          {/* Login Button */}
          <button 
            onClick={handleSubmit}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 text-white py-3 rounded-xl font-semibold shadow-lg shadow-cyan-500/30 hover:shadow-xl hover:shadow-cyan-500/40 hover:from-cyan-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <LogIn className="w-5 h-5" />
            Sign In
          </button>

          {/* Sign Up Link */}
          <p className="text-center mt-6 text-slate-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={goToSignup}
              className="text-cyan-400 hover:text-cyan-300 font-semibold transition-colors"
            >
              Create one now
            </button>
          </p>
        </div>
      </div>
      </div>
    </div>
  );
}
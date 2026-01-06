import { useState } from 'react';
import { UserPlus, Mail, User, Lock } from 'lucide-react';

const Toast = ({ message, type, onClose }) => (
  <div className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  } text-white z-50`}>
    {message}
  </div>
);

export default function Signup({ goToLogin = () => {} }) {
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [captcha] = useState(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { a, b };
  });
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          email,
          password,
          captchaAnswer: Number(answer),
          captchaExpected: captcha.a + captcha.b
        })
      });

      const data = await res.json();

      if (res.ok) {
        setToast({ message: 'Signup successful! Redirecting to login...', type: 'success' });
        setTimeout(goToLogin, 1800);
      } else {
        setToast({ message: data.message, type: 'error' });
      }
    } catch (error) {
      setToast({ message: 'Connection error. Please try again.', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-violet-900 to-indigo-900">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="flex w-full max-w-6xl mx-auto px-6 gap-12 items-center">
        {/* Left Side - Signup Form */}
        <div className="w-full lg:w-auto lg:flex-shrink-0 lg:w-[380px]">
          <div className="bg-gradient-to-br from-violet-950 to-purple-950 p-7 rounded-3xl shadow-2xl border border-purple-800">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl mb-3 shadow-lg shadow-purple-500/50">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-1">Create Account</h2>
              <p className="text-purple-300 text-sm">Join us today</p>
            </div>

            {/* Username Input */}
            <div className="mb-4 group">
              <label className="block text-xs font-medium text-purple-300 mb-1.5">Username</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-pink-400 transition-colors" />
                <input
                  className="w-full pl-10 pr-3 py-2.5 bg-purple-900/50 border border-purple-700 rounded-lg text-white text-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-purple-900 transition-all"
                  placeholder="Choose a username"
                  value={username}
                  onChange={e => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="mb-4 group">
              <label className="block text-xs font-medium text-purple-300 mb-1.5">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-pink-400 transition-colors" />
                <input
                  type="email"
                  className="w-full pl-10 pr-3 py-2.5 bg-purple-900/50 border border-purple-700 rounded-lg text-white text-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-purple-900 transition-all"
                  placeholder="Enter your email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-4 group">
              <label className="block text-xs font-medium text-purple-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-purple-400 group-focus-within:text-pink-400 transition-colors" />
                <input
                  type="password"
                  className="w-full pl-10 pr-3 py-2.5 bg-purple-900/50 border border-purple-700 rounded-lg text-white text-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent focus:bg-purple-900 transition-all"
                  placeholder="Create a password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Captcha */}
            <div className="mb-5 p-3 bg-purple-900/50 rounded-lg border border-purple-700">
              <p className="text-purple-300 mb-2 text-center text-xs font-medium">
                Verify: <span className="font-bold text-pink-400">{captcha.a} + {captcha.b} = ?</span>
              </p>
              <input
                type="number"
                className="w-full px-3 py-2 bg-purple-800/50 border border-purple-700 rounded-lg text-white text-sm placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all text-center"
                placeholder="Answer"
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                required
              />
            </div>

            {/* Signup Button */}
            <button 
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2.5 rounded-lg font-semibold text-sm shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" />
              Create Account
            </button>

            {/* Login Link */}
            <p className="text-center mt-5 text-purple-300 text-sm">
              Already have an account?{' '}
              <button
                type="button"
                onClick={goToLogin}
                className="text-pink-400 hover:text-pink-300 font-semibold transition-colors"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        {/* Right Side - Welcome Section */}
        <div className="hidden lg:flex flex-1 flex-col text-white">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">Join Our Community</h1>
            <p className="text-xl text-purple-200 mb-6">
              Create your account and unlock endless possibilities
            </p>
          </div>
          
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">Privacy First</h3>
                <p className="text-purple-300">Your information is encrypted and secure with us</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">Growing Community</h3>
                <p className="text-purple-300">Join thousands of users already on board</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1 text-white">Instant Setup</h3>
                <p className="text-purple-300">Get started in seconds with our easy process</p>
              </div>
            </div>
          </div>

          <div className="mt-12 p-6 bg-purple-900/30 backdrop-blur-sm rounded-2xl border border-purple-700">
            <p className="text-sm text-purple-300 mb-2">Join our community of</p>
            <p className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">10,000+</p>
            <p className="text-purple-200 mt-1">Happy Users Worldwide</p>
          </div>
        </div>
      </div>
    </div>
  );
}
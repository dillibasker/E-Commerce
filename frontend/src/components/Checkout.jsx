import { useState } from 'react';
import { X, CheckCircle, User, Mail, Phone, MapPin, CreditCard, Lock, Sparkles, Gift, Tag, ShoppingBag, ArrowLeft } from 'lucide-react';

export default function Checkout({ cart, total, onClose, onSuccess, isDarkMode }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const discount = promoApplied ? total * 0.1 : 0;
  const finalTotal = total - discount;

  const handleSubmit = async () => {
    if (!formData.customerName || !formData.customerEmail || !formData.customerPhone || !formData.address) {
      alert('Please fill all fields');
      return;
    }
    
    setLoading(true);

    const orderData = {
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total: finalTotal,
      ...formData
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2500);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyPromo = () => {
    if (promoCode.toLowerCase() === 'save10') {
      setPromoApplied(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div
        className={`rounded-3xl max-w-4xl w-full my-8 shadow-2xl ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}
        style={{ animation: 'slideIn 0.3s ease-out' }}
      >
        <style>{`
          @keyframes slideIn {
            from {
              transform: scale(0.95) translateY(20px);
              opacity: 0;
            }
            to {
              transform: scale(1) translateY(0);
              opacity: 1;
            }
          }
          @keyframes checkmark {
            0% {
              transform: scale(0) rotate(-45deg);
            }
            50% {
              transform: scale(1.2) rotate(-45deg);
            }
            100% {
              transform: scale(1) rotate(0deg);
            }
          }
          @keyframes confetti {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
              opacity: 0;
            }
          }
        `}</style>

        {success ? (
          <div className="p-12 text-center relative overflow-hidden">
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <CheckCircle 
                className="relative w-24 h-24 text-emerald-500 mx-auto" 
                style={{ animation: 'checkmark 0.5s ease-out' }}
              />
            </div>
            
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: '50%',
                  animation: `confetti ${1 + Math.random()}s ease-out forwards`,
                  animationDelay: `${Math.random() * 0.3}s`
                }}
              ></div>
            ))}

            <h2 className={`text-4xl font-black mb-3 ${
              isDarkMode ? 'text-white' : 'text-gray-800'
            }`}>
              🎉 Order Placed Successfully!
            </h2>
            <p className={`text-lg mb-6 ${
              isDarkMode ? 'text-slate-300' : 'text-gray-600'
            }`}>
              Thank you for your purchase! We'll send confirmation to your email.
            </p>
            
            <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
              isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-r from-emerald-50 to-teal-50'
            }`}>
              <Gift className="w-5 h-5 text-emerald-500" />
              <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
                Order Total: ₹{finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        ) : (
          <>
            <div className={`relative overflow-hidden ${
              isDarkMode 
                ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900' 
                : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
              <div className="relative flex items-center justify-between p-6">
                <button
                  onClick={onClose}
                  className="absolute left-6 rounded-full p-2 transition-all hover:bg-white/20 text-white"
                >
                  <ArrowLeft className="w-6 h-6" />
                </button>
                <div className="flex items-center space-x-3 mx-auto">
                  <div className={`p-3 rounded-xl ${
                    isDarkMode ? 'bg-slate-700' : 'bg-white/20 backdrop-blur-sm'
                  }`}>
                    <CreditCard className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-3xl font-black text-white">Secure Checkout</h2>
                    <p className="text-sm text-white/80 flex items-center space-x-1">
                      <Lock className="w-3 h-3" />
                      <span>256-bit SSL encrypted</span>
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="rounded-full p-2 transition-all hover:bg-white/20 text-white"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-6 p-6">
              <div className="md:col-span-3 space-y-5">
                <div className={`rounded-2xl p-5 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <User className="w-5 h-5 text-emerald-500" />
                    <span>Customer Information</span>
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label className={`block font-semibold mb-2 text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-gray-700'
                      }`}>
                        Full Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="John Doe"
                          value={formData.customerName}
                          onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all ${
                            isDarkMode
                              ? 'bg-slate-600 text-white placeholder-slate-400 focus:bg-slate-500'
                              : 'bg-white text-gray-800 placeholder-gray-400 focus:bg-gray-50'
                          } border-2 border-transparent focus:border-emerald-500 outline-none`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-gray-700'
                      }`}>
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.customerEmail}
                          onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all ${
                            isDarkMode
                              ? 'bg-slate-600 text-white placeholder-slate-400 focus:bg-slate-500'
                              : 'bg-white text-gray-800 placeholder-gray-400 focus:bg-gray-50'
                          } border-2 border-transparent focus:border-emerald-500 outline-none`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className={`block font-semibold mb-2 text-sm ${
                        isDarkMode ? 'text-slate-300' : 'text-gray-700'
                      }`}>
                        WhatsApp Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          placeholder="9876543210"
                          value={formData.customerPhone}
                          onChange={(e) => setFormData({ ...formData, customerPhone: e.target.value })}
                          className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all ${
                            isDarkMode
                              ? 'bg-slate-600 text-white placeholder-slate-400 focus:bg-slate-500'
                              : 'bg-white text-gray-800 placeholder-gray-400 focus:bg-gray-50'
                          } border-2 border-transparent focus:border-emerald-500 outline-none`}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl p-5 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <MapPin className="w-5 h-5 text-emerald-500" />
                    <span>Shipping Address</span>
                  </h3>

                  <div className="relative">
                    <MapPin className="absolute left-4 top-4 w-5 h-5 text-gray-400" />
                    <textarea
                      placeholder="Enter your complete shipping address with pincode..."
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl font-medium transition-all h-28 resize-none ${
                        isDarkMode
                          ? 'bg-slate-600 text-white placeholder-slate-400 focus:bg-slate-500'
                          : 'bg-white text-gray-800 placeholder-gray-400 focus:bg-gray-50'
                      } border-2 border-transparent focus:border-emerald-500 outline-none`}
                    />
                  </div>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-600 text-white py-4 rounded-xl font-black text-lg transition-all transform hover:scale-105 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-3"
                >
                  {loading ? (
                    <>
                      <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Processing Order...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5" />
                      <span>Place Order Securely</span>
                      <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </button>
              </div>

              <div className="md:col-span-2 space-y-5">
                <div className={`rounded-2xl p-5 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <h3 className={`text-xl font-bold mb-4 flex items-center space-x-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <ShoppingBag className="w-5 h-5 text-emerald-500" />
                    <span>Order Summary</span>
                  </h3>

                  <div className="space-y-3 max-h-60 overflow-y-auto mb-4">
                    {cart.map(item => (
                      <div key={item._id} className="flex items-center space-x-3">
                        <img src={item.image} alt={item.name} className="w-14 h-14 object-cover rounded-lg" />
                        <div className="flex-1">
                          <p className={`font-bold text-sm line-clamp-1 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {item.name}
                          </p>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                            ₹{item.price} × {item.quantity}
                          </p>
                        </div>
                        <p className="font-bold text-emerald-500">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`rounded-2xl p-5 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <h3 className={`text-lg font-bold mb-3 flex items-center space-x-2 ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    <Tag className="w-5 h-5 text-emerald-500" />
                    <span>Promo Code</span>
                  </h3>
                  
                  {!promoApplied ? (
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        placeholder="Enter code (try SAVE10)"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                          isDarkMode
                            ? 'bg-slate-600 text-white placeholder-slate-400'
                            : 'bg-white text-gray-800 placeholder-gray-400'
                        } border-2 border-transparent focus:border-emerald-500 outline-none`}
                      />
                      <button
                        onClick={applyPromo}
                        className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-5 py-2 rounded-lg font-bold transition-all"
                      >
                        Apply
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 bg-emerald-500/20 text-emerald-500 px-4 py-3 rounded-lg">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-bold">Promo applied! You saved ₹{discount.toFixed(2)}</span>
                    </div>
                  )}
                </div>

                <div className={`rounded-2xl p-5 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                        Subtotal
                      </span>
                      <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        ₹{total.toFixed(2)}
                      </span>
                    </div>

                    {promoApplied && (
                      <div className="flex justify-between">
                        <span className="font-medium text-emerald-500">Discount (10%)</span>
                        <span className="font-bold text-emerald-500">-₹{discount.toFixed(2)}</span>
                      </div>
                    )}

                    <div className="border-t border-dashed pt-3">
                      <div className="flex justify-between items-center">
                        <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                          Total Amount
                        </span>
                        <div className="text-right">
                          <div className="text-3xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            ₹{finalTotal.toFixed(2)}
                          </div>
                          <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                            Including all taxes
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`rounded-2xl p-4 ${
                  isDarkMode ? 'bg-slate-700' : 'bg-gradient-to-br from-gray-50 to-gray-100'
                }`}>
                  <div className="flex items-center justify-center space-x-4 text-center">
                    <div>
                      <Lock className={`w-6 h-6 mx-auto mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        Secure Payment
                      </p>
                    </div>
                    <div>
                      <CheckCircle className={`w-6 h-6 mx-auto mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        Verified Seller
                      </p>
                    </div>
                    <div>
                      <Gift className={`w-6 h-6 mx-auto mb-1 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`} />
                      <p className={`text-xs font-semibold ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                        Easy Returns
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
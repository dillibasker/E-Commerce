import { X, Trash2, Plus, Minus, ShoppingBag, Tag, Truck, Gift, Sparkles, Lock, ArrowLeft } from 'lucide-react';

export default function Cart({ cart, onClose, onUpdateQuantity, onRemove, onCheckout, total, isDarkMode }) {
  const savings = cart.reduce((acc, item) => acc + (item.price * 0.1 * item.quantity), 0); // Mock 10% savings
  const freeShippingThreshold = 500;
  const needsForFreeShipping = Math.max(0, freeShippingThreshold - total);
  const shippingProgress = Math.min(100, (total / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-end md:items-center justify-end z-50">
      <div
        className={`w-full md:w-[480px] h-full md:h-[95vh] md:rounded-l-3xl shadow-2xl flex flex-col ${
          isDarkMode ? 'bg-slate-800' : 'bg-white'
        }`}
        style={{
          animation: 'slideInRight 0.3s ease-out',
        }}
      >
        <style>{`
          @keyframes slideInRight {
            from {
              transform: translateX(100%);
            }
            to {
              transform: translateX(0);
            }
          }
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
            }
            50% {
              transform: scale(1.05);
            }
          }
        `}</style>

        {/* Header with Gradient */}
        <div className={`relative overflow-hidden ${
          isDarkMode ? 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500'
        }`}>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="relative flex items-center justify-between p-6">
            <div className="flex items-center space-x-3">
              <div className={`p-3 rounded-xl ${
                isDarkMode ? 'bg-slate-700' : 'bg-white/20 backdrop-blur-sm'
              }`}>
                <ShoppingBag className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-white">Shopping Cart</h2>
                <p className="text-sm text-white/80">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} • ₹{total.toFixed(2)}
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

          {/* Free Shipping Progress Bar */}
          {cart.length > 0 && (
            <div className="px-6 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Truck className="w-4 h-4 text-white" />
                  <span className="text-sm font-semibold text-white">
                    {needsForFreeShipping > 0 
                      ? `₹${needsForFreeShipping.toFixed(0)} away from FREE shipping!`
                      : '🎉 You got FREE shipping!'}
                  </span>
                </div>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                <div 
                  className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500 rounded-full"
                  style={{ width: `${shippingProgress}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-auto p-6">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full py-12">
              <div className="relative mb-6">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className={`relative text-8xl ${isDarkMode ? 'opacity-30' : 'opacity-40'}`}>
                  🛒
                </div>
              </div>
              <h3 className={`text-2xl font-bold mb-2 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}>
                Your cart is empty
              </h3>
              <p className={`text-center mb-6 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                Add some amazing products to get started!
              </p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-lg"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item, index) => (
                <div
                  key={item._id}
                  className={`rounded-2xl p-4 transition-all hover:scale-[1.02] ${
                    isDarkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-lg'
                  }`}
                  style={{
                    animation: `slideInRight 0.3s ease-out ${index * 0.1}s backwards`
                  }}
                >
                  <div className="flex space-x-4">
                    {/* Product Image with Badge */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-xl"
                      />
                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg">
                        {item.quantity}
                      </div>
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className={`font-bold mb-1 line-clamp-2 ${
                          isDarkMode ? 'text-white' : 'text-gray-800'
                        }`}>
                          {item.name}
                        </h3>
                        <div className="flex items-baseline space-x-2">
                          <p className="text-2xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                            ₹{item.price}
                          </p>
                          {item.quantity > 1 && (
                            <p className={`text-sm font-semibold ${
                              isDarkMode ? 'text-slate-400' : 'text-gray-600'
                            }`}>
                              × {item.quantity} = ₹{(item.price * item.quantity).toFixed(2)}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                            className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center ${
                              isDarkMode
                                ? 'bg-slate-600 hover:bg-slate-500 text-white'
                                : 'bg-white hover:bg-gray-100 text-gray-800 shadow'
                            }`}
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className={`font-bold text-lg px-3 ${
                            isDarkMode ? 'text-white' : 'text-gray-800'
                          }`}>
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                            className={`w-8 h-8 rounded-lg transition-all flex items-center justify-center ${
                              isDarkMode
                                ? 'bg-slate-600 hover:bg-slate-500 text-white'
                                : 'bg-white hover:bg-gray-100 text-gray-800 shadow'
                            }`}
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemove(item._id)}
                          className="flex items-center space-x-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg px-3 py-2 transition-all font-semibold text-sm"
                        >
                          <Trash2 className="w-4 h-4" />
                          <span>Remove</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer with Checkout */}
        {cart.length > 0 && (
          <div className={`border-t ${
            isDarkMode ? 'bg-slate-900 border-slate-700' : 'bg-gradient-to-b from-gray-50 to-white border-gray-200'
          }`}>
            <div className="p-6 space-y-4">
              {/* Promo Code Section */}
              <div className={`rounded-xl p-4 flex items-center space-x-3 cursor-pointer transition-all hover:scale-[1.02] ${
                isDarkMode ? 'bg-slate-800 hover:bg-slate-700' : 'bg-white hover:shadow-lg shadow'
              }`}>
                <div className="bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-lg">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-bold ${
                    isDarkMode ? 'text-white' : 'text-gray-800'
                  }`}>
                    Have a promo code?
                  </p>
                  <p className={`text-xs ${
                    isDarkMode ? 'text-slate-400' : 'text-gray-500'
                  }`}>
                    Click to apply discount
                  </p>
                </div>
                <button className="text-emerald-500 text-sm font-bold hover:underline">
                  Apply
                </button>
              </div>

              {/* Price Breakdown */}
              <div className={`rounded-xl p-4 space-y-3 ${
                isDarkMode ? 'bg-slate-800' : 'bg-white shadow'
              }`}>
                <div className="flex justify-between">
                  <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    Subtotal
                  </span>
                  <span className={`font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                    ₹{total.toFixed(2)}
                  </span>
                </div>
                
                {savings > 0 && (
                  <div className="flex justify-between">
                    <div className="flex items-center space-x-1">
                      <Gift className="w-4 h-4 text-emerald-500" />
                      <span className="font-medium text-emerald-500">Savings</span>
                    </div>
                    <span className="font-bold text-emerald-500">
                      -₹{savings.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span className={`font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-700'}`}>
                    Shipping
                  </span>
                  <span className={`font-bold ${
                    total >= freeShippingThreshold 
                      ? 'text-emerald-500' 
                      : isDarkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {total >= freeShippingThreshold ? 'FREE' : '₹50'}
                  </span>
                </div>

                <div className="border-t border-dashed pt-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-lg font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                      Total
                    </span>
                    <div className="text-right">
                      <div className="text-4xl font-black bg-gradient-to-r from-emerald-500 to-teal-500 bg-clip-text text-transparent">
                        ₹{(total + (total >= freeShippingThreshold ? 0 : 50) - savings).toFixed(2)}
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        Including all taxes
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={onCheckout}
                className="relative w-full bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-600 hover:via-teal-600 hover:to-emerald-600 text-white py-4 rounded-xl font-black text-lg transition-all transform hover:scale-105 shadow-2xl overflow-hidden group"
                style={{ animation: 'pulse 2s ease-in-out infinite' }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <Lock className="w-5 h-5" />
                  <span>Proceed to Secure Checkout</span>
                  <Sparkles className="w-5 h-5" />
                </div>
              </button>

              <p className={`text-center text-xs ${
                isDarkMode ? 'text-slate-500' : 'text-gray-500'
              }`}>
                🔒 Secure checkout • 256-bit SSL encryption
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
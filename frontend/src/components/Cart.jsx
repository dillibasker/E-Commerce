import { X, Trash2, Plus, Minus } from 'lucide-react';

export default function Cart({ cart, onClose, onUpdateQuantity, onRemove, onCheckout, total }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end md:items-center justify-end z-50">
      <div
        className="bg-white w-full md:w-96 h-full md:h-[90vh] md:rounded-l-3xl shadow-2xl flex flex-col"
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
        `}</style>

        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="hover:bg-gray-100 rounded-full p-2 transition"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-auto p-6">
          {cart.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Your cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item._id} className="bg-gray-50 rounded-xl p-4 flex space-x-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-800 mb-1">{item.name}</h3>
                    <p className="text-blue-600 font-bold mb-2">₹{item.price}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity - 1)}
                        className="bg-white rounded-full p-1 hover:bg-gray-200 transition"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-semibold px-3">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item._id, item.quantity + 1)}
                        className="bg-white rounded-full p-1 hover:bg-gray-200 transition"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemove(item._id)}
                        className="ml-auto text-red-500 hover:bg-red-50 rounded-full p-2 transition"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="border-t p-6 bg-gray-50">
            <div className="flex items-center justify-between mb-4">
              <span className="text-lg font-semibold text-gray-700">Total</span>
              <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
            </div>
            <button
              onClick={onCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 rounded-full font-bold text-lg hover:from-green-600 hover:to-green-700 transition transform hover:scale-105"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

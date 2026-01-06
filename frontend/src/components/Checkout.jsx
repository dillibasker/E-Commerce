import { useState } from 'react';
import { X, CheckCircle } from 'lucide-react';

export default function Checkout({ cart, total, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    address: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const orderData = {
      items: cart.map(item => ({
        productId: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      total,
      ...formData
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
        method: 'POST',
        credentials: 'include', // 🔥 SEND COOKIE
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onSuccess();
        }, 2000);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl">
        {success ? (
          <div className="p-12 text-center">
            <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Order Placed!</h2>
            <p className="text-gray-600">Thank you for your purchase</p>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">Checkout</h2>
              <button onClick={onClose} className="hover:bg-gray-100 rounded-full p-2">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 font-semibold mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={formData.customerEmail}
                  onChange={(e) => setFormData({ ...formData, customerEmail: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
                  <div className="mb-4">
                  <label className="block text-gray-700 font-semibold mb-2">
                    WhatsApp Number
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="9876543210"
                    value={formData.customerPhone}
                    onChange={(e) =>
                      setFormData({ ...formData, customerPhone: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                  />
                </div>


              <div className="mb-6">
                <label className="block text-gray-700 font-semibold mb-2">Address</label>
                <textarea
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700 font-semibold">Total Amount</span>
                  <span className="text-2xl font-bold text-blue-600">₹{total.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-full font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition transform hover:scale-105 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Place Order'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

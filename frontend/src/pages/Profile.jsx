import { useEffect, useState } from 'react';
import { User, Mail, Package, ShoppingBag, ArrowLeft, Clock, CheckCircle, XCircle, Truck, CreditCard } from 'lucide-react';

export default function Profile({ onBack = () => {} }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState('profile');

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('https://e-commerce-dzr4.onrender.com/api/auth/me', {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Failed to fetch user');
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchOrders = async () => {
    try {
      const res = await fetch('https://e-commerce-dzr4.onrender.com/api/orders/my', {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      case 'shipping':
        return <Truck className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/40';
      case 'cancelled':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'shipping':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      default:
        return 'bg-indigo-500/20 text-indigo-400 border-indigo-500/40';
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-blue-300 font-medium">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 bg-slate-800/50 backdrop-blur-sm text-slate-300 rounded-lg hover:bg-slate-800/70 transition-all flex items-center gap-2 font-medium border border-slate-700/50"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Main Layout: Sidebar + Content */}
        <div className="flex gap-6">
          {/* Left Sidebar Menu */}
          <div className="w-64 flex-shrink-0">
            {/* Profile Card */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-6 mb-4 border border-slate-700/50 shadow-xl">
              <div className="flex flex-col items-center text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg mb-3">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-xl font-bold text-white mb-1">{user.username}</h2>
                <p className="text-sm text-slate-400 flex items-center gap-1">
                  <Mail className="w-3 h-3" />
                  {user.email}
                </p>
              </div>
            </div>

            {/* Navigation Menu */}
            <div className="bg-slate-800/50 backdrop-blur-xl rounded-2xl p-4 border border-slate-700/50 shadow-xl">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeTab === 'profile'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/70'
                  }`}
                >
                  <User className="w-5 h-5" />
                  Profile Info
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center gap-3 ${
                    activeTab === 'orders'
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg'
                      : 'bg-slate-700/50 text-slate-300 hover:bg-slate-700/70'
                  }`}
                >
                  <Package className="w-5 h-5" />
                  <span className="flex-1 text-left">Order History</span>
                  {orders.length > 0 && (
                    <span className="bg-blue-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {orders.length}
                    </span>
                  )}
                </button>
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  Profile Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Username</p>
                        <p className="text-base font-bold text-slate-800">{user.username}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Email</p>
                        <p className="text-base font-bold text-slate-800">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center">
                        <ShoppingBag className="w-5 h-5 text-sky-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Total Orders</p>
                        <p className="text-base font-bold text-slate-800">{orders.length}</p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-5 shadow-lg border border-slate-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-violet-100 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-violet-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 font-medium">Total Spent</p>
                        <p className="text-base font-bold text-slate-800">
                          ₹{orders.reduce((sum, order) => sum + order.total, 0)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                    <Package className="w-6 h-6 text-white" />
                  </div>
                  Order History
                </h2>

                {orders.length === 0 ? (
                  <div className="bg-white rounded-2xl p-10 shadow-lg text-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="w-8 h-8 text-slate-400" />
                    </div>
                    <p className="text-xl font-bold text-slate-800 mb-2">No orders yet</p>
                    <p className="text-slate-500">Start shopping to see your orders here!</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order, index) => (
                      <div
                        key={order._id}
                        className="bg-white rounded-xl p-5 shadow-lg border border-slate-200"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                              <Package className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">Order #{index + 1}</p>
                              <p className="text-xs text-slate-500">{order._id.slice(-8)}</p>
                            </div>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-medium ${getStatusColor(order.status)}`}>
                            {getStatusIcon(order.status)}
                            <span className="capitalize">{order.status}</span>
                          </div>
                        </div>

                        <div className="bg-slate-50 rounded-lg p-4 mb-3 border border-slate-200">
                          <p className="text-xs text-slate-600 font-medium mb-2 flex items-center gap-2">
                            <ShoppingBag className="w-3 h-3" />
                            Items
                          </p>
                          {order.items.map((item, i) => (
                            <div key={i} className="flex justify-between py-1.5 text-sm border-b border-slate-200 last:border-0">
                              <span className="text-slate-700">{item.name}</span>
                              <span className="text-slate-600 font-medium">× {item.quantity}</span>
                            </div>
                          ))}
                        </div>

                        <div className="flex justify-between items-center">
                          <span className="text-slate-600 text-sm font-medium">Total</span>
                          <span className="text-xl font-bold text-blue-600">₹{order.total}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
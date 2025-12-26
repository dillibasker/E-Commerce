import { useEffect, useState } from 'react';

export default function Profile({ onBack }) {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchUser();
    fetchOrders();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/auth/me', {
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
      const res = await fetch('http://localhost:5000/api/orders/my', {
        credentials: 'include'
      });

      if (!res.ok) throw new Error('Failed to fetch orders');
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <p className="text-center mt-10">Loading profile...</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Back
      </button>

      {/* USER INFO */}
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow mb-8">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p><strong>Username:</strong> {user.username}</p>
        <p><strong>Email:</strong> {user.email}</p>
      </div>

      {/* ORDER HISTORY */}
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">My Orders</h2>

        {orders.length === 0 ? (
          <p className="text-gray-600">No orders yet</p>
        ) : (
          orders.map(order => (
            <div key={order._id} className="border-b py-4">
              <p className="font-semibold">
                Order ID: {order._id}
              </p>
              <p>Status: {order.status}</p>
              <p>Total: ₹{order.total}</p>

              <ul className="ml-4 list-disc">
                {order.items.map((item, i) => (
                  <li key={i}>
                    {item.name} × {item.quantity}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Toast from '../components/Toast';

export default function ResetPassword() {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [toast, setToast] = useState(null);

  const handleReset = async (e) => {
    e.preventDefault();
    const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password })
    });
    const data = await res.json();
    if (res.ok) {
      setToast({ message: 'Password reset successfully!', type: 'success' });
      setTimeout(() => navigate('/login'), 1800);
    } else {
      setToast({ message: data.message, type: 'error' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      <form onSubmit={handleReset} className="bg-white p-6 rounded shadow w-80">
        <h2 className="text-xl font-bold mb-4">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          className="w-full mb-3 p-2 border rounded"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        <button className="w-full bg-blue-600 text-white p-2 rounded">Reset</button>
      </form>
    </div>
  );
}

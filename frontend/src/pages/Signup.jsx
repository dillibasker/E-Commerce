import { useState } from 'react';
import Toast from '../components/Toast';

export default function Signup({ goToLogin }) {
  const [username, setUsername] = useState('');
  const [toast, setToast] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [captcha, setCaptcha] = useState(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { a, b };
  });
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/signup`, {
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
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-blue-100">

        {toast && (
            <Toast
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(null)}
            />
        )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <input
            type="email"
            className="w-full mb-3 p-2 border rounded"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
        />

        <input
          type="password"
          className="w-full mb-3 p-2 border rounded"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <p className="mb-2">
          {captcha.a} + {captcha.b} = ?
        </p>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Captcha answer"
          value={answer}
          onChange={e => setAnswer(e.target.value)}
        />

        <button className="w-full bg-orange-600 text-white p-2 rounded">
          Sign Up
        </button>

        <p className="text-center mt-3">
          Already have an account?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={goToLogin}>
            Login
          </span>
        </p>
      </form>
    </div>
  );
}

import { useState } from 'react';

export default function Login({ onLogin, goToSignup }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [captcha, setCaptcha] = useState(() => {
    const a = Math.floor(Math.random() * 10);
    const b = Math.floor(Math.random() * 10);
    return { a, b };
  });
  const [answer, setAnswer] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
      method: 'POST',
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
      onLogin();
    } else {
      alert(data.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-orange-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        <input
          className="w-full mb-3 p-2 border rounded"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
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

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Login
        </button>

        <p className="text-center mt-3">
          No account?{' '}
          <span className="text-blue-600 cursor-pointer" onClick={goToSignup}>
            Sign up
          </span>
        </p>
      </form>
    </div>
  );
}

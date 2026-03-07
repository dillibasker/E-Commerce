import { useState } from "react";

export default function ResetPassword({ token, goToLogin }) {

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleReset = async (e) => {
    e.preventDefault();

    if (!password || !confirm) {
      setMessage("Fill all fields");
      return;
    }

    if (password !== confirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {

      const res = await fetch(`${API_URL}/auth/reset-password/${token}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ password })
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Password reset successful. You can login now.");

        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);

      } else {
        setMessage(data.message);
      }

    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">

      <form
        onSubmit={handleReset}
        className="bg-slate-800 p-8 rounded-xl w-full max-w-md text-white"
      >

        <h2 className="text-2xl font-bold mb-6 text-center">
          Reset Password
        </h2>

        <input
          type="password"
          placeholder="New password"
          className="w-full mb-4 p-3 rounded bg-slate-700"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />

        <input
          type="password"
          placeholder="Confirm password"
          className="w-full mb-6 p-3 rounded bg-slate-700"
          value={confirm}
          onChange={(e)=>setConfirm(e.target.value)}
        />

        <button className="w-full bg-cyan-500 py-3 rounded">
          Reset Password
        </button>

        {message && (
          <p className="text-center mt-4 text-sm">{message}</p>
        )}

      </form>

    </div>
  );
}
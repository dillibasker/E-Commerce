import { useEffect, useState } from "react";

export default function Verification() {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  const params = new URLSearchParams(window.location.search);
  const email = params.get("email");

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const res = await fetch(
          `${API_URL}/auth/check-verification/${email}`
        );

        const data = await res.json();

        if (data.verified) {
          setVerified(true);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    checkVerification();

    const interval = setInterval(checkVerification, 5000);

    return () => clearInterval(interval);
  }, [email]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">

      <div className="bg-slate-900 border border-slate-700 p-10 rounded-3xl shadow-2xl text-center w-full max-w-md">

        <h2 className="text-2xl font-bold text-white mb-4">
          Email Verification
        </h2>

        <p className="text-slate-400 mb-6 text-sm">
          We sent a verification link to:
          <br /><br />
          <span className="text-cyan-400 font-medium">{email}</span>
        </p>

        {loading && (
          <div className="flex justify-center mb-6">
            <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {verified ? (
          <p className="text-green-400 font-medium">
            ✅ Email Verified! Redirecting to home...
          </p>
        ) : (
          <p className="text-slate-400 text-sm">
            Waiting for verification...
          </p>
        )}

        {verified && (
  <button
    onClick={() => window.location.href = "/login"}
    className="bg-cyan-500 px-6 py-2 rounded-lg text-white"
  >
    Back to Login
  </button>
)}

      </div>
    </div>
  );
}
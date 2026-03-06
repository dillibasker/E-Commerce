import { useEffect, useState } from "react";

export default function Verification({ email, onVerifySuccess }) {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const checkVerification = async () => {
      try {
        const res = await fetch(`${API_URL}/auth/check-verification/${email}`);
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

    if (!email) return;

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
          Verification link sent to:
          <br /><br />
          <span className="text-cyan-400 font-medium">{email}</span>
        </p>

        {loading && !verified && (
          <div className="flex justify-center mb-6">
            <div className="w-6 h-6 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        {!verified ? (
          <p className="text-slate-400 text-sm mb-6">
            Waiting for email verification...
          </p>
        ) : (
          <p className="text-green-400 font-semibold mb-6 text-lg">
            ✅ Email Verified Successfully!
          </p>
        )}

        <button
          disabled={!verified}
          onClick={() => window.location.href = "/login"}
          className={`px-6 py-2 rounded-lg text-white transition ${
            verified
              ? "bg-cyan-500 hover:bg-cyan-600"
              : "bg-slate-600 cursor-not-allowed"
          }`}
        >
          Back to Login
        </button>

      </div>
    </div>
  );
}
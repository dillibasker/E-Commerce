export default function VerificationSuccess() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="bg-slate-800 p-10 rounded-2xl text-center">
        <h2 className="text-2xl font-bold text-green-400 mb-4">
          ✅ Email Verified Successfully!
        </h2>

        <button
          onClick={() => window.location.href = "/login"}
          className="bg-cyan-500 px-6 py-2 rounded-lg text-white mt-4"
        >
          Back to Login
        </button>
      </div>
    </div>
  );
}
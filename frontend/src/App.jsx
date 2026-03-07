import { useState, useEffect } from "react";
import Login from "./pages/login";
import Signup from "./pages/Signup";
import Home from "./Home";
import Profile from "./pages/Profile";
import Verification from "./pages/Verification";
import ResetPassword from "./pages/ResetPassword";

function App() {

  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState("login");
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(null);
  const [resetToken, setResetToken] = useState(null);

  useEffect(() => {

    const savedAuth = localStorage.getItem("isAuth");
    if (savedAuth === "true") {
      setIsAuth(true);
    }

    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "true") {
      setIsDarkMode(true);
    }

    // ✅ Detect reset password link
    const path = window.location.pathname.split("/");

    if (path[1] === "reset-password" && path[2]) {
      setResetToken(path[2]);
      setPage("resetPassword");
    }

  }, []);

  const handleLogin = (email = null) => {

    // User not verified
    if (email) {
      setVerifyEmail(email);
      setPage("verification");
      return;
    }

    // Verified user
    localStorage.setItem("isAuth", "true");
    setIsAuth(true);
    setPage("home");
  };

  const handleVerificationSuccess = () => {
    localStorage.setItem("isAuth", "true");
    setIsAuth(true);
    setPage("home");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuth");
    setIsAuth(false);
    setPage("login");
    setShowProfile(false);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem("darkMode", newValue);
      return newValue;
    });
  };

  /* ---------------- AUTH PAGES ---------------- */

  if (!isAuth) {

    if (page === "login") {
      return (
        <Login
          onLogin={handleLogin}
          goToSignup={() => setPage("signup")}
        />
      );
    }

    if (page === "signup") {
      return (
        <Signup
          goToLogin={() => setPage("login")}
          goToVerification={(email) => {
            setVerifyEmail(email);
            setPage("verification");
          }}
        />
      );
    }

    if (page === "verification") {
      return (
        <Verification
          email={verifyEmail}
          onVerifySuccess={handleVerificationSuccess}
        />
      );
    }

    // ✅ RESET PASSWORD PAGE
    if (page === "resetPassword") {
      return (
        <ResetPassword
          token={resetToken}
          goToLogin={() => setPage("login")}
        />
      );
    }

  }

  /* ---------------- HOME PAGE ---------------- */

  return (
    <Home
      onLogout={handleLogout}
      isDarkMode={isDarkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
}

export default App;
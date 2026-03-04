import { useState, useEffect } from 'react';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './Home';
import Profile from './pages/Profile';
import Verification from './pages/Verification';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState('login');
  const [showProfile, setShowProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false); // ✅ ADD THIS

  useEffect(() => {
    const savedAuth = localStorage.getItem('isAuth');
    if (savedAuth === 'true') {
      setIsAuth(true);
    }
    
    // ✅ ADD THIS - Load saved dark mode preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      setIsDarkMode(true);
    }
  }, []);

  const handleLogin = () => {
    setPage('verification');
  };

    const handleVerificationSuccess = () => {
    localStorage.setItem('isAuth', 'true');
    setIsAuth(true);
    setPage('home');
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuth');
    setIsAuth(false);
    setPage('login');
    setShowProfile(false);
  };

  // ✅ ADD THIS - Toggle dark mode and save preference
  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const newValue = !prev;
      localStorage.setItem('darkMode', newValue);
      return newValue;
    });
  };

   if (!isAuth) {
    if (page === 'login') {
      return (
        <Login
          onLogin={handleLogin}
          goToSignup={() => setPage('signup')}
        />
      );
    }

    if (page === 'signup') {
      return (
        <Signup goToLogin={() => setPage('login')} />
      );
    }

    if (page === 'verification') {
      return (
        <Verification
          onVerifySuccess={handleVerificationSuccess}
        />
      );
    }
  }
  
  return (
    <Home 
      onLogout={handleLogout} 
      isDarkMode={isDarkMode}           // ✅ ADD THIS
      toggleDarkMode={toggleDarkMode}   // ✅ ADD THIS
    />
  );
}

export default App;
import { useState, useEffect } from 'react';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './Home';
import Profile from './pages/Profile';

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
    localStorage.setItem('isAuth', 'true');
    setIsAuth(true);
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
    return page === 'login' ? (
      <Login
        onLogin={handleLogin}
        goToSignup={() => setPage('signup')}
      />
    ) : (
      <Signup goToLogin={() => setPage('login')} />
    );
  }

  if (showProfile) {
    return (
      <Profile 
        onBack={() => setShowProfile(false)} 
        isDarkMode={isDarkMode} // ✅ ADD THIS
      />
    );
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
import { useState ,useEffect } from 'react';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './Home';
import Profile from './pages/Profile'; // ✅ import Profile


function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState('login');
  const [showProfile, setShowProfile] = useState(false); // ✅ new state


   useEffect(() => {
    const savedAuth = localStorage.getItem('isAuth');
    if (savedAuth === 'true') {
      setIsAuth(true);
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
    setShowProfile(false); // ✅ reset profile page

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
// ✅ Show profile if requested
  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }
  
  return <Home onLogout={handleLogout} />;
}

export default App;

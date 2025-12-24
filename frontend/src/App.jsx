import { useState ,useEffect } from 'react';
import Login from './pages/login';
import Signup from './pages/Signup';
import Home from './Home';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState('login');

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

  return <Home onLogout={handleLogout} />;
}

export default App;

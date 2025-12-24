import { useState } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './Home';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [page, setPage] = useState('login');

  if (!isAuth) {
    return page === 'login' ? (
      <Login
        onLogin={() => setIsAuth(true)}
        goToSignup={() => setPage('signup')}
      />
    ) : (
      <Signup goToLogin={() => setPage('login')} />
    );
  }

  return <Home />;
}

export default App;

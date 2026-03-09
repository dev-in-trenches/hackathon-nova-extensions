import { useState } from 'react';
import './App.css';
import Login from '@/assets/components/Login/Login';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await storage.getItem<string>('local:token');
      setIsAuthenticated(!!token);
    };

    checkAuth();

    const unwatch = storage.watch<string>('local:token', (newToken) => {
      setIsAuthenticated(!!newToken);
    });

    return () => unwatch();
  }, []);

  return (
    <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <div>Login success</div>
      )}
    </>
  );
}

export default App;

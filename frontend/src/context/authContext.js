'use client';
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get('authToken');
    if (token) {
      // In a real app, you'd verify the token with your backend
      setUser({ email: 'user@example.com' }); // Placeholder
    }
    setLoading(false);
  }, []);

  const login = (userData) => {
    Cookies.set('authToken', 'dummy-token', { expires: 7 });
    setUser(userData);
    router.push('/');
  };

  const logout = () => {
    Cookies.remove('authToken');
    setUser(null);
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
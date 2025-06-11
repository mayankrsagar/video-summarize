"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

import { login as apiLogin } from '../lib/api';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = Cookies.get("authToken");
    if (token) setUser(true);
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin({ email, password });
    Cookies.set("authToken", res.data.token, { expires: 7 });
    setUser(true);
    router.push("/");
  };

  const logout = () => {
    Cookies.remove("authToken");
    setUser(null);
    router.push("/login");
  };

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

import { createContext, useState, useEffect } from 'react';
import isTokenValid from '../utils/isTokenValid';

export const AuthContext = createContext();

export function useAuthProvider() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && isTokenValid(token)) {
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, []);

  return { isAuthenticated, setIsAuthenticated };
}

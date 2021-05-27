import React, {
  createContext, useState, useContext, useEffect, ReactNode,
} from 'react';
import Cookies from 'js-cookie';
import router, { useRouter } from 'next/router';

// api here is an axios instance which has the baseURL set according to the env.
import api from '../services/api';

interface AuthContextProps {
  children: ReactNode;
}

interface LoginDTO {
  email: string;
  password: string;
}

interface AuthContextData {
  login: (data: LoginDTO) => void;
  logout: () => void
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthContextProps) {
  const [userData, setUserData] = useState(null);

  const login = async ({ email, password }: LoginDTO) => {
    const response = await api.post('/sessions', { email, password });
    const { user, token } = response.data;
    if (token && user) {
      console.log('Got token');
      Cookies.set('token', token, { expires: 60 });
      Cookies.set('user', user, { expires: 60 });
      setUserData(user);
      console.log('Got user', user);
      router.push('/dashboard');
    }
  };

  const logout = () => {
    Cookies.remove('token');
    Cookies.remove('user');
    setUserData(null);
    delete api.defaults.headers.Authorization;
    router.push('/');
  };

  return (
    <AuthContext.Provider value={{
      login,
      logout,
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

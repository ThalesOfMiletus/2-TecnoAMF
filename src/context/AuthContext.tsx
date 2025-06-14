// src/contexts/AuthContext.tsx
"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/api/api';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import { AxiosResponse } from 'axios';

// Tipagem para os dados do token
interface AuthTokenPayload {
  access: string;
  refresh: string;
}

// Tipagem para os dados do usuário (ajuste conforme seu modelo)
interface User {
  id: number;
  username: string;
  email: string;
}

// Tipagem para as credenciais de login
interface SignInCredentials {
  username: string;
  password: string;
}

//Tipagem para as credenciais de cadastro
interface SignUpCredentials {
  username: string;
  email: string;
  password: string;
  cro: string;
}

// Tipagem para o contexto
interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signUp: (credentials: SignUpCredentials) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'myapp.token': token } = parseCookies();
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      api.get('/autenticacao/usuarios/me/')
        .then((response: AxiosResponse<User>) => {
          setUser(response.data);
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ username, password }: SignInCredentials) {
    try {
      const response = await api.post<AuthTokenPayload>('/autenticacao/token/', {
        username,
        password,
      });
      const { access, refresh } = response.data;
      setCookie(undefined, 'myapp.token', access, { maxAge: 60 * 60 * 24 * 30, path: '/' });
      setCookie(undefined, 'myapp.refreshToken', refresh, { maxAge: 60 * 60 * 24 * 30, path: '/' });
      api.defaults.headers.common['Authorization'] = `Bearer ${access}`;
      const userResponse = await api.get('/autenticacao/usuarios/me/');
      setUser(userResponse.data);
      router.push('/dashboard');
    } catch (error) {
      console.error('Falha na autenticação', error);
      // Lança o erro para ser capturado pelo componente
      throw new Error('Falha na autenticação'); 
    }
  }

  async function signUp ({ username, email, password, cro }: SignUpCredentials) {
    //criar cadastro
  }

  function signOut() {
    destroyCookie(undefined, 'myapp.token');
    destroyCookie(undefined, 'myapp.refreshToken');
    delete api.defaults.headers.common['Authorization'];
    setUser(null);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, signIn, signUp, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);

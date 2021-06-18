import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, destroyCookie } from 'nookies';
import Router from 'next/router';
// eslint-disable-next-line import/no-cycle
import { useToast } from '@chakra-ui/react';
// eslint-disable-next-line import/no-cycle
import { api } from '../services/apiClient';

type User = {
  id: string;
  name: string;
  email: string;
  login: string;
  phone: string;
};

type SignInCredentials = {
  login: string;
  password: string;
};

export type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

function signOut(): void {
  destroyCookie(undefined, '@openwms.token');

  authChannel.postMessage('signOut');

  Router.push('/');
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  const toast = useToast();

  useEffect(() => {
    authChannel = new BroadcastChannel('auth');

    authChannel.onmessage = message => {
      switch (message.data) {
        case 'signOut':
          Router.push('/login');
          break;
        case 'signIn':
          Router.push('/dashboard');
          break;
        default:
          break;
      }
    };
  }, []);

  async function signIn({ login, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post('sessions', {
        login,
        password,
      });

      const { token, user: userData } = response.data;

      setCookie(undefined, '@openwms.token', token, {
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      });

      setUser(userData);

      api.defaults.headers.Authorization = `Bearer ${token}`;

      Router.push('/dashboard');
      authChannel.postMessage('signIn');
    } catch (err) {
      toast({
        status: 'error',
        title: err.response.data.error,
        position: 'top-right',
      });
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, signOut, AuthProvider };

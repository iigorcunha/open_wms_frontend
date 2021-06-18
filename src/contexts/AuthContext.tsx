import { createContext, ReactNode, useEffect, useState } from 'react';
import { setCookie, parseCookies, destroyCookie } from 'nookies';
import Router from 'next/router';
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

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
  user: User;
  isAuthenticated: boolean;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

let authChannel: BroadcastChannel;

export function signOut(): void {
  destroyCookie(undefined, '@openwms.token');

  authChannel.postMessage('signOut');

  Router.push('/');
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

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

  // useEffect(() => {
  //   const { '@openwms.token': token } = parseCookies();

  //   if (token) {
  //     api
  //       .get('/me')
  //       .then(response => {
  //         const { email, permissions, roles } = response.data;

  //         setUser({ email, permissions, roles });
  //       })
  //       .catch(() => {
  //         signOut();
  //       });
  //   }
  // }, []);

  async function signIn({ login, password }: SignInCredentials): Promise<void> {
    try {
      const response = await api.post('sessions', {
        login,
        password,
      });

      console.log(response);

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
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ signIn, signOut, user, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

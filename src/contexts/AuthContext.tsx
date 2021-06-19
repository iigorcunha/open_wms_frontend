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

type UserInformation = {
  name?: string;
  email?: string;
  login?: string;
  phone?: string;
  newPassword?: string;
  currentPassword?: string;
};

export type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut: () => void;
  updateUserInformation: (userCredentials: UserInformation) => Promise<boolean>;
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
  localStorage.removeItem('@openwms.user');

  authChannel.postMessage('signOut');

  Router.push('/');
}

function AuthProvider({ children }: AuthProviderProps): JSX.Element {
  const [user, setUser] = useState<User>(null);
  const isAuthenticated = !!user;

  const toast = useToast();

  useEffect(() => {
    const getUser = localStorage.getItem('@openwms.user');

    if (getUser) {
      setUser(JSON.parse(getUser));
    }
  }, []);

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

      setUser(userData as User);

      localStorage.setItem('@openwms.user', JSON.stringify(userData));

      api.defaults.headers.Authorization = `Bearer ${token}`;

      Router.push('/dashboard');
      authChannel.postMessage('signIn');
    } catch (err) {
      toast({
        status: 'error',
        title: 'Algo deu errado!',
        description: err.response.data.error,
        position: 'top-right',
      });
    }
  }

  async function updateUserInformation({
    email = '',
    login = '',
    name = '',
    phone = '',
    newPassword = '',
    currentPassword = '',
  }: UserInformation): Promise<boolean> {
    try {
      const response = await api.put(`users/${user.id}`, {
        name,
        email: user?.email === email ? '' : email,
        login: user?.login === login ? '' : login,
        phone: user?.phone === phone ? '' : phone,
        newPassword,
        currentPassword,
      });
      const { user: userData } = response.data;
      localStorage.setItem('@openwms.user', JSON.stringify(userData));
      setUser(userData);
      return true;
    } catch (err) {
      toast({
        status: 'error',
        title: err.response.data.error,
        position: 'top-right',
      });
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ signIn, signOut, user, isAuthenticated, updateUserInformation }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, signOut, AuthProvider };

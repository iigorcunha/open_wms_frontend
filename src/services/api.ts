import axios, { AxiosError, AxiosInstance } from 'axios';
import { parseCookies, setCookie } from 'nookies';
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

const failedRequestsQueue = [];

export function setupApiClient(ctx = undefined): AxiosInstance {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: 'http://localhost:3333',
    headers: {
      Authorization: `Bearer ${cookies['@openwms.token']}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (process.browser) {
        signOut();
      } else {
        return Promise.reject(new AuthTokenError());
      }

      return Promise.reject(error);
    }
  );

  return api;
}

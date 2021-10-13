import axios, { AxiosError, AxiosInstance } from 'axios';
import { parseCookies } from 'nookies';
// eslint-disable-next-line import/no-cycle
import { signOut } from '../contexts/AuthContext';
import { AuthTokenError } from './errors/AuthTokenError';

export function setupApiClient(ctx = undefined): AxiosInstance {
  const cookies = parseCookies(ctx);

  const api = axios.create({
    baseURL: process.env.API_URL || 'https://api-open-wms.igorcunha.dev',
    headers: {
      Authorization: `Bearer ${cookies['@openwms.token']}`,
    },
  });

  api.interceptors.response.use(
    response => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (error.response.data?.statusCode === 'tokenExpiredOrInvalid') {
          if (process.browser) {
            signOut();
          } else {
            return Promise.reject(new AuthTokenError());
          }
        }
      }

      return Promise.reject(error);
    }
  );

  return api;
}

import axios, { AxiosRequestConfig } from 'axios';
import { Cookies } from 'js-cookie';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
});

export const apiRequest = async <T>(
  url: string,
  method: 'get' | 'post' | 'put' | 'delete',
  data?: any,
): Promise<T> => {
  try {
    const token = Cookies.get('next-auth.session-token');
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };
    const response = await api.request<{ result: T }>(config);
    return response.data.result;
  } catch (error) {
    console.error(`Error with ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
};

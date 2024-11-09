import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

interface ApiRequestParams {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  bearerToken?: string;
}

const api = axios.create({
  baseURL: `${process.env.NEXTAUTH_URL}/api`,
});

export const apiRequest = async <T>({
  url,
  method,
  data,
  bearerToken,
}: ApiRequestParams): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      url,
      data,
      headers: bearerToken ? { Authorization: `Bearer ${bearerToken}` } : {},
    };
    const response = await api.request<{ result: T }>(config);
    console.log(response.data, 'ressssssss---------------');

    return response.data.result;
  } catch (error) {
    console.error(`Error with ${method.toUpperCase()} request to ${url}:`, error);
    throw error;
  }
};

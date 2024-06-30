import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { Response } from '../types';

export class Request {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      timeout: 6000,
    });
  }

  request<T>(config: AxiosRequestConfig): Promise<Response<T>> {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .request<Response<T>>(config)
          .then((res) => {
            resolve(res.data as Response<T>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  get<T>(config: AxiosRequestConfig): Promise<Response<T>> {
    return this.request({ method: 'Get', ...config });
  }
}

const req = new Request();

export default req;

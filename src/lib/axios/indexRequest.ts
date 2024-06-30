import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { IndexResponse, TwoIndexResponse } from '../types';

export class IndexRequest {
  instance: AxiosInstance;

  constructor() {
    this.instance = axios.create({
      baseURL: '/index',
      timeout: 6000,
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_TOKEN}`,
      },
    });
  }

  request<T>(config: AxiosRequestConfig): Promise<IndexResponse<T>> {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .request<IndexResponse<T>>(config)
          .then((res) => {
            resolve(res.data as IndexResponse<T>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }

  get<T>(config: AxiosRequestConfig): Promise<IndexResponse<T>> {
    return this.request({ method: 'Get', ...config });
  }

  getTwo<T, U>(config: AxiosRequestConfig): Promise<TwoIndexResponse<T, U>> {
    return new Promise((resolve, reject) => {
      try {
        this.instance
          .request<TwoIndexResponse<T, U>>(config)
          .then((res) => {
            resolve(res.data as TwoIndexResponse<T, U>);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (err) {
        return Promise.reject(err);
      }
    });
  }
}

const indexReq = new IndexRequest();

export default indexReq;

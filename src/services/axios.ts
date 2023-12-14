// src/services/axios.ts
import axios, { type AxiosInstance, type AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

interface AxiosStoreState {
  axiosInstance: AxiosInstance;
  token: string | null;
}

export const useAxiosStore = defineStore({
  id: 'axiosStore',
  state: (): AxiosStoreState => ({
    axiosInstance: axios.create({
      baseURL: import.meta.env.VITE_BASE_URL,
    }),
    token: localStorage.getItem('token') ?? null,
  }),

  actions: {
    setToken(token: string) {
      this.token = token;
      this.axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('token', token);
    },

    removeToken() {
      this.token = null;
      delete this.axiosInstance.defaults.headers.common['Authorization'];
    },

    async get<T>(url: string, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },

    async post<T>(url: string, data: any, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
        return response.data;
      } catch (error: any) {
        throw error.response.data;
      }
    },
  },
});

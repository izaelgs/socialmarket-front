import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios';
import { defineStore } from 'pinia';

interface AxiosStoreState {
  axiosInstance: AxiosInstance;
}

export const useAxiosStore = defineStore({
  id: 'axiosStore',
  state: (): AxiosStoreState => ({
    axiosInstance: axios.create({
      baseURL: import.meta.env.VITE_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true,
    }),
  }),

  actions: {
    async get<T>(url: string, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
        return response.data;
      } catch (error: any) {
        this.handleAuthorizationError(error);
        throw error;
      }
    },

    async post<T>(url: string, data: any, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
        return response.data;
      } catch (error: any) {
        this.handleAuthorizationError(error);
        throw error;
      }
    },

    async put<T>(url: string, data: any, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
        return response.data;
      } catch (error: any) {
        this.handleAuthorizationError(error);
        throw error;
      }
    },

    async patch<T>(url: string, data: any, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
        return response.data;
      } catch (error: any) {
        this.handleAuthorizationError(error);
        throw error;
      }
    },

    async delete<T>(url: string, config = {}): Promise<T> {
      try {
        const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
        return response.data;
      } catch (error: any) {
        this.handleAuthorizationError(error);
        throw error;
      }
    },

    handleAuthorizationError(error: any) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401 || error.response?.status === 403) {
          window.location.href = '/login';
        }

        if (error.response) throw error.response.data;
      }

      throw error;
    },
  },
});

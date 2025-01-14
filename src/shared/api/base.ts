import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

export const API_URL = import.meta.env.VITE_APP_REMOTE
  ? import.meta.env.VITE_API_URL
  : "";
export const NAVER_API_URL = "https://openapi.naver.com/v1";
export const AUTH_URL = `${API_URL}/oauth2/authorization`;

class ApiInstance {
  private axios: AxiosInstance;
  private naverAxios: AxiosInstance;
  private username: string | null = null;
  private password: string | null = null;

  constructor() {
    this.setBasicAuth(
      import.meta.env.VITE_BASIC_AUTH_USERNAME,
      import.meta.env.VITE_BASIC_AUTH_PASSWORD
    );

    this.axios = axios.create({
      baseURL: API_URL,
      timeout: 120000,
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
      xsrfCookieName: "XSRF-TOKEN",
      xsrfHeaderName: "X-XSRF-TOKEN",
    });

    this.naverAxios = axios.create({
      baseURL: NAVER_API_URL,
      timeout: 120000,
      headers: {
        "X-Naver-Client-Id": import.meta.env.VITE_NAVER_CLIENT_ID,
        "X-Naver-Client-Secret": import.meta.env.VITE_NAVER_CLIENT_SECRET,
      },
    });

    // Add request interceptor for regular API
    this.axios.interceptors.request.use((config) => {
      if (this.username && this.password) {
        config.auth = {
          username: this.username,
          password: this.password,
        };
      }
      return config;
    });

    // Add request interceptor for Naver API
    this.naverAxios.interceptors.request.use((config) => {
      if (this.username && this.password) {
        config.auth = {
          username: this.username,
          password: this.password,
        };
      }
      return config;
    });
  }

  setBasicAuth(username: string, password: string) {
    this.username = username;
    this.password = password;
  }

  clearBasicAuth() {
    this.username = null;
    this.password = null;
  }

  async get<T>(endpoint: string, options: AxiosRequestConfig = {}): Promise<T> {
    const isNaverApi = endpoint.startsWith("/v1/search");
    const axiosInstance = isNaverApi ? this.naverAxios : this.axios;

    const finalOptions: AxiosRequestConfig = {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      withCredentials: !isNaverApi,
      ...options,
    };

    const response: AxiosResponse<T> = await axiosInstance.get(
      endpoint,
      finalOptions
    );
    return response.data;
  }

  async post<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.post(endpoint, data, {
      ...options,
      withCredentials: true,
    });
    return response.data;
  }

  async put<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.put(endpoint, data, {
      ...options,
      withCredentials: true,
    });
    return response.data;
  }

  async delete<T>(
    endpoint: string,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.delete(endpoint, {
      ...options,
      withCredentials: true,
    });
    return response.data;
  }

  async patch<T>(
    endpoint: string,
    data?: any,
    options: AxiosRequestConfig = {}
  ): Promise<T> {
    const response: AxiosResponse<T> = await this.axios.patch(endpoint, data, {
      ...options,
      withCredentials: true,
    });
    return response.data;
  }
}

export const apiInstance = new ApiInstance();
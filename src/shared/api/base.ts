import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const API_URL = 'https://packetbreeze.com:8443'
export const AUTH_URL = `https://packetbreeze.com:8443/oauth2/authorization`

class ApiInstance {
    private axios: AxiosInstance

    constructor() {
        this.axios = axios.create({
            baseURL: API_URL,
            timeout: 120000,
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            },
            xsrfCookieName: 'XSRF-TOKEN',
            xsrfHeaderName: 'X-XSRF-TOKEN'
        })
    }

    async get<T>(
        endpoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.axios.get(
            endpoint,
            {
                ...options,
                withCredentials: true
            }
        )
        return response.data
    }

    async post<T>(
        endpoint: string,
        data?: any,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        const response: AxiosResponse<T> = await this.axios.post(
            endpoint,
            data,
            {
                ...options,
                withCredentials: true
            }
        )
        return response.data
    }
}

export const apiInstance = new ApiInstance()

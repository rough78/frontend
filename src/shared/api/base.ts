import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const API_URL = import.meta.env.DEV ? '' : 'https://packetbreeze.com:8443'
export const NAVER_API_URL = 'https://openapi.naver.com/v1'
export const AUTH_URL = `${API_URL}/oauth2/authorization`

class ApiInstance {
    private axios: AxiosInstance
    private naverAxios: AxiosInstance

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

        this.naverAxios = axios.create({
            baseURL: NAVER_API_URL,
            timeout: 120000,
            headers: {
                'X-Naver-Client-Id': import.meta.env.NAVER_CLIENT_ID,
                'X-Naver-Client-Secret': import.meta.env.NAVER_CLIENT_SECRET
            }
        })
    }

    async get<T>(
        endpoint: string,
        options: AxiosRequestConfig = {}
    ): Promise<T> {
        const isNaverApi = endpoint.startsWith('/v1/search')
        const axiosInstance = isNaverApi ? this.naverAxios : this.axios
        
        const response: AxiosResponse<T> = await axiosInstance.get(
            endpoint,
            {
                ...options,
                withCredentials: !isNaverApi
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

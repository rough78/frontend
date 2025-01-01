import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

export const API_URL = import.meta.env.DEV ? 'https://localhost:5173' : 'https://packetbreeze.com:8443'
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
            xsrfHeaderName: 'X-XSRF-TOKEN',
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
        
        // 기본 옵션 설정
        const finalOptions: AxiosRequestConfig = {
            headers: {
                'Content-Type': 'application/json',
                ...options.headers
            },
            withCredentials: true,
            ...options
        }
    
        // naver API인 경우만 withCredentials false 설정
        if (isNaverApi) {
            finalOptions.withCredentials = false
        }
    
        console.log("Request options:", {
            endpoint,
            withCredentials: finalOptions.withCredentials,
            headers: finalOptions.headers
        });
    
        const response: AxiosResponse<T> = await axiosInstance.get(endpoint, finalOptions)
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

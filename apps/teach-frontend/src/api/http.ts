import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: '/api', // Replace with your API base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data

    if (code === 0) {
      return data
    }
    else {
      console.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    console.error('Request error:', error)
    return Promise.reject(error)
  },
)

import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'

export const http: AxiosInstance = axios.create({
  baseURL: '/api', // Replace with your API base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data // Directly extract data from the response
  },
  (error) => {
    // Handle common error logic here if needed
    return Promise.reject(error)
  },
)

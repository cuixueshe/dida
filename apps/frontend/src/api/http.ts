import type { AxiosInstance, AxiosResponse } from 'axios'
import axios from 'axios'
import { router } from '@/router'
import { Message, messageRedirectToSignIn } from '@/composables'

export const http: AxiosInstance = axios.create({
  baseURL: '/api', // Replace with your API base URL
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
})

http.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')

    if (token)
      config.headers.Authorization = `Bearer ${token}`

    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

http.interceptors.response.use(
  (response: AxiosResponse) => {
    const { code, message, data } = response.data

    if (code === 0) {
      return data
    }
    else {
      Message.error(message)
      return Promise.reject(new Error(message))
    }
  },
  (error) => {
    if (error.response.status) {
      switch (error.response.status) {
        case 401:
          messageRedirectToSignIn(() => {
            router.replace({
              path: '/login',
              query: { redirect: router.currentRoute.value.fullPath },
            })
          })
          break
      }
      return Promise.reject(error)
    }
  },
)

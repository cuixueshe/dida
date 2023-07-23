import { http } from './http'
import type { UserResponse } from './types'

export function fetchSignIn(username: string, password: string) {
  return http.post<UserResponse, UserResponse>('/users/signin', {
    username,
    password,
  })
}

export function fetchSignUp({
  username,
  password,
  confirmPassword,
}: {
  username: string
  password: string
  confirmPassword: string
}) {
  return http.post<UserResponse, UserResponse>('/users/signup', {
    username,
    password,
    confirmPassword,
  })
}

import { AxiosHeaders, AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../models/http'
import {
  CreateUserRequest,
  LoginRequest,
  LoginResponse,
  UpdateUserRequest,
  UserInfoResponse,
  UserResponse,
} from '../models/auth'
import axiosClient, { handleRequest } from './axios'
import { getLocalStorage } from '../utils/sessionStorage'

const authApi = {
  login: (body: LoginRequest): Promise<HttpResponse<LoginResponse>> => {
    const url = `/api/login`
    return handleRequest(axiosClient.post(url, body))
  },
  logout: () => {
    const url = `/api/logout`
    return handleRequest(
      axiosClient.post(url, null, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },

  updateUser: (userId: number, body: UpdateUserRequest) => {
    const url = `/api/accounts/${userId}`
    return handleRequest(
      axiosClient.put(url, body, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('access_token')}`,
        },
      })
    )
  },
  getUserDetail: (): Promise<HttpResponse<UserInfoResponse>> => {
    const url = `/api/me`
    return handleRequest(
      axiosClient.get(url, {
        headers: {
          Authorization: `Bearer ${getLocalStorage('access_token')}`,
        },
      })
    )
  },
}

export default authApi

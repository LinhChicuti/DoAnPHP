import { AxiosHeaders, AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../models/http'
import axiosClient, { handleRequest } from './axios'
import { getLocalStorage } from '../utils/sessionStorage'
import { CreateDepartmentRequest, DepartmentResponse } from '../models/department'
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../models/auth'

const lecturesApi = {
  getLectures: (): Promise<HttpResponse<UserResponse[]>> => {
    const url = `/api/teachers`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getLecturesById: (id: number): Promise<HttpResponse<UserResponse>> => {
    const url = `/api/teachers/${id}`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  createLecture: (body: CreateUserRequest) => {
    const url = `/api/accounts`
    return handleRequest(
      axiosClient.post(
        url,
        { ...body, role: 2 },
        {
          headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
        }
      )
    )
  },
  updateLecture: (id: number, body: UpdateUserRequest) => {
    const url = `/api/teachers/${id}`
    return handleRequest(
      axiosClient.put(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  deleteLecture: (id: number) => {
    const url = `/api/teachers/${id}`
    return handleRequest(
      axiosClient.delete(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
}

export default lecturesApi

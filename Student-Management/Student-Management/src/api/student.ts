import { AxiosHeaders, AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../models/http'
import axiosClient, { handleRequest } from './axios'
import { getLocalStorage } from '../utils/sessionStorage'
import { CreateDepartmentRequest, DepartmentResponse } from '../models/department'
import { CreateUserRequest, UpdateUserRequest, UserResponse } from '../models/auth'

const studentApi = {
  getStudent: (): Promise<HttpResponse<UserResponse[]>> => {
    const url = `/api/students`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getStudentById: (id: number): Promise<HttpResponse<UserResponse>> => {
    const url = `/api/students/${id}`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  createStudent: (body: CreateUserRequest) => {
    const url = `/api/accounts`
    return handleRequest(
      axiosClient.post(
        url,
        { ...body, role: 1 },
        {
          headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
        }
      )
    )
  },
  updateStudent: (id: number, body: UpdateUserRequest) => {
    const url = `/api/students/${id}`
    return handleRequest(
      axiosClient.put(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  deleteStudent: (id: number) => {
    const url = `/api/students/${id}`
    return handleRequest(
      axiosClient.delete(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
}

export default studentApi

import { AxiosHeaders, AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../models/http'
import axiosClient, { handleRequest } from './axios'
import { getLocalStorage } from '../utils/sessionStorage'
import { CreateDepartmentRequest, DepartmentResponse } from '../models/department'

const departmentApi = {
  getDepartment: (): Promise<HttpResponse<DepartmentResponse[]>> => {
    const url = `/api/departments`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getDepartmentById: (id: number): Promise<HttpResponse<DepartmentResponse>> => {
    const url = `/api/departments/${id}`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  createDepartment: (body: CreateDepartmentRequest) => {
    const url = `/api/departments`
    return handleRequest(
      axiosClient.post(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  updateDepartment: (id: number, body: CreateDepartmentRequest) => {
    const url = `/api/departments/${id}`
    return handleRequest(
      axiosClient.put(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  deleteDepartment: (id: number) => {
    const url = `/api/departments/${id}`
    return handleRequest(
      axiosClient.delete(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
}

export default departmentApi

import { AxiosHeaders, AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../models/http'
import axiosClient, { handleRequest } from './axios'
import { getLocalStorage } from '../utils/sessionStorage'
import { CreateDepartmentRequest, DepartmentResponse } from '../models/department'
import {
  ClassResponse,
  CreateClassRequest,
  StudentClassResponse,
  StudentRegisterReponse,
} from '../models/class'

const classApi = {
  getAll: (): Promise<HttpResponse<ClassResponse[]>> => {
    const url = `/api/classes`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getClassById: (id: number): Promise<HttpResponse<ClassResponse>> => {
    const url = `/api/classes/${id}`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  createClass: (body: CreateClassRequest) => {
    const url = `/api/classes`
    return handleRequest(
      axiosClient.post(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  updateClass: (id: number, body: CreateClassRequest) => {
    const url = `/api/classes/${id}`
    return handleRequest(
      axiosClient.put(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  deleteClass: (id: number) => {
    const url = `/api/classes/${id}`
    return handleRequest(
      axiosClient.delete(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getByStudent: (): Promise<HttpResponse<ClassResponse[]>> => {
    const url = `/api/classes-unopened`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getByTeacherId: (): Promise<HttpResponse<ClassResponse[]>> => {
    const url = `/api/classes-teacher`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  updateStatus: (id: number, status: string) => {
    const url = `/api/classes/${id}`
    return handleRequest(
      axiosClient.put(
        url,
        {
          status: status,
        },
        {
          headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
        }
      )
    )
  },
  registerClass: (body: { classId: number }) => {
    const url = `/api/class-registrations`
    return handleRequest(
      axiosClient.post(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getStudentInClass: (classId: number): Promise<HttpResponse<StudentClassResponse[]>> => {
    const url = `/api/classes/${classId}/students`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getClassRegisnation: (): Promise<HttpResponse<StudentRegisterReponse[]>> => {
    const url = `/api/class-registrations`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  approveStudent: (classRegistrationId: number, studentId: number) => {
    const url = `/api/teachers/approve-student/${classRegistrationId}/${studentId}`
    return handleRequest(
      axiosClient.post(url, null, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },

  updateScore: (score: number, id: number) => {
    const url = `/api/class-students/${id}`
    return handleRequest(
      axiosClient.put(
        url,
        { score: score },
        {
          headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
        }
      )
    )
  },
}

export default classApi

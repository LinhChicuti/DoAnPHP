import { AxiosHeaders, AxiosRequestConfig } from 'axios'

import { HttpResponse } from '../models/http'
import axiosClient, { handleRequest } from './axios'
import { getLocalStorage } from '../utils/sessionStorage'
import { CreateDepartmentRequest, DepartmentResponse } from '../models/department'
import { ClassResponse, CreateClassRequest, SuccessClassResponse } from '../models/class'
import { CreateSessionRequest, SessionReponse } from '../models/session'
import { AttendanceReponse } from '../models/auth'

const sessionApi = {
  getSessionByClassId: (id: number): Promise<HttpResponse<SessionReponse[]>> => {
    const url = `/api/sessions-class/${id}`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getSessionById: (id: number): Promise<HttpResponse<SessionReponse>> => {
    const url = `/api/sessions/${id}`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  createSession: (body: CreateSessionRequest) => {
    const url = `/api/sessions`
    return handleRequest(
      axiosClient.post(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  updateSession: (id: number, body: CreateSessionRequest) => {
    const url = `/api/sessions/${id}`
    return handleRequest(
      axiosClient.put(url, body, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  deleteSession: (id: number) => {
    const url = `/api/sessions/${id}`
    return handleRequest(
      axiosClient.delete(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  startSession: (sessionId: number) => {
    const url = `/api/start-session/${sessionId}`
    return handleRequest(
      axiosClient.post(url, null, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  updateAttendance: (attendenceId: number, status: number) => {
    const url = `/api/attendances/${attendenceId}`
    return handleRequest(
      axiosClient.put(
        url,
        { status: status },
        {
          headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
        }
      )
    )
  },
  getAttandnace: (): Promise<HttpResponse<AttendanceReponse[]>> => {
    const url = `/api/attendances`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
  getSuccessClass: (): Promise<HttpResponse<SuccessClassResponse[]>> => {
    const url = `/api/classes-success`
    return handleRequest(
      axiosClient.get(url, {
        headers: { Authorization: `Bearer ${getLocalStorage('access_token')}` },
      })
    )
  },
}

export default sessionApi

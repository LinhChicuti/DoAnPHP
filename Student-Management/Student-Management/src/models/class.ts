import { UserResponse } from './auth'
import { DepartmentResponse } from './department'

export interface CreateClassRequest {
  name: string
  courseName: string
  numberOfSession: number
  startDate: string
  endDate: string
  departmentId: number
}

export interface UpdateClassStatus {
  status: string
}

export interface ClassResponse {
  id: number
  name: string
  teacher: UserResponse
  courseName: string
  numberOfSession: number
  status: string
  department: DepartmentResponse
  startDate: string
  endDate: string
}

export interface RegisterClassRequest {
  classId: number
  regisDate: string
}

export interface AcceptStudentRequest {
  studentId: number
  classId: number
}

export interface UpdateScoreRequest {
  studentId: number
  score: number
}

export interface StudentClassResponse {
  id: number
  studentId: number
  classId: number
  score: number
  student: UserResponse
}

export interface StudentRegisterReponse {
  id: number
  studentId: number
  classId: number
  student: UserResponse
}

export interface SuccessClassResponse {
  id: number
  studentId: number
  classId: UserResponse
  class: ClassResponse
}

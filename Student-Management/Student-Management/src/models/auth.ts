import { DepartmentResponse } from './department'

export interface LoginRequest {
  userName: string
  password: string
}

export interface LoginResponse {
  token: string
  role: number
}

export interface CreateUserRequest {
  name: string
  email: string
  gender: string
  address: string
  username: string
  password: string
  departmentId: number
}

export interface UpdateUserRequest {
  name: string
  gender: boolean
  address: string
  departmentId: number
  isStudent: number
}

export interface UserInfoResponse {
  account: {
    id: number
    role: number
    userName: string
  }
  deparment: DepartmentResponse
}

export interface UserResponse {
  id: number
  user: UserDto
  department: DepartmentResponse
}

export interface UserDto {
  accountId: number
  address: string
  email: string
  gender: string
  name: string
  id: number
  account: AccountDto
}

export interface AccountDto {
  id: number
  userName: string
}

export interface AttendanceReponse {
  id: number
  studentId: number
  sessionId: number
  student: UserResponse
  status: number
}

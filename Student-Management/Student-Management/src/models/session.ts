import { UserResponse } from './auth'

export interface CreateSessionRequest {
  classId: number
  sessionDate: string
  sessionLocation: string
}

export interface SessionReponse {
  id: number
  sessionDate: string
  sessionLocation: string
  status: number
}

export interface CheckAttendanceRequest {
  studentId: number
  sessionId: number
  status: number
}

export interface AttendanceReportResponse {
  student: UserResponse
  attendanceNumber: number
}

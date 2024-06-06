// components/ProtectedRoute.js
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthProvider'
import { ReactNode, useEffect } from 'react'
import authApi from '../api/auth'
import { useAppDispatch } from '../stores/hooks'
import { setUser } from '../stores/userSlice'
import departmentApi from '../api/department'
import { setDepartments } from '../stores/departmentSlice'
import { getLocalStorage } from '../utils/sessionStorage'

interface ProtectedRouteProps {
  children: ReactNode
  roles?: number[]
}

const ProtectedRoute = ({ children, roles }: ProtectedRouteProps) => {
  const { currentUser } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!getLocalStorage('access_token') || getLocalStorage('access_token') === '') {
      router.push('/login')
    }
  }, [])

  useEffect(() => {
    if (currentUser && roles && !roles.includes(currentUser?.role)) {
      router.push('/unauthorized')
    }
  }, [currentUser, roles, router])

  if (!currentUser || (roles && !roles.includes(currentUser?.role))) {
    return <div>Loading...</div>
  }

  return children
}

export default ProtectedRoute

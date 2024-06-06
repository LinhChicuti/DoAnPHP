// context/AuthContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from 'react'
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '../utils/sessionStorage'
import { useAppDispatch, useAppSelector } from '../stores/hooks'
import authApi from '../api/auth'
import departmentApi from '../api/department'
import { setUser } from '../stores/userSlice'
import { selectUpdateDepartmentResult, setDepartments } from '../stores/departmentSlice'
import { useRouter } from 'next/router'

interface User {
  token: string
  role: number
}

interface AuthContextType {
  currentUser: User | null
  login: (userData: User) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const dispatch = useAppDispatch()
  const router = useRouter()
  const selectedUpdateDepartmentResulte = useAppSelector(selectUpdateDepartmentResult)

  const getUserInfo = async () => {
    const { ok, body } = await authApi.getUserDetail()
    if (ok && body) {
      dispatch(setUser(body))
    }
  }

  const getDepartment = useCallback(async () => {
    const { ok, body } = await departmentApi.getDepartment()
    if (ok && body) {
      dispatch(setDepartments(body))
    }
  }, [selectedUpdateDepartmentResulte])

  useEffect(() => {
    if (getLocalStorage('access_token')) {
      getUserInfo()
    }
  }, [])

  useEffect(() => {
    if (getLocalStorage('access_token')) {
      getDepartment()
    }
  }, [selectedUpdateDepartmentResulte])

  useEffect(() => {
    const storedUser = getLocalStorage('user')
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser))
    } else {
      router.push('/login')
    }
  }, [])

  const login = (userData: User) => {
    setCurrentUser(userData)
    setLocalStorage('access_token', userData.token)
    setLocalStorage('user', JSON.stringify(userData))
  }

  const logout = () => {
    setCurrentUser(null)
    setLocalStorage('access_token', null)
    removeLocalStorage('user')
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

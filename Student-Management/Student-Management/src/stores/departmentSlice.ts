import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { DepartmentResponse } from '../models/department'
import { RootState } from './store'
import { uniqueId } from '../utils/common'

interface DepartmentState {
  department: DepartmentResponse[]
  updateDepartmentResult: string
}

const initialState: DepartmentState = {
  /* User */
  department: null,
  updateDepartmentResult: '',
}

export const departmentSlice = createSlice({
  name: 'department',
  initialState,
  reducers: {
    setDepartments: (state, action: PayloadAction<DepartmentResponse[]>) => {
      state.department = action.payload
    },
    setUpdateDepartmentResult: (state) => {
      state.updateDepartmentResult = uniqueId()
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDepartments, setUpdateDepartmentResult } = departmentSlice.actions

export const selectDepartments = (state: RootState) => state.department.department
export const selectUpdateDepartmentResult = (state: RootState) =>
  state.department.updateDepartmentResult

export default departmentSlice.reducer

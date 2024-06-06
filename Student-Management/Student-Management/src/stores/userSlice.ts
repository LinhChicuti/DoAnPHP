import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserInfoResponse, UserResponse } from '../models/auth'
import { RootState } from './store'

interface UserState {
  currentUser: UserInfoResponse
}

const initialState: UserState = {
  /* User */
  currentUser: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserInfoResponse>) => {
      state.currentUser = action.payload
    },
    setClearStateToLogout: (state) => {
      state.currentUser = null
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setClearStateToLogout } = userSlice.actions

export const selectUser = (state: RootState) => state.user.currentUser

export default userSlice.reducer

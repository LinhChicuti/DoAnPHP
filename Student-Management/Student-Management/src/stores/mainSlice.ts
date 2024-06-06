import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserPayloadObject } from '../interfaces'

interface MainState {
  userName: string
  userEmail: null | string
  isFieldFocusRegistered: boolean
  isLoggedIn: boolean
  currentUser: any | undefined
}

const initialState: MainState = {
  /* User */
  userName: 'John Doe',
  userEmail: 'doe.doe.doe@example.com',
  isLoggedIn: false,
  currentUser: undefined,
  /* Field focus with ctrl+k (to register only once) */
  isFieldFocusRegistered: false,
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserPayloadObject>) => {
      state.userName = action.payload.name
      state.userEmail = action.payload.email
    },
    setClearStateToLogout: (state) => {
      state.currentUser = undefined
      state.isLoggedIn = false
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUser, setClearStateToLogout } = mainSlice.actions

export default mainSlice.reducer

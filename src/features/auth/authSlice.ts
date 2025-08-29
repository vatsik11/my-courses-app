import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { User } from './types'


const LS_KEY = 'rca_user'


function loadUser(): User | null {
  try {
    const raw = localStorage.getItem(LS_KEY)
    return raw ? (JSON.parse(raw) as User) : null
  } catch {
    return null
  }
}


function saveUser(user: User | null) {
  try {
    if (user) localStorage.setItem(LS_KEY, JSON.stringify(user))
    else localStorage.removeItem(LS_KEY)
  } catch {}
}


interface AuthState {
  user: User | null
}


const initialState: AuthState = {
  user: typeof window !== 'undefined' ? loadUser() : null,
}


const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      saveUser(action.payload)
    },
    logout: (state) => {
      state.user = null
      saveUser(null)
    },
  },
})


export const { loginSuccess, logout } = authSlice.actions
export default authSlice.reducer
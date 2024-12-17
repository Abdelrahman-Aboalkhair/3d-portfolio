import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'
import { axiosInstance } from '../../helpers/axiosInstance'

interface User {
  id: string
  name: string
  email: string
  isAdmin: boolean
  [key: string]: unknown
}

interface AuthState {
  isLoggedIn: boolean
  isAdmin: boolean
  user: User | null
}

const initialState: AuthState = {
  isLoggedIn: Boolean(localStorage.getItem('isLoggedIn')),
  isAdmin: localStorage.getItem('isAdmin'),
  user: localStorage.getItem('userData')
    ? JSON.parse(localStorage.getItem('userData') as string)
    : null,
}

// Thunk Types
interface LoginPayload {
  email: string
  password: string
}

interface RegisterPayload {
  name: string
  email: string
  password: string
}

interface UpdatePayload {
  id: string
  formData: Record<string, any>
}

// Thunks
export const createAccount = createAsyncThunk<User, RegisterPayload>(
  '/auth/signup',
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading(
      'Please wait! Creating your account...'
    )
    try {
      const res = await axiosInstance.post('/users/register', data)
      toast.success('Account created successfully', { id: loadingMessage })
      return res.data.user
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Signup failed', {
        id: loadingMessage,
      })
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const login = createAsyncThunk<User, LoginPayload>(
  '/auth/login',
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading(
      'Please wait! Logging into your account...'
    )
    try {
      const res = await axiosInstance.post('/users/login', data)
      console.log('res: ', res)
      toast.success('Login successful', { id: loadingMessage })
      return res.data.user
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Login failed', {
        id: loadingMessage,
      })
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const logout = createAsyncThunk<void>(
  '/auth/logout',
  async (_, { rejectWithValue }) => {
    const loadingMessage = toast.loading('Logging out...')
    try {
      const res = await axiosInstance.get('/user/logout')
      toast.success(res.data?.message || 'Logout successful', {
        id: loadingMessage,
      })
      return
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Logout failed', {
        id: loadingMessage,
      })
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const getUserData = createAsyncThunk<User>(
  '/users/me',
  async (_, { rejectWithValue }) => {
    const loadingMessage = toast.loading('Fetching profile...')
    try {
      const res = await axiosInstance.get('/users/me')
      toast.success('Profile fetched successfully', { id: loadingMessage })
      return res.data.user
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Fetch failed', {
        id: loadingMessage,
      })
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

export const updateUserData = createAsyncThunk<User, UpdatePayload>(
  '/auth/user/me',
  async (data, { rejectWithValue }) => {
    const loadingMessage = toast.loading('Updating changes...')
    try {
      const res = await axiosInstance.post(
        `/user/update/${data.id}`,
        data.formData
      )
      toast.success('Changes saved successfully', { id: loadingMessage })
      return res.data.user
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Update failed', {
        id: loadingMessage,
      })
      return rejectWithValue(error.response?.data?.message)
    }
  }
)

// Slice
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Signup
      .addCase(
        createAccount.fulfilled,
        (state, action: PayloadAction<User>) => {
          localStorage.setItem('userData', JSON.stringify(action.payload))
          localStorage.setItem(
            'isAdmin',
            String(action.payload.role === 'admin')
          )
          localStorage.setItem('isLoggedIn', 'true')
          state.user = action.payload
          state.isAdmin = action.payload.role === 'admin'
          state.isLoggedIn = true
        }
      )
      // Login
      .addCase(login.fulfilled, (state, action: PayloadAction<User>) => {
        localStorage.setItem('userData', JSON.stringify(action.payload))
        localStorage.setItem('isAdmin', action.payload.isAdmin)
        localStorage.setItem('isLoggedIn', 'true')
        state.user = action.payload
        state.isAdmin = action.payload.role === 'admin'
        state.isLoggedIn = true
      })
      // Logout
      .addCase(logout.fulfilled, (state) => {
        localStorage.removeItem('userData')
        localStorage.removeItem('isAdmin')
        localStorage.removeItem('isLoggedIn')
        state.user = null
        state.isAdmin = false
        state.isLoggedIn = false
      })
      // Get User Data
      .addCase(getUserData.fulfilled, (state, action: PayloadAction<User>) => {
        localStorage.setItem('userData', JSON.stringify(action.payload))
        localStorage.setItem('isAdmin', String(action.payload.role === 'admin'))
        localStorage.setItem('isLoggedIn', 'true')
        state.user = action.payload
        state.isAdmin = action.payload.role === 'admin'
        state.isLoggedIn = true
      })
      // Update User Data
      .addCase(
        updateUserData.fulfilled,
        (state, action: PayloadAction<User>) => {
          localStorage.setItem('userData', JSON.stringify(action.payload))
          localStorage.setItem(
            'isAdmin',
            String(action.payload.role === 'admin')
          )
          localStorage.setItem('isLoggedIn', 'true')
          state.user = action.payload
          state.isAdmin = action.payload.role === 'admin'
          state.isLoggedIn = true
        }
      )
  },
})

export default authSlice.reducer

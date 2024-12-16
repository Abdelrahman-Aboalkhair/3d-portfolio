import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './slices/AuthSlice'
import { apiSlice } from './slices/ApiSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(apiSlice.middleware),
})

export default store

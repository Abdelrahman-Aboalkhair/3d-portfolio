import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
<<<<<<< HEAD
    baseUrl: 'https://3d-portfolio-api.vercel.app/api/v1',
=======
    baseUrl: 'https://3d-portfolio-api.vercel.app/api/v1/',
>>>>>>> 1f0b22e859428b3b1641ed9e00096192b4e3c4f4
    credentials: 'include',
  }),
  endpoints: () => ({}),
})

export const { usePrefetch } = apiSlice

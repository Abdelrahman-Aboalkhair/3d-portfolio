import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://3d-portfolio-api.vercel.app/api/v1/',
    credentials: 'include',
  }),
  endpoints: () => ({}),
})

export const { usePrefetch } = apiSlice

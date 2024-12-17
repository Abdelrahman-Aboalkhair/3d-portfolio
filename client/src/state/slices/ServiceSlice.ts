import { apiSlice } from './ApiSlice'

export const serviceSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createService: builder.mutation<unknown, unknown>({
      query: (serviceData) => ({
        url: '/services',
        method: 'POST',
        body: serviceData,
      }),
    }),
    getAllServices: builder.query<unknown, void>({
      query: () => ({
        url: '/services',
        method: 'GET',
      }),
    }),
    updateService: builder.mutation<unknown, unknown>({
      query: ({ serviceId, serviceData }) => ({
        url: `/services/${serviceId}`,
        method: 'PUT',
        body: serviceData,
      }),
    }),
    deleteService: builder.mutation<unknown, void>({
      query: (serviceId) => ({
        url: `/services/${serviceId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreateServiceMutation,
  useGetAllServicesQuery,
  useUpdateServiceMutation,
  useDeleteServiceMutation,
} = serviceSlice

import { apiSlice } from './ApiSlice'

export const projectSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createProject: builder.mutation({
      query: (projectData) => ({
        url: '/projects',
        method: 'POST',
        body: projectData,
      }),
    }),
    getAllProjects: builder.query({
      query: () => ({
        url: '/projects',
        method: 'GET',
      }),
    }),
    updateProject: builder.mutation({
      query: ({ projectId, projectData }) => ({
        url: `/projects/${projectId}`,
        method: 'PUT',
        body: projectData,
      }),
    }),
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `/projects/${projectId}`,
        method: 'DELETE',
      }),
    }),
  }),
})

export const {
  useCreateProjectMutation,
  useGetAllProjectsQuery,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
} = projectSlice

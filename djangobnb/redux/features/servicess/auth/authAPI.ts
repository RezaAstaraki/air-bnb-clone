import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints: (builder) => ({
    login: builder.mutation<{refresh:string,access:string}, {email:string,password:string}>({
      query: ({ email, password }) => ({
        url: `auth/jwt/create/`,
        method: 'POST',
        headers:{'Content-Type': 'application/json'},
        body:{email:email,password:password},
      }),
    }),
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useLoginMutation  } = authApi
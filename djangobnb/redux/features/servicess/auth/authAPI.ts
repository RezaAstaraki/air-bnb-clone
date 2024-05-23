'use client'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// import type { Pokemon } from './types'

// Define a service using a base URL and expected endpoints
export const authApi = createApi({
  reducerPath: 'auth',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1:8000/api/' }),
  endpoints:
    
    (builder) => ({
    
    getCurrentUser: builder.query<any, any>(
      {
      
      query: (access) => ({
        url: 'auth/users/me/',
        method: "GET",
        headers: {
          'Authorization': `Bearer ${access}`,

        },

      })
    })





  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {useGetCurrentUserQuery  } = authApi
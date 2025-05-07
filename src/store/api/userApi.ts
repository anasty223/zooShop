
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers) => {
      const token = typeof window !== 'undefined'
        ? document.cookie
            .split('; ')
            .find((row) => row.startsWith('token='))
            ?.split('=')[1]
        : '';

      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProfile: builder.query<{ user: { email: string; profile: any } }, void>({
      query: () => 'auth/profile',
    }),
  }),
});

export const { useGetProfileQuery } = userApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const { token } = getState().auth;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
    getMessages: builder.query({
      query: () => 'messages',
    }),
  }),
});

export const { useGetChannelsQuery, useGetMessagesQuery } = api;

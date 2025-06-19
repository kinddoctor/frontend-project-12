import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { io } from 'socket.io-client';

const socket = io();

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const {
        data: { token },
      } = getState().auth;
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
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded;
        socket.on('newMessage', (payload) => {
          updateCachedData((draft) => {
            draft.push(payload);
          });
        });
        await cacheEntryRemoved;
        socket.disconnect();
      },
    }),
    sendMessage: builder.mutation({
      query: (message) => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),
  }),
});

socket.on('connect', () => {
  console.log('connected to server');
});

socket.on('disconnect', () => {
  console.log('disconnected to server');
});

// socket.on('newMessage', () => {
//   console.log(api.endpoints.getMessages);
//   api.endpoints.getMessages.initiate();
// });

export const { useGetChannelsQuery, useGetMessagesQuery, useSendMessageMutation } = api;

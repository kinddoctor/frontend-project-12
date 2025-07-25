import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { io } from 'socket.io-client'

const socket = io()

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers, { getState }) => {
      const {
        data: { token },
      } = getState().auth
      if (token) {
        headers.set('authorization', `Bearer ${token}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    getChannels: builder.query({
      query: () => 'channels',
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded
        socket.on('newChannel', (payload) => {
          updateCachedData((draft) => {
            draft.push(payload)
          })
        })
        socket.on('removeChannel', ({ id }) => {
          updateCachedData((draft) => {
            const itemToRemove = draft.findIndex(item => item.id === id)
            draft.splice(itemToRemove, 1)
          })
        })
        socket.on('renameChannel', (payload) => {
          updateCachedData((draft) => {
            const itemToRename = draft.find(item => item.id === payload.id)
            const itemToRenameIndex = draft.indexOf(itemToRename)
            draft[itemToRenameIndex] = { ...itemToRename, name: payload.name }
          })
        })
        await cacheEntryRemoved
        socket.disconnect()
      },
    }),
    addChannel: builder.mutation({
      query: channel => ({
        url: 'channels',
        method: 'POST',
        body: channel,
      }),
    }),
    renameChannel: builder.mutation({
      query: ({ name, id }) => ({
        url: `channels/${id}`,
        method: 'PATCH',
        body: { name },
      }),
    }),
    deleteChannel: builder.mutation({
      query: id => ({
        url: `channels/${id}`,
        method: 'DELETE',
      }),
    }),
    getMessages: builder.query({
      query: () => 'messages',
      async onCacheEntryAdded(arg, { updateCachedData, cacheDataLoaded, cacheEntryRemoved }) {
        await cacheDataLoaded
        socket.on('newMessage', (payload) => {
          updateCachedData((draft) => {
            draft.push(payload)
          })
        })
        await cacheEntryRemoved
        socket.disconnect()
      },
    }),
    sendMessage: builder.mutation({
      query: message => ({
        url: 'messages',
        method: 'POST',
        body: message,
      }),
    }),
  }),
})

socket.on('connect', () => {
  console.log('connected to server')
})

socket.on('disconnect', () => {
  console.log('disconnected to server')
})

export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useRenameChannelMutation,
  useDeleteChannelMutation,
  useGetMessagesQuery,
  useSendMessageMutation,
} = api

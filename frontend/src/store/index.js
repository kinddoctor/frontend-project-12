import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { api } from './api'

export default configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(api.middleware),
})

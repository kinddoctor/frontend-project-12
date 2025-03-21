/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { username: '', token: '', error: '' },
  reducers: {
    setCredentials: (state, { payload: { username, token } }) => {
      state.username = username;
      state.token = token;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setCredentials, setError } = authSlice.actions;

export default authSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { data: { username: '', token: '' }, error: '' },
  reducers: {
    setData: (state, { payload: { username, token } }) => {
      state.data.username = username;
      state.data.token = token;
    },
    setToken: (state, { payload }) => {
      state.data.token = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setData, setToken, setError } = authSlice.actions;

export default authSlice.reducer;

/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { token: '', error: '' },
  reducers: {
    setToken: (state, { payload }) => {
      state.token = payload;
    },
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setToken, setError } = authSlice.actions;

export default authSlice.reducer;

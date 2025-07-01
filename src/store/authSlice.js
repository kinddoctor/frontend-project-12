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
    setError: (state, { payload }) => {
      state.error = payload;
    },
  },
});

export const { setData, setError } = authSlice.actions;

export default authSlice.reducer;

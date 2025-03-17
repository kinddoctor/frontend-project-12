import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: '', token: '' },
  reducers: {
    setCredentials: (state, { payload: { token, username } }) => {
      state.user = username;
      state.token = token;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

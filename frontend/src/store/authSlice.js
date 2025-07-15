/* eslint-disable no-param-reassign */
import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const authRequest = async (path, body) => {
  const { data } = await axios.post(`/api/v1/${path}`, body);
  const { token, username } = data;
  localStorage.setItem('ChattyChat token', token);
  localStorage.setItem('ChattyChat username', username);
  return data;
};

export const loginRequest = createAsyncThunk('auth/loginRequest', async (body) => authRequest('login', body));

export const signupRequest = createAsyncThunk('auth/signupRequest', async (body) => authRequest('signup', body));

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
  extraReducers: (builder) => {
    builder
      .addCase(loginRequest.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.error = null;
      })
      .addCase(loginRequest.rejected, (state, { error }) => {
        state.error = error;
      })
      .addCase(signupRequest.fulfilled, (state, { payload }) => {
        state.data = payload;
        state.error = null;
      })
      .addCase(signupRequest.rejected, (state, { error }) => {
        state.error = error;
      });
  },
});

export const { setData, setError } = authSlice.actions;

export default authSlice.reducer;

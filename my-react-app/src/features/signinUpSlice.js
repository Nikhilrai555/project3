import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const signup = createAsyncThunk('auth/signup', async (userData) => {
  const response = await axios.post('http://localhost:3001/user/signup', userData);
  return response.data;
});

export const login = createAsyncThunk('auth/login', async (userData) => {
  const response = await axios.post('http://localhost:3001/user/signin', userData);
  return response.data;
});

const signinUpSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    status: 'idle',
    error: null,
  },
  reducers: {


    logout: (state) => {
        localStorage.clear()
      state.token = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { token, result } = action.payload;
        state.token = token;
        state.result = result;
        localStorage.setItem('profile', JSON.stringify({...action?.payload}))
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        const { token, result } = action.payload;
        state.token = token;
        state.result = result;
        localStorage.setItem('profile', JSON.stringify({...action?.payload}))
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { logout } = signinUpSlice.actions;

export default signinUpSlice.reducer;

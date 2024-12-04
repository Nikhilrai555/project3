import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchUserDataAsync = createAsyncThunk(
  'user/fetchUserData',
  async (_, { rejectWithValue }) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const token = profile?.token;
    console.log(token);

    if (!token) {
      return rejectWithValue('Token missing');
    }

    try {
      const response = await axios.get('http://localhost:3001/user/me', {
        headers: { Authorization: `Bearer ${token}` },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { data: [], isLoading: false, error: null },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserDataAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUserDataAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(fetchUserDataAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

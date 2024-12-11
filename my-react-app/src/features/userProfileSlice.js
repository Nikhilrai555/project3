import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk to fetch user profile
export const fetchUserProfile = createAsyncThunk(
  'userProfile/fetchUserProfile',
  async (userId, { rejectWithValue }) => {
    try {
      
      const response = await axios.get(`http://localhost:3001/user/${userId}`);
      return response.data; // Response is now the updated structure
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Failed to fetch user profile');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState: {
    name: '',
    email: '',
    totalPnl: 0,
    trades: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearProfile: (state) => {
      state.name = '';
      state.email = '';
      state.totalPnl = 0;
      state.trades = [];
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        const { name, email, totalPnl, trades } = action.payload;
        state.name = name;
        state.email = email;
        state.totalPnl = totalPnl;
        state.trades = trades;
        state.loading = false;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch user profile';
      });
  },
});

export const { clearProfile } = userProfileSlice.actions;
export default userProfileSlice.reducer;

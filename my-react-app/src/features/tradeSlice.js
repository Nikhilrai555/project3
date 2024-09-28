import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTrades } from "./api";
import axios from "axios";


export const postTradeAsync = createAsyncThunk(
  'trades/postTrade',
  async (tradeData, { rejectWithValue }) => {
    const profile = JSON.parse(localStorage.getItem('profile'));
    const token = profile.token; // Get the token
    console.log(token);

    if (!token) {
      return rejectWithValue('Token missing');
    }

    try {
      
      const response = await axios.post('http://localhost:3001/trades', tradeData, {
        headers: {
          'Authorization': `Bearer ${token}`, // Send token in the Authorization header
        },
      });
      console.log(response);
      return response.data;
    } catch (err) {
      console.error(err);
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const fetchTradesAsync = createAsyncThunk(
  'trades/fetchTrades',
  async () => {
    const trades = await fetchTrades();
    return trades;
  }
);

const initialState = {
  trades: [],
  isLoading: false,
  error: null,
};

const tradeSlice = createSlice({
  name: 'trades',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(postTradeAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(postTradeAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trades.push(action.payload);
      })
      .addCase(postTradeAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(fetchTradesAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTradesAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.trades = action.payload;
      })
      .addCase(fetchTradesAsync.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default tradeSlice.reducer;

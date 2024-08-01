import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postTrade, fetchTrades } from "./api";

export const postTradeAsync = createAsyncThunk(
  'trades/postTrade',
  async (tradeData) => {
    const newTrade = await postTrade(tradeData);
    return newTrade;
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

import { configureStore } from '@reduxjs/toolkit';
import tradeSlice from '../features/tradeSlice';// We'll create this slice next
import authSlice from '../features/authSlice';
import signinUpSlice from '../features/signinUpSlice';

const store = configureStore({
  reducer: {
    trade: tradeSlice,
    auth: authSlice,
    signinsignup: signinUpSlice
  },
});

export default store;
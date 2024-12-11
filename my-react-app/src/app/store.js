import { configureStore } from '@reduxjs/toolkit';
import tradeSlice from '../features/tradeSlice';
import authSlice from '../features/authSlice';
import signinUpSlice from '../features/signinUpSlice';
import userSlice from '../features/userSlice';
import leaderboardSlice from '../features/leaderBoardSlice';
import userProfileSlice from '../features/userProfileSlice';



const store = configureStore({
  reducer: {
    trade: tradeSlice,
    auth: authSlice,
    signinsignup: signinUpSlice,
    user: userSlice,
    leaderboard: leaderboardSlice,
    userProfile: userProfileSlice,
  },
});
export default store; 
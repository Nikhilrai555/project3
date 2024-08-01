import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  token: null,
  result: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { token, result } = action.payload;
      state.token = token;
      state.result = result;
      // Optionally store in localStorage
      //localStorage.setItem('token', token);
      //localStorage.setItem('result', JSON.stringify(result));
      localStorage.setItem('profile', JSON.stringify({...action?.payload}))
    },
    logout: (state) => {
      state.token = null;
      state.result = null;
    //  localStorage.removeItem('token');
      //localStorage.removeItem('result');
      localStorage.removeItem('profile');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;

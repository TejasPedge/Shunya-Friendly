import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading : false,
  isError : false,
};

const userSlice = createSlice({
  name : 'user',
  initialState,
  reducers : {
    requestMade : (state, {payload}) => {
        state.isLoading = true;
    },
    requestSuccess : (state, {payload}) => {
        state.isLoading = false;
        state.users = payload;
    },
    requestFailed : (state, {payload}) => {
        state.isLoading = false;
        state.isError = true;
    },
  }
});


export const { requestMade, requestSuccess, requestFailed} = userSlice.actions;
export default userSlice.reducer;

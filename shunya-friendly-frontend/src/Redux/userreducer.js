import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  isLoading : false,
  isError : false,
  singleUser : null
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
        state.isError = false;
        state.users = payload;
    },
    requestFailed : (state, {payload}) => {
        state.isLoading = false;
        state.isError = payload;
    },
    postRequestSuccess : (state, {payload}) => {
      state.isLoading = false;
    },
    single_User_Get_Request_Success : (state, {payload}) => {
      state.isLoading = false;
      state.singleUser = payload;
    }
  }
});


export const { requestMade, requestSuccess, requestFailed, postRequestSuccess, single_User_Get_Request_Success} = userSlice.actions;
export default userSlice.reducer;

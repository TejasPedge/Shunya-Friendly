import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users:  null,
  isLoading : false,
  isError : false,
  singleUser : null,
  postData: {
    isLoading: false,
    isError: false,
  },
  deleteData: {
    isLoading: false,
    isError: false,
  }
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
    postRequestMade : (state, {payload}) => {
        state.postData.isLoading = true;
    },
    postRequestSuccess : (state, {payload}) => {
        state.postData.isLoading = false;
    },
    postRequestFailed : (state, {payload}) => {
        state.postData.isLoading = false;
        state.postData.isError = payload;
    },
    deleteRequestMade: (state, {payload}) => {
        state.deleteData.isLoading = true;
    },
    deleteRequestSuccess : (state, {payload}) => {
        state.deleteData.isLoading = false;
    },
    deleteRequestFailed : (state, {payload}) => {
        state.deleteData.isLoading = false;
        state.deleteData.isError = payload;
    },
    single_User_Get_Request_Success : (state, {payload}) => {
        state.isLoading = false;
        state.singleUser = payload;
    }
  }
});


export const { 
  requestMade, 
  requestSuccess, 
  requestFailed, 
  single_User_Get_Request_Success,
  postRequestMade,
  postRequestSuccess,
  postRequestFailed,
  deleteRequestMade,
  deleteRequestSuccess,
  deleteRequestFailed
} = userSlice.actions;
export default userSlice.reducer;

// this FILE contains the logic that dispatches Redux actions related to API requests

import { requestMade, requestSuccess, requestFailed, postRequestSuccess, single_User_Get_Request_Success } from "../Redux/userreducer"
import axios from "axios"



export const getData = (url) => async (dispatch) => {
    try {
        dispatch(requestMade());
        const response =  await axios(url);
        const  users = response.data.users;
        dispatch(requestSuccess(users));
    } catch (error) {
        console.log(error.message);
        if(error.message === 'Network Error') {
            dispatch( requestFailed({message : 'Network Error'}) );
        }else {
            dispatch( requestFailed({message : 'Server Error'}) );
        }
    }
}


export const createUsers = (url,data) => async (dispatch) => {
    try {
        dispatch(requestMade());
        const response =  await axios.post(url,data);
        console.log(response);
        dispatch(postRequestSuccess());
        return response;
    } catch (error) {
        console.log(error?.response?.data);
        if(error?.response?.data?.code === 11000) {
            dispatch( requestFailed({message : 'User with this email id already Exists'}) );
            throw new Error('User with this email id already Exists');
        }
        if(error.message === 'Network Error') {
            dispatch( requestFailed({message : 'Network Error'}) );
            throw new Error('Network Error, Please check your internet connection once.');
        }else {
            dispatch( requestFailed({message : 'Server Error'}) );
            throw new Error('Server Error');
        }
    }
}

export const getSingleUSer = (url) => async (dispatch) => {

    try {
        dispatch(requestMade());
        const response =  await axios(url);
        dispatch(single_User_Get_Request_Success(response.data));
    } catch (error) {
        console.log(error.message);
        if(error.message === 'Network Error') {
            dispatch( requestFailed({message : 'Network Error'}) );
        }else {
            dispatch( requestFailed({message : 'Server Error'}) );
        }
    }
}



export const updateUser = (url,data) => async (dispatch) => {
    try {
        dispatch(requestMade());
        const response =  await axios.put(url,data);
        console.log(response);
        dispatch(postRequestSuccess());
        return response;
    } catch (error) {
        console.log(error);
        if(error.message === 'Network Error') {
            dispatch( requestFailed({message : 'Network Error'}) );
            throw new Error('Network Error, Please check your internet connection once.');
        }else {
            dispatch( requestFailed({message : 'Server Error'}) );
            throw new Error('Server Error');
        }
    }
}

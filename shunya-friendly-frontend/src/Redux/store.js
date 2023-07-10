import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userreducer';
import thunk from 'redux-thunk';

const store = configureStore({
  reducer: {
    userReducer,
  },
  middleware : [thunk]
});

export default store;

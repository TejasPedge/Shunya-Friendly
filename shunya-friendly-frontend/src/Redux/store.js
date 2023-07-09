import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userreducer';

const store = configureStore({
  reducer: {
    userReducer,
  },
});

export default store;

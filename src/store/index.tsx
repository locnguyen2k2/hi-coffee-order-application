import {configureStore} from '@reduxjs/toolkit';
import balanceSlice from './balanceSlice';

export const stores = configureStore({
  reducer: {
    userAuth: balanceSlice,
  },
});

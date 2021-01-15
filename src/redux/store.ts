import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import AuthSlice from './auth/AuthSlice';

const store = configureStore({
  reducer: {
    auth: AuthSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;

import { apiSlice } from '@/service/api';
import authSlice from '@/store/slices/authSlices';
import { configureStore } from '@reduxjs/toolkit';
import userLoginModalReducer from './slices/userLoginModalSlice';
import ownerLoginModalReducer from './slices/ownerLoginModalSlice';

export const store = configureStore({
 reducer: {
  auth: authSlice.reducer,
  login_modal: userLoginModalReducer,
  owner_login_modal: ownerLoginModalReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
 },
 middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

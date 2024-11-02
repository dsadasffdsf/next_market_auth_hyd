import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productSlice';
import usersReducer from './slices/userSlice';

export const store = configureStore({
  reducer: { productsSlice: productsReducer, userSlice: usersReducer },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

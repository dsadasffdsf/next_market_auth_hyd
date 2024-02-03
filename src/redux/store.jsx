import { configureStore } from '@reduxjs/toolkit';
import sliceReducer from './slices/slice';

export const store = configureStore({
  reducer: { slice: sliceReducer },
});

import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import filtersReducer from './slices/filtersSlice';
import cartReducer from './slices/cartSlice';
import paginationReducer from './slices/paginationSlice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    cart: cartReducer,
    pagination: paginationReducer,
  },
});

import { createSlice } from '@reduxjs/toolkit';

const comparisonSlice = createSlice({
  name: 'comparison',
  initialState: {
    items: [],
    maxItems: 4,
  },
  reducers: {
    addToComparison: (state, action) => {
      const product = action.payload;
      const exists = state.items.find((item) => item.id === product.id);
      if (!exists && state.items.length < state.maxItems) {
        state.items.push(product);
      }
    },
    removeFromComparison: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
    },
    clearComparison: (state) => {
      state.items = [];
    },
    isInComparison: (state, action) => {
      const productId = action.payload;
      return state.items.some((item) => item.id === productId);
    },
  },
});

export const { addToComparison, removeFromComparison, clearComparison } = comparisonSlice.actions;
export default comparisonSlice.reducer;

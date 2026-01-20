import { createSlice } from '@reduxjs/toolkit';

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    items: [
      { id: 1, productId: 1, rating: 5, text: 'Excellent product!', author: 'John Doe', date: '2024-01-15' },
      { id: 2, productId: 1, rating: 4, text: 'Good quality', author: 'Jane Smith', date: '2024-01-10' },
      { id: 3, productId: 2, rating: 5, text: 'Amazing!', author: 'Bob Johnson', date: '2024-01-12' },
    ],
  },
  reducers: {
    addReview: (state, action) => {
      const newReview = {
        id: Math.max(...state.items.map(r => r.id), 0) + 1,
        ...action.payload,
        date: new Date().toISOString().split('T')[0],
      };
      state.items.push(newReview);
    },
    removeReview: (state, action) => {
      state.items = state.items.filter(review => review.id !== action.payload);
    },
    updateReview: (state, action) => {
      const index = state.items.findIndex(review => review.id === action.payload.id);
      if (index !== -1) {
        state.items[index] = { ...state.items[index], ...action.payload };
      }
    },
  },
});

export const { addReview, removeReview, updateReview } = reviewsSlice.actions;
export default reviewsSlice.reducer;

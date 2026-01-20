import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 'all',
    priceRange: [0, 300],
    sort: 'asc',
    searchTerm: '',
    minRating: 0,
  },
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setPriceRange: (state, action) => {
      state.priceRange = action.payload;
    },
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setMinRating: (state, action) => {
      state.minRating = action.payload;
    },
    resetFilters: (state) => {
      state.category = 'all';
      state.priceRange = [0, 300];
      state.sort = 'asc';
      state.searchTerm = '';
      state.minRating = 0;
    },
  },
});

export const { setCategory, setPriceRange, setSort, setSearchTerm, setMinRating, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

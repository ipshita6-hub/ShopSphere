import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    category: 'all',
    priceRange: [0, 300],
    sort: 'asc',
    searchTerm: '',
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
    resetFilters: (state) => {
      state.category = 'all';
      state.priceRange = [0, 300];
      state.sort = 'asc';
      state.searchTerm = '';
    },
  },
});

export const { setCategory, setPriceRange, setSort, setSearchTerm, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const paginationSlice = createSlice({
  name: 'pagination',
  initialState: {
    currentPage: 1,
    itemsPerPage: 12,
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setItemsPerPage: (state, action) => {
      state.currentPage = 1; // Reset to first page when changing items per page
      state.itemsPerPage = action.payload;
    },
    resetPagination: (state) => {
      state.currentPage = 1;
      state.itemsPerPage = 12;
    },
  },
});

export const { setCurrentPage, setItemsPerPage, resetPagination } = paginationSlice.actions;
export default paginationSlice.reducer;

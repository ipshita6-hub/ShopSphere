import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPriceRange, setSort, resetFilters } from '../store/slices/filtersSlice';

/**
 * Custom hook for filter operations
 * Provides convenient methods for managing filter state
 */
export const useFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleSetCategory = (category) => {
    dispatch(setCategory(category));
  };

  const handleSetPriceRange = (priceRange) => {
    dispatch(setPriceRange(priceRange));
  };

  const handleSetSort = (sort) => {
    dispatch(setSort(sort));
  };

  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  const isFilterActive = () => {
    return (
      filters.category !== 'all' ||
      filters.priceRange[1] !== 300 ||
      filters.sort !== 'asc'
    );
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.category !== 'all') count++;
    if (filters.priceRange[1] !== 300) count++;
    if (filters.sort !== 'asc') count++;
    return count;
  };

  return {
    filters,
    setCategory: handleSetCategory,
    setPriceRange: handleSetPriceRange,
    setSort: handleSetSort,
    resetFilters: handleResetFilters,
    isFilterActive,
    getActiveFilterCount,
  };
};

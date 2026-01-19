import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCategory, setPriceRange, setSort, setSearchTerm, resetFilters } from '../store/slices/filtersSlice';

const FilterBar = ({ categories }) => {
  const dispatch = useDispatch();
  const filters = useSelector((state) => state.filters);

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategoryChange = (e) => {
    dispatch(setCategory(e.target.value));
  };

  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value, 10);
    dispatch(setPriceRange([0, value]));
  };

  const handleSortChange = (e) => {
    dispatch(setSort(e.target.value));
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  return (
    <div className="filter-bar">
      <div className="filter-group search-group">
        <label htmlFor="search">Search Products</label>
        <input
          id="search"
          type="text"
          placeholder="Search by name or description..."
          value={filters.searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="filter-group">
        <label htmlFor="category">Category</label>
        <select id="category" value={filters.category} onChange={handleCategoryChange}>
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="price">Max Price: ${filters.priceRange[1]}</label>
        <input
          id="price"
          type="range"
          min="0"
          max="300"
          value={filters.priceRange[1]}
          onChange={handlePriceChange}
        />
      </div>

      <div className="filter-group">
        <label htmlFor="sort">Sort by Price</label>
        <select id="sort" value={filters.sort} onChange={handleSortChange}>
          <option value="asc">Low to High</option>
          <option value="desc">High to Low</option>
        </select>
      </div>

      <button className="reset-btn" onClick={handleReset}>
        Reset Filters
      </button>
    </div>
  );
};

export default FilterBar;

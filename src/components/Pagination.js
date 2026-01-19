import React from 'react';
import './Pagination.css';

/**
 * Pagination component for navigating through product pages
 */
const Pagination = ({ currentPage, totalPages, onPageChange, itemsPerPage, onItemsPerPageChange }) => {
  const pageNumbers = [];
  const maxPagesToShow = 5;
  let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
  let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

  if (endPage - startPage < maxPagesToShow - 1) {
    startPage = Math.max(1, endPage - maxPagesToShow + 1);
  }

  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i);
  }

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (pageNumber) => {
    onPageChange(pageNumber);
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="pagination-container">
      <div className="pagination-info">
        <label htmlFor="items-per-page">Items per page:</label>
        <select
          id="items-per-page"
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(parseInt(e.target.value, 10))}
          className="items-per-page-select"
        >
          <option value={12}>12</option>
          <option value={24}>24</option>
          <option value={36}>36</option>
        </select>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-btn pagination-prev"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          ← Previous
        </button>

        <div className="pagination-numbers">
          {startPage > 1 && (
            <>
              <button
                className="pagination-number"
                onClick={() => handlePageClick(1)}
              >
                1
              </button>
              {startPage > 2 && <span className="pagination-ellipsis">...</span>}
            </>
          )}

          {pageNumbers.map((pageNumber) => (
            <button
              key={pageNumber}
              className={`pagination-number ${currentPage === pageNumber ? 'active' : ''}`}
              onClick={() => handlePageClick(pageNumber)}
              aria-current={currentPage === pageNumber ? 'page' : undefined}
            >
              {pageNumber}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="pagination-ellipsis">...</span>}
              <button
                className="pagination-number"
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}
        </div>

        <button
          className="pagination-btn pagination-next"
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          Next →
        </button>
      </div>

      <div className="pagination-info">
        <span>
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  );
};

export default Pagination;

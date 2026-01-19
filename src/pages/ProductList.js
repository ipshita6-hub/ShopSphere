import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';
import Pagination from '../components/Pagination';
import { setCurrentPage, setItemsPerPage } from '../store/slices/paginationSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const filters = useSelector((state) => state.filters);
  const pagination = useSelector((state) => state.pagination);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, [products]);

  const filteredProducts = useMemo(() => {
    let result = products;

    // Filter by search term
    if (filters.searchTerm.trim()) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(searchLower) ||
          p.description.toLowerCase().includes(searchLower)
      );
    }

    // Filter by category
    if (filters.category !== 'all') {
      result = result.filter((p) => p.category === filters.category);
    }

    // Filter by price range
    result = result.filter(
      (p) => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    // Sort by price
    result = result.sort((a, b) => {
      return filters.sort === 'asc' ? a.price - b.price : b.price - a.price;
    });

    return result;
  }, [products, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, pagination.currentPage, pagination.itemsPerPage]);

  const totalPages = Math.ceil(filteredProducts.length / pagination.itemsPerPage);

  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (itemsPerPage) => {
    dispatch(setItemsPerPage(itemsPerPage));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="product-list-page">
      <FilterBar categories={categories} />
      <div className="products-container">
        {paginatedProducts.length > 0 ? (
          <>
            <div className="products-grid">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <Pagination
              currentPage={pagination.currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              itemsPerPage={pagination.itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          </>
        ) : (
          <div className="no-products">
            <p>No products found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;

import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import ProductCard from '../components/ProductCard';
import FilterBar from '../components/FilterBar';

const ProductList = () => {
  const products = useSelector((state) => state.products.items);
  const filters = useSelector((state) => state.filters);

  const categories = useMemo(() => {
    const cats = new Set(products.map((p) => p.category));
    return Array.from(cats).sort();
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = products;

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

  return (
    <div className="product-list-page">
      <FilterBar categories={categories} />
      <div className="products-container">
        {filteredAndSortedProducts.length > 0 ? (
          <div className="products-grid">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
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

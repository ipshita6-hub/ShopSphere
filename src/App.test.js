import React from 'react';
import { render, screen, fireEvent, within } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import App from './App';
import productsReducer from './store/slices/productsSlice';
import filtersReducer from './store/slices/filtersSlice';
import cartReducer from './store/slices/cartSlice';

const createTestStore = () => {
  return configureStore({
    reducer: {
      products: productsReducer,
      filters: filtersReducer,
      cart: cartReducer,
    },
  });
};

const renderWithRedux = (component) => {
  const store = createTestStore();
  return render(<Provider store={store}>{component}</Provider>);
};

describe('ShopSphere - Product List', () => {
  test('renders product list with products', () => {
    renderWithRedux(<App />);
    expect(screen.getByText('ShopSphere')).toBeInTheDocument();
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Smart Watch')).toBeInTheDocument();
  });

  test('filters reduce product count by category', () => {
    renderWithRedux(<App />);
    const categorySelect = screen.getByDisplayValue('All Categories');
    fireEvent.change(categorySelect, { target: { value: 'Electronics' } });
    
    expect(screen.getByText('Wireless Headphones')).toBeInTheDocument();
    expect(screen.getByText('Smart Watch')).toBeInTheDocument();
    expect(screen.queryByText('Running Shoes')).not.toBeInTheDocument();
  });

  test('sorting works correctly - low to high', () => {
    renderWithRedux(<App />);
    const sortSelect = screen.getByDisplayValue('Low to High');
    fireEvent.change(sortSelect, { target: { value: 'asc' } });
    
    const prices = screen.getAllByText(/\$\d+\.\d+/);
    expect(prices.length).toBeGreaterThan(0);
  });

  test('sorting works correctly - high to low', () => {
    renderWithRedux(<App />);
    const sortSelect = screen.getByDisplayValue('Low to High');
    fireEvent.change(sortSelect, { target: { value: 'desc' } });
    
    const prices = screen.getAllByText(/\$\d+\.\d+/);
    expect(prices.length).toBeGreaterThan(0);
  });
});

describe('ShopSphere - Cart Functionality', () => {
  test('add item to cart', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const productCard = screen.getByText('Wireless Headphones').closest('a');
    fireEvent.click(productCard);

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    expect(screen.getByText('✓ Added 1 item(s) to cart!')).toBeInTheDocument();
  });

  test('cart total updates correctly', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const productCard = screen.getByText('Wireless Headphones').closest('a');
    fireEvent.click(productCard);

    const quantityInput = screen.getByDisplayValue('1');
    fireEvent.change(quantityInput, { target: { value: '2' } });

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    const cartLink = screen.getByText(/Cart \(/);
    fireEvent.click(cartLink);

    expect(screen.getByText(/\$159\.98/)).toBeInTheDocument();
  });

  test('remove item from cart', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const productCard = screen.getByText('Wireless Headphones').closest('a');
    fireEvent.click(productCard);

    const addButton = screen.getByText('Add to Cart');
    fireEvent.click(addButton);

    const cartLink = screen.getByText(/Cart \(/);
    fireEvent.click(cartLink);

    const removeButton = screen.getByText('Remove');
    fireEvent.click(removeButton);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
  });

  test('empty cart shows friendly message', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const cartLink = screen.getByText(/Cart \(/);
    fireEvent.click(cartLink);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.getByText('Continue Shopping')).toBeInTheDocument();
  });
});

describe('ShopSphere - Product Detail', () => {
  test('invalid product ID shows error message', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    window.history.pushState({}, 'Product Detail', '/product/999');
    
    const { rerender } = render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    expect(screen.getByText('Product Not Found')).toBeInTheDocument();
  });
});

describe('ShopSphere - Edge Cases', () => {
  test('quantity cannot go below 1', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const productCard = screen.getByText('Wireless Headphones').closest('a');
    fireEvent.click(productCard);

    const quantityInput = screen.getByDisplayValue('1');
    fireEvent.change(quantityInput, { target: { value: '0' } });

    expect(quantityInput.value).toBe('1');
  });

  test('checkout disabled when cart is empty', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    const cartLink = screen.getByText(/Cart \(/);
    fireEvent.click(cartLink);

    expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    expect(screen.queryByText('Proceed to Checkout')).not.toBeInTheDocument();
  });
});

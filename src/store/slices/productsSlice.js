import { createSlice } from '@reduxjs/toolkit';

const MOCK_PRODUCTS = [
  {
    id: 1,
    name: 'Wireless Headphones',
    price: 79.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop&q=80',
    description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
    rating: 4.5,
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop&q=80',
    description: 'Feature-rich smartwatch with fitness tracking and heart rate monitor.',
    rating: 4.3,
  },
  {
    id: 3,
    name: 'Running Shoes',
    price: 89.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop&q=80',
    description: 'Comfortable running shoes with advanced cushioning technology.',
    rating: 4.6,
  },
  {
    id: 4,
    name: 'Yoga Mat',
    price: 29.99,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=300&h=300&fit=crop&q=80',
    description: 'Non-slip yoga mat perfect for all fitness levels.',
    rating: 4.4,
  },
  {
    id: 5,
    name: 'Backpack',
    price: 49.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&h=300&fit=crop&q=80',
    description: 'Durable and spacious backpack for travel and daily use.',
    rating: 4.2,
  },
  {
    id: 6,
    name: 'Portable Speaker',
    price: 59.99,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=300&h=300&fit=crop&q=80',
    description: 'Waterproof portable speaker with 360-degree sound.',
    rating: 4.7,
  },
  {
    id: 7,
    name: 'Winter Jacket',
    price: 129.99,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop&q=80',
    description: 'Warm and stylish winter jacket with water-resistant material.',
    rating: 4.5,
  },
  {
    id: 8,
    name: 'Sunglasses',
    price: 99.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&h=300&fit=crop&q=80',
    description: 'UV-protective sunglasses with premium lens quality.',
    rating: 4.3,
  },
];

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: MOCK_PRODUCTS,
    loading: false,
    error: null,
  },
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setLoading, setError } = productsSlice.actions;
export default productsSlice.reducer;

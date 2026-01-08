# API Integration Guide

This guide explains how to integrate ShopSphere with a real backend API.

## Current State

ShopSphere currently uses mock data stored in `productsSlice.js`. This guide shows how to replace it with real API calls.

## API Endpoints

### Products Endpoint

**GET /api/products**

Response:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Wireless Headphones",
      "price": 79.99,
      "category": "Electronics",
      "image": "https://...",
      "description": "...",
      "rating": 4.5
    }
  ]
}
```

### Product Detail Endpoint

**GET /api/products/:id**

Response:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Wireless Headphones",
    "price": 79.99,
    "category": "Electronics",
    "image": "https://...",
    "description": "...",
    "rating": 4.5,
    "stock": 50
  }
}
```

### Checkout Endpoint

**POST /api/orders**

Request:
```json
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "address": "123 Main St",
  "city": "New York",
  "zipCode": "10001",
  "items": [
    {
      "id": 1,
      "quantity": 2,
      "price": 79.99
    }
  ],
  "totalPrice": 159.98
}
```

Response:
```json
{
  "success": true,
  "data": {
    "orderId": "ORD-12345",
    "status": "confirmed",
    "createdAt": "2026-01-08T10:00:00Z"
  }
}
```

## Implementation Steps

### 1. Create API Service

Create `src/services/api.js`:

```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

export const productAPI = {
  getAll: () => api.get('/products'),
  getById: (id) => api.get(`/products/${id}`),
};

export const orderAPI = {
  create: (orderData) => api.post('/orders', orderData),
};

export default api;
```

### 2. Create Async Thunks

Update `src/store/slices/productsSlice.js`:

```javascript
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productAPI } from '../../services/api';

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await productAPI.getAll();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch products');
    }
  }
);

export const fetchProductById = createAsyncThunk(
  'products/fetchProductById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productAPI.getById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch product');
    }
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default productsSlice.reducer;
```

### 3. Update Components

Update `src/pages/ProductList.js`:

```javascript
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../store/slices/productsSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const { items: products, loading, error } = useSelector(state => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Rest of component...
};
```

### 4. Environment Variables

Create `.env`:

```
REACT_APP_API_URL=http://localhost:3001/api
```

For production:

```
REACT_APP_API_URL=https://api.shopsphere.com
```

### 5. Error Handling

Add error handling in components:

```javascript
const handleCheckout = async (formData) => {
  try {
    const response = await orderAPI.create({
      ...formData,
      items: cart.items,
      totalPrice: cart.totalPrice,
    });
    
    if (response.data.success) {
      dispatch(clearCart());
      navigate('/');
    }
  } catch (error) {
    setError(error.response?.data?.message || 'Checkout failed');
  }
};
```

## Testing with Mock API

Use `msw` (Mock Service Worker) for testing:

```bash
npm install --save-dev msw
```

Create `src/mocks/handlers.js`:

```javascript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/products', () => {
    return HttpResponse.json({
      success: true,
      data: MOCK_PRODUCTS,
    });
  }),
];
```

## Deployment Considerations

### CORS
Configure CORS on backend:

```javascript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true,
}));
```

### Rate Limiting
Implement rate limiting:

```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use('/api/', limiter);
```

### Authentication
Add JWT authentication:

```javascript
const token = localStorage.getItem('token');

api.interceptors.request.use((config) => {
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

## Performance Optimization

### Caching
Implement request caching:

```javascript
const cache = new Map();

export const getCachedProducts = async () => {
  if (cache.has('products')) {
    return cache.get('products');
  }
  
  const data = await productAPI.getAll();
  cache.set('products', data);
  return data;
};
```

### Pagination
Implement pagination:

```javascript
export const getProducts = (page = 1, limit = 20) => 
  api.get(`/products?page=${page}&limit=${limit}`);
```

### Lazy Loading
Load images lazily:

```javascript
<img 
  src={product.image} 
  loading="lazy" 
  alt={product.name}
/>
```

## Monitoring

### Error Tracking
Use Sentry:

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});
```

### Analytics
Track API calls:

```javascript
api.interceptors.response.use(
  (response) => {
    analytics.track('API_SUCCESS', {
      endpoint: response.config.url,
      status: response.status,
    });
    return response;
  },
  (error) => {
    analytics.track('API_ERROR', {
      endpoint: error.config?.url,
      status: error.response?.status,
    });
    return Promise.reject(error);
  }
);
```

## Troubleshooting

### CORS Errors
- Check backend CORS configuration
- Verify API URL in environment variables
- Check browser console for details

### Timeout Errors
- Increase timeout in axios config
- Check network connectivity
- Verify API server is running

### Authentication Errors
- Verify token is valid
- Check token expiration
- Refresh token if needed

## Resources

- [Axios Documentation](https://axios-http.com)
- [Redux Async Thunks](https://redux.js.org/usage/writing-logic-thunks)
- [MSW Documentation](https://mswjs.io)
- [CORS Guide](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

## Next Steps

1. Set up backend API
2. Configure environment variables
3. Implement API service
4. Update Redux slices
5. Test with real API
6. Deploy to production

# ShopSphere - Quick Start Guide

## Getting Started in 3 Steps

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm start
```
The app will open at `http://localhost:3000`

### 3. Explore the App
- Browse products on the home page
- Use filters to narrow down products
- Click on a product to see details
- Add items to your cart
- Proceed to checkout

## Available Scripts

### Development
```bash
npm start
```
Runs the app in development mode with hot reload.

### Production Build
```bash
npm run build
```
Creates an optimized production build in the `build/` folder.

### Testing
```bash
npm test -- --run
```
Runs the test suite once.

```bash
npm test
```
Runs tests in watch mode.

## Key Features to Try

### 1. Filtering
- Select a category from the dropdown
- Adjust the price range slider
- Click "Reset Filters" to clear all filters

### 2. Sorting
- Choose "Low to High" or "High to Low" from the sort dropdown
- Products will reorder instantly

### 3. Shopping Cart
- Click on any product to view details
- Adjust quantity and click "Add to Cart"
- View cart by clicking the cart icon in the header
- Adjust quantities or remove items
- Click "Proceed to Checkout"

### 4. Checkout
- Fill in your shipping address
- Review your order summary
- Click "Place Order" to complete

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components (List, Detail, Cart, Checkout)
├── store/              # Redux store and slices
├── App.js              # Main app with routing
├── App.css             # Global styles
└── index.js            # Entry point
```

## Redux State Shape

```javascript
{
  products: {
    items: [],           // Array of product objects
    loading: false,
    error: null
  },
  filters: {
    category: 'all',     // Current category filter
    priceRange: [0, 300], // Min and max price
    sort: 'asc'          // Sort order
  },
  cart: {
    items: [],           // Cart items with quantity
    totalPrice: 0        // Total cart value
  }
}
```

## Mock Data

The app includes 8 mock products:
- Wireless Headphones ($79.99)
- Smart Watch ($199.99)
- Running Shoes ($89.99)
- Yoga Mat ($29.99)
- Backpack ($49.99)
- Portable Speaker ($59.99)
- Winter Jacket ($129.99)
- Sunglasses ($99.99)

## Troubleshooting

### Port 3000 already in use
```bash
# On Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux
lsof -i :3000
kill -9 <PID>
```

### Dependencies not installing
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
npm run build -- --verbose
```

## Browser DevTools

### Redux DevTools
Install the Redux DevTools browser extension to inspect state changes in real-time.

### React DevTools
Install the React DevTools browser extension to inspect component hierarchy.

## Performance Tips

- The app uses React hooks and Redux for optimal performance
- Memoization prevents unnecessary re-renders
- CSS is minified in production builds
- Images use placeholder URLs (can be replaced with real CDN URLs)

## Next Steps

1. Try adding more products to the mock data
2. Implement real API integration
3. Add user authentication
4. Integrate a payment gateway
5. Add product search functionality
6. Implement wishlist feature

## Support

For issues or questions, refer to the main README.md file.

# ShopSphere - Ecommerce Product Viewer

A production-quality React Single Page Application (SPA) demonstrating a complete ecommerce experience with product browsing, filtering, cart management, and checkout functionality.

## Features

- **Product List**: Browse products in a responsive grid with filtering and sorting
- **Product Detail**: View detailed product information with quantity selection
- **Filters & Sorting**: Filter by category and price range, sort by price (ascending/descending)
- **Shopping Cart**: Add/remove items, adjust quantities, view totals
- **Checkout**: Mock checkout with form validation and order summary
- **Responsive Design**: Mobile-friendly UI that works on all screen sizes
- **State Management**: Redux Toolkit for global state management
- **Client-side Routing**: React Router for seamless navigation

## Tech Stack

- **React** (v18+) - UI library with functional components
- **React Router DOM** - Client-side routing
- **Redux Toolkit** - Global state management
- **JavaScript (ES6+)** - Modern JavaScript
- **CSS** - Clean, minimal styling
- **Jest + React Testing Library** - Unit and integration tests

## Project Structure

```
src/
├── components/
│   ├── Header.js          # Navigation header with cart counter
│   ├── ProductCard.js     # Product card component
│   └── FilterBar.js       # Filter and sort controls
├── pages/
│   ├── ProductList.js     # Product list page with filters
│   ├── ProductDetail.js   # Product detail page
│   ├── Cart.js            # Shopping cart page
│   └── Checkout.js        # Checkout page with form
├── store/
│   ├── store.js           # Redux store configuration
│   └── slices/
│       ├── productsSlice.js   # Products state
│       ├── filtersSlice.js    # Filters state
│       └── cartSlice.js       # Cart state
├── App.js                 # Main app with routing
├── App.css                # Global styles
└── index.js               # React entry point
```

## Setup Instructions

### Prerequisites
- Node.js (v14+)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd shopsphere
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at `http://localhost:3000`

## Running Tests

Execute the test suite:
```bash
npm test -- --run
```

Run tests in watch mode:
```bash
npm test
```

## Routes

- `/` - Product List (home page)
- `/product/:id` - Product Detail page
- `/cart` - Shopping Cart
- `/checkout` - Checkout page

## State Management

### Redux Slices

**productsSlice**
- Manages product data
- Contains 8 mock products with images, prices, categories, and ratings

**filtersSlice**
- Manages filter state: category, price range, sort order
- Supports reset functionality

**cartSlice**
- Manages cart items and total price
- Handles add, remove, update quantity, and clear operations

## Features in Detail

### Product List
- Grid layout with responsive columns
- Filter by category (All, Electronics, Footwear, Sports, Accessories, Clothing)
- Price range slider (0-300)
- Sort by price (ascending/descending)
- Reset filters button
- "No products found" message when filters return no results

### Product Detail
- Full product information display
- Quantity selector (minimum 1)
- Add to cart button with success feedback
- Back to products navigation
- Error handling for invalid product IDs

### Shopping Cart
- Display all cart items with images and prices
- Adjust item quantities
- Remove items from cart
- Order summary with subtotal and total
- Empty cart message with continue shopping link
- Proceed to checkout button

### Checkout
- Address form with fields: First Name, Last Name, Email, Address, City, Zip Code
- Form validation with error messages
- Order summary showing items and total
- Order success confirmation
- Auto-redirect to home after successful order

## Testing

The application includes 8+ comprehensive tests covering:

1. **Product List Rendering** - Verifies products display correctly
2. **Category Filtering** - Tests filtering reduces product count
3. **Price Sorting** - Tests ascending and descending sort
4. **Add to Cart** - Tests adding items to cart
5. **Cart Total Updates** - Tests total price calculation
6. **Remove from Cart** - Tests item removal
7. **Empty Cart** - Tests empty state UI
8. **Invalid Product** - Tests error handling for invalid IDs
9. **Quantity Validation** - Tests minimum quantity enforcement
10. **Checkout Disabled** - Tests checkout button state

## Code Quality

- Clean, readable code with proper component separation
- Redux used correctly with slices and actions
- Proper error handling and validation
- Responsive design with mobile-first approach
- Accessibility considerations (semantic HTML, labels, ARIA)
- No external API calls (uses mock data)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance

- Optimized re-renders with React hooks
- Memoized selectors for Redux
- Lazy loading ready (can be added)
- Minimal bundle size

## Future Enhancements

- Real API integration
- User authentication
- Wishlist functionality
- Product reviews and ratings
- Payment gateway integration
- Order history
- Search functionality
- Advanced filtering options

## License

MIT

## Author

Built as a production-quality ecommerce SPA demonstration.

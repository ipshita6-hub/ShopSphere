import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import Header from './components/Header';
import NotificationCenter from './components/NotificationCenter';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Wishlist from './pages/Wishlist';
import ComparisonPage from './pages/ComparisonPage';
import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="App">
          <NotificationCenter />
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/comparison" element={<ComparisonPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;

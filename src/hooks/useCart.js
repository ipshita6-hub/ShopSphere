import { useDispatch, useSelector } from 'react-redux';
import { addToCart, removeFromCart, updateQuantity, clearCart } from '../store/slices/cartSlice';

/**
 * Custom hook for cart operations
 * Provides convenient methods for managing cart state
 */
export const useCart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const handleAddToCart = (product, quantity = 1) => {
    dispatch(addToCart({ product, quantity }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleUpdateQuantity = (productId, quantity) => {
    dispatch(updateQuantity({ id: productId, quantity }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const getCartItemCount = () => {
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  };

  const getCartTotal = () => {
    return cart.totalPrice;
  };

  const isItemInCart = (productId) => {
    return cart.items.some((item) => item.id === productId);
  };

  const getCartItem = (productId) => {
    return cart.items.find((item) => item.id === productId);
  };

  return {
    cart,
    addToCart: handleAddToCart,
    removeFromCart: handleRemoveFromCart,
    updateQuantity: handleUpdateQuantity,
    clearCart: handleClearCart,
    getCartItemCount,
    getCartTotal,
    isItemInCart,
    getCartItem,
  };
};

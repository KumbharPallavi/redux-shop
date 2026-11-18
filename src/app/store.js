import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";
import wishlistReducer from "../features/wishlist/wishlistSlice";

const STORAGE_KEY = "redux-shop-state";

// Load cart + wishlist from localStorage so they survive a page refresh
function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
}

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
  },
  preloadedState: loadState(),
});

// Save cart + wishlist whenever the store changes
store.subscribe(() => {
  try {
    const { cart, wishlist } = store.getState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ cart, wishlist }));
  } catch {
    // storage not available - ignore
  }
});

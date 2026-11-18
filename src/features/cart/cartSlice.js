import { createSlice, createSelector } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existing = state.items.find((item) => item.id === product.id);
      if (existing) {
        // Redux Toolkit uses Immer, so we can "mutate" state safely
        if (existing.qty < product.stock) existing.qty += 1;
      } else {
        state.items.push({ ...product, qty: 1 });
      }
    },
    increaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.qty < item.stock) item.qty += 1;
    },
    decreaseQty: (state, action) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (!item) return;
      if (item.qty > 1) item.qty -= 1;
      else state.items = state.items.filter((i) => i.id !== action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addToCart, increaseQty, decreaseQty, removeFromCart, clearCart } = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;

export const selectCartCount = createSelector([selectCartItems], (items) =>
  items.reduce((sum, i) => sum + i.qty, 0)
);

export const selectCartTotals = createSelector([selectCartItems], (items) => {
  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const shipping = subtotal === 0 || subtotal >= 999 ? 0 : 49; // free shipping above ₹999
  const tax = Math.round(subtotal * 0.18); // 18% GST
  return { subtotal, shipping, tax, total: subtotal + shipping + tax };
});

export default cartSlice.reducer;

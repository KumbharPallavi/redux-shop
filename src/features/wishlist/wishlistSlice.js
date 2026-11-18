import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: { items: [] },
  reducers: {
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const exists = state.items.some((i) => i.id === product.id);
      state.items = exists
        ? state.items.filter((i) => i.id !== product.id)
        : [...state.items, product];
    },
  },
});

export const { toggleWishlist } = wishlistSlice.actions;
export const selectWishlist = (state) => state.wishlist.items;
export const selectIsWishlisted = (state, id) => state.wishlist.items.some((i) => i.id === id);

export default wishlistSlice.reducer;

import { createAsyncThunk, createSlice, createSelector } from "@reduxjs/toolkit";

// Async thunk: loads products from public/products.json.
// Swap the URL for a real API (e.g. https://fakestoreapi.com/products) later.
export const fetchProducts = createAsyncThunk("products/fetchProducts", async () => {
  const response = await fetch(`${import.meta.env.BASE_URL}products.json`);
  if (!response.ok) throw new Error("Failed to load products");
  return response.json();
});

const initialState = {
  items: [],
  status: "idle", // idle | loading | succeeded | failed
  error: null,
  search: "",
  category: "All",
  sortBy: "default", // default | price-asc | price-desc | rating
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setSearch: (state, action) => {
      state.search = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSearch, setCategory, setSortBy } = productsSlice.actions;

// Selectors
export const selectAllProducts = (state) => state.products.items;
export const selectProductsStatus = (state) => state.products.status;
export const selectProductsError = (state) => state.products.error;
export const selectFilters = (state) => state.products;
export const selectProductById = (state, id) =>
  state.products.items.find((p) => p.id === Number(id));

export const selectCategories = createSelector([selectAllProducts], (items) => [
  "All",
  ...new Set(items.map((p) => p.category)),
]);

// Memoized selector: search + category filter + sorting
export const selectFilteredProducts = createSelector(
  [selectAllProducts, (state) => state.products.search, (state) => state.products.category, (state) => state.products.sortBy],
  (items, search, category, sortBy) => {
    const result = items.filter(
      (p) =>
        p.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All" || p.category === category)
    );
    if (sortBy === "price-asc") return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") return [...result].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") return [...result].sort((a, b) => b.rating - a.rating);
    return result;
  }
);

export default productsSlice.reducer;

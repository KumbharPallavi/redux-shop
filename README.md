# 🛒 ReduxShop – React + Redux Toolkit E-commerce App

A multi-page e-commerce web app built with **React**, **Redux Toolkit** and **React Router**.

**Live demo:** https://kumbharpallavi.github.io/redux-shop/

## Features

- Product catalogue loaded asynchronously with `createAsyncThunk` (loading and error states)
- Live search, category filters and sorting (price, rating) using memoized selectors (`createSelector`)
- Product detail page with dynamic routes (`/product/:id`)
- Shopping cart: add, remove, increase/decrease quantity with stock limits
- Order summary with subtotal, 18% GST and free shipping above ₹999
- Wishlist with add/remove toggle
- Checkout form with validation (email, 10-digit mobile, 6-digit pincode)
- Cart and wishlist saved to localStorage (survive page refresh)
- Responsive design for mobile, tablet and desktop

## Tech Stack

- React 19
- Redux Toolkit (`configureStore`, `createSlice`, `createAsyncThunk`, `createSelector`)
- React Redux (`useSelector`, `useDispatch`)
- React Router v7
- Vite
- CSS3 (Grid, Flexbox)

## Redux State Structure

```
store
├── products   { items, status, error, search, category, sortBy }
├── cart       { items: [{ ...product, qty }] }
└── wishlist   { items: [product] }
```

## Project Structure

```
src/
├── app/
│   └── store.js                 # configureStore + localStorage persistence
├── features/
│   ├── products/productsSlice.js  # async fetch, filters, sort, selectors
│   ├── cart/cartSlice.js          # cart actions + totals selector
│   └── wishlist/wishlistSlice.js  # wishlist toggle
├── components/                  # Navbar, Filters, ProductCard
├── pages/                       # Home, ProductDetail, Cart, Wishlist, Checkout, NotFound
├── utils/formatPrice.js         # ₹ formatting
├── App.jsx                      # routes
└── main.jsx                     # Provider + HashRouter
public/
└── products.json                # product data
```

## Run Locally

```bash
git clone https://github.com/KumbharPallavi/redux-shop.git
cd redux-shop
npm install
npm run dev
```

Open http://localhost:5173/redux-shop/

## Deploy

```bash
npm run deploy
```

## Author

**Pallavi Kumbhar** – [GitHub](https://github.com/KumbharPallavi) · [LinkedIn](https://linkedin.com/in/pallavi-kumbhar-56abb5330/)

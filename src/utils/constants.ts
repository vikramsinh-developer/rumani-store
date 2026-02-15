// ============================================================
// CONSTANTS & UTILITIES - src/utils/constants.ts
// ============================================================

export const PRODUCT_CATEGORIES = [
  { id: 1, name: 'Necklaces', icon: 'necklace' },
  { id: 2, name: 'Rings', icon: 'ring' },
  { id: 3, name: 'Earrings', icon: 'earrings' },
  { id: 4, name: 'Bracelets', icon: 'bracelet' },
  { id: 5, name: 'Brooches', icon: 'brooch' },
];

export const PRICE_RANGES = [
  { label: '₹0 - ₹25,000', min: 0, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
  { label: '₹100,000+', min: 100000, max: Infinity },
];

export const MATERIALS = ['Gold', 'Silver', 'Platinum', 'Diamond', 'Pearl', 'Gemstone'];

export const SORT_OPTIONS = [
  { label: 'Newest', value: 'newest' },
  { label: 'Price: Low to High', value: 'priceLow' },
  { label: 'Price: High to Low', value: 'priceHigh' },
  { label: 'Most Popular', value: 'popular' },
  { label: 'Top Rated', value: 'rating' },
];

export const API_ENDPOINTS = {
  PRODUCTS: '/api/products',
  PRODUCT: (id: string) => `/api/products/${id}`,
  CATEGORIES: '/api/categories',
  SEARCH: '/api/search',
  AUTH_LOGIN: '/api/auth/login',
  AUTH_SIGNUP: '/api/auth/signup',
  CART: '/api/cart',
  ORDERS: '/api/orders',
  WISHLIST: '/api/wishlist',
  USER: '/api/user',
};
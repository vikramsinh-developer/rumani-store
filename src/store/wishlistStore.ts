// ============================================================
// ZUSTAND STORE - src/store/wishlistStore.ts
// ============================================================

import { Product } from '../types';
import { create } from 'zustand';


interface WishlistState {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistItems: () => Product[];
}

export const useWishlistStore = create<WishlistState>((set, get) => ({
  items: [],

  addToWishlist: (product: Product) =>
    set((state) => {
      const exists = state.items.some((item) => item.id === product.id);
      if (exists) return state;
      return { items: [...state.items, product] };
    }),

  removeFromWishlist: (productId: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  isInWishlist: (productId: string) => {
    const state = get();
    return state.items.some((item) => item.id === productId);
  },

  clearWishlist: () => set(() => ({ items: [] })),

  getWishlistItems: () => {
    const state = get();
    return state.items;
  },
}));
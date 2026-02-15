// ============================================================
// ZUSTAND STORE - src/store/cartStore.ts
// ============================================================

import { create } from 'zustand';
import { CartItem, Product } from '../types';

interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],

  addToCart: (product: Product, quantity: number) =>
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, cartQuantity: item.cartQuantity + quantity }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, cartQuantity: quantity }],
      };
    }),

  removeFromCart: (productId: string) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== productId),
    })),

  updateQuantity: (productId: string, quantity: number) =>
    set((state) => ({
      items: state.items
        .map((item) =>
          item.id === productId ? { ...item, cartQuantity: quantity } : item
        )
        .filter((item) => item.cartQuantity > 0),
    })),

  clearCart: () => set(() => ({ items: [] })),

  getTotalPrice: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.price * item.cartQuantity, 0);
  },

  getTotalItems: () => {
    const state = get();
    return state.items.reduce((total, item) => total + item.cartQuantity, 0);
  },
}));
// ============================================================
// CUSTOM HOOK - src/hooks/useCart.ts
// ============================================================

import { useCartStore } from '../store/cartStore';

export const useCart = () => {
  const {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems,
  } = useCartStore();

  return {
    items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    total: getTotalPrice(),
    itemsCount: getTotalItems(),
  };
};
// ============================================================
// CUSTOM HOOK - src/hooks/useWishlist.ts
// ============================================================

import { useWishlistStore } from '../store/wishlistStore';

export const useWishlist = () => {
  const {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistItems,
  } = useWishlistStore();

  return {
    items,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    clearWishlist,
    getWishlistItems,
    count: items.length,
  };
};

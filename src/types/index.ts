// ============================================================
// TYPES & INTERFACES - src/types/index.ts
// ============================================================

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  material: string;
  images: string[];
  thumbnailImage: string;
  rating: number;
  reviewsCount: number;
  inStock: boolean;
  quantity?: number;
  createdAt: string;
  specifications: {
    weight?: string;
    dimensions?: string;
    purity?: string;
    stoneType?: string;
  };
  reviews: Review[];
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
  images?: string[];
}

export interface CartItem extends Product {
  cartQuantity: number;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  avatar?: string;
  createdAt: string;
  addresses: Address[];
  preferences: UserPreferences;
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault: boolean;
}

export interface UserPreferences {
  newsletter: boolean;
  notifications: boolean;
  theme: 'light' | 'dark';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  totalAmount: number;
  taxAmount: number;
  shippingAmount: number;
  discountAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
  estimatedDelivery?: string;
}

export interface FilterOptions {
  categories: string[];
  priceRange: [number, number];
  materials: string[];
  inStockOnly: boolean;
  sortBy: 'newest' | 'priceLow' | 'priceHigh' | 'popular' | 'rating';
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
  statusCode: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData extends AuthCredentials {
  firstName: string;
  lastName: string;
  phone: string;
  agreeToTerms: boolean;
}

export interface AuthResponse {
  token: string;
  refreshToken: string;
  user: User;
}

// ============================================================
// STORE - src/store/cartStore.ts
// ============================================================

export interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  getTotalItems: () => number;
}

// ============================================================
// STORE - src/store/authStore.ts
// ============================================================

export interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (data: SignupData) => Promise<void>;
  logout: () => void;
  setUser: (user: User) => void;
}

// ============================================================
// STORE - src/store/wishlistStore.ts
// ============================================================

export interface WishlistStore {
  items: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  clearWishlist: () => void;
  getWishlistItems: () => Product[];
}

// ============================================================
// NOTIFICATION CONTEXT - src/context/NotificationContext.tsx
// ============================================================

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
}

export interface NotificationContextType {
  notifications: Notification[];
  addNotification: (message: string, type: Notification['type']) => void;
  removeNotification: (id: string) => void;
  clearNotifications: () => void;
}
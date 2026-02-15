import { create } from 'zustand';

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isLoading: boolean;

  // OTP demo flow
  pendingPhone: string | null;
  otpRequestedAt: number | null;

  hydrate: () => void;
  requestOtp: (phone: string) => Promise<void>;
  verifyOtp: (otp: string) => Promise<void>;

  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (patch: Partial<AuthUser>) => void;
}

const LS_TOKEN = 'aj_token';
const LS_USER = 'aj_user';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  pendingPhone: null,
  otpRequestedAt: null,

  hydrate: () => {
    const token = localStorage.getItem(LS_TOKEN);
    const userRaw = localStorage.getItem(LS_USER);
    const user = userRaw ? (JSON.parse(userRaw) as AuthUser) : null;
    set({ token, user });
  },

  requestOtp: async (phone) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));
    set({ isLoading: false, pendingPhone: phone, otpRequestedAt: Date.now() });
    // In real app: call backend to send OTP
  },

  verifyOtp: async (otp) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 700));

    // Demo rule: accept 123456 only
    if (otp !== '123456') {
      set({ isLoading: false });
      throw new Error('Invalid OTP (use 123456 for demo).');
    }

    const phone = get().pendingPhone ?? '';
    const demoUser: AuthUser = {
      id: 'u_1',
      firstName: 'Guest',
      lastName: 'User',
      email: `guest.${phone.slice(-4)}@example.com`,
      phone,
    };

    localStorage.setItem(LS_TOKEN, 'demo-token');
    localStorage.setItem(LS_USER, JSON.stringify(demoUser));

    set({
      isLoading: false,
      token: 'demo-token',
      user: demoUser,
      pendingPhone: null,
      otpRequestedAt: null,
    });
  },

  login: async (email, password) => {
    set({ isLoading: true });
    await new Promise((r) => setTimeout(r, 600));

    if (!email || !password) {
      set({ isLoading: false });
      throw new Error('Email and password are required.');
    }

    const demoUser: AuthUser = {
      id: 'u_1',
      firstName: 'Antique',
      lastName: 'Customer',
      email,
      phone: '9999999999',
    };

    localStorage.setItem(LS_TOKEN, 'demo-token');
    localStorage.setItem(LS_USER, JSON.stringify(demoUser));

    set({ isLoading: false, token: 'demo-token', user: demoUser });
  },

  logout: () => {
    localStorage.removeItem(LS_TOKEN);
    localStorage.removeItem(LS_USER);
    set({ token: null, user: null });
  },

  updateProfile: (patch) => {
    const user = get().user;
    if (!user) return;
    const next = { ...user, ...patch };
    localStorage.setItem(LS_USER, JSON.stringify(next));
    set({ user: next });
  },
}));

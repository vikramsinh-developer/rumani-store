import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const s = useAuthStore();
  return {
    user: s.user,
    token: s.token,
    isLoading: s.isLoading,
    requestOtp: s.requestOtp,
    verifyOtp: s.verifyOtp,
    login: s.login,
    logout: s.logout,
    updateProfile: s.updateProfile,
    hydrate: s.hydrate,
  };
};

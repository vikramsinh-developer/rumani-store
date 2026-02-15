// ============================================================
// VALIDATOR UTILITIES - src/utils/validators.ts
// ============================================================

export const validateEmail = (email: string): boolean => {
  const re = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 8;
};

export const validatePhone = (phone: string): boolean => {
  const re = /^[0-9]{10}$/;
  return re.test(phone.replace(/\\D/g, ''));
};

export const validatePincode = (pincode: string): boolean => {
  return /^[0-9]{6}$/.test(pincode);
};
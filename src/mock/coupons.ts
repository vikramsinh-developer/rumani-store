export type Coupon = {
  code: string;
  description: string;
};

export const MOCK_COUPONS: Coupon[] = [
  {
    code: 'WELCOME1',
    description: 'Welcome offer for first-time customers (demo).',
  },
  {
    code: 'GOLDLOVE',
    description: 'A little extra love on gold jewelry (demo).',
  },
  {
    code: 'FREESHIP',
    description: 'Free shipping on eligible orders (demo).',
  },
];

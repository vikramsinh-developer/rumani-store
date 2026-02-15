import { type Address, type CartItem, type Order } from '../types';
import { MOCK_PRODUCTS } from './products';

const demoAddress: Address = {
  id: 'addr_1',
  type: 'home',
  street: '221B Baker Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  postalCode: '400001',
  country: 'India',
  isDefault: true,
};

const item = (productId: string, cartQuantity: number): CartItem => {
  const p = MOCK_PRODUCTS.find((x) => x.id === productId) ?? MOCK_PRODUCTS[0];
  return { ...p, cartQuantity };
};

export const MOCK_ORDERS: Order[] = [
  {
    id: 'ORD-10241',
    userId: 'u_1',
    items: [item('2', 1), item('3', 1)],
    totalAmount: 110000,
    taxAmount: 0,
    shippingAmount: 0,
    discountAmount: 0,
    status: 'delivered',
    shippingAddress: demoAddress,
    billingAddress: demoAddress,
    paymentMethod: 'COD (demo)',
    createdAt: '2026-02-01T10:10:00.000Z',
    updatedAt: '2026-02-05T09:00:00.000Z',
    estimatedDelivery: '2026-02-05T09:00:00.000Z',
  },
  {
    id: 'ORD-10288',
    userId: 'u_1',
    items: [item('1', 1)],
    totalAmount: 45000,
    taxAmount: 0,
    shippingAmount: 0,
    discountAmount: 0,
    status: 'processing',
    shippingAddress: demoAddress,
    billingAddress: demoAddress,
    paymentMethod: 'Card (demo)',
    createdAt: '2026-02-12T16:35:00.000Z',
    updatedAt: '2026-02-12T16:50:00.000Z',
    estimatedDelivery: '2026-02-18T09:00:00.000Z',
  },
];

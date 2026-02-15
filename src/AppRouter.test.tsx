import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock(
  'react-router-dom',
  () => ({
    BrowserRouter: ({
      basename,
      children,
    }: {
      basename?: string;
      children: React.ReactNode;
    }) => (
      <div data-testid="router" data-basename={basename}>
        {children}
      </div>
    ),
    Routes: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="routes">{children}</div>
    ),
    Route: () => null,
  }),
  { virtual: true }
);

jest.mock('./components/layout/MainLayout', () => ({
  __esModule: true,
  default: ({ children }: { children?: React.ReactNode }) => (
    <div data-testid="layout">{children}</div>
  ),
}));

jest.mock('./components/common/NotificationCenter', () => ({
  __esModule: true,
  default: () => <div data-testid="notifications" />,
}));

jest.mock('./pages/HomePage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/ProductListPage', () => ({
  __esModule: true,
  default: () => <div />,
}));
jest.mock('./pages/CartPage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/CheckoutPage', () => ({
  __esModule: true,
  default: () => <div />,
}));
jest.mock('./pages/SignupPage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/ProfilePage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/ThankYouPage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/NotFoundPage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/LoginPage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/OrderHistoryPage', () => ({
  __esModule: true,
  default: () => <div />,
}));
jest.mock('./pages/OrderDetailPage', () => ({
  __esModule: true,
  default: () => <div />,
}));
jest.mock('./pages/WishlistPage', () => ({ __esModule: true, default: () => <div /> }));
jest.mock('./pages/ProductDetailPage', () => ({
  __esModule: true,
  default: () => <div />,
}));

describe('App router configuration', () => {
  const originalPublicUrl = process.env.PUBLIC_URL;
  const originalNodeEnv = process.env.NODE_ENV;

  afterEach(() => {
    process.env.PUBLIC_URL = originalPublicUrl;
    process.env.NODE_ENV = originalNodeEnv;
  });

  it('uses PUBLIC_URL as the router basename', () => {
    process.env.PUBLIC_URL = '/rumani-store';
    process.env.NODE_ENV = 'production';
    render(<App />);

    expect(screen.getByTestId('router')).toHaveAttribute(
      'data-basename',
      '/rumani-store'
    );
  });
});

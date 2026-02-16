import React from 'react';
import { render, screen } from '@testing-library/react';

jest.mock(
  'react-router-dom',
  () => ({
    useNavigate: () => () => {},
    Link: ({ to, children }: { to: string; children: React.ReactNode }) => (
      <a href={to}>{children}</a>
    ),
  }),
  { virtual: true }
);

import Header from './components/common/Header';

test('renders site header', () => {
  render(<Header />);
  expect(screen.getByText(/^✨ Rumani Store$/)).toBeInTheDocument();
});

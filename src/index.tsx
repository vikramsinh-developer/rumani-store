// ============================================================
// INDEX FILE - src/index.tsx
// ============================================================

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

// Add basename to handle GitHub Pages sub-path
const basename = process.env.NODE_ENV === 'production' 
  ? '/rumani-store' 
  : '/';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter basename={basename}>
    <App />
  </BrowserRouter>
);
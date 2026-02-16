// ============================================================
// PRODUCT GRID COMPONENT - src/components/product/ProductGrid.tsx
// ============================================================

import React from 'react';
import { Grid, Box, CircularProgress, Typography } from '@mui/material';
import ProductCard from './ProductCard';
import { Product } from '../../types';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  onProductClick?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  columns?: {
    xs: number;
    sm: number;
    md: number;
    lg: number;
  };
}

const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  loading = false,
  onProductClick,
  onQuickView,
  columns = {
    xs: 6,
    sm: 6,
    md: 4,
    lg: 3,
  },
}) => {
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress sx={{ color: '#B8860B' }} />
      </Box>
    );
  }

  if (products.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" sx={{ color: '#999999', mb: 2 }}>
          No products found
        </Typography>
        <Typography variant="body2" sx={{ color: '#B8860B' }}>
          Try adjusting your filters or search criteria
        </Typography>
      </Box>
    );
  }

  return (
    <Grid container spacing={3}>
      {products.map((product) => (
        <Grid size={{xs:columns.xs, sm:columns.sm, md:columns.md, lg:columns.lg}} key={product.id}>
          <ProductCard
            product={product}
            onProductClick={onProductClick}
            onQuickView={onQuickView}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProductGrid;
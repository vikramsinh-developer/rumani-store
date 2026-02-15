import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductGrid from '../product/ProductGrid';
import { Product } from '../../types';

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ products }) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 6 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          mb: 3,
          gap: 2,
          flexWrap: 'wrap',
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 800 }}>
          Featured treasures
        </Typography>
        <Button variant="text" onClick={() => navigate('/products')}>
          View all
        </Button>
      </Box>

      <ProductGrid
        products={products}
        columns={{ xs: 12, sm: 6, md: 4, lg: 3 }}
        onProductClick={(p) => navigate(`/products/${p.id}`)}
      />
    </Box>
  );
};

export default FeaturedProducts;

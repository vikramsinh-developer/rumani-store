import * as React from 'react';
import { Box, Button, Container, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import ProductCard from '../components/product/ProductCard';
import { useWishlist } from '../hooks/useWishlist';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';

const WishlistPage: React.FC = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const moveToCart = (product: Product) => {
    addToCart(product, 1);
    removeFromWishlist(product.id);
  };

  if (items.length === 0) {
    return (
      <Container maxWidth="lg">
        <PageHeader title="Wishlist" subtitle="Save pieces you love and buy later." />
        <EmptyState
          title="Your wishlist is empty"
          description="Browse the collection and tap the heart icon to add items here."
        />
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button variant="contained" onClick={() => navigate('/products')}>
            Start shopping
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      <PageHeader title="Wishlist" subtitle={`You have ${items.length} saved items.`} />
      <Grid container spacing={3}>
        {items.map((product: Product) => (
          <Grid size={{xs:12, sm:6, md:4, lg:3}} key={product.id}>
            <ProductCard
              product={product}
              onQuickView={() => {}}
              onProductClick={() => navigate(`/products/${product.id}`)}
            />
            <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
              <Button
                fullWidth
                size="small"
                variant="contained"
                onClick={() => moveToCart(product)}
              >
                Move to cart
              </Button>
              <Button
                fullWidth
                size="small"
                variant="text"
                color="error"
                onClick={() => removeFromWishlist(product.id)}
              >
                Remove
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default WishlistPage;

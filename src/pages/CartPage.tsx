import * as React from 'react';
import { Container, Grid, Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../hooks/useCart';
import CartItem from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import EmptyState from '../components/common/EmptyState';

const CartPage: React.FC = () => {
  const { items } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <Container maxWidth="lg">
        <EmptyState
          title="Your cart is empty"
          description="Add some antique pieces to your cart to see them here."
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
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Shopping cart
      </Typography>
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Box sx={{ borderRadius: 2, border: '1px solid', borderColor: 'divider', p: 2 }}>
            {items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <CartSummary />
        </Grid>
      </Grid>
    </Container>
  );
};

export default CartPage;

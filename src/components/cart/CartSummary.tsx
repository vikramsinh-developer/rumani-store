import * as React from 'react';
import { Box, Button, Divider, Typography } from '@mui/material';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface CartSummaryProps {
  hideCheckoutButton?: boolean;
}

const CartSummary: React.FC<CartSummaryProps> = ({ hideCheckoutButton }) => {
  const { total, itemsCount } = useCart();
  const navigate = useNavigate();

  const shipping = total > 0 ? 0 : 0;
  const grandTotal = total + shipping;

  return (
    <Box
      sx={{
        borderRadius: 2,
        bgcolor: 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
        p: 3,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
        Order summary
      </Typography>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Items ({itemsCount})</Typography>
        <Typography variant="body2">₹{total.toLocaleString()}</Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
        <Typography variant="body2">Shipping</Typography>
        <Typography variant="body2">₹{shipping.toLocaleString()}</Typography>
      </Box>

      <Divider sx={{ my: 1.5 }} />

      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Typography sx={{ fontWeight: 800 }}>Total</Typography>
        <Typography sx={{ fontWeight: 800, color: 'primary.main' }}>
          ₹{grandTotal.toLocaleString()}
        </Typography>
      </Box>

      {!hideCheckoutButton && (
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 1 }}
          onClick={() => navigate('/checkout')}
          disabled={total === 0}
        >
          Proceed to checkout
        </Button>
      )}
    </Box>
  );
};

export default CartSummary;

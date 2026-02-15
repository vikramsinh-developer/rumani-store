import * as React from 'react';
import {
  Box,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { CartItem as CartItemType } from '../../types';
import QuantitySelector from '../common/QuantitySelector';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const lineTotal = item.price * item.cartQuantity;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          py: 2,
          alignItems: 'flex-start',
        }}
      >
        <Box
          component="img"
          src={item.thumbnailImage}
          alt={item.name}
          sx={{
            width: 96,
            height: 96,
            borderRadius: 2,
            objectFit: 'cover',
            cursor: 'pointer',
          }}
          onClick={() => navigate(`/products/${item.id}`)}
        />

        <Box sx={{ flex: 1 }}>
          <Typography
            variant="subtitle1"
            sx={{ fontWeight: 700, cursor: 'pointer' }}
            onClick={() => navigate(`/products/${item.id}`)}
          >
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {item.category} • {item.material}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', mt: 1, gap: 2 }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>
              ₹{item.price.toLocaleString()}
            </Typography>
            {item.originalPrice && (
              <Typography
                variant="body2"
                sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
              >
                ₹{item.originalPrice.toLocaleString()}
              </Typography>
            )}
          </Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              mt: 1.5,
              flexWrap: 'wrap',
            }}
          >
            <QuantitySelector
              value={item.cartQuantity}
              onChange={(qty) => updateQuantity(item.id, qty)}
              min={1}
            />
            <Typography variant="body2" sx={{ ml: 1 }}>
              Line total:{' '}
              <strong>₹{lineTotal.toLocaleString()}</strong>
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
          <IconButton
            size="small"
            color="error"
            onClick={() => removeFromCart(item.id)}
            aria-label="Remove from cart"
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default CartItem;

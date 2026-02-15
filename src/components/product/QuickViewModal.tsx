// ============================================================
// QUICK VIEW MODAL - src/components/product/QuickViewModal.tsx
// ============================================================

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Grid,
  Box,
  Typography,
  Button,
  TextField,
  Rating,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Close } from '@mui/icons-material';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

interface QuickViewModalProps {
  product: Product | null;
  open: boolean;
  onClose: () => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, open, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  if (!product) return null;

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth fullScreen={fullScreen}>
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Quick View
        <IconButton onClick={onClose} size="small" aria-label="Close quick view">
          <Close />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        <Grid container spacing={2}>
          {/* Image */}
          <Grid size={{xs:12}}>
            <Box
              component="img"
              src={product.thumbnailImage}
              alt={product.name}
              sx={{ width: '100%', borderRadius: 2, mb: 2 }}
            />
          </Grid>

          {/* Product Info */}
          <Grid size={{xs:12}}>
            <Typography variant="body2" sx={{ color: '#B8860B', mb: 1 }}>
              {product.category}
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating} readOnly size="small" />
              <Typography variant="caption">({product.reviewsCount})</Typography>
            </Box>

            {/* Price */}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 700,
                color: '#B8860B',
                mb: 2,
              }}
            >
              ₹{product.price.toLocaleString()}
            </Typography>

            {/* Description */}
            <Typography variant="body2" sx={{ mb: 3, color: '#666' }}>
              {product.description}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Specifications */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
                Specifications
              </Typography>
              {Object.entries(product.specifications).map(([key, value]) => (
                value && (
                  <Typography key={key} variant="body2" sx={{ color: '#666', mb: 0.5 }}>
                    <strong>{key}:</strong> {value}
                  </Typography>
                )
              ))}
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Quantity & Actions */}
            <Box
              sx={{
                display: 'flex',
                gap: 1.5,
                alignItems: { xs: 'stretch', sm: 'center' },
                flexDirection: { xs: 'column', sm: 'row' },
                mb: 2,
              }}
            >
              <TextField
                type="number"
                label="Qty"
                value={quantity}
                onChange={(e) => {
                  const n = Number(e.target.value);
                  setQuantity(Number.isFinite(n) ? Math.max(1, Math.floor(n)) : 1);
                }}
                inputProps={{ min: 1 }}
                size="small"
                sx={{ width: { xs: '100%', sm: 110 } }}
              />
              <Button
                variant="contained"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                sx={{
                  flex: 1,
                  bgcolor: '#B8860B',
                  '&:hover': { bgcolor: '#DAA520' },
                }}
              >
                Add to Cart
              </Button>
              <Button
                variant="outlined"
                onClick={() => {
                  if (inWishlist) {
                    removeFromWishlist(product.id);
                  } else {
                    addToWishlist(product);
                  }
                }}
                sx={{ width: { xs: '100%', sm: 'auto' } }}
              >
                {inWishlist ? '❤️' : '🤍'}
              </Button>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
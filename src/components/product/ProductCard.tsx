// ============================================================
// PRODUCT CARD COMPONENT - src/components/product/ProductCard.tsx
// ============================================================

import React, { memo } from 'react';
import { motion } from 'framer-motion';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  IconButton,
  Box,
  Rating,
  Chip,
} from '@mui/material';
import { FavoriteBorderOutlined, Favorite } from '@mui/icons-material';
import { Product } from '../../types';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

interface ProductCardProps {
  product: Product;
  onProductClick?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = memo(
  ({ product, onProductClick, onQuickView }) => {
    const { addToCart, items } = useCart();
    const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
    const inWishlist = isInWishlist(product.id);
    const inCart = items.some((it) => it.id === product.id);

    const handleAddToCart = (e: React.MouseEvent) => {
      e.stopPropagation();
      addToCart(product, 1);
    };

    const handleWishlist = (e: React.MouseEvent) => {
      e.stopPropagation();
      if (inWishlist) {
        removeFromWishlist(product.id);
      } else {
        addToWishlist(product);
      }
    };

    const handleQuickView = (e: React.MouseEvent) => {
      e.stopPropagation();
      onQuickView?.(product);
    };

    const discount = product.originalPrice
      ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
        whileHover={{ y: -8 }}
        onClick={() => onProductClick?.(product)}
      >
        <Card
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'visible',
          }}
        >
          {/* Image Section */}
          <Box sx={{ position: 'relative', overflow: 'hidden', bgcolor: '#f5f5f0' }}>
            <CardMedia
              component="img"
              image={product.thumbnailImage}
              alt={product.name}
              sx={{
                height: { xs: 180, sm: 260, md: 300 },
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.08)',
                },
              }}
            />

            {/* Discount Badge */}
            {discount > 0 && (
              <Chip
                label={`-${discount}%`}
                color="error"
                size="small"
                sx={{
                  position: 'absolute',
                  top: 12,
                  right: 12,
                  fontWeight: 'bold',
                }}
              />
            )}

            {/* Stock Badge */}
            {!product.inStock && (
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Typography variant="h6" sx={{ color: 'white' }}>
                  Out of Stock
                </Typography>
              </Box>
            )}

            {/* Wishlist Button */}
            <IconButton
              onClick={handleWishlist}
              sx={{
                position: 'absolute',
                top: 8,
                left: 8,
                bgcolor: 'white',
                '&:hover': { bgcolor: '#f5f5f0' },
              }}
              size="small"
            >
              {inWishlist ? <Favorite sx={{ color: '#B8860B' }} /> : <FavoriteBorderOutlined />}
            </IconButton>
          </Box>

          {/* Content Section */}
          <CardContent sx={{ flexGrow: 1, pb: 0 }}>
            <Typography
              gutterBottom
              variant="body2"
              sx={{
                color: '#999999',
                textTransform: 'uppercase',
                fontSize: '0.75rem',
                fontWeight: 600,
                letterSpacing: '0.1em',
              }}
            >
              {product.category}
            </Typography>

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                mb: 1,
                minHeight: '2.5rem',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.name}
            </Typography>

            {/* Rating */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating} readOnly size="small" precision={0.5} />
              <Typography variant="caption" sx={{ color: '#999999' }}>
                ({product.reviewsCount})
              </Typography>
            </Box>

            {/* Price */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: '#B8860B',
                }}
              >
                ₹{product.price.toLocaleString()}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: 'line-through',
                    color: '#999999',
                  }}
                >
                  ₹{product.originalPrice.toLocaleString()}
                </Typography>
              )}
            </Box>
          </CardContent>

          {/* Actions Section */}
          <CardActions sx={{ gap: 1, pt: 1.5, pb: 2, px: 2, flexDirection: 'column' }}>
            <Button
              variant="contained"
              onClick={handleAddToCart}
              disabled={!product.inStock || inCart}
              fullWidth
              sx={{
                bgcolor: '#B8860B',
                color: 'white',
                py: { xs: 1, sm: 1.25 },
                '&:hover': {
                  bgcolor: '#DAA520',
                },
              }}
            >
              {inCart ? 'Added to Cart' : 'Add to Cart'}
            </Button>
            <Button
              variant="outlined"
              onClick={handleQuickView}
              fullWidth
              sx={{
                borderColor: '#B8860B',
                color: '#B8860B',
                '&:hover': {
                  borderColor: '#DAA520',
                  color: '#DAA520',
                },
              }}
            >
              Quick View
            </Button>
          </CardActions>
        </Card>
      </motion.div>
    );
  }
);

ProductCard.displayName = 'ProductCard';

export default ProductCard;
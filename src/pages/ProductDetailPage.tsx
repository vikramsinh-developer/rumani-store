import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Breadcrumbs,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  IconButton,
  Rating,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PageHeader from '../components/common/PageHeader';
import QuantitySelector from '../components/common/QuantitySelector';
import { useCart } from '../hooks/useCart';
import { useWishlist } from '../hooks/useWishlist';
import { MOCK_PRODUCTS } from '../mock/products';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [qty, setQty] = React.useState(1);

  const product = React.useMemo(
    () => MOCK_PRODUCTS.find((p) => p.id === id) ?? MOCK_PRODUCTS[0],
    [id]
  );

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
    navigate('/cart');
  };

  const toggleWishlist = () => {
    if (inWishlist) removeFromWishlist(product.id);
    else addToWishlist(product);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 2 }}>
        <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />}>
          <Typography
            sx={{ cursor: 'pointer' }}
            color="text.secondary"
            onClick={() => navigate('/')}
          >
            Home
          </Typography>
          <Typography
            sx={{ cursor: 'pointer' }}
            color="text.secondary"
            onClick={() => navigate('/products')}
          >
            Jewelry
          </Typography>
          <Typography color="text.primary">{product.name}</Typography>
        </Breadcrumbs>
      </Box>

      <PageHeader title={product.name} subtitle={product.category} />

      <Grid container spacing={4}>
        {/* Image */}
        <Grid size={{xs:12, md:6}}>
          <Card sx={{ overflow: 'hidden' }}>
            <Box
              component="img"
              src={product.images[0] ?? product.thumbnailImage}
              alt={product.name}
              sx={{
                width: '100%',
                display: 'block',
                objectFit: 'cover',
              }}
            />
          </Card>
        </Grid>

        {/* Details */}
        <Grid size={{xs:12, md:6}}>
          <Card>
            <CardContent sx={{ display: 'grid', gap: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={product.rating} precision={0.5} readOnly />
                <Typography variant="body2" color="text.secondary">
                  ({product.reviewsCount} reviews)
                </Typography>
              </Box>

              <Typography variant="h4" sx={{ fontWeight: 800 }}>
                ₹{product.price.toLocaleString()}
              </Typography>
              {product.originalPrice && (
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', color: 'text.secondary' }}
                >
                  ₹{product.originalPrice.toLocaleString()}
                </Typography>
              )}

              <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                {product.description}
              </Typography>

              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                <Chip label={product.material} size="small" />
                {product.specifications.purity && (
                  <Chip label={product.specifications.purity} size="small" />
                )}
                {product.inStock ? (
                  <Chip color="success" label="In stock" size="small" />
                ) : (
                  <Chip color="error" label="Out of stock" size="small" />
                )}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2" sx={{ mb: 1 }}>
                  Specifications
                </Typography>
                {Object.entries(product.specifications).map(([key, val]) =>
                  val ? (
                    <Typography key={key} variant="body2" color="text.secondary">
                      <strong>{key}:</strong> {val}
                    </Typography>
                  ) : null
                )}
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 2 }}>
                <QuantitySelector value={qty} onChange={setQty} />
                <Button
                  variant="contained"
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                >
                  Add to cart
                </Button>
                <IconButton onClick={toggleWishlist}>
                  {inWishlist ? (
                    <FavoriteIcon sx={{ color: 'primary.main' }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductDetailPage;

import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Container, Grid, Typography, Link, TextField, Button } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: '#1A1A1A',
        color: '#f5f5f0',
        py: 6,
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} sx={{ mb: 4 }}>
          {/* About */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              About Us
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Discover timeless elegance with our curated collection of antique jewelry in Rumani Store.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link component={RouterLink} to="/products" underline="none" sx={{ color: '#DAA520' }}>
                Shop
              </Link>
              <Link component={RouterLink} to="/wishlist" underline="none" sx={{ color: '#DAA520' }}>
                Wishlist
              </Link>
              <Link component={RouterLink} to="/cart" underline="none" sx={{ color: '#DAA520' }}>
                Cart
              </Link>
            </Box>
          </Grid>

          {/* Customer Service */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Customer Service
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link href="#" underline="none" sx={{ color: '#DAA520' }}>
                Shipping Info
              </Link>
              <Link href="#" underline="none" sx={{ color: '#DAA520' }}>
                Returns
              </Link>
              <Link href="#" underline="none" sx={{ color: '#DAA520' }}>
                FAQ
              </Link>
            </Box>
          </Grid>

          {/* Newsletter */}
          <Grid size={{xs:12, sm:6, md:3}}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
              Newsletter
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexDirection: { xs: 'column', sm: 'row' } }}>
              <TextField
                type="email"
                placeholder="Enter email"
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                  },
                }}
              />
              <Button
                variant="contained"
                sx={{ backgroundColor: '#B8860B', width: { xs: '100%', sm: 'auto' } }}
              >
                Subscribe
              </Button>
            </Box>
          </Grid>
        </Grid>

        {/* Divider */}
        <Box sx={{ borderTop: '1px solid #444', pt: 3, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#999' }}>
            © 2026 Rumani Store. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;

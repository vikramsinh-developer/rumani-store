import * as React from 'react';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: 'secondary.main',
        color: 'background.default',
        py: { xs: 6, md: 10 },
        mb: 6,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Typography
                variant="overline"
                sx={{ letterSpacing: '.3em', color: 'primary.light' }}
              >
                RUMANI STORE
              </Typography>
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 800,
                  mt: 1,
                  mb: 2,
                  fontSize: { xs: '2.4rem', md: '3.2rem' },
                }}
              >
                Timeless pieces, crafted to last forever.
              </Typography>
              <Typography
                variant="body1"
                sx={{ color: 'rgba(255,255,255,0.75)', mb: 3, maxWidth: 480 }}
              >
                Discover handpicked vintage necklaces, earrings, and rings with a story in every
                detail.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                >
                  Shop collection
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{ borderColor: 'primary.light', color: 'primary.light' }}
                  onClick={() => navigate('/products?sort=rating')}
                >
                  View bestsellers
                </Button>
              </Box>
            </motion.div>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <Box
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                  boxShadow: '0 28px 60px rgba(0,0,0,0.45)',
                  bgcolor: 'secondary.light',
                  aspectRatio: { xs: '16 / 10', md: '4 / 3' },
                }}
              >
                <Box
                  component="img"
                  src="https://media.istockphoto.com/id/672123610/photo/indian-traditional-gold-necklace.jpg?s=1024x1024&w=is&k=20&c=PU4Ftk0hbfQ4RYop_KgzfBX-F71qvOq-y5XopFuytiY="
                  alt="Rumani Store hero"
                  sx={{ width: '100%', height: '100%', display: 'block', objectFit: 'cover' }}
                />
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 16,
                    left: 16,
                    bgcolor: 'rgba(0,0,0,0.55)',
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                  }}
                >
                  <Typography variant="caption" sx={{ color: '#fff' }}>
                    Curated from estates and private collections worldwide.
                  </Typography>
                </Box>
              </Box>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;

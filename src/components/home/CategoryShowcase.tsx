import * as React from 'react';
import { Box, Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PRODUCT_CATEGORIES } from '../../utils/constants';

const CategoryShowcase: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 3 }}>
        Shop by category
      </Typography>

      <Grid container spacing={3}>
        {PRODUCT_CATEGORIES.map((cat) => (
          <Grid size={{ xs: 6, sm: 4, md: 2.4 }} key={cat.id}>
            <Card elevation={0} sx={{ borderRadius: 3, overflow: 'hidden' }}>
              <CardActionArea
                onClick={() => navigate(`/products?category=${encodeURIComponent(cat.name)}`)}
              >
                <Box
                  sx={{
                    height: 140,
                    bgcolor: 'grey.100',
                    backgroundImage:
                      'linear-gradient(135deg, rgba(184,134,11,0.12), rgba(0,0,0,0.65))',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {cat.name}
                  </Typography>
                </Box>
                <CardContent sx={{ textAlign: 'center', py: 1.5 }}>
                  <Typography variant="body2" color="text.secondary">
                    Explore {cat.name.toLowerCase()}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CategoryShowcase;

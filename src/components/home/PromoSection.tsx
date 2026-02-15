import * as React from 'react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const PromoSection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        mb: 6,
        borderRadius: 3,
        overflow: 'hidden',
        bgcolor: 'background.paper',
        border: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Grid container>
        <Grid size={{ xs: 12, md: 7 }}>
          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Typography variant="overline" sx={{ letterSpacing: '.2em', color: 'primary.main' }}>
              LIMITED EDITION
            </Typography>
            <Typography variant="h4" sx={{ fontWeight: 800, mt: 1, mb: 1.5 }}>
              Wedding heirloom curation
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              A handpicked collection of vintage pieces perfect for your wedding trousseau.
              Available for a limited time only.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/products?tag=wedding')}>
              View wedding edit
            </Button>
          </Box>
        </Grid>
        <Grid
          size={{ xs: 12, md: 5 }}
          sx={{
            bgcolor: 'grey.100',
            backgroundImage: 'url(https://via.placeholder.com/600x400?text=Wedding+edit)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            minHeight: 220,
          }}
        />
      </Grid>
    </Box>
  );
};

export default PromoSection;

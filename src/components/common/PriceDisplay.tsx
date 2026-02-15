import * as React from 'react';
import { Box, Typography } from '@mui/material';

const PriceDisplay: React.FC<{ price: number; originalPrice?: number }> = ({ price, originalPrice }) => (
  <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>
      ₹{price.toLocaleString()}
    </Typography>
    {originalPrice ? (
      <Typography variant="body2" sx={{ textDecoration: 'line-through', color: 'text.secondary' }}>
        ₹{originalPrice.toLocaleString()}
      </Typography>
    ) : null}
  </Box>
);

export default PriceDisplay;

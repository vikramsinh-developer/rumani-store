import React from 'react';
import { CircularProgress, Box } from '@mui/material';

const LoadingSpinner: React.FC = () => (
  <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
    <CircularProgress sx={{ color: '#B8860B' }} />
  </Box>
);

export default LoadingSpinner;

import * as React from 'react';
import { Box, Typography } from '@mui/material';

const EmptyState: React.FC<{ title: string; description?: string }> = ({ title, description }) => (
  <Box sx={{ py: 8, textAlign: 'center' }}>
    <Typography variant="h5" sx={{ color: 'text.secondary', mb: 1 }}>
      {title}
    </Typography>
    {description ? <Typography variant="body2">{description}</Typography> : null}
  </Box>
);

export default EmptyState;

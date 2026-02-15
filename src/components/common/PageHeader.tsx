import * as React from 'react';
import { Box, Typography } from '@mui/material';

const PageHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => (
  <Box sx={{ mb: 3 }}>
    <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
      {title}
    </Typography>
    {subtitle ? (
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {subtitle}
      </Typography>
    ) : null}
  </Box>
);

export default PageHeader;

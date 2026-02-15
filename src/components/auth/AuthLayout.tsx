import * as React from 'react';
import { Box, Container, Paper, Typography } from '@mui/material';

const AuthLayout: React.FC<{ title: string; subtitle?: string; children: React.ReactNode }> = ({
  title,
  subtitle,
  children,
}) => (
  <Container maxWidth="sm" sx={{ py: 6 }}>
    <Paper sx={{ p: { xs: 3, sm: 4 } }} elevation={0}>
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
        {title}
      </Typography>
      {subtitle ? (
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
          {subtitle}
        </Typography>
      ) : (
        <Box sx={{ mb: 2 }} />
      )}
      {children}
    </Paper>
  </Container>
);

export default AuthLayout;

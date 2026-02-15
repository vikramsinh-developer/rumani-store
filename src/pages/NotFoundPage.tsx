import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', py: 10 }}>
      <Typography variant="h2" sx={{ fontWeight: 900, mb: 1 }}>
        404
      </Typography>
      <Typography variant="body1" sx={{ color: 'text.secondary', mb: 3 }}>
        The page you’re looking for doesn’t exist.
      </Typography>
      <Button variant="contained" onClick={() => navigate('/')}>
        Go home
      </Button>
    </Box>
  );
};

export default NotFoundPage;

import * as React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Box, Link, Typography } from '@mui/material';
import AuthLayout from '../components/auth/AuthLayout';
import LoginForm from '../components/auth/LoginForm';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout title="Welcome back" subtitle="Sign in to access your wishlist and orders.">
      <LoginForm onSuccess={() => navigate('/profile')} />
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Don’t have an account?{' '}
          <Link component={RouterLink} to="/signup">
            Create one
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default LoginPage;

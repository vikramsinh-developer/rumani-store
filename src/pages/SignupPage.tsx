import * as React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Link, Divider, Typography } from '@mui/material';
import AuthLayout from '../components/auth/AuthLayout';
import SignupForm from '../components/auth/SignupForm';
import OTPVerification from '../components/auth/OTPVerification';

const SignupPage: React.FC = () => {
  const [step, setStep] = React.useState<'form' | 'otp'>('form');
  const navigate = useNavigate();

  return (
    <AuthLayout title="Create account" subtitle="Luxury pieces deserve a smoother checkout.">
      {step === 'form' ? (
        <SignupForm onOtpRequested={() => setStep('otp')} />
      ) : (
        <OTPVerification onVerified={() => navigate('/profile')} />
      )}

      <Divider sx={{ my: 2 }} />

      <Box>
        <Typography variant="body2">
          Already have an account?{' '}
          <Link component={RouterLink} to="/login">
            Login
          </Link>
        </Typography>
      </Box>
    </AuthLayout>
  );
};

export default SignupPage;

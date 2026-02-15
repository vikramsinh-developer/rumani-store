import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import OTPInput from './OTPInput';
import { useAuth } from '../../hooks/useAuth';
import { useNotificationStore } from '../../store/notificationStore';

const OTPVerification: React.FC<{ onVerified?: () => void }> = ({ onVerified }) => {
  const [otp, setOtp] = React.useState('');
  const { verifyOtp, isLoading } = useAuth();
  const notify = useNotificationStore();

  const submit = async () => {
    try {
      await verifyOtp(otp);
      notify.push('OTP verified. Signed in.', 'success');
      onVerified?.();
    } catch (e: any) {
      notify.push(e?.message ?? 'OTP verification failed', 'error');
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Enter the 6-digit OTP. Demo OTP: 123456
      </Typography>
      <OTPInput value={otp} onChange={setOtp} />
      <Button variant="contained" onClick={submit} disabled={otp.length !== 6 || isLoading}>
        Verify OTP
      </Button>
    </Box>
  );
};

export default OTPVerification;

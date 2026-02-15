import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNotificationStore } from '../../store/notificationStore';

const SignupForm: React.FC<{ onOtpRequested?: () => void }> = ({ onOtpRequested }) => {
  const [phone, setPhone] = React.useState('');
  const { requestOtp, isLoading } = useAuth();
  const notify = useNotificationStore();

  const submit = async () => {
    try {
      if (!/^[0-9]{10}$/.test(phone)) throw new Error('Enter a valid 10-digit phone number.');
      await requestOtp(phone);
      notify.push('OTP sent (demo).', 'success');
      onOtpRequested?.();
    } catch (e: any) {
      notify.push(e?.message ?? 'Could not request OTP', 'error');
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Sign up via OTP (demo). You’ll verify with OTP: 123456.
      </Typography>
      <TextField label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
      <Button variant="contained" onClick={submit} disabled={isLoading}>
        Send OTP
      </Button>
    </Box>
  );
};

export default SignupForm;

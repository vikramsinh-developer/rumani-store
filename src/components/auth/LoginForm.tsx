import * as React from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useAuth } from '../../hooks/useAuth';
import { useNotificationStore } from '../../store/notificationStore';

const LoginForm: React.FC<{ onSuccess?: () => void }> = ({ onSuccess }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const { login, isLoading } = useAuth();
  const notify = useNotificationStore();

  const submit = async () => {
    try {
      await login(email, password);
      notify.push('Logged in successfully.', 'success');
      onSuccess?.();
    } catch (e: any) {
      notify.push(e?.message ?? 'Login failed', 'error');
    }
  };

  return (
    <Box sx={{ display: 'grid', gap: 2 }}>
      <TextField label="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <TextField
        label="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={submit} disabled={isLoading}>
        Login
      </Button>
    </Box>
  );
};

export default LoginForm;

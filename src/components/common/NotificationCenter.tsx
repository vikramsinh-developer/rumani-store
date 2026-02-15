import * as React from 'react';
import { Alert, Snackbar } from '@mui/material';
import { useNotificationStore } from '../../store/notificationStore';

const NotificationCenter: React.FC = () => {
  const { notices, remove } = useNotificationStore();
  const current = notices[0];

  return (
    <Snackbar
      open={Boolean(current)}
      autoHideDuration={current?.duration ?? 3000}
      onClose={() => current && remove(current.id)}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      {current ? (
        <Alert
          onClose={() => remove(current.id)}
          severity={current.type}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {current.message}
        </Alert>
      ) : undefined}
    </Snackbar>
  );
};

export default NotificationCenter;

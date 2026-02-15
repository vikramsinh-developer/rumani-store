import * as React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';

const NewsletterSection: React.FC = () => {
  const [email, setEmail] = React.useState('');

  const subscribe = () => {
    // simple demo; in real app call API
    setEmail('');
  };

  return (
    <Box
      sx={{
        mb: 6,
        borderRadius: 3,
        bgcolor: 'secondary.main',
        color: 'background.default',
        p: { xs: 3, md: 4 },
        textAlign: { xs: 'left', md: 'center' },
      }}
    >
      <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
        Join the collector’s list
      </Typography>
      <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.8)', mb: 2 }}>
        Be the first to know about rare drops, private previews and special offers.
      </Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: 1.5,
          maxWidth: 480,
          mx: { xs: 0, md: 'auto' },
        }}
      >
        <TextField
          variant="outlined"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            flex: 1,
            '& .MuiOutlinedInput-input': { color: 'background.default' },
          }}
        />
        <Button variant="contained" onClick={subscribe}>
          Subscribe
        </Button>
      </Box>
    </Box>
  );
};

export default NewsletterSection;

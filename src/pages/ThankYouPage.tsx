import * as React from 'react';
import { Box, Button, Card, CardContent, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as any)?.orderId ?? 'ORD-DEMO';

  return (
    <Box>
      <PageHeader title="Thank you" subtitle="Your order has been placed successfully." />
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>
            Order ID: {orderId}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            We’ll notify you when your antique piece is ready to ship.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button variant="contained" onClick={() => navigate('/products')}>
              Continue shopping
            </Button>
            <Button variant="outlined" onClick={() => navigate('/orders')}>
              View orders
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ThankYouPage;

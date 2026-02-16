import * as React from 'react';
import { Box, Button, Card, CardContent, Container, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';

const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const orderId = (location.state as any)?.orderId ?? 'ORD-DEMO';

  return (
    <Container maxWidth="sm">
      <PageHeader title="Thank you" subtitle="Your order has been placed successfully." />
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
            Order ID: {orderId}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
            We’ll notify you when your antique piece is ready to ship.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button fullWidth variant="contained" onClick={() => navigate('/products')} sx={{ flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
              Continue shopping
            </Button>
            <Button fullWidth variant="outlined" onClick={() => navigate('/orders')} sx={{ flex: { xs: '1 1 100%', sm: '0 0 auto' } }}>
              View orders
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ThankYouPage;

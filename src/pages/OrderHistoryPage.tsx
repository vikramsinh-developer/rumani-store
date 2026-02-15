import * as React from 'react';
import { Box, Button, Card, CardContent, Chip, Container, Grid, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { useAuth } from '../hooks/useAuth';
import { MOCK_ORDERS } from '../mock/orders';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const statusColor = (s: OrderStatus) => {
  switch (s) {
    case 'delivered':
      return 'success';
    case 'shipped':
      return 'info';
    case 'processing':
      return 'warning';
    case 'cancelled':
      return 'error';
    default:
      return 'default';
  }
};

const steps: { key: OrderStatus; label: string }[] = [
  { key: 'pending', label: 'Placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

const activeStepFor = (s: OrderStatus) => {
  if (s === 'cancelled') return 1;
  const idx = steps.findIndex((x) => x.key === s);
  return Math.max(0, idx);
};

const OrderHistoryPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, hydrate } = useAuth();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!user) {
    return (
      <Container maxWidth="lg">
        <PageHeader title="Orders" subtitle="Please login to view your order history." />
        <Button variant="contained" onClick={() => navigate('/login')}>
          Go to login
        </Button>
      </Container>
    );
  }

  const orders = MOCK_ORDERS.filter((o) => o.userId === user.id);

  return (
    <Container maxWidth="lg">
      <PageHeader title="Order history" subtitle="Track all your past orders." />

      {orders.length === 0 ? (
        <EmptyState
          title="No orders yet"
          description="Once you place an order, you’ll see it here."
        />
      ) : (
        <Grid container spacing={2}>
          {orders.map((o) => (
            <Grid size={{xs:12, md:6}} key={o.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>
                      {o.id}
                    </Typography>
                    <Chip label={o.status} color={statusColor(o.status as OrderStatus) as any} size="small" />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    Date: {new Date(o.createdAt).toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total: ₹{o.totalAmount.toLocaleString()}
                  </Typography>

                  <Box sx={{ mt: 2 }}>
                    <Stepper activeStep={activeStepFor(o.status as OrderStatus)} alternativeLabel>
                      {steps.map((s) => (
                        <Step key={s.key}>
                          <StepLabel>{s.label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  <Box sx={{ mt: 2 }}>
                    <Button
                      size="small"
                      variant="outlined"
                      onClick={() => navigate(`/orders/${o.id}`)}
                    >
                      View details
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default OrderHistoryPage;

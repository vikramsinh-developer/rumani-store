import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Divider,
  Grid,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { MOCK_ORDERS } from '../mock/orders';
import { useAuth } from '../hooks/useAuth';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const steps: { key: OrderStatus; label: string }[] = [
  { key: 'pending', label: 'Placed' },
  { key: 'processing', label: 'Processing' },
  { key: 'shipped', label: 'Shipped' },
  { key: 'delivered', label: 'Delivered' },
];

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

const activeStepFor = (s: OrderStatus) => {
  if (s === 'cancelled') return 1;
  const idx = steps.findIndex((x) => x.key === s);
  return Math.max(0, idx);
};

const OrderDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, hydrate } = useAuth();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  if (!user) {
    return (
      <Container maxWidth="lg">
        <PageHeader title="Order details" subtitle="Please login to view this order." />
        <Button variant="contained" onClick={() => navigate('/login')}>
          Go to login
        </Button>
      </Container>
    );
  }

  const order = MOCK_ORDERS.find((o) => o.id === id && o.userId === user.id);

  if (!order) {
    return (
      <Container maxWidth="lg">
        <PageHeader title="Order details" subtitle="We couldn’t find that order." />
        <EmptyState title="Order not found" description="Please go back to your order history." />
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" onClick={() => navigate('/orders')}>
            Back to orders
          </Button>
        </Box>
      </Container>
    );
  }

  const activeStep = activeStepFor(order.status as OrderStatus);

  return (
    <Container maxWidth="lg">
      <PageHeader title={order.id} subtitle="Order details and shipment progress." />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 8 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>
                  Status
                </Typography>
                <Chip
                  label={order.status}
                  color={statusColor(order.status as OrderStatus) as any}
                  size="small"
                />
              </Box>

              <Box sx={{ mt: 2 }}>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((s) => (
                    <Step key={s.key}>
                      <StepLabel>{s.label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Items
              </Typography>
              <Box sx={{ display: 'grid', gap: 1.25 }}>
                {order.items.map((it) => (
                  <Box
                    key={it.id}
                    sx={{
                      display: 'flex',
                      gap: 1.5,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      flexWrap: 'wrap',
                    }}
                  >
                    <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
                      <Box
                        component="img"
                        src={it.thumbnailImage}
                        alt={it.name}
                        sx={{ width: 56, height: 56, objectFit: 'cover', borderRadius: 1 }}
                      />
                      <Box>
                        <Typography sx={{ fontWeight: 800 }}>{it.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          Qty: {it.cartQuantity}
                        </Typography>
                      </Box>
                    </Box>

                    <Typography sx={{ fontWeight: 900 }}>
                      ₹{(it.price * it.cartQuantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Shipping address
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.postalCode}, {order.shippingAddress.country}
              </Typography>

              <Divider sx={{ my: 3 }} />

              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Payment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {order.paymentMethod}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 4 }}>
          <Card sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 96 } }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'grid', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Subtotal
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    ₹{(order.totalAmount + order.discountAmount - order.taxAmount - order.shippingAmount).toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Shipping
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    ₹{order.shippingAmount.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Tax
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    ₹{order.taxAmount.toLocaleString()}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body2" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="body2" sx={{ fontWeight: 800 }}>
                    -₹{order.discountAmount.toLocaleString()}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 900 }}>Total</Typography>
                <Typography sx={{ fontWeight: 900, color: 'primary.main' }}>
                  ₹{order.totalAmount.toLocaleString()}
                </Typography>
              </Box>

              <Box sx={{ mt: 2, display: 'grid', gap: 1 }}>
                <Button variant="outlined" onClick={() => navigate('/orders')}>
                  Back to orders
                </Button>
                <Button variant="contained" onClick={() => navigate('/products')}>
                  Continue shopping
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OrderDetailPage;

import * as React from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Link,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/common/PageHeader';
import EmptyState from '../components/common/EmptyState';
import { useCart } from '../hooks/useCart';
import { useNotificationStore } from '../store/notificationStore';
import { MOCK_COUPONS, type Coupon } from '../mock/coupons';
import { useAuth } from '../hooks/useAuth';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { type Address } from '../types';

type CheckoutData = {
  email: string;
  phone: string;
  fullName: string;

  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;

  paymentMethod: 'cod' | 'card';
  cardLast4: string;
};

const steps = ['Contact', 'Shipping', 'Payment'];

const createId = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `id_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  }
};

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const notify = useNotificationStore();
  const { items, total, clearCart } = useCart();
  const { user, hydrate } = useAuth();

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  const userId = user?.id ?? 'guest';
  const [savedAddresses, setSavedAddresses] = useLocalStorage<Address[]>(
    `aj_addresses_${userId}`,
    []
  );
  const [selectedAddressId, setSelectedAddressId] = React.useState<string>('');
  const [addAddressOpen, setAddAddressOpen] = React.useState(false);
  const [addressDraft, setAddressDraft] = React.useState<Omit<Address, 'id'>>({
    type: 'home',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
  });

  const [promoCode, setPromoCode] = React.useState('');
  const [showCoupons, setShowCoupons] = React.useState(false);
  const [appliedCoupon, setAppliedCoupon] = React.useState<Coupon | null>(null);

  const [activeStep, setActiveStep] = React.useState(0);
  const [data, setData] = React.useState<CheckoutData>({
    email: '',
    phone: '',
    fullName: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: '',
    paymentMethod: 'cod',
    cardLast4: '',
  });

  const set = <K extends keyof CheckoutData>(key: K, value: CheckoutData[K]) =>
    setData((s) => ({ ...s, [key]: value }));

  React.useEffect(() => {
    if (!user) return;

    const fullName = `${user.firstName ?? ''} ${user.lastName ?? ''}`.trim();
    setData((prev) => ({
      ...prev,
      fullName: prev.fullName || fullName,
      email: prev.email || user.email,
      phone: prev.phone || user.phone,
    }));
  }, [user]);

  const applyAddressToForm = React.useCallback((addr: Address) => {
    setSelectedAddressId(addr.id);
    setData((prev) => ({
      ...prev,
      addressLine1: addr.street,
      addressLine2: prev.addressLine2,
      city: addr.city,
      state: addr.state,
      pincode: addr.postalCode,
    }));
  }, []);

  React.useEffect(() => {
    if (activeStep !== 1) return;
    if (!user) return;
    if (selectedAddressId) return;
    if (data.addressLine1 || data.city || data.state || data.pincode) return;

    const def = savedAddresses.find((a) => a.isDefault) ?? savedAddresses[0];
    if (def) applyAddressToForm(def);
  }, [activeStep, user, selectedAddressId, savedAddresses, data.addressLine1, data.city, data.state, data.pincode, applyAddressToForm]);

  const validateStep = () => {
    if (activeStep === 0) {
      if (!data.fullName.trim()) return 'Full name is required.';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) return 'Valid email is required.';
      if (!/^[0-9]{10}$/.test(data.phone)) return 'Valid 10-digit phone is required.';
    }
    if (activeStep === 1) {
      if (!data.addressLine1.trim()) return 'Address line 1 is required.';
      if (!data.city.trim()) return 'City is required.';
      if (!data.state.trim()) return 'State is required.';
      if (!/^[0-9]{6}$/.test(data.pincode)) return 'Valid 6-digit pincode is required.';
    }
    if (activeStep === 2) {
      if (data.paymentMethod === 'card' && !/^[0-9]{4}$/.test(data.cardLast4)) {
        return 'Enter last 4 digits of card (demo).';
      }
    }
    return null;
  };

  const next = () => {
    const err = validateStep();
    if (err) {
      notify.push(err, 'error');
      return;
    }
    setActiveStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setActiveStep((s) => Math.max(s - 1, 0));

  const placeOrder = () => {
    const err = validateStep();
    if (err) {
      notify.push(err, 'error');
      return;
    }
    const orderId = `ORD-${Math.floor(10000 + Math.random() * 90000)}`;
    clearCart();
    notify.push('Order placed successfully.', 'success');
    navigate('/thank-you', { state: { orderId } });
  };

  const onPromoChange = (val: string) => {
    const next = val.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8);
    setPromoCode(next);
  };

  const applyPromo = () => {
    if (promoCode.length !== 8) {
      notify.push('Coupon code must be 8 characters (A–Z, 0–9).', 'error');
      return;
    }

    const match = MOCK_COUPONS.find((c) => c.code === promoCode);
    if (!match) {
      notify.push('Invalid coupon code.', 'error');
      return;
    }

    setAppliedCoupon(match);
    notify.push(`Coupon applied: ${match.code}`, 'success');
  };

  const clearPromo = () => {
    setPromoCode('');
    setAppliedCoupon(null);
  };

  const onSelectSavedAddress = (id: string) => {
    setSelectedAddressId(id);
    if (!id) {
      setData((prev) => ({
        ...prev,
        addressLine1: '',
        addressLine2: '',
        city: '',
        state: '',
        pincode: '',
      }));
      return;
    }
    const addr = savedAddresses.find((a) => a.id === id);
    if (addr) applyAddressToForm(addr);
  };

  const saveNewAddress = () => {
    if (!addressDraft.street.trim()) return notify.push('Street address is required.', 'error');
    if (!addressDraft.city.trim()) return notify.push('City is required.', 'error');
    if (!addressDraft.state.trim()) return notify.push('State is required.', 'error');
    if (!/^[0-9]{6}$/.test(addressDraft.postalCode)) {
      return notify.push('Valid 6-digit pincode is required.', 'error');
    }

    const next: Address = {
      id: createId(),
      ...addressDraft,
      isDefault: addressDraft.isDefault || savedAddresses.length === 0,
    };

    setSavedAddresses((prev) => {
      const list = [next, ...prev];
      if (next.isDefault) return list.map((a) => ({ ...a, isDefault: a.id === next.id }));
      return list;
    });

    applyAddressToForm(next);
    setAddAddressOpen(false);
    setAddressDraft({
      type: 'home',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: false,
    });
    notify.push('Address saved.', 'success');
  };

  if (items.length === 0) {
    return <EmptyState title="Your cart is empty" description="Add items to your cart to checkout." />;
  }

  return (
    <Box>
      <PageHeader title="Checkout" subtitle="A quick, multi-step checkout flow." />

      <Grid container spacing={3}>
        <Grid size={{xs:12, md:8}}>
          <Card>
            <CardContent>
              <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                {steps.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>

              {activeStep === 0 && (
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <TextField label="Full name" value={data.fullName} onChange={(e) => set('fullName', e.target.value)} />
                  <TextField label="Email" value={data.email} onChange={(e) => set('email', e.target.value)} />
                  <TextField label="Phone" value={data.phone} onChange={(e) => set('phone', e.target.value)} />
                </Box>
              )}

              {activeStep === 1 && (
                <Box sx={{ display: 'grid', gap: 2 }}>
                  {user ? (
                    <Box sx={{ display: 'grid', gap: 1.5 }}>
                      <TextField
                        select
                        SelectProps={{ native: true }}
                        label="Saved addresses"
                        value={selectedAddressId}
                        onChange={(e) => onSelectSavedAddress(e.target.value)}
                      >
                        <option value="">Enter a new address</option>
                        {savedAddresses.map((a) => (
                          <option key={a.id} value={a.id}>
                            {a.isDefault ? '[Default] ' : ''}{a.street}, {a.city}
                          </option>
                        ))}
                      </TextField>

                      <Button variant="outlined" onClick={() => setAddAddressOpen((s) => !s)}>
                        {addAddressOpen ? 'Cancel add address' : 'Add new address'}
                      </Button>

                      <Collapse in={addAddressOpen} unmountOnExit>
                        <Box sx={{ display: 'grid', gap: 2, mt: 1 }}>
                          <TextField
                            label="Street"
                            value={addressDraft.street}
                            onChange={(e) => setAddressDraft((s) => ({ ...s, street: e.target.value }))}
                          />
                          <Grid container spacing={2}>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="City"
                                value={addressDraft.city}
                                onChange={(e) => setAddressDraft((s) => ({ ...s, city: e.target.value }))}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="State"
                                value={addressDraft.state}
                                onChange={(e) => setAddressDraft((s) => ({ ...s, state: e.target.value }))}
                              />
                            </Grid>
                            <Grid size={{ xs: 12, sm: 4 }}>
                              <TextField
                                fullWidth
                                label="Pincode"
                                value={addressDraft.postalCode}
                                onChange={(e) =>
                                  setAddressDraft((s) => ({
                                    ...s,
                                    postalCode: e.target.value.replace(/[^0-9]/g, '').slice(0, 6),
                                  }))
                                }
                              />
                            </Grid>
                          </Grid>
                          <TextField
                            label="Country"
                            value={addressDraft.country}
                            onChange={(e) => setAddressDraft((s) => ({ ...s, country: e.target.value }))}
                          />

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                            <Button
                              variant="text"
                              onClick={() => setAddressDraft((s) => ({ ...s, isDefault: !s.isDefault }))}
                            >
                              {addressDraft.isDefault ? 'Default address' : 'Set as default'}
                            </Button>
                            <Button variant="contained" onClick={saveNewAddress}>
                              Save address
                            </Button>
                          </Box>
                        </Box>
                      </Collapse>
                    </Box>
                  ) : null}

                  <TextField label="Address line 1" value={data.addressLine1} onChange={(e) => set('addressLine1', e.target.value)} />
                  <TextField label="Address line 2 (optional)" value={data.addressLine2} onChange={(e) => set('addressLine2', e.target.value)} />
                  <Grid container spacing={2}>
                    <Grid size={{xs:12, sm:4}}>
                      <TextField fullWidth label="City" value={data.city} onChange={(e) => set('city', e.target.value)} />
                    </Grid>
                    <Grid size={{xs:12, sm:4}}>
                      <TextField fullWidth label="State" value={data.state} onChange={(e) => set('state', e.target.value)} />
                    </Grid>
                    <Grid size={{xs:12, sm:4}}>
                      <TextField fullWidth label="Pincode" value={data.pincode} onChange={(e) => set('pincode', e.target.value)} />
                    </Grid>
                  </Grid>
                </Box>
              )}

              {activeStep === 2 && (
                <Box sx={{ display: 'grid', gap: 2 }}>
                  <TextField
                    select
                    SelectProps={{ native: true }}
                    label="Payment method"
                    value={data.paymentMethod}
                    onChange={(e) => set('paymentMethod', e.target.value as CheckoutData['paymentMethod'])}
                  >
                    <option value="cod">Cash on delivery (demo)</option>
                    <option value="card">Card (demo)</option>
                  </TextField>

                  {data.paymentMethod === 'card' ? (
                    <TextField
                      
                      label="Card last 4 digits"
                      value={data.cardLast4}
                      onChange={(e) => set('cardLast4', e.target.value)}
                    />
                  ) : null}
                </Box>
              )}

              <Divider sx={{ my: 3 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant="outlined" disabled={activeStep === 0} onClick={back}>
                  Back
                </Button>

                {activeStep < 2 ? (
                  <Button variant="contained" onClick={next}>
                    Next
                  </Button>
                ) : (
                  <Button variant="contained" onClick={placeOrder}>
                    Place order
                  </Button>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{xs:12, md:4}}>
          {/* Promo code card */}
          <Card sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 96 } }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Promo code
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'grid', gap: 1.25 }}>
                <TextField
                  label="Coupon code"
                  placeholder="ABCDEFGH"
                  value={promoCode}
                  slotProps={{
                      input: {
                        onClick: () => setShowCoupons(true),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton aria-label="Clear coupon" onClick={clearPromo} edge="end" size="small">
                              <ClearIcon fontSize="small" />
                            </IconButton>
                          </InputAdornment>
                        ),
                      },
                    }}
                  inputProps={{ maxLength: 8 }}
                  onChange={(e) => onPromoChange(e.target.value)}
                />

                <Button variant="contained" onClick={applyPromo}>
                  Apply
                </Button>

                {appliedCoupon ? (
                  <Typography variant="body2" sx={{ color: 'success.main' }}>
                    Applied: {appliedCoupon.code} — {appliedCoupon.description}
                  </Typography>
                ) : (
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Enter an 8-letter coupon code (A–Z).
                  </Typography>
                )}

                <Link
                  component="button"
                  type="button"
                  onClick={() => setShowCoupons((s) => !s)}
                  sx={{ justifySelf: 'start' }}
                >
                  {showCoupons ? 'Hide available coupon codes' : 'See available coupon codes'}
                </Link>

                <Collapse in={showCoupons} unmountOnExit>
                  <Box sx={{ display: 'grid', gap: 1, mt: 1 }}>
                    {MOCK_COUPONS.map((c) => (
                      <Box key={c.code}>
                        <Typography variant="body2" sx={{ fontWeight: 900 }}>
                          {c.code}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {c.description}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                </Collapse>
              </Box>
            </CardContent>
          </Card>

          {/* Order summary card */}
          <Card sx={{ position: { xs: 'static', md: 'sticky' }, top: { md: 96 } }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 900, mb: 1 }}>
                Order summary
              </Typography>
              <Divider sx={{ mb: 2 }} />

              <Box sx={{ display: 'grid', gap: 1.25 }}>
                {items.map((it) => (
                  <Box key={it.id} sx={{ display: 'flex', justifyContent: 'space-between', gap: 1 }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {it.name} × {it.cartQuantity}
                    </Typography>
                    <Typography variant="body2" sx={{ fontWeight: 700 }}>
                      ₹{(it.price * it.cartQuantity).toLocaleString()}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 900 }}>Total</Typography>
                <Typography sx={{ fontWeight: 900, color: 'primary.main' }}>
                  ₹{total.toLocaleString()}
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CheckoutPage;

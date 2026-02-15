import * as React from 'react';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageHeader from '../components/common/PageHeader';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { MOCK_ORDERS } from '../mock/orders';
import { type Address } from '../types';
import { useNotificationStore } from '../store/notificationStore';

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const orderSteps: { key: OrderStatus; label: string }[] = [
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
  const idx = orderSteps.findIndex((x) => x.key === s);
  return Math.max(0, idx);
};

const createId = () => {
  try {
    return crypto.randomUUID();
  } catch {
    return `id_${Date.now()}_${Math.floor(Math.random() * 1e6)}`;
  }
};

const ProfilePage: React.FC = () => {
  const { user, updateProfile, logout, hydrate } = useAuth();
  const navigate = useNavigate();
  const notify = useNotificationStore();

  const userId = user?.id ?? 'guest';

  React.useEffect(() => {
    hydrate();
  }, [hydrate]);

  const [firstName, setFirstName] = React.useState(user?.firstName ?? '');
  const [lastName, setLastName] = React.useState(user?.lastName ?? '');

  React.useEffect(() => {
    setFirstName(user?.firstName ?? '');
    setLastName(user?.lastName ?? '');
  }, [user]);

  const [addresses, setAddresses] = useLocalStorage<Address[]>(`aj_addresses_${userId}`, [
    {
      id: 'addr_default',
      type: 'home',
      street: '221B Baker Street',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400001',
      country: 'India',
      isDefault: true,
    },
  ]);

  const [addressEditorOpen, setAddressEditorOpen] = React.useState(false);
  const [editingAddressId, setEditingAddressId] = React.useState<string | null>(null);
  const [addressDraft, setAddressDraft] = React.useState<Omit<Address, 'id'>>({
    type: 'home',
    street: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'India',
    isDefault: false,
  });

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const openAddAddress = () => {
    setEditingAddressId(null);
    setAddressDraft({
      type: 'home',
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'India',
      isDefault: addresses.length === 0,
    });
    setAddressEditorOpen(true);
  };

  const openEditAddress = (addr: Address) => {
    setEditingAddressId(addr.id);
    const { id: _id, ...rest } = addr;
    setAddressDraft(rest);
    setAddressEditorOpen(true);
  };

  const removeAddress = (id: string) => {
    setAddresses((prev) => {
      const next = prev.filter((a) => a.id !== id);
      if (next.length > 0 && !next.some((a) => a.isDefault)) {
        next[0] = { ...next[0], isDefault: true };
      }
      return next;
    });
    notify.push('Address removed.', 'success');
  };

  const setDefaultAddress = (id: string) => {
    setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: a.id === id })));
    notify.push('Default address updated.', 'success');
  };

  const saveAddress = () => {
    if (!addressDraft.street.trim()) return notify.push('Street address is required.', 'error');
    if (!addressDraft.city.trim()) return notify.push('City is required.', 'error');
    if (!addressDraft.state.trim()) return notify.push('State is required.', 'error');
    if (!/^[0-9]{6}$/.test(addressDraft.postalCode)) {
      return notify.push('Valid 6-digit pincode is required.', 'error');
    }

    setAddresses((prev) => {
      const next: Address[] = [...prev];
      const isDefault = addressDraft.isDefault || next.length === 0;
      const record: Address = {
        id: editingAddressId ?? createId(),
        ...addressDraft,
        isDefault,
      };

      const idx = next.findIndex((a) => a.id === record.id);
      if (idx >= 0) next[idx] = record;
      else next.unshift(record);

      if (record.isDefault) {
        return next.map((a) => ({ ...a, isDefault: a.id === record.id }));
      }
      return next;
    });

    setAddressEditorOpen(false);
    setEditingAddressId(null);
    notify.push('Address saved.', 'success');
  };

  const onSelectAvatarFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      notify.push('Please select an image file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = typeof reader.result === 'string' ? reader.result : '';
      if (!dataUrl) return;
      updateProfile({ avatar: dataUrl });
      notify.push('Profile image updated.', 'success');
    };
    reader.readAsDataURL(file);
  };

  const recentOrders = MOCK_ORDERS.filter((o) => o.userId === userId).slice(0, 3);

  if (!user) {
    return (
      <Box>
        <PageHeader title="Profile" subtitle="Please login to view your profile." />
        <Button variant="contained" onClick={() => navigate('/login')}>
          Go to Login
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <PageHeader title="Profile" subtitle="Manage your account, addresses, and orders." />

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Personal details
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2, flexWrap: 'wrap' }}>
                <Avatar
                  src={user.avatar}
                  sx={{ width: 72, height: 72, bgcolor: 'secondary.main' }}
                >
                  {user.firstName?.[0]}
                </Avatar>
                <Box sx={{ display: 'grid', gap: 1 }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const f = e.target.files?.[0];
                      if (f) void onSelectAvatarFile(f);
                      e.currentTarget.value = '';
                    }}
                  />
                  <Button variant="outlined" onClick={() => fileInputRef.current?.click()}>
                    Upload profile photo
                  </Button>
                  <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                    Stored locally for this demo.
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: 'grid', gap: 2 }}>
                <TextField label="First name" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                <TextField label="Last name" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                <TextField label="Email" value={user.email} disabled />
                <TextField label="Phone" value={user.phone} disabled />

                <Button
                  variant="contained"
                  onClick={() => updateProfile({ firstName, lastName })}
                >
                  Save changes
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Orders
              </Typography>

              {recentOrders.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No orders yet.
                </Typography>
              ) : (
                <Box sx={{ display: 'grid', gap: 2 }}>
                  {recentOrders.map((o) => (
                    <Card
                      key={o.id}
                      variant="outlined"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => navigate(`/orders/${o.id}`)}
                    >
                      <CardContent sx={{ py: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                          <Typography sx={{ fontWeight: 900 }}>{o.id}</Typography>
                          <Chip
                            label={o.status}
                            size="small"
                            color={statusColor(o.status as OrderStatus) as any}
                          />
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Total: ₹{o.totalAmount.toLocaleString()}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Stepper activeStep={activeStepFor(o.status as OrderStatus)} alternativeLabel>
                            {orderSteps.map((s) => (
                              <Step key={s.key}>
                                <StepLabel>{s.label}</StepLabel>
                              </Step>
                            ))}
                          </Stepper>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}

                  <Button variant="outlined" onClick={() => navigate('/orders')}>
                    View all orders
                  </Button>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>
                  Addresses
                </Typography>
                <Button variant="contained" onClick={openAddAddress}>
                  Add address
                </Button>
              </Box>

              <Divider sx={{ my: 2 }} />

              {addresses.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  No addresses saved.
                </Typography>
              ) : (
                <Box sx={{ display: 'grid', gap: 1.5 }}>
                  {addresses.map((a) => (
                    <Card key={a.id} variant="outlined">
                      <CardContent>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2, flexWrap: 'wrap' }}>
                          <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                              <Typography sx={{ fontWeight: 900, textTransform: 'capitalize' }}>
                                {a.type}
                              </Typography>
                              {a.isDefault ? <Chip label="Default" size="small" /> : null}
                            </Box>
                            <Typography variant="body2" color="text.secondary">
                              {a.street}, {a.city}, {a.state} {a.postalCode}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {a.country}
                            </Typography>
                          </Box>

                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            {!a.isDefault ? (
                              <Button size="small" variant="text" onClick={() => setDefaultAddress(a.id)}>
                                Make default
                              </Button>
                            ) : null}
                            <IconButton aria-label="Edit address" onClick={() => openEditAddress(a)}>
                              <EditIcon />
                            </IconButton>
                            <IconButton aria-label="Remove address" onClick={() => removeAddress(a.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}

              <Collapse in={addressEditorOpen} unmountOnExit>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" sx={{ fontWeight: 900, mb: 2 }}>
                  {editingAddressId ? 'Edit address' : 'Add address'}
                </Typography>

                <Box sx={{ display: 'grid', gap: 2 }}>
                  <TextField
                    label="Type (home/work/other)"
                    value={addressDraft.type}
                    onChange={(e) => {
                      const val = e.target.value as Address['type'];
                      if (val === 'home' || val === 'work' || val === 'other') {
                        setAddressDraft((s) => ({ ...s, type: val }));
                      }
                    }}
                  />
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
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setAddressEditorOpen(false);
                          setEditingAddressId(null);
                        }}
                      >
                        Cancel
                      </Button>
                      <Button variant="contained" onClick={saveAddress}>
                        Save address
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Collapse>
            </CardContent>
          </Card>
        </Grid>

        <Grid size={{ xs: 12 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2 }}>
                Account
              </Typography>
              <Box sx={{ display: 'grid', gap: 1.5 }}>
                <Button variant="outlined" onClick={() => navigate('/orders')}>
                  Order history
                </Button>
                <Button color="error" variant="contained" onClick={() => { logout(); navigate('/'); }}>
                  Logout
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProfilePage;

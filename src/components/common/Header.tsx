import React from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  IconButton,
  Badge,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { ShoppingCart, Favorite, AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useWishlist } from '../../hooks/useWishlist';

const Header: React.FC = () => {
  const navigate = useNavigate();
  const { itemsCount: cartCount } = useCart();
  const { count: wishlistCount } = useWishlist();

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const closeMobile = () => setMobileOpen(false);

  const go = (to: string) => {
    navigate(to);
    closeMobile();
  };

  return (
    <>
      <AppBar position="sticky" sx={{ backgroundColor: '#fff', color: '#1A1A1A' }}>
        <Toolbar sx={{ justifyContent: 'space-between', gap: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, minWidth: 0 }}>
            <IconButton
              onClick={() => setMobileOpen(true)}
              sx={{ display: { xs: 'inline-flex', md: 'none' } }}
              aria-label="Open menu"
            >
              <MenuIcon />
            </IconButton>

            <Box
              onClick={() => navigate('/')}
              sx={{
                cursor: 'pointer',
                minWidth: 0,
                maxWidth: { xs: 180, sm: 260 },
              }}
            >
              <Typography
                component="div"
                sx={{
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#B8860B',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}
              >
                ✨ Rumani Store
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 2 }}>
            <Button color="inherit" onClick={() => navigate('/products')}>
              Shop
            </Button>
            <Button color="inherit" onClick={() => navigate('/products?sort=rating')}>
              Best Sellers
            </Button>
          </Box>

          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/wishlist')} aria-label="Wishlist">
              <Badge badgeContent={wishlistCount} color="primary">
                <Favorite />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/cart')} aria-label="Cart">
              <Badge badgeContent={cartCount} color="primary">
                <ShoppingCart />
              </Badge>
            </IconButton>
            <IconButton onClick={() => navigate('/profile')} aria-label="Profile">
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        open={mobileOpen}
        onClose={closeMobile}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: 280 },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography sx={{ fontWeight: 800, color: '#B8860B', mb: 1.5 }}>
            Rumani Store
          </Typography>
          <Divider sx={{ mb: 1 }} />

          <List sx={{ p: 0 }}>
            <ListItemButton onClick={() => go('/products')}>
              <ListItemText primary="Shop" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/products?sort=rating')}>
              <ListItemText primary="Best Sellers" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => go('/wishlist')}>
              <ListItemText primary="Wishlist" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/cart')}>
              <ListItemText primary="Cart" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/profile')}>
              <ListItemText primary="Profile" />
            </ListItemButton>
            <Divider sx={{ my: 1 }} />
            <ListItemButton onClick={() => go('/about')}>
              <ListItemText primary="About Us" />
            </ListItemButton>
            <ListItemButton onClick={() => go('/faq')}>
              <ListItemText primary="FAQ" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );

};

export default Header;

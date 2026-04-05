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
  ListSubheader,
  ListItemButton,
  ListItemText,
  Divider,
  Typography,
} from '@mui/material';
import { ShoppingCart, Favorite, AccountCircle } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import HomeIcon from '@mui/icons-material/Home';
import StorefrontIcon from '@mui/icons-material/Storefront';
import StarIcon from '@mui/icons-material/Star';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import InfoIcon from '@mui/icons-material/Info';
import HelpIcon from '@mui/icons-material/Help';
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
          '& .MuiDrawer-paper': { width: 300 },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 2, py: 1.5 }}>
          <Typography sx={{ fontWeight: 900, color: '#B8860B' }}>Rumani Store</Typography>
          <IconButton aria-label="Close menu" onClick={closeMobile}>
            <CloseIcon />
          </IconButton>
        </Box>

        <Divider />

        <List
          sx={{ p: 0 }}
          subheader={
            <ListSubheader component="div" disableSticky sx={{ bgcolor: 'transparent', fontWeight: 900 }}>
              Browse
            </ListSubheader>
          }
        >
          <ListItemButton onClick={() => go('/') }>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <HomeIcon fontSize="small" />
            </Box>
            <ListItemText primary="Home" />
          </ListItemButton>
          <ListItemButton onClick={() => go('/products')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <StorefrontIcon fontSize="small" />
            </Box>
            <ListItemText primary="Shop" />
          </ListItemButton>
          <ListItemButton onClick={() => go('/products?sort=rating')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <StarIcon fontSize="small" />
            </Box>
            <ListItemText primary="Best Sellers" />
          </ListItemButton>
        </List>

        <Divider />

        <List
          sx={{ p: 0 }}
          subheader={
            <ListSubheader component="div" disableSticky sx={{ bgcolor: 'transparent', fontWeight: 900 }}>
              Account
            </ListSubheader>
          }
        >
          <ListItemButton onClick={() => go('/wishlist')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <FavoriteIcon fontSize="small" />
            </Box>
            <ListItemText primary="Wishlist" secondary={wishlistCount ? `${wishlistCount} item(s)` : undefined} />
          </ListItemButton>
          <ListItemButton onClick={() => go('/cart')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <ShoppingCartIcon fontSize="small" />
            </Box>
            <ListItemText primary="Cart" secondary={cartCount ? `${cartCount} item(s)` : undefined} />
          </ListItemButton>
          <ListItemButton onClick={() => go('/profile')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <PersonIcon fontSize="small" />
            </Box>
            <ListItemText primary="Profile" />
          </ListItemButton>
        </List>

        <Divider />

        <List
          sx={{ p: 0 }}
          subheader={
            <ListSubheader component="div" disableSticky sx={{ bgcolor: 'transparent', fontWeight: 900 }}>
              Info
            </ListSubheader>
          }
        >
          <ListItemButton onClick={() => go('/about')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <InfoIcon fontSize="small" />
            </Box>
            <ListItemText primary="About Us" />
          </ListItemButton>
          <ListItemButton onClick={() => go('/faq')}>
            <Box sx={{ mr: 1.5, display: 'inline-flex' }}>
              <HelpIcon fontSize="small" />
            </Box>
            <ListItemText primary="FAQ" />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Header;

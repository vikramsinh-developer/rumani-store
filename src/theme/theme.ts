// ============================================================
// MUI THEME CONFIGURATION - src/theme/theme.ts
// ============================================================

import { createTheme } from '@mui/material/styles';

// Luxury Color Palette
const colors = {
  gold: '#B8860B',
  darkGold: '#DAA520',
  lightGold: '#F0E68C',
  deepBlack: '#1A1A1A',
  charcoal: '#2C2C2C',
  cream: '#FDFAF5',
  offWhite: '#F5F5F0',
  white: '#FFFFFF',
  lightGray: '#E8E8E8',
  mediumGray: '#999999',
  darkGray: '#4A4A4A',
  error: '#D32F2F',
  success: '#388E3C',
  warning: '#F57C00',
  info: '#1976D2',
};

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: colors.gold,
      light: colors.darkGold,
      dark: '#8B6914',
      contrastText: colors.white,
    },
    secondary: {
      main: colors.deepBlack,
      light: colors.charcoal,
      dark: '#0F0F0F',
      contrastText: colors.cream,
    },
    background: {
      default: colors.cream,
      paper: colors.white,
    },
    text: {
      primary: colors.deepBlack,
      secondary: colors.darkGray,
    },
    divider: colors.lightGray,
    error: {
      main: colors.error,
    },
    success: {
      main: colors.success,
    },
    warning: {
      main: colors.warning,
    },
    info: {
      main: colors.info,
    },
  },
  typography: {
    fontFamily: [
      '"Segoe UI"',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      color: colors.deepBlack,
      marginBottom: '1.5rem',
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.01em',
      color: colors.deepBlack,
      marginBottom: '1.25rem',
    },
    h3: {
      fontSize: '1.875rem',
      fontWeight: 600,
      color: colors.deepBlack,
      marginBottom: '1rem',
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: colors.deepBlack,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
      color: colors.deepBlack,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
      color: colors.deepBlack,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
      color: colors.darkGray,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.57,
      color: colors.mediumGray,
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      fontSize: '1rem',
    },
    caption: {
      fontSize: '0.75rem',
      color: colors.mediumGray,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          padding: '10px 24px',
          transition: 'all 0.3s ease',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(184, 134, 11, 0.15)',
          },
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 24px rgba(184, 134, 11, 0.2)',
          },
        },
        outlined: {
          borderColor: colors.gold,
          color: colors.gold,
          '&:hover': {
            backgroundColor: 'rgba(184, 134, 11, 0.05)',
            borderColor: colors.darkGold,
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained' },
          style: {
            backgroundColor: colors.gold,
            color: colors.white,
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          border: `1px solid ${colors.lightGray}`,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-4px)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation0: {
          boxShadow: 'none',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: colors.gold,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.gold,
              boxShadow: `0 0 0 2px rgba(184, 134, 11, 0.1)`,
            },
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '4px',
          backgroundColor: colors.offWhite,
          '&:hover': {
            backgroundColor: colors.white,
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: '20px',
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: colors.gold,
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'color 0.3s ease',
          '&:hover': {
            color: colors.darkGold,
            textDecoration: 'underline',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.white,
          color: colors.deepBlack,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.white,
          borderRight: `1px solid ${colors.lightGray}`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.3s ease',
          '&:hover': {
            backgroundColor: `rgba(184, 134, 11, 0.08)`,
            color: colors.gold,
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '8px',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
        },
      },
    },
    MuiRating: {
      styleOverrides: {
        root: {
          color: colors.gold,
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: {
          backgroundColor: colors.error,
          color: colors.white,
        },
      },
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 4,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});

export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'dark',
    primary: {
      main: colors.darkGold,
      light: colors.lightGold,
      dark: colors.gold,
      contrastText: colors.deepBlack,
    },
    secondary: {
      main: colors.offWhite,
      light: colors.white,
      dark: colors.lightGray,
      contrastText: colors.deepBlack,
    },
    background: {
      default: colors.deepBlack,
      paper: colors.charcoal,
    },
    text: {
      primary: colors.white,
      secondary: colors.lightGray,
    },
  },
  components: {
    ...theme.components,
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: colors.charcoal,
          color: colors.white,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: colors.charcoal,
          borderRight: `1px solid ${colors.darkGray}`,
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: colors.deepBlack,
            '&:hover fieldset': {
              borderColor: colors.darkGold,
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.darkGold,
            },
          },
        },
      },
    },
  },
});

export default theme;

// Export color palette for use in other files
export const colorPalette = colors;
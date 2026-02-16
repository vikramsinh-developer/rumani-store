// ============================================================
// MAIN LAYOUT - src/components/layout/MainLayout.tsx
// ============================================================

import { Outlet } from 'react-router-dom';
import { Box } from '@mui/material';
import Header from '../common/Header';
import Footer from '../common/Footer';

const MainLayout: React.FC = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      
      <Box
        component="main"
        sx={{
          flex: 1,
          py: 4,
          px: { xs: 2, sm: 3, md: 4 },
          maxWidth: '1400px',
          mx: 'auto',
          width: '100%',
        }}
      >
        <Outlet />
      </Box>

      <Footer />
    </Box>
  );
};

export default MainLayout;
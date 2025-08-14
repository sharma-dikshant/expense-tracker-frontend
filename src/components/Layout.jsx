import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box, Paper, BottomNavigation, BottomNavigationAction } from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Analytics as AnalyticsIcon,
  SwapHoriz as LoanIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const getCurrentTab = () => {
    if (location.pathname === '/app') return 0;
    if (location.pathname === '/app/analytics') return 1;
    if (location.pathname === '/app/loans') return 2;
    return 0;
  };

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case 0:
        navigate('/app');
        break;
      case 1:
        navigate('/app/analytics');
        break;
      case 2:
        navigate('/app/loans');
        break;
      default:
        navigate('/app');
    }
  };

  return (
    <Box sx={{ pb: 7, minHeight: '100vh' }}>
      <Box sx={{ p: 2 }}>
        <Outlet />
      </Box>
      
      <Paper
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          borderTop: '1px solid',
          borderColor: 'grey.200',
        }}
        elevation={3}
      >
        <BottomNavigation
          value={getCurrentTab()}
          onChange={handleTabChange}
          showLabels
        >
          <BottomNavigationAction
            label="Expenses"
            icon={<WalletIcon />}
          />
          <BottomNavigationAction
            label="Analytics"
            icon={<AnalyticsIcon />}
          />
          <BottomNavigationAction
            label="Loans"
            icon={<LoanIcon />}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default Layout; 
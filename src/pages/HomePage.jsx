import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
} from '@mui/material';
import {
  AccountBalanceWallet as WalletIcon,
  Analytics as AnalyticsIcon,
  SwapHoriz as LoanIcon,
  TrendingUp as TrendingIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <WalletIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Track Expenses',
      description: 'Easily log and categorize your daily expenses',
    },
    {
      icon: <AnalyticsIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Smart Analytics',
      description: 'Get insights into your spending patterns',
    },
    {
      icon: <LoanIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Loan Tracker',
      description: 'Manage money lent and borrowed',
    },
    {
      icon: <TrendingIcon sx={{ fontSize: 40, color: 'primary.main' }} />,
      title: 'Budget Planning',
      description: 'Set budgets and track your progress',
    },
  ];

  return (
    <Container maxWidth="sm" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            background: 'linear-gradient(45deg, #3B82F6, #60A5FA)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Expense Tracker
        </Typography>
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 4, lineHeight: 1.6 }}
        >
          Take control of your finances with our simple and intuitive expense tracking app
        </Typography>
        
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/login')}
            sx={{ minWidth: 120 }}
          >
            Login
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/signup')}
            sx={{ minWidth: 120 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 6 }}>
        {features.map((feature, index) => (
          <Grid item xs={6} key={index}>
            <Card
              sx={{
                height: '100%',
                textAlign: 'center',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-4px)',
                },
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box sx={{ mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Paper sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 600 }}>
          Ready to start?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Join thousands of users who are already taking control of their finances
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/app')}
          sx={{ minWidth: 200 }}
        >
          Get Started Free
        </Button>
      </Paper>
    </Container>
  );
};

export default HomePage; 
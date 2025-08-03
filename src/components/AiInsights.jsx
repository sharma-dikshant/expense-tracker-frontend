import React from 'react';
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  Grid,
  Chip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Info as InfoIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { aiInsights } from '../data/mockData';

const AiInsights = () => {
  const getInsightIcon = (type) => {
    switch (type) {
      case 'success':
        return <TrendingDownIcon />;
      case 'warning':
        return <WarningIcon />;
      case 'info':
        return <InfoIcon />;
      default:
        return <InfoIcon />;
    }
  };

  const getInsightSeverity = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <Box>
      <Grid container spacing={2}>
        {aiInsights.map((insight) => (
          <Grid item xs={12} md={6} key={insight.id}>
            <Alert
              severity={getInsightSeverity(insight.type)}
              icon={getInsightIcon(insight.type)}
              sx={{ 
                '& .MuiAlert-message': {
                  width: '100%',
                },
              }}
            >
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                    {insight.category}
                  </Typography>
                  <Chip
                    label={insight.type}
                    size="small"
                    color={getInsightSeverity(insight.type)}
                    variant="outlined"
                  />
                </Box>
                <Typography variant="body2">
                  {insight.message}
                </Typography>
              </Box>
            </Alert>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center' }}>
          💡 These insights are generated based on your spending patterns and budget data. 
          They help you make informed financial decisions.
        </Typography>
      </Box>
    </Box>
  );
};

export default AiInsights; 
import React from 'react';
import {
  Box,
  Typography,
  LinearProgress,
  Grid,
  Chip,
} from '@mui/material';
import { budgets } from '../data/mockData';

const BudgetSection = () => {
  const getProgressColor = (spent, limit) => {
    const percentage = (spent / limit) * 100;
    if (percentage >= 90) return 'error';
    if (percentage >= 75) return 'warning';
    return 'success';
  };

  const getProgressValue = (spent, limit) => {
    return Math.min((spent / limit) * 100, 100);
  };

  return (
    <Box>
      {budgets.map((budget) => {
        const progressColor = getProgressColor(budget.spent, budget.limit);
        const progressValue = getProgressValue(budget.spent, budget.limit);
        const remaining = budget.limit - budget.spent;
        
        return (
          <Box key={budget.id} sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {budget.name}
              </Typography>
              <Chip 
                label={`$${budget.spent.toFixed(2)} / $${budget.limit.toFixed(2)}`}
                size="small"
                color={progressColor}
                variant="outlined"
              />
            </Box>
            
            <LinearProgress
              variant="determinate"
              value={progressValue}
              color={progressColor}
              sx={{ 
                height: 8, 
                borderRadius: 4,
                mb: 1,
                backgroundColor: 'grey.200',
              }}
            />
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="caption" color="text.secondary">
                {progressValue.toFixed(1)}% used
              </Typography>
              <Typography 
                variant="caption" 
                color={remaining < 0 ? 'error.main' : 'text.secondary'}
                sx={{ fontWeight: remaining < 0 ? 600 : 400 }}
              >
                {remaining >= 0 ? `$${remaining.toFixed(2)} left` : `$${Math.abs(remaining).toFixed(2)} over`}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
};

export default BudgetSection; 
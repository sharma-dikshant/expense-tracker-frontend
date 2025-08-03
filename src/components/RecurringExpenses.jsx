import React from 'react';
import {
  Box,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
  Divider,
} from '@mui/material';
import { format } from 'date-fns';
import { recurringExpenses } from '../data/mockData';

const RecurringExpenses = () => {
  const activeExpenses = recurringExpenses.filter(expense => expense.isActive);
  const inactiveExpenses = recurringExpenses.filter(expense => !expense.isActive);

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case 'weekly': return 'primary';
      case 'monthly': return 'success';
      case 'yearly': return 'warning';
      default: return 'default';
    }
  };

  const renderExpenseList = (expenses, title) => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2, color: 'text.secondary' }}>
        {title} ({expenses.length})
      </Typography>
      <List sx={{ p: 0 }}>
        {expenses.map((expense, index) => (
          <Box key={expense.id}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {expense.description}
                    </Typography>
                    <Chip
                      label={expense.frequency}
                      size="small"
                      color={getFrequencyColor(expense.frequency)}
                      variant="outlined"
                    />
                  </Box>
                }
                secondary={
                  <Box>
                    <Typography variant="body2" color="text.secondary">
                      ${expense.amount.toFixed(2)} • {expense.category}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Next due: {format(new Date(expense.nextDue), 'MMM dd, yyyy')}
                    </Typography>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={expense.isActive}
                  onChange={() => {
                    // In a real app, this would update the expense status
                    console.log('Toggle expense:', expense.id);
                  }}
                />
              </ListItemSecondaryAction>
            </ListItem>
            {index < expenses.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  );

  return (
    <Box>
      {activeExpenses.length > 0 && renderExpenseList(activeExpenses, 'Active')}
      {inactiveExpenses.length > 0 && renderExpenseList(inactiveExpenses, 'Inactive')}
      
      {recurringExpenses.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No recurring expenses yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your first recurring expense to get started
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecurringExpenses; 
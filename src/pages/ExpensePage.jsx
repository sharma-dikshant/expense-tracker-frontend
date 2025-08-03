import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  AccountBalanceWallet as BudgetIcon,
  Repeat as RecurringIcon,
} from '@mui/icons-material';

import Calendar from '../components/Calendar';
import BudgetSection from '../components/BudgetSection';
import RecurringExpenses from '../components/RecurringExpenses';
import AddExpenseModal from '../components/AddExpenseModal';
import AddBudgetModal from '../components/AddBudgetModal';
import AddRecurringModal from '../components/AddRecurringModal';

const ExpensePage = () => {
  const [showExpenseAmounts, setShowExpenseAmounts] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const [isAddRecurringOpen, setIsAddRecurringOpen] = useState(false);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsAddExpenseOpen(true);
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Expense Tracker
      </Typography>

      {/* Calendar Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Calendar View
              </Typography>
            </Box>
            <FormControlLabel
              control={
                <Switch
                  checked={showExpenseAmounts}
                  onChange={(e) => setShowExpenseAmounts(e.target.checked)}
                />
              }
              label="Show amounts"
            />
          </Box>
          <Calendar
            showAmounts={showExpenseAmounts}
            onDateClick={handleDateClick}
          />
        </CardContent>
      </Card>

      {/* Budget Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <BudgetIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Budgets
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setIsAddBudgetOpen(true)}
            >
              Add Budget
            </Button>
          </Box>
          <BudgetSection />
        </CardContent>
      </Card>

      {/* Recurring Expenses Section */}
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <RecurringIcon color="primary" />
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Recurring Expenses
              </Typography>
            </Box>
            <Button
              variant="outlined"
              size="small"
              startIcon={<AddIcon />}
              onClick={() => setIsAddRecurringOpen(true)}
            >
              Add Recurring
            </Button>
          </Box>
          <RecurringExpenses />
        </CardContent>
      </Card>

      {/* Modals */}
      <AddExpenseModal
        open={isAddExpenseOpen}
        onClose={() => setIsAddExpenseOpen(false)}
        selectedDate={selectedDate}
      />
      
      <AddBudgetModal
        open={isAddBudgetOpen}
        onClose={() => setIsAddBudgetOpen(false)}
      />
      
      <AddRecurringModal
        open={isAddRecurringOpen}
        onClose={() => setIsAddRecurringOpen(false)}
      />
    </Box>
  );
};

export default ExpensePage; 
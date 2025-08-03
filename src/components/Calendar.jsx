import React, { useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  IconButton,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths } from 'date-fns';
import { expenses } from '../data/mockData';

const Calendar = ({ showAmounts, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = eachDayOfInterval({ start: monthStart, end: monthEnd });

  // Get expenses for a specific date
  const getExpensesForDate = (date) => {
    return expenses.filter(expense => 
      isSameDay(new Date(expense.date), date)
    );
  };

  // Calculate total amount for a date
  const getTotalForDate = (date) => {
    const dayExpenses = getExpensesForDate(date);
    return dayExpenses.reduce((total, expense) => total + expense.amount, 0);
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleDateClick = (date) => {
    onDateClick(date);
  };

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <IconButton onClick={handlePreviousMonth} size="small">
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {format(currentDate, 'MMMM yyyy')}
        </Typography>
        <IconButton onClick={handleNextMonth} size="small">
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Weekday headers */}
      <Grid container sx={{ mb: 1 }}>
        {weekdays.map((day) => (
          <Grid item xs={12/7} key={day}>
            <Box sx={{ 
              p: 1, 
              textAlign: 'center',
              backgroundColor: 'grey.50',
              borderRadius: 1,
              mx: 0.5
            }}>
              <Typography variant="caption" sx={{ fontWeight: 600, color: 'text.secondary' }}>
                {day}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Calendar grid */}
      <Grid container spacing={0.5}>
        {daysInMonth.map((date) => {
          const totalAmount = getTotalForDate(date);
          const hasExpenses = totalAmount > 0;
          
          return (
            <Grid item xs={12/7} key={date.toString()}>
              <Paper
                sx={{
                  p: 1,
                  minHeight: 60,
                  cursor: 'pointer',
                  border: '1px solid',
                  borderColor: 'grey.200',
                  backgroundColor: hasExpenses ? 'primary.50' : 'background.paper',
                  '&:hover': {
                    backgroundColor: 'primary.100',
                    borderColor: 'primary.main',
                  },
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
                onClick={() => handleDateClick(date)}
              >
                <Typography 
                  variant="body2" 
                  sx={{ 
                    fontWeight: isSameDay(date, new Date()) ? 700 : 400,
                    color: isSameDay(date, new Date()) ? 'primary.main' : 'text.primary',
                  }}
                >
                  {format(date, 'd')}
                </Typography>
                
                {showAmounts && hasExpenses && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      fontWeight: 600,
                      color: 'primary.main',
                      textAlign: 'center',
                    }}
                  >
                    ${totalAmount.toFixed(2)}
                  </Typography>
                )}
                
                {!showAmounts && hasExpenses && (
                  <Box 
                    sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      backgroundColor: 'primary.main',
                      alignSelf: 'center',
                    }} 
                  />
                )}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default Calendar; 
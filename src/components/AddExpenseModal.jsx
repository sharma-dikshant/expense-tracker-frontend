import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { format } from 'date-fns';
import { categories, budgets } from '../data/mockData';

const AddExpenseModal = ({ open, onClose, selectedDate }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: selectedDate || new Date(),
    budgetId: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the expense
    console.log('New expense:', formData);
    onClose();
    // Reset form
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date(),
      budgetId: '',
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      amount: '',
      category: '',
      description: '',
      date: new Date(),
      budgetId: '',
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Add New Expense
        </Typography>
        {selectedDate && (
          <Typography variant="body2" color="text.secondary">
            Date: {format(selectedDate, 'MMMM dd, yyyy')}
          </Typography>
        )}
      </DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Amount"
            type="number"
            value={formData.amount}
            onChange={(e) => handleChange('amount', e.target.value)}
            margin="normal"
            required
            inputProps={{ min: 0, step: 0.01 }}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Category</InputLabel>
            <Select
              value={formData.category}
              label="Category"
              onChange={(e) => handleChange('category', e.target.value)}
              required
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.name}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Description"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />

          <DatePicker
            label="Date"
            value={formData.date}
            onChange={(newDate) => handleChange('date', newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ mb: 2 }} />}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Assign to Budget (Optional)</InputLabel>
            <Select
              value={formData.budgetId}
              label="Assign to Budget (Optional)"
              onChange={(e) => handleChange('budgetId', e.target.value)}
            >
              <MenuItem value="">
                <em>No budget assignment</em>
              </MenuItem>
              {budgets.map((budget) => (
                <MenuItem key={budget.id} value={budget.id}>
                  {budget.name} (${budget.limit.toFixed(2)})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add Expense
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddExpenseModal; 
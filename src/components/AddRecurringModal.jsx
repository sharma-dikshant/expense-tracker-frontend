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
import { categories } from '../data/mockData';

const AddRecurringModal = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    frequency: 'monthly',
    nextDue: new Date(),
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the recurring expense
    console.log('New recurring expense:', formData);
    onClose();
    // Reset form
    setFormData({
      amount: '',
      category: '',
      description: '',
      frequency: 'monthly',
      nextDue: new Date(),
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      amount: '',
      category: '',
      description: '',
      frequency: 'monthly',
      nextDue: new Date(),
    });
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Add Recurring Expense
        </Typography>
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

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Frequency</InputLabel>
            <Select
              value={formData.frequency}
              label="Frequency"
              onChange={(e) => handleChange('frequency', e.target.value)}
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="yearly">Yearly</MenuItem>
            </Select>
          </FormControl>

          <DatePicker
            label="Next Due Date"
            value={formData.nextDue}
            onChange={(newDate) => handleChange('nextDue', newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add Recurring Expense
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddRecurringModal; 
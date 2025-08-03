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

const AddLoanModal = ({ open, onClose, type }) => {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    date: new Date(),
    status: 'pending',
    notes: '',
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would save the loan
    console.log('New loan:', { ...formData, type });
    onClose();
    // Reset form
    setFormData({
      name: '',
      amount: '',
      date: new Date(),
      status: 'pending',
      notes: '',
    });
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      name: '',
      amount: '',
      date: new Date(),
      status: 'pending',
      notes: '',
    });
  };

  const getTitle = () => {
    return type === 'lent' ? 'Add Money Lent' : 'Add Money Borrowed';
  };

  const getPersonLabel = () => {
    return type === 'lent' ? 'Person Name (Who you lent to)' : 'Person Name (Who you borrowed from)';
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {getTitle()}
        </Typography>
      </DialogTitle>
      
      <Box component="form" onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label={getPersonLabel()}
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            margin="normal"
            required
            sx={{ mb: 2 }}
          />

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

          <DatePicker
            label="Date"
            value={formData.date}
            onChange={(newDate) => handleChange('date', newDate)}
            renderInput={(params) => <TextField {...params} fullWidth margin="normal" sx={{ mb: 2 }} />}
          />

          <FormControl fullWidth margin="normal" sx={{ mb: 2 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={formData.status}
              label="Status"
              onChange={(e) => handleChange('status', e.target.value)}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="settled">Settled</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            label="Notes (Optional)"
            value={formData.notes}
            onChange={(e) => handleChange('notes', e.target.value)}
            margin="normal"
            multiline
            rows={3}
          />
        </DialogContent>

        <DialogActions sx={{ p: 3, pt: 0 }}>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button type="submit" variant="contained">
            Add {type === 'lent' ? 'Lent' : 'Borrowed'}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default AddLoanModal; 
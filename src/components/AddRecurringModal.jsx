import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { createRecurringExpense } from "../services/recurringExpenseApi";

const AddRecurringModal = ({ open, handleClose, onSuccess }) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    name: "",
    amount: "",
    frequency: "",
    startDate: "",
    category: "",
    notes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await createRecurringExpense(formData);
      if (onSuccess) onSuccess();
      handleClose();
      setFormData({
        name: "",
        amount: "",
        frequency: "",
        startDate: "",
        category: "",
        notes: "",
      });
    } catch (err) {
      console.error("Error creating recurring expense:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen={fullScreen}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>Add Recurring Expense</DialogTitle>
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={2}>
          {/* Name */}
          <TextField
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            fullWidth
          />

          {/* Amount */}
          <TextField
            label="Amount"
            name="amount"
            type="number"
            value={formData.amount}
            onChange={handleChange}
            fullWidth
          />

          {/* Frequency */}
          <FormControl fullWidth>
            <InputLabel>Frequency</InputLabel>
            <Select
              name="frequency"
              value={formData.frequency}
              onChange={handleChange}
            >
              <MenuItem value="daily">Daily</MenuItem>
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
            </Select>
          </FormControl>

          {/* Conditional Inputs */}
          {formData.frequency === "weekly" && (
            <TextField
              label="Day of Week"
              name="dayOfWeek"
              value={formData.dayOfWeek || ""}
              onChange={handleChange}
              fullWidth
            />
          )}
          {formData.frequency === "monthly" && (
            <TextField
              label="Day of Month"
              name="dayOfMonth"
              value={formData.dayOfMonth || ""}
              onChange={handleChange}
              fullWidth
            />
          )}
          {formData.frequency === "yearly" && (
            <TextField
              label="Month & Day"
              name="monthDay"
              value={formData.monthDay || ""}
              onChange={handleChange}
              fullWidth
            />
          )}

          {/* Start Date */}
          <TextField
            label="Start Date"
            name="startDate"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={formData.startDate}
            onChange={handleChange}
            fullWidth
          />

          {/* Category */}
          <TextField
            label="Category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            fullWidth
          />

          {/* Notes */}
          <TextField
            label="Notes"
            name="notes"
            multiline
            rows={2}
            value={formData.notes}
            onChange={handleChange}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="contained" onClick={handleSubmit} disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddRecurringModal;

import { useEffect, useState } from "react";
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
} from "@mui/material";
import { format } from "date-fns";
import { categories } from "./../data/mockData";
import { getALlBudgetOfLoginUser } from "./../services/budgetApi";
import { createExpense } from "./../services/expenseApi";
import toast from "react-hot-toast";

const AddExpenseModal = ({ open, onClose, selectedDate }) => {
  console.log(selectedDate);
  const [budgets, setBudgets] = useState([]);
  const [formData, setFormData] = useState({
    amount: "",
    category: "",
    description: "",
    date: selectedDate,
    budget: "",
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      date: selectedDate || new Date(),
    }));
  }, [selectedDate]);

  useEffect(() => {
    getALlBudgetOfLoginUser().then((res) => setBudgets(res.data.data));
  }, []);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createExpense(formData)
      .then(() => {
        onClose();
        setFormData({
          amount: "",
          category: "",
          description: "",
          date: new Date(),
          budget: "",
        });
        toast.success("added..");
      })
      .catch((e) => toast.error("failed"));
  };

  const handleClose = () => {
    onClose();
    // Reset form
    setFormData({
      amount: "",
      category: "",
      description: "",
      date: new Date(),
      budget: "",
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
            Date: {format(selectedDate, "MMMM dd, yyyy")}
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
            onChange={(e) => handleChange("amount", e.target.value)}
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
              onChange={(e) => handleChange("category", e.target.value)}
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
            onChange={(e) => handleChange("description", e.target.value)}
            margin="normal"
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth margin="normal">
            <InputLabel>Assign to Budget (Optional)</InputLabel>
            <Select
              value={formData.budget}
              label="Assign to Budget (Optional)"
              onChange={(e) => handleChange("budget", e.target.value)}
            >
              <MenuItem value="">
                <em>No budget assignment</em>
              </MenuItem>
              {budgets.map((budget) => (
                <MenuItem key={budget._id} value={budget._id}>
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

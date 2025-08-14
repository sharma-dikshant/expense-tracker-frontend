import React, { useEffect, useState } from "react";
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
  IconButton,
  Button,
} from "@mui/material";
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { format } from "date-fns";
import {
  createRecurringExpense,
  getAllRecurringExpenseOfLoggedInUser,
  updateRecurringExpense,
} from "../services/recurringExpenseApi";
import AddRecurringModal from "./AddRecurringModal"; // ✅ use your existing modal

const RecurringExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [form, setForm] = useState({
    description: "",
    amount: "",
    category: "",
    frequency: "monthly",
    nextDue: "",
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const res = await getAllRecurringExpenseOfLoggedInUser();
      setExpenses(res.data.data || []);
    } catch (err) {
      console.error("Error fetching recurring expenses:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case "weekly":
        return "primary";
      case "monthly":
        return "success";
      case "yearly":
        return "warning";
      default:
        return "default";
    }
  };

  const handleToggle = async (expense) => {
    try {
      await updateRecurringExpense(expense._id, {
        active: !expense.active,
      });
      fetchExpenses();
    } catch (err) {
      console.error("Error updating active status:", err);
    }
  };

  const handleCreate = () => {
    setForm({
      description: "",
      amount: "",
      category: "",
      frequency: "monthly",
      nextDue: "",
    });
    setOpenModal(true);
  };

  const handleSave = async () => {
    try {
      await createRecurringExpense(form);
      fetchExpenses();
      setOpenModal(false);
    } catch (err) {
      console.error("Error saving recurring expense:", err);
    }
  };

  const renderExpenseList = (list, title) => (
    <Box sx={{ mb: 3 }}>
      <Typography
        variant="subtitle1"
        sx={{ fontWeight: 600, mb: 2, color: "text.secondary" }}
      >
        {title} ({list.length})
      </Typography>
      <List sx={{ p: 0 }}>
        {list.map((expense, index) => (
          <Box key={expense._id}>
            <ListItem sx={{ px: 0, py: 1 }}>
              <ListItemText
                primary={
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                      mb: 0.5,
                    }}
                  >
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {expense.name}
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
                      ${Number(expense.amount).toFixed(2)} • {expense.category}
                    </Typography>
                    {expense.nextDue && (
                      <Typography variant="caption" color="text.secondary">
                        Next due:{" "}
                        {format(new Date(expense.nextDue), "MMM dd, yyyy")}
                      </Typography>
                    )}
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Switch
                    edge="end"
                    checked={expense.active}
                    onChange={() => handleToggle(expense)}
                  />
                  <IconButton
                    edge="end"
                    color="primary"
                    onClick={() => console.log("Edit feature not in create mode")}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="error"
                    onClick={() => console.log("Delete", expense._id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              </ListItemSecondaryAction>
            </ListItem>
            {index < list.length - 1 && <Divider />}
          </Box>
        ))}
      </List>
    </Box>
  );

  const activeExpenses = expenses.filter((e) => e.active);
  const inactiveExpenses = expenses.filter((e) => !e.active);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Recurring Expenses</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleCreate}
        >
          Add
        </Button>
      </Box>

      {activeExpenses.length > 0 && renderExpenseList(activeExpenses, "Active")}
      {inactiveExpenses.length > 0 &&
        renderExpenseList(inactiveExpenses, "Inactive")}

      {expenses.length === 0 && !loading && (
        <Box sx={{ textAlign: "center", py: 4 }}>
          <Typography variant="body1" color="text.secondary">
            No recurring expenses yet
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add your first recurring expense to get started
          </Typography>
        </Box>
      )}

      {/* ✅ Use your modal only for creating */}
      <AddRecurringModal
        open={openModal}
        handleClose={() => setOpenModal(false)}
        form={form}
        setForm={setForm}
        onSave={handleSave}
      />
    </Box>
  );
};

export default RecurringExpenses;

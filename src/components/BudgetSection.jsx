import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  LinearProgress,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import {
  getALlBudgetOfLoginUser,
  createNewBudget,
  updateBudget,
} from "../services/budgetApi";
import toast from "react-hot-toast";

const BudgetSection = () => {
  const [budgets, setBudgets] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    period: "monthly",
    limit: "",
    spend: 0,
  });
  const [editId, setEditId] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    fetchBudgets();
  }, []);

  const fetchBudgets = () => {
    getALlBudgetOfLoginUser()
      .then((res) => setBudgets(res.data.data))
      .catch(() => toast.error("Failed to fetch budget details"));
  };

  const getProgressColor = (spend, limit) => {
    const percentage = (spend / limit) * 100;
    if (percentage >= 90) return "error";
    if (percentage >= 75) return "warning";
    return "success";
  };

  const getProgressValue = (spend, limit) => {
    return Math.min((spend / limit) * 100, 100);
  };

  const handleOpenCreate = () => {
    setEditId(null);
    setFormData({ name: "", period: "monthly", limit: "", spend: 0 });
    setOpenForm(true);
  };

  const handleEdit = (budget) => {
    setEditId(budget._id);
    setFormData({
      name: budget.name,
      period: budget.period,
      limit: budget.limit,
      spend: budget.spend,
    });
    setOpenForm(true);
  };

  const handleDelete = (id) => {
    console.log("TODO: Delete budget", id);
  };

  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateBudget(editId, formData);
        toast.success("Budget updated successfully");
      } else {
        await createNewBudget(formData);
        toast.success("Budget created successfully");
      }
      setOpenForm(false);
      fetchBudgets();
    } catch (err) {
      toast.error("Failed to save budget");
    }
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Budgets
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenCreate}
        >
          Add Budget
        </Button>
      </Box>

      {/* Budget List */}
      {budgets?.map((budget) => {
        const progressColor = getProgressColor(budget.spend, budget.limit);
        const progressValue = getProgressValue(budget.spend, budget.limit);
        const remaining = budget.limit - budget.spend;

        return (
          <Box key={budget._id} sx={{ mb: 4 }}>
            {/* Title and Actions */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 1,
              }}
            >
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {budget.name}{" "}
                <Typography
                  component="span"
                  variant="caption"
                  color="text.secondary"
                >
                  ({budget.period})
                </Typography>
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Chip
                  label={`$${budget.spend?.toFixed(
                    2
                  )} / $${budget.limit?.toFixed(2)}`}
                  size="small"
                  color={progressColor}
                  variant="outlined"
                />
                <IconButton
                  size="small"
                  color="primary"
                  onClick={() => handleEdit(budget)}
                >
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton
                  size="small"
                  color="error"
                  onClick={() => handleDelete(budget._id)}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>

            {/* Progress bar */}
            <LinearProgress
              variant="determinate"
              value={progressValue}
              color={progressColor}
              sx={{
                height: 8,
                borderRadius: 4,
                mb: 1,
                backgroundColor: "grey.200",
              }}
            />

            {/* Bottom text */}
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="caption" color="text.secondary">
                {progressValue.toFixed(1)}% used
              </Typography>
              <Typography
                variant="caption"
                color={remaining < 0 ? "error.main" : "text.secondary"}
                sx={{ fontWeight: remaining < 0 ? 600 : 400 }}
              >
                {remaining >= 0
                  ? `$${remaining.toFixed(2)} left`
                  : `$${Math.abs(remaining).toFixed(2)} over`}
              </Typography>
            </Box>
          </Box>
        );
      })}

      {/* Create/Edit Dialog */}
      <Dialog
        open={openForm}
        onClose={() => setOpenForm(false)}
        fullScreen={fullScreen}
        fullWidth
        maxWidth="sm"
        PaperProps={{
          sx: {
            borderRadius: fullScreen ? 0 : 3,
            p: 2,
            ...(fullScreen
              ? {}
              : {
                  minWidth: "400px",
                  maxWidth: "500px",
                }),
          },
        }}
      >
        <DialogTitle>{editId ? "Edit Budget" : "Create Budget"}</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 1 }}
        >
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
          />
          <TextField
            select
            label="Period"
            value={formData.period}
            onChange={(e) =>
              setFormData({ ...formData, period: e.target.value })
            }
            fullWidth
          >
            <MenuItem value="monthly">Monthly</MenuItem>
            <MenuItem value="yearly">Yearly</MenuItem>
          </TextField>
          <TextField
            type="number"
            label="Limit"
            value={formData.limit}
            onChange={(e) =>
              setFormData({ ...formData, limit: Number(e.target.value) })
            }
            fullWidth
          />
          <TextField
            type="number"
            label="Spend"
            value={formData.spend}
            onChange={(e) =>
              setFormData({ ...formData, spend: Number(e.target.value) })
            }
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenForm(false)}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editId ? "Update" : "Create"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default BudgetSection;

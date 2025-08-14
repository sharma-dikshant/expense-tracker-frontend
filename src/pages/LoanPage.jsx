import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Tabs,
  Tab,
  Button,
  Grid,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Divider,
  CircularProgress,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  SwapHoriz as SwapIcon,
} from "@mui/icons-material";

import AddLoanModal from "../components/AddLoanModal";
import {
  getAllDebtEntryofLoggedInUser,
  createNewDebtEntry,
  updateDebtEntry,
  deleteDebtEntry,
} from "./../services/debtEntryApi"; // Adjust path

const LoanPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch loans from backend
  const fetchLoans = async () => {
    setLoading(true);
    try {
      const res = await getAllDebtEntryofLoggedInUser();
      if (res.data?.data) {
        setLoans(res.data.data);
      }
    } catch (err) {
      console.error("Error fetching loans:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  const lentLoans = loans.filter((loan) => loan.type === "lent");
  const borrowedLoans = loans.filter((loan) => loan.type === "borrow");

  const totalLent = lentLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalBorrowed = borrowedLoans.reduce(
    (sum, loan) => sum + loan.amount,
    0
  );
  const pendingLent = lentLoans
    .filter((loan) => loan.status === "pending")
    .reduce((sum, loan) => sum + loan.amount, 0);
  const pendingBorrowed = borrowedLoans
    .filter((loan) => loan.status === "pending")
    .reduce((sum, loan) => sum + loan.amount, 0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkSettled = async (loanId) => {
    try {
      await updateDebtEntry(loanId, { status: "settled" });
      fetchLoans();
    } catch (err) {
      console.error("Error marking loan settled:", err);
    }
  };

  const handleDelete = async (loanId) => {
    try {
      await deleteDebtEntry(loanId);
      fetchLoans();
    } catch (err) {
      console.error("Error deleting loan:", err);
    }
  };

  const renderLoanList = (loanList) => (
    <List sx={{ p: 0 }}>
      {loanList.map((loan, index) => (
        <Box key={loan._id}>
          <ListItem sx={{ px: 0, py: 2 }}>
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
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {loan.to}
                  </Typography>
                  <Chip
                    label={loan.status}
                    size="small"
                    color={loan.status === "settled" ? "success" : "warning"}
                    variant="outlined"
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    ${loan.amount.toFixed(2)} •{" "}
                    {new Date(loan.date).toLocaleDateString()}
                  </Typography>
                  {loan.note && (
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mt: 0.5 }}
                    >
                      {loan.note}
                    </Typography>
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Box sx={{ display: "flex", gap: 1 }}>
                {loan.status === "pending" && (
                  <IconButton
                    edge="end"
                    onClick={() => handleMarkSettled(loan._id)}
                    color="success"
                    size="small"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  //TODO implement edit loan
                  onClick={() => console.log("Edit loan:", loan._id)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(loan._id)}
                  color="error"
                  size="small"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            </ListItemSecondaryAction>
          </ListItem>
          {index < loanList.length - 1 && <Divider />}
        </Box>
      ))}
    </List>
  );

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Loans & Lending
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <Typography
                variant="h6"
                color="success.main"
                sx={{ fontWeight: 600 }}
              >
                ${totalLent.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Lent
              </Typography>
              <Typography variant="caption" color="warning.main">
                ${pendingLent.toFixed(2)} pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ textAlign: "center", py: 2 }}>
              <Typography
                variant="h6"
                color="error.main"
                sx={{ fontWeight: 600 }}
              >
                ${totalBorrowed.toFixed(2)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Total Borrowed
              </Typography>
              <Typography variant="caption" color="warning.main">
                ${pendingBorrowed.toFixed(2)} pending
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Tabs */}
      <Card>
        <CardContent sx={{ p: 0 }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ px: 2 }}>
              <Tab
                label={`Lent (${lentLoans.length})`}
                icon={<SwapIcon />}
                iconPosition="start"
              />
              <Tab
                label={`Borrowed (${borrowedLoans.length})`}
                icon={<SwapIcon />}
                iconPosition="start"
              />
            </Tabs>
          </Box>

          <Box sx={{ p: 2 }}>
            {activeTab === 0 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Money Lent
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddLoanOpen(true)}
                  >
                    Add Lent
                  </Button>
                </Box>
                {lentLoans.length > 0 ? (
                  renderLoanList(lentLoans)
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No money lent yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track money you've lent to others
                    </Typography>
                  </Box>
                )}
              </Box>
            )}

            {activeTab === 1 && (
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    mb: 2,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 600 }}>
                    Money Borrowed
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => setIsAddLoanOpen(true)}
                  >
                    Add Borrowed
                  </Button>
                </Box>
                {borrowedLoans.length > 0 ? (
                  renderLoanList(borrowedLoans)
                ) : (
                  <Box sx={{ textAlign: "center", py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No money borrowed yet
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Track money you've borrowed from others
                    </Typography>
                  </Box>
                )}
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>

      {/* Add Loan Modal */}
      <AddLoanModal
        open={isAddLoanOpen}
        onClose={() => setIsAddLoanOpen(false)}
        type={activeTab === 0 ? "lent" : "borrow"}
        onAdded={fetchLoans} // Refresh after adding
      />
    </Box>
  );
};

export default LoanPage;

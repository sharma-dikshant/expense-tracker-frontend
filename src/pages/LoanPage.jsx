import React, { useState } from 'react';
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
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  CheckCircle as CheckCircleIcon,
  SwapHoriz as SwapIcon,
} from '@mui/icons-material';

import AddLoanModal from '../components/AddLoanModal';
import { loans } from '../data/mockData';

const LoanPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [isAddLoanOpen, setIsAddLoanOpen] = useState(false);

  const lentLoans = loans.filter(loan => loan.type === 'lent');
  const borrowedLoans = loans.filter(loan => loan.type === 'borrowed');

  const totalLent = lentLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const totalBorrowed = borrowedLoans.reduce((sum, loan) => sum + loan.amount, 0);
  const pendingLent = lentLoans.filter(loan => loan.status === 'pending').reduce((sum, loan) => sum + loan.amount, 0);
  const pendingBorrowed = borrowedLoans.filter(loan => loan.status === 'pending').reduce((sum, loan) => sum + loan.amount, 0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleMarkSettled = (loanId) => {
    // In a real app, this would update the loan status
    console.log('Mark as settled:', loanId);
  };

  const handleDelete = (loanId) => {
    // In a real app, this would delete the loan
    console.log('Delete loan:', loanId);
  };

  const renderLoanList = (loanList, type) => (
    <List sx={{ p: 0 }}>
      {loanList.map((loan, index) => (
        <Box key={loan.id}>
          <ListItem sx={{ px: 0, py: 2 }}>
            <ListItemText
              primary={
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {loan.name}
                  </Typography>
                  <Chip
                    label={loan.status}
                    size="small"
                    color={loan.status === 'settled' ? 'success' : 'warning'}
                    variant="outlined"
                  />
                </Box>
              }
              secondary={
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    ${loan.amount.toFixed(2)} • {new Date(loan.date).toLocaleDateString()}
                  </Typography>
                  {loan.notes && (
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                      {loan.notes}
                    </Typography>
                  )}
                </Box>
              }
            />
            <ListItemSecondaryAction>
              <Box sx={{ display: 'flex', gap: 1 }}>
                {loan.status === 'pending' && (
                  <IconButton
                    edge="end"
                    onClick={() => handleMarkSettled(loan.id)}
                    color="success"
                    size="small"
                  >
                    <CheckCircleIcon />
                  </IconButton>
                )}
                <IconButton
                  edge="end"
                  onClick={() => console.log('Edit loan:', loan.id)}
                  size="small"
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => handleDelete(loan.id)}
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

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Loans & Lending
      </Typography>

      {/* Summary Cards */}
      <Grid container spacing={2} sx={{ mb: 3 }}>
        <Grid item xs={6}>
          <Card>
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="success.main" sx={{ fontWeight: 600 }}>
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
            <CardContent sx={{ textAlign: 'center', py: 2 }}>
              <Typography variant="h6" color="error.main" sx={{ fontWeight: 600 }}>
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
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                  renderLoanList(lentLoans, 'lent')
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
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
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
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
                  renderLoanList(borrowedLoans, 'borrowed')
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
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
        type={activeTab === 0 ? 'lent' : 'borrowed'}
      />
    </Box>
  );
};

export default LoanPage; 
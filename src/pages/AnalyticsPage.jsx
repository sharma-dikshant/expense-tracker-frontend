import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Chip,
  Alert,
  AlertTitle,
} from '@mui/material';
import {
  PieChart as PieChartIcon,
  TrendingUp as TrendingIcon,
  BarChart as BarChartIcon,
  Download as DownloadIcon,
  Psychology as AiIcon,
} from '@mui/icons-material';

import ExpensePieChart from '../components/charts/ExpensePieChart';
import ExpenseTrendChart from '../components/charts/ExpenseTrendChart';
import BudgetUsageChart from '../components/charts/BudgetUsageChart';
import AiInsights from '../components/AiInsights';

const AnalyticsPage = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedYear, setSelectedYear] = useState('2024');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);

  return (
    <Box>
      <Typography variant="h4" component="h1" sx={{ mb: 3, fontWeight: 600 }}>
        Analytics
      </Typography>

      {/* Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Filters
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Period</InputLabel>
                <Select
                  value={selectedPeriod}
                  label="Period"
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                >
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Year</InputLabel>
                <Select
                  value={selectedYear}
                  label="Year"
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  {years.map((year) => (
                    <MenuItem key={year} value={year.toString()}>
                      {year}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {/* Expense Breakdown */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <PieChartIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Expense Breakdown
                </Typography>
              </Box>
              <ExpensePieChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Monthly Trend */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <TrendingIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Monthly Trend
                </Typography>
              </Box>
              <ExpenseTrendChart />
            </CardContent>
          </Card>
        </Grid>

        {/* Budget Usage */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <BarChartIcon color="primary" />
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Budget Usage
                </Typography>
              </Box>
              <BudgetUsageChart />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* AI Insights */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <AiIcon color="primary" />
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              AI Insights
            </Typography>
          </Box>
          <AiInsights />
        </CardContent>
      </Card>

      {/* Export Section */}
      <Card>
        <CardContent>
          <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
            Export Reports
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Download your expense reports and analytics data
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => {
                // In a real app, this would generate and download a PDF
                console.log('Downloading expense report...');
              }}
            >
              Download Expense Report
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              onClick={() => {
                // In a real app, this would export data as CSV
                console.log('Exporting data as CSV...');
              }}
            >
              Export as CSV
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default AnalyticsPage; 
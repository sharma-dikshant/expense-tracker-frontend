import React from 'react';
import { Box, Typography } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { budgetUsage } from '../../data/mockData';

const BudgetUsageChart = () => {
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const limit = payload[0].payload.limit;
      const spent = payload[0].value;
      const percentage = ((spent / limit) * 100).toFixed(1);
      
      return (
        <Box
          sx={{
            backgroundColor: 'white',
            border: '1px solid #ccc',
            borderRadius: 1,
            p: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="body2" color="primary.main">
            Spent: ${spent.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Limit: ${limit.toFixed(2)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Usage: {percentage}%
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: 400 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={budgetUsage}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis 
            dataKey="name" 
            stroke="#6B7280"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar 
            dataKey="limit" 
            fill="#E5E7EB" 
            name="Budget Limit"
            radius={[4, 4, 0, 0]}
          />
          <Bar 
            dataKey="spent" 
            fill="#3B82F6" 
            name="Amount Spent"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BudgetUsageChart; 
import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getYearStats } from "./../../services/statsApi";
const ExpenseTrendChart = ({ year }) => {
  const [monthlyExpenses, setMonthlyExpenses] = useState([]);

  useEffect(() => {
    getYearStats(year).then((res) => setMonthlyExpenses(res.data.data));
  }, [year]);

  const chartData = monthlyExpenses.map((el) => {
    const date = new Date(2000, el._id - 1, 1);
    return {
      month: date.toLocaleString("default", { month: "short" }),
      amount: el.totalMonthlyExpense,
    };
  });

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          sx={{
            backgroundColor: "white",
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 1,
            boxShadow: 2,
          }}
        >
          <Typography variant="body2" sx={{ fontWeight: 600 }}>
            {label}
          </Typography>
          <Typography variant="body2" color="primary.main">
            ${payload[0].value.toFixed(2)}
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
          <XAxis dataKey="month" stroke="#6B7280" fontSize={12} />
          <YAxis
            stroke="#6B7280"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="amount"
            stroke="#3B82F6"
            strokeWidth={3}
            dot={{ fill: "#3B82F6", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, stroke: "#3B82F6", strokeWidth: 2 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpenseTrendChart;

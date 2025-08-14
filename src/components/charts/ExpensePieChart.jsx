import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { getRandomColors } from "./../../utils/helper";
import { getMonthStats } from "./../../services/statsApi";

const ExpensePieChart = ({ month, year }) => {
  const [expenseData, setExpenseData] = useState([]);

  useEffect(() => {
    getMonthStats(month, year).then((res) => setExpenseData(res.data.data));
  }, [month, year]);

  const COLORS = getRandomColors(expenseData.length);

  const chartData = expenseData.map((el, i) => {
    return { name: el.category, value: el.monthExpense, color: COLORS[i] };
  });

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0];
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((data.value / total) * 100).toFixed(1);

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
            {data.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ${data.value.toFixed(2)} ({percentage}%)
          </Typography>
        </Box>
      );
    }
    return null;
  };

  return (
    <Box sx={{ height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default ExpensePieChart;

import React, { useEffect, useMemo, useState } from "react";
import { Box, Typography, Paper, IconButton } from "@mui/material";
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from "@mui/icons-material";
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameDay,
  addMonths,
  subMonths,
} from "date-fns";
import { getExpenses } from "./../services/expenseApi";

const Calendar = ({ showAmounts, onDateClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [expensesList, setExpensesList] = useState([]);

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const daysInMonth = useMemo(
    () => eachDayOfInterval({ start: monthStart, end: monthEnd }),
    [monthStart, monthEnd]
  );

  // Always fetch for the visible month so we can show dots even when showAmounts = false
  useEffect(() => {
    const qStr = `month=${
      currentDate.getMonth() + 1
    }&year=${currentDate.getFullYear()}&fields=date,amount`;
    let cancelled = false;
    getExpenses(qStr).then((res) => {
      if (!cancelled) setExpensesList(res?.data?.data || []);
    });
    return () => {
      cancelled = true;
    };
  }, [currentDate]);

  // Precompute totals per local date (yyyy-MM-dd) for O(1) lookup
  const totalsByDate = useMemo(() => {
    const map = new Map();
    for (const exp of expensesList) {
      const d = new Date(exp.date);
      const key = format(d, "yyyy-MM-dd");
      const prev = map.get(key) || 0;
      map.set(key, prev + Number(exp.amount || 0));
    }
    return map;
  }, [expensesList]);

  const getTotalForDate = (date) => {
    const key = format(date, "yyyy-MM-dd");
    return totalsByDate.get(key) || 0;
  };

  const handlePreviousMonth = () => setCurrentDate((d) => subMonths(d, 1));
  const handleNextMonth = () => setCurrentDate((d) => addMonths(d, 1));
  const handleDateClick = (date) => onDateClick?.(date);

  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const startDayIndex = monthStart.getDay(); // 0 = Sun .. 6 = Sat

  // Trailing empty cells to complete the final week row (optional, for neat grid)
  const totalCells = startDayIndex + daysInMonth.length;
  const trailingEmpties = (7 - (totalCells % 7)) % 7;

  const today = new Date();

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <IconButton
          onClick={handlePreviousMonth}
          size="small"
          aria-label="Previous month"
        >
          <ChevronLeftIcon />
        </IconButton>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          {format(currentDate, "MMMM yyyy")}
        </Typography>
        <IconButton
          onClick={handleNextMonth}
          size="small"
          aria-label="Next month"
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* Weekday headers */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 0.5,
          mb: 1,
        }}
      >
        {weekdays.map((day) => (
          <Box
            key={day}
            sx={{
              p: 1,
              textAlign: "center",
              backgroundColor: "grey.50",
              borderRadius: 1,
            }}
          >
            <Typography
              variant="caption"
              sx={{ fontWeight: 600, color: "text.secondary" }}
            >
              {day}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Calendar grid */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          gap: 0.5,
        }}
      >
        {/* Leading empty cells so that the 1st aligns to correct weekday */}
        {Array.from({ length: startDayIndex }).map((_, i) => (
          <Box key={`empty-start-${i}`} />
        ))}

        {/* Days of the month only (no other-month dates) */}
        {daysInMonth.map((date) => {
          const totalAmount = getTotalForDate(date);
          const hasExpenses = totalAmount > 0;

          return (
            <Paper
              key={date.toISOString()}
              sx={{
                p: 1,
                minHeight: 64,
                cursor: "pointer",
                border: "1px solid",
                borderColor: "grey.200",
                backgroundColor: hasExpenses
                  ? "primary.50"
                  : "background.paper",
                "&:hover": {
                  backgroundColor: hasExpenses ? "primary.100" : "grey.50",
                  borderColor: "primary.main",
                },
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              onClick={() => handleDateClick(date)}
            >
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isSameDay(date, today) ? 700 : 500,
                  color: isSameDay(date, today)
                    ? "primary.main"
                    : "text.primary",
                  textAlign: "left",
                }}
              >
                {format(date, "d")}
              </Typography>

              {showAmounts && hasExpenses && (
                <Typography
                  variant="caption"
                  sx={{
                    fontWeight: 700,
                    color: "primary.main",
                    textAlign: "center",
                  }}
                >
                  ${totalAmount.toFixed(2)}
                </Typography>
              )}

              {!showAmounts && hasExpenses && (
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: "primary.main",
                    alignSelf: "center",
                    mb: 0.25,
                  }}
                />
              )}
            </Paper>
          );
        })}

        {/* Trailing empty cells to finish the row */}
        {Array.from({ length: trailingEmpties }).map((_, i) => (
          <Box key={`empty-end-${i}`} />
        ))}
      </Box>
    </Box>
  );
};

export default Calendar;

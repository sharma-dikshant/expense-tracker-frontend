// hooks/useMonthlyExpense.js
import { useEffect, useState } from "react";
import { getMonthExpense } from "../services/apiExpenses";

export function useMonthlyExpense(month, year) {
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await getMonthExpense(month, year);
        setTotal(data.data[0]?.monthExpense || 0);
      } catch (err) {
        console.error("Error fetching monthly expense", err);
      }
    };
    fetch();
  }, [month, year]);

  return total;
}

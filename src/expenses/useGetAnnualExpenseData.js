import { useQuery } from "@tanstack/react-query";
import { getYearlyExpense } from "../services/apiExpenses";

export function useGetAnnualExpenseData(year) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expense", year],
    queryFn: () => getYearlyExpense(year),
  });

  return { data, isLoading, error };
}

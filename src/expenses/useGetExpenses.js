import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./../services/apiExpenses";

export function useGetExpenses(month, year) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", month, year],
    queryFn: () => getExpenses(month, year),
    enabled: !!month && !!year,
  });

  return { data, isLoading, error };
}

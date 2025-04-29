import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./../services/apiExpenses";

export function useGetExpenses(queryObj) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["expenses", ...Object.values(queryObj)],
    queryFn: () => getExpenses(queryObj),
    // enabled: !!month && !!year,
  });

  return { data, isLoading, error };
}

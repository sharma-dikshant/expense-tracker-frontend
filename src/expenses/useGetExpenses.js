import { useQuery } from "@tanstack/react-query";
import { getExpenses } from "./../services/apiExpenses";

export function useGetExpenses() {
  const {
    data,
    isLoading,
    error,
  } = useQuery({ queryKey: ["expenses"], queryFn: getExpenses });


  return { data, isLoading, error };
}

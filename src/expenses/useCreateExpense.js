import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../services/apiExpenses";

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const {
    mutate: createExp,
    isSuccess,
    error,
    isPending, // Optional
  } = useMutation({
    mutationFn: (expense) => createExpense(expense),
    onSuccess: (data, variables) => {
      //TODO only invalid the current month query
      alert("Expense added successfully");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (e) => {
      console.error("Error creating expense:", e.message || e);
    },
  });

  return { createExp, isSuccess, error, isPending };
}

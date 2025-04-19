import { useMutation } from "@tanstack/react-query";
import { createExpense } from "../services/apiExpenses";

export function useCreateExpense() {
  const {
    mutate: createExp,
    isSuccess,
    error,
    isPending, // Optional
  } = useMutation({
    mutationFn: (expense) => createExpense(expense),
    onSuccess: () => {
      alert("Expense added successfully");
    },
    onError: (e) => {
      console.error("Error creating expense:", e.message || e);
    },
  });

  return { createExp, isSuccess, error, isPending };
}

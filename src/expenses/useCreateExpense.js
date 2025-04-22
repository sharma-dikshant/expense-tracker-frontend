import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createExpense } from "../services/apiExpenses";
import toast from "react-hot-toast";

export function useCreateExpense() {
  const queryClient = useQueryClient();
  const {
    mutateAsync: createExp,
    isSuccess,
    error,
    isPending, // Optional
  } = useMutation({
    mutationFn: (expense) => createExpense(expense),
    onSuccess: (data, variables) => {
      //TODO only invalid the current month query
      toast.success("Expense added successfully");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (e) => {
      toast.error("Error Creating Expense");
      console.error("Error creating expense:", e.message || e);
    },
  });

  return { createExp, isSuccess, error, isPending };
}

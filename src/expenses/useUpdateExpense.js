import { useMutation } from "@tanstack/react-query";
import { updateExpense } from "../services/apiExpenses";

export function useUpdateExpense() {
  const {
    mutate: updateExpenseAsync,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: ({ id, expense }) => updateExpense(id, expense),
    onSuccess: () => {
      alert("Updated Successfully");
    },
    onError: (error) => {
      console.log("Error in updating expense", error);
    },
  });

  return { updateExpenseAsync, isError, isSuccess, isPending };
}

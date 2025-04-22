import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateExpense } from "../services/apiExpenses";

export function useUpdateExpense() {
  const queryClient = useQueryClient();

  const {
    mutateAsync: updateExpenseAsync,
    isError,
    isSuccess,
    isPending,
  } = useMutation({
    mutationFn: ({ id, expense }) => updateExpense(id, expense),
    onSuccess: () => {
      alert("Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
    onError: (error) => {
      console.log("Error in updating expense", error);
    },
  });

  return { updateExpenseAsync, isError, isSuccess, isPending };
}

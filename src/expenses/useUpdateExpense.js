import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
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
      toast.success("Updated Successfully");
      queryClient.invalidateQueries({ queryKey: ["expense"] });
    },
    onError: (error) => {
      toast.error("error: updating expense");
      console.log("Error in updating expense", error);
    },
  });

  return { updateExpenseAsync, isError, isSuccess, isPending };
}

import API from "./apiClient";

export const createRecurringExpense = (data) =>
  API.post("/recurring-expenses", data);

export const getAllRecurringExpenseOfLoggedInUser = () =>
  API.get("recurring-expenses/me");

export const updateRecurringExpense = (id, data) =>
  API.patch(`/recurring-expenses/${id}`, data);

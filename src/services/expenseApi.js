import API from "./apiClient";

export const createExpense = (data) => API.post("/expenses", data);
export const updateExpense = (id, data) => API.patch(`/expenses/${id}`, data);
export const deleteExpense = (id) => API.delete(`/expenses/${id}`);
export const getExpenses   = (queryStr) => API.get(`/expenses?${queryStr}`);

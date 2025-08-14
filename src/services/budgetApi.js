import API from "./apiClient";

export const getALlBudgetOfLoginUser = () => API.get("/budgets/me");
export const createNewBudget = (data) => API.post("/budgets", data);
export const updateBudget = (id, data) => API.post(`/budgets/me/${id}`, data);

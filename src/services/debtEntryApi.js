import API from "./apiClient";

export const getAllDebtEntryofLoggedInUser = () => API.get("/debts/me");
export const createNewDebtEntry = (data) => API.post("/debts", data);
export const updateDebtEntry = (id, data) => API.patch(`/debts/${id}`, data);
export const deleteDebtEntry = (id) => API.delete(`/debts/${id}`)

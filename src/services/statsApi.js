import API from "./apiClient";

export const getYearStats = (year) => API.get(`/expenses/stats/year/${year}`);
export const getMonthStats = (month, year) =>
  API.get(`/expenses/stats/month/${month}?year=${year}`);

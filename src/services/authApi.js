import API from "./apiClient";

export const login = (data) => API.post(`/users/login`, data);
export const signup = (data) => API.post(`/users/signup`, data);
export const logout = (data) => API.post(`/users/logout`, data);
export const getLoggedInUser = () => API.get(`/users/getUser`);

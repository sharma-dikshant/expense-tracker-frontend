import toast from "react-hot-toast";
import axios from "axios";

// Set the base URL for axios requests
const API_BASE_URL = import.meta.env.VITE_API_URL;
// Get all expenses
export async function getExpenses(month, year) {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/api/expenses?month=${month}&year=${year}`,
      {
        withCredentials: true,
      }
    );
    if (!response.data) throw Error("failed to fetch expenses");
    return response.data;
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    toast.error("failed to fetch expenses");
  }
}

// Create expense
export async function createExpense(expense) {
  try {
    await axios.post(`${API_BASE_URL}/api/expenses`, expense, {
      withCredentials: true,
    });
  } catch (error) {
    console.log("error in creating expense", error);
    toast.error("failed to create expenses");
  }
}

// Update expense
export async function updateExpense(id, expense) {
  try {
    await axios.patch(`${API_BASE_URL}/api/expenses/${id}`, expense, {
      withCredentials: true,
    });
  } catch (error) {
    console.log("error in updating expense", error);
    toast.error("failed to update expenses");
  }
}

export async function deleteExpense(id) {
  try {
    await axios.delete(`${API_BASE_URL}/api/expenses/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.log("error in deleting expense", error);
    toast.error("failed to delete expense");
  }
}

// Get monthly expenses
export async function getMonthExpense(month, year) {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/expenses/stats/month/${month}?year=${year}`,
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (error) {
    console.log("error getting month expense", error);
    toast.error("failed to fetch monthly expenses");
  }
}

// Get yearly expenses
export async function getYearlyExpense(year) {
  try {
    const res = await axios.get(
      `${API_BASE_URL}/api/expenses/stats/year/${year}`,
      {
        withCredentials: true,
      }
    );

    if (!res.data) throw Error("Failed to fetch yearly expense");

    return res.data;
  } catch (error) {
    console.log("error getting yearly expense", error);
    toast.error("failed to fetch yearly expenses");
  }
}

// Get logged-in user
export function getLoginUser() {
  return axios.get(`${API_BASE_URL}/api/users/getUser`, {
    withCredentials: true,
  });
}

// Login user
export function loginUser(email, password) {
  return axios.post(
    `${API_BASE_URL}/api/users/login`,
    { email, password },
    {
      withCredentials: true,
    }
  );
}

// Sign up user
export function SignUpUser(name, email, password, passwordConfirm) {
  return axios.post(
    `${API_BASE_URL}/api/users/signup`,
    {
      name,
      email,
      password,
      passwordConfirm,
    },
    { withCredentials: true }
  );
}

export function logoutUser() {
  return axios.post(`${API_BASE_URL}/api/users/logout`, {
    withCredentials: true,
  });
}

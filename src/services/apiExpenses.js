// getting all expenses
import toast from "react-hot-toast";
import axios from "axios";
export async function getExpenses(month, year) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/expenses?month=${month}&year=${year}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    toast.error("failed to fetch expenses");
  }
}

export async function createExpense(expense) {
  try {
    // expense validation will be handled by backend
    await axios.post("http://127.0.0.1:3000/api/expenses", expense);
  } catch (error) {
    console.log("error in creating expense", error);
    toast.error("failed to create expenses");
  }
}

export async function updateExpense(id, expense) {
  try {
    await axios.patch(`http://127.0.0.1:3000/api/expenses/${id}`, expense);
  } catch (error) {
    console.log("error in updating expense", error);
    toast.error("failed to update expenses");
  }
}

export async function getMonthExpense(month, year) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/expenses/stats/month/${month}?year=${year}`
    );
    return res.data;
  } catch (error) {
    console.log("error getting month expense", error);
    toast.error("failed to fetch monthly expenses");
  }
}

export async function getYearlyExpense(year) {
  try {
    const res = await axios.get(
      `http://127.0.0.1:3000/api/expenses/stats/year/${year}`
    );
    return res.data;
  } catch (error) {
    console.log("error getting month expense", error);
    toast.error("failed to fetch yearly expenses");
  }
}

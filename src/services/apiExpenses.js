// getting all expenses
import axios from "axios";
export async function getExpenses(month, year) {
  try {
    const response = await axios.get(
      `http://127.0.0.1:3000/api/expenses?month=${month}&year=${year}`
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
  }
}

export async function createExpense(expense) {
  try {
    // expense validation will be handled by backend
    await axios.post("http://127.0.0.1:3000/api/expenses", expense);
  } catch (error) {
    console.log("error in creating expense", error);
    // throw new Error("error: Create expense");
  }
}

export async function updateExpense(id, expense) {
  try {
    await axios.patch(`http://127.0.0.1:3000/api/expenses/${id}`, expense);
  } catch (error) {
    console.log("error in updating expense", error);
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
  }
}

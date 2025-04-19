// getting all expenses
import axios from "axios";
export async function getExpenses() {
  try {
    const response = await axios.get("http://localhost:3000/api/expenses");
    // console.log(response)
    return response.data;
  } catch (error) {
    console.error("Failed to fetch expenses:", error);
    throw new Error("Failed to Fetch Expenses!");
  }
}

export async function createExpense(expense) {
  try {
    //TODO add expense validation
    await axios.post("http://localhost:3000/api/expenses", expense);
  } catch (error) {
    console.log("error in creating expense", error);
    throw new Error("error: Create expense");
  }
}

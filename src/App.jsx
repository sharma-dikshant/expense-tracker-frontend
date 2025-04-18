import { useEffect, useState } from "react";
import axios from "axios";
import { Daypicker } from "./components/Daypicker";

function App() {
  const [expense, setExpense] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getExpense() {
      try {
        const response = await axios.get("http://localhost:3000/api/expenses?year=2024");
        setExpense(response.data.data.expenses);
      } catch (error) {
        console.error("Failed to fetch expenses:", error);
      } finally {
        setLoading(false);
      }
    }

    getExpense();
  }, []);


  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Daypicker expense={expense}/>
      <div>
        {expense.map((item) => (
          <div>{item._id}</div>
        ))}
      </div>
    </>
  );
}

export default App;

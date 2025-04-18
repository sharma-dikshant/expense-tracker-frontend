import { Daypicker } from "./components/Daypicker";
import { useGetExpenses } from "./expenses/useGetExpenses";

function App() {
  const { data: res, isLoading, error } = useGetExpenses();
  const expense = res?.data.expenses
  console.log(expense);
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Daypicker expense={expense} />
      
    </>
  );
}

export default App;

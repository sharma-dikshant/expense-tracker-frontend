import { Daypicker } from "./calender/Daypicker";
import { useGetExpenses } from "./expenses/useGetExpenses";

function App() {
  const { data: res, isLoading, error } = useGetExpenses();
  const expenses = res?.data.expenses
  // console.log(expense);
  if (isLoading) return <p>Loading...</p>;

  return (
    <>
      <Daypicker expenses={expenses} />
      
    </>
  );
}

export default App;

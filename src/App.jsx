import { Daypicker } from "./calender/Daypicker";
import { Toaster } from "react-hot-toast";
import YearlyExpenseTracker from "./expenses/YearlyExpenseTracker";

function App() {
  return (
    <>
      <Toaster />
      <Daypicker />
      <YearlyExpenseTracker />
    </>
  );
}

export default App;

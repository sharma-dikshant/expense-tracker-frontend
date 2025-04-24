import { Daypicker } from "./calender/Daypicker";
import { Toaster } from "react-hot-toast";
import YearlyExpenseTracker from "./expenses/YearlyExpenseTracker";
import Login from "./auth-components/Login";

function App() {
  return (
    <>
      <Toaster />
      <Daypicker />
      <YearlyExpenseTracker />
      <Login />
    </>
  );
}

export default App;

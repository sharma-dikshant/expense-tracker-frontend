import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import YearlyExpenseTracker from "./expenses/YearlyExpenseTracker";
import Login from "./auth-components/Login";
import { getLoginUser } from "./services/apiExpenses";
import { Daypicker } from "./calender/Daypicker";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function loginUser() {
      try {
        const user = await getLoginUser();
        setUser(user.data.user);
      } catch (error) {
        console.error("Error logging in:", error);
        setUser(null);
      }
    }
    loginUser();
  });

  return (
    <div>
      {user ? (
        <>
          <Toaster />
          <Daypicker />
          <YearlyExpenseTracker />
        </>
      ) : (
        <Login />
      )}
    </div>
  );
}

export default App;

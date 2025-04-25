import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import YearlyExpenseTracker from "./expenses/YearlyExpenseTracker";
import Login from "./auth-components/Login";
import { getLoginUser } from "./services/apiExpenses";
import { Daypicker } from "./calender/Daypicker";
import SignUp from "./auth-components/SignUp";

function App() {
  const [user, setUser] = useState(null);
  const [authMethod, setAuthMethod] = useState("login");
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
  }, []);

  function handleToggleAuthMethod() {
    if (authMethod === "login") {
      setAuthMethod("signup");
    } else {
      setAuthMethod("login");
    }
  }

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {user ? (
        <>
          <Toaster />
          <Daypicker />
          <YearlyExpenseTracker />
        </>
      ) : (
        <>
          <button onClick={handleToggleAuthMethod}>{authMethod}</button>
          {authMethod === "login" && <Login />}
          {authMethod === "signup" && <SignUp />}
        </>
      )}
    </div>
  );
}

export default App;

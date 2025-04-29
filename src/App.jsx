import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import YearlyExpenseTracker from "./expenses/YearlyExpenseTracker";
import Login from "./auth-components/Login";
import { getLoginUser } from "./services/apiExpenses";
import { Daypicker } from "./calender/Daypicker";
import { ErrorBoundary } from "react-error-boundary";
import SignUp from "./auth-components/SignUp";
import ErrorFallBack from "./ui/ErrorFallBack";
import Header from "./ui/Header";

function App() {
  const [user, setUser] = useState(null);
  const [selectedItem, setSelectedItem] = useState(
    localStorage.getItem("selectedExpenseItem") || ""
  );
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
          <ErrorBoundary
            // fallback={<div>Something went wrong! Please try again later</div>}
            fallbackRender={ErrorFallBack}
          >
            <Header setSelectedItem={setSelectedItem} />
            {selectedItem === "" ? (
              <div>please select an Item</div>
            ) : (
              <Daypicker />
            )}
          </ErrorBoundary>
          <YearlyExpenseTracker />
        </>
      ) : (
        <>
          <button onClick={handleToggleAuthMethod}>
            {authMethod === "login" ? "signup" : "login"}
          </button>
          {authMethod === "login" && <Login />}
          {authMethod === "signup" && <SignUp />}
        </>
      )}
    </div>
  );
}

export default App;

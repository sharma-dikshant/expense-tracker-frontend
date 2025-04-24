import { Daypicker } from "./calender/Daypicker";
import { Toaster } from "react-hot-toast";
import YearlyExpenseTracker from "./expenses/YearlyExpenseTracker";
import Login from "./auth-components/Login";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [user, setUser] = useState(null);
  useEffect(() => {
    async function loginUser() {
      try {
        const user = await axios.get(
          "http://127.0.0.1:3000/api/users/getUser",
          {
            withCredentials: true,
          }
        );
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

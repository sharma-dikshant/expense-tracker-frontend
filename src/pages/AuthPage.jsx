import { useState } from "react";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
function AuthPage() {
  const [loginMethod, setLoginMethod] = useState("login");
  return (
    <>
      <h1>Welcome!</h1>
      <button
        onClick={() =>
          setLoginMethod((prev) => (prev === "login" ? "signup" : "login"))
        }
      >
        {loginMethod === "login" ? "Sign Up" : "Login"}
      </button>
      {loginMethod === "login" ? <Login /> : <SignUp />}
    </>
  );
}

export default AuthPage;

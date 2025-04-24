import { useState } from "react";
import { loginUser } from "../services/apiExpenses";
import styles from "./login.module.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSuccess, setIsSuccess] = useState("none");

  async function handleOnSubmit(e) {
    e.preventDefault();

    try {
      await loginUser(email, password);
      setIsSuccess("success");
    } catch (error) {
      setIsSuccess("fail");
      console.log("error logging user", error);
    }

    setEmail("");
    setPassword("");
  }

  return (
    <>
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {isSuccess === "fail" && <div>Please! try again</div>}
      {isSuccess === "none" && <div>Please Login to Continue</div>}
      {isSuccess === "success" && (
        <div>success! please refresh the page to continue...</div>
      )}
    </>
  );
}

export default Login;

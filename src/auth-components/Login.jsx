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
      <form onSubmit={handleOnSubmit} className={styles.formContainer}>
        <label htmlFor="email" className={styles.label}>
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
        <label htmlFor="password" className={styles.label}>
          Password:
        </label>
        <input
          type="text"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          Login
        </button>
      </form>
      {isSuccess === "fail" && (
        <div className={`${styles.message} ${styles.fail}`}>
          Please! try again
        </div>
      )}
      {isSuccess === "none" && (
        <div className={`${styles.message} ${styles.none}`}>
          Please Login to Continue
        </div>
      )}
      {isSuccess === "success" && (
        <div className={`${styles.message} ${styles.success}`}>
          success! please refresh the page to continue...
        </div>
      )}
    </>
  );
}

export default Login;

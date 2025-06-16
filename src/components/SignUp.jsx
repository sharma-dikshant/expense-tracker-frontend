import { useState } from "react";
import { SignUpUser } from "../services/apiExpenses";
import styles from "./signup.module.css";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage("Password and password confirm do not match!");
      return;
    }

    try {
      await SignUpUser(name, email, password, passwordConfirm);
      setMessage("Success! Please refresh to continue");
    } catch (error) {
      setMessage("Please! try again");
      console.log("error in sign up user", error);
    }

    setName("");
    setEmail("");
    setPassword("");
    setPasswordConfirm("");
  }

  return (
    <>
      <form onSubmit={handleOnSubmit} className={styles.formContainer}>
        <label htmlFor="name" className={styles.label}>
          Name
        </label>
        <input
          type="text"
          id="name"
          value={name}
          className={styles.input}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email" className={styles.label}>
          Email
        </label>
        <input
          type="email"
          id="email"
          value={email}
          className={styles.input}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="password" className={styles.label}>
          Password
        </label>
        <input
          type="text"
          id="password"
          value={password}
          className={styles.input}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <label htmlFor="passwordConfirm" className={styles.label}>
          Confirm Password
        </label>
        <input
          type="text"
          id="passwordConfirm"
          value={passwordConfirm}
          className={styles.input}
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />

        <button className={styles.button}>Sign Up</button>
      </form>

      {message && <div className={styles.message}>{message}</div>}
    </>
  );
}

export default SignUp;

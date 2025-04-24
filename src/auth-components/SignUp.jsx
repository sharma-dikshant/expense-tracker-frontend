import { useState } from "react";
import { SignUpUser } from "../services/apiExpenses";

function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");

  async function handleOnSubmit(e) {
    e.preventDefault();

    if (password != passwordConfirm) {
      setMessage("password and password confirm is not same!");
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
      <form onSubmit={handleOnSubmit}>
        <label htmlFor="name">name</label>
        <input
          type="text"
          id="name"
          value={name}
          required
          onChange={(e) => setName(e.target.value)}
        />

        <label htmlFor="email">email</label>
        <input
          type="email"
          id="email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">password</label>
        <input
          type="text"
          id="password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="passwordConfirm">password Confirm</label>
        <input
          type="text"
          id="passwordConfirm"
          value={passwordConfirm}
          required
          onChange={(e) => setPasswordConfirm(e.target.value)}
        />
        <button>Sign Up</button>
      </form>
      {message && <div>{message}</div>}
    </>
  );
}

export default SignUp;

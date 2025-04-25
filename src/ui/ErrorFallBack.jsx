import React from "react";
import styles from "./errorFallBack.module.css";

export default function ErrorFallBack({
  message = "Something went wrong!",
  onRetry,
}) {
  const repo = "https://github.com/sharma-dikshant/expense-tracker-frontend";
  return (
    <div className={styles.container}>
      <div className={styles.emoji}>😵‍💫</div>
      <h1 className={styles.heading}>Oops!</h1>
      <p className={styles.message}>
        {message || "Looks like our hamsters tripped over the wires again!"}
      </p>
      <button className={styles.retryButton} onClick={onRetry}>
        🔁 Try Again
      </button>
      <a href={repo} target="_blank" className={styles.subNote}>
        (raise issue and help in development:)
      </a>
    </div>
  );
}

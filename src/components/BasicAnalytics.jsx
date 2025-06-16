import { Link } from "react-router";
import styles from "./basicAnalytics.module.css";
import { useState } from "react";

function BasicAnalytics() {
  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || { month: "", year: "" }
  );
  const [monthNote, setMonthNote] = useState(notes.month);
  const [yearNote, setYearNote] = useState(notes.year);

  function updateNotes() {
    const updatedNotes = { month: monthNote, year: yearNote };
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    setNotes(updatedNotes);
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Basic Analytics</h1>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <span>Total Expense For this month:</span>
          <span className={styles.value}>₹0</span>
        </li>
        <li className={styles.listItem}>
          <span>Total Expense For this year:</span>
          <span className={styles.value}>₹0</span>
        </li>
        <li className={styles.noteItem}>
          <p className={styles.noteTitle}>Note for this month:</p>
          <div>
            <textarea
              className={styles.textarea}
              defaultValue={monthNote}
              rows={8}
              cols={50}
              onChange={(e) => setMonthNote(e.target.value)}
              placeholder="Write your note for this month"
            />
            <button className={styles.button} onClick={updateNotes}>
              Update Month Note
            </button>
          </div>
        </li>
        <li className={styles.noteItem}>
          <p className={styles.noteTitle}>Note for this year:</p>
          <div>
            <textarea
              className={styles.textarea}
              defaultValue={yearNote}
              rows={8}
              cols={50}
              onChange={(e) => setYearNote(e.target.value)}
              placeholder="Write your note for this year"
            />
            <button className={styles.button} onClick={updateNotes}>
              Update Year Note
            </button>
          </div>
        </li>
      </ul>
      <div className={styles.linkContainer}>
        <Link to="/analytics" className={styles.link}>
          See Detailed Analytics →
        </Link>
      </div>
    </div>
  );
}

export default BasicAnalytics;

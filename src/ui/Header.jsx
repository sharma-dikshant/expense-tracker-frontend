import { Link } from "react-router";
import styles from "./header.module.css";
function Header() {
  return (
    <div className={styles.header}>
      <Link to="/">Expense Tracker</Link>
      <span>
        <Link to="/auth">Login</Link>
      </span>
    </div>
  );
}

export default Header;

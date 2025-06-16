import { Link } from "react-router";
import styles from "./homepage.module.css";
function HomePage() {
  return (
    <div>
      <h1>Welcome to the Expense Tracker</h1>
      <p>Track your expenses easily and efficiently.</p>
      <p>Get started by adding your first expense!</p>
      <p>Explore analytics to gain insights into your spending habits.</p>
      <p>Check out the footer for more information and links.</p>
      <p>Enjoy using the Expense Tracker!</p>
      <div>
        <Link to="/expense-tracker">Get Started</Link>
      </div>
      <div>
        <Link to="/link">Explore Analytics</Link>
      </div>
      <div>
        <Link to="contact-us">Contact Us</Link>
      </div>
    </div>
  );
}

export default HomePage;

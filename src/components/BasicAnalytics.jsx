import { Link } from "react-router";

function BasicAnalytics() {
  return (
    <div>
      <h1>Basic Analytics</h1>
      <div>
        <ul>
          <li>
            Total Expense For this month: <span>0</span>
          </li>
          <li>
            Total Expense For this year: <span>0</span>
          </li>
          <li>
            Note for this month: <p>Please limit expenses for this month</p>
            <button>Update Month Note</button>
          </li>
          <li>
            Note for this year: <p>Please limit expenses for this year</p>
            <button>Update Year Note</button>
          </li>
        </ul>
      </div>
      <Link to="/analytics">See Detailed Analytics</Link>
    </div>
  );
}

export default BasicAnalytics;

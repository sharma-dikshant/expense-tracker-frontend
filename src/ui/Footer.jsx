import styles from "./footer.module.css";
function Footer() {
  return (
    <div className={styles.footer}>
      <div>
        <span>Expense Tracker</span>
        <ul>
          <li>About</li>
          <li>Contact</li>
          <li>Privacy Policy</li>
          <li>copyright 2025</li>
        </ul>
      </div>
      <div>
        <span>Developing Option</span>
        <ul>
          <li>about team</li>
          <li>about project</li>
          <li>about technology</li>
          <li>about future</li>
          <li>Github repo</li>
          <li>Report a Bug</li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;

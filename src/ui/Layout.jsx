import styles from "./layout.module.css";
import { Outlet } from "react-router";
import Header from "./../ui/Header";
import Footer from "./../ui/Footer";
function Layout() {
  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.content}>
        <Outlet />
      </div>
      {/* <Footer />x */}
    </div>
  );
}

export default Layout;

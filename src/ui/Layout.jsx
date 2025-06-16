import { Outlet } from "react-router";
import Header from "./../ui/Header";
import Footer from "./../ui/Footer";
function Layout() {
  return (
    <>
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default Layout;

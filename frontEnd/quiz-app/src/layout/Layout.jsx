import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  const location = useLocation();

  // hide navbar on quiz page
  const hideNavbar = location.pathname.startsWith("/quiz");

  return (
    <>
      {!hideNavbar && <Navbar />}

      <main className={!hideNavbar ? "min-h-screen" : ""}>
        <Outlet />
      </main>
    </>
  );
}

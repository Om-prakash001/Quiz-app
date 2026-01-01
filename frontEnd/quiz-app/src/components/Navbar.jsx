import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaBrain } from "react-icons/fa6";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    setOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white border-b border-[#015055]/10 sticky top-0 z-50 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-14">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="size-9 rounded-lg bg-[#015055]/10 flex items-center justify-center">
              <FaBrain className="w-5 h-5 text-[#015055]" />
            </div>
            <h1 className="text-lg font-bold text-[#015055]">
              QuizMaster
            </h1>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-8">
            <DesktopNavLink to="/">Home</DesktopNavLink>
            <DesktopNavLink to="/quiz">Quiz</DesktopNavLink>
            <DesktopNavLink to="/leaderboard">Leaderboard</DesktopNavLink>

            {!user ? (
              <>
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 hover:text-[#015055]"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 rounded-lg bg-[#015055] text-white text-sm font-semibold hover:opacity-90"
                >
                  Sign Up
                </Link>
              </>
            ) : (
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-700 whitespace-nowrap">
                  Hi, <b>{user.username}</b>
                </span>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* MOBILE MENU BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-[#015055] text-2xl"
          >
            ☰
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-[#014247] px-4 py-4 space-y-2 overflow-x-hidden">
          <MobileLink to="/" setOpen={setOpen}>Home</MobileLink>
          <MobileLink to="/quiz" setOpen={setOpen}>Quiz</MobileLink>
          <MobileLink to="/leaderboard" setOpen={setOpen}>Leaderboard</MobileLink>

          {!user ? (
            <>
              <MobileLink to="/login" setOpen={setOpen}>Login</MobileLink>
              <MobileLink to="/signup" setOpen={setOpen}>Sign Up</MobileLink>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full text-left px-3 py-2 rounded-lg bg-red-500 text-white"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

/* DESKTOP ACTIVE LINK */
function DesktopNavLink({ to, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative text-sm font-medium transition
        ${isActive
          ? "text-[#015055]"
          : "text-gray-700 hover:text-[#015055]"}`
      }
    >
      {({ isActive }) => (
        <>
          {children}
          <span
            className={`absolute inset-x-0 -bottom-1 h-[2px] rounded-full
            bg-[#015055] transition-opacity
            ${isActive ? "opacity-100" : "opacity-0"}`}
          />
        </>
      )}
    </NavLink>
  );
}

/* MOBILE LINK */
function MobileLink({ to, children, setOpen }) {
  return (
    <NavLink
      to={to}
      onClick={() => setOpen(false)}
      className={({ isActive }) =>
        `block px-3 py-2 rounded-lg text-white transition
        ${isActive ? "bg-white/10" : "hover:bg-white/10"}`
      }
    >
      {children}
    </NavLink>
  );
}

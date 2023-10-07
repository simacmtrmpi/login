import { Link, NavLink } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const { user, logOut } = useAuthContext();
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 text-lg"
            >
              <NavLink
                to="/"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-blue-500" : ""
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/login"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-blue-500" : ""
                }
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className={({ isActive, isPending }) =>
                  isPending ? "pending" : isActive ? "text-blue-500" : ""
                }
              >
                Sign Up
              </NavLink>
            </ul>
          </div>
          <a className="btn btn-ghost normal-case text-xl">Login Form</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="flex items-center gap-8 text-2xl px-1">
            <NavLink
              to="/"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500" : ""
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/login"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500" : ""
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/signup"
              className={({ isActive, isPending }) =>
                isPending ? "pending" : isActive ? "text-blue-500" : ""
              }
            >
              Sign Up
            </NavLink>
          </ul>
        </div>
        <div className="navbar-end">
          <h3>{user?.displayName}</h3>
          {user ? (
            <button onClick={() => logOut()}>Logout</button>
          ) : (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;

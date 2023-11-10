import { useSelector } from "react-redux";
import { logout } from "../redux/features/shoppingSlice";
import { logoutFromGoogle } from "../firebase/firebaseConfig";
import { Link, NavLink } from "react-router-dom";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState, useEffect } from "react";

function getThemeFromLocalStorage() {
  return localStorage.getItem("theme") || "light";
}
function Navbar() {
  const { user, amount } = useSelector((state) => state.globalState);

  const [mode, setMmode] = useState(getThemeFromLocalStorage);
  const [bg, setBg] = useState("");

  useEffect(() => {
    document.documentElement.dataset.theme = mode;
    localStorage.setItem("theme", mode);
    setBg(mode === "dark" ? "bg-slate-700" : "bg-sky-100");
  }, [mode]);
  const ChangeMode = () => {
    setMmode((prev) => {
      return prev == "light" ? "dark" : "light";
    });
  };
  const logoutFromGoogleAccount = () => {
    logoutFromGoogle()
      .then(() => {
        logout();
        localStorage.removeItem("user");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <header className={`${bg}`}>
      <div
        className={` navbar flex items-center justify-between mb-16 mt-8 cite-container bg-${mode}`}
      >
        <div className="hidden md:inline">
          <Link to="/" className="btn btn-accent text-2xl normal-case ">
            C
          </Link>
        </div>
        <div className="dropdown inline md:hidden">
          <label tabIndex={0} className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7"
              />
            </svg>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="hover:transition-opacity">
              <NavLink
                className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
                to="/"
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
                to="/about"
              >
                About
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
                to="product"
              >
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className=" hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
                to="/cart"
              >
                Cart
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
                to="/checkout"
              >
                Checkout
              </NavLink>
            </li>
            <li>
              <NavLink
                className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
                to="/orders"
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </div>
        <ul className="mx-auto gap-4 font-medium hidden md:flex  ">
          <li className="hover:transition-opacity">
            <NavLink
              className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
              to="/"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
              to="/about"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
              to="product"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              className=" hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
              to="/cart"
            >
              Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
              to="/checkout"
            >
              Checkout
            </NavLink>
          </li>
          <li>
            <NavLink
              className="hover:bg-slate-400 hover:text-black rounded-lg py-2 px-3"
              to="/orders"
            >
              Orders
            </NavLink>
          </li>
        </ul>
        <div className="flex items-center">
          <div>
            <span
              className={`ml-auto cursor-pointer ${
                mode === "light" ? "animate-spin" : ""
              }`}
              onClick={ChangeMode}
              style={{ fontSize: "20px", color: "black" }}
            >
              {mode === "light" ? <BsMoonFill /> : <BsSunFill />}
            </span>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <Link to="/cart" className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-7 w-7"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge bg-teal-500 text-black badge-sm indicator-item">
                  {amount}
                </span>
              </Link>
            </label>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            ></div>
          </div>
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.photoURL} />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <button
                onClick={logoutFromGoogleAccount}
                className="btn btn-success"
              >
                <a>Logout</a>
              </button>
            </ul>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;

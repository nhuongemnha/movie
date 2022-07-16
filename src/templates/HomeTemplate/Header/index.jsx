import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

const HomeHeader = () => {
  let navigate = useNavigate();

  return (
    <header className="p-4 bg-opacity-40 bg-black text-white fixed w-full z-10">
      <div className="container flex justify-between h-16 mx-auto">
        <NavLink
          rel="noopener noreferrer"
          to="/"
          aria-label="Back to homepage"
          className="flex items-center p-2"
        >
          <img
            className="w-32"
            src="https://xemphim.vip/static/skin/logo-full.png"
            alt="xemphim.club"
          />
        </NavLink>
        <ul className="items-stretch hidden space-x-3 lg:flex">
          <li className="flex">
            <NavLink
              to="/home"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              Home
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              Contact
            </NavLink>
          </li>
          <li className="flex">
            <NavLink
              to="/news"
              className={({ isActive }) =>
                isActive
                  ? "flex items-center px-4 -mb-1 border-b-2  no-underline text-white "
                  : "flex items-center px-4 -mb-1  no-underline text-white hover:border-b-2 "
              }
            >
              News
            </NavLink>
          </li>
        </ul>
        <div className="items-center flex-shrink-0 hidden lg:flex">
          <button
            onClick={() => {
              navigate("/login");
            }}
            className="self-center px-8 py-3 rounded"
          >
            Sign in
          </button>
          <button className="self-center px-8 py-3 font-semibold rounded bg-red-600 text-gray-50">
            Sign up
          </button>
        </div>
        <button className="p-4 lg:hidden">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6 text-gray-800"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>
    </header>
  );
};

export default HomeHeader;

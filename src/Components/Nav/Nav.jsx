import React, { useState } from "react";
import "./Nav.css";
import { Link, Outlet } from "react-router-dom";

const Nav = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <div className="navbar w-full">
        <nav className="flex h-20 items-center justify-around bg-herobg md:h-28">
          <div className="logo flex items-center justify-center gap-2">
            <span className=" dayOne rounded-md bg-textColor px-4 py-1 text-lg font-bold text-white">
              Course
            </span>
            <span className="text-lg font-bold text-textColor">desk</span>
          </div>

          <div className="nav_link">
            <ul className="hidden gap-12 text-textColor lg:flex">
              <li>
                <Link to={"/"} className="text-md font-semibold">
                  Online Degree
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-md font-semibold">
                  Find your New Career
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-md font-semibold">
                  Blog
                </Link>
              </li>
              <li>
                <Link to={"/"} className="text-md font-semibold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav_btn hidden gap-11 lg:flex">
            <button className="text-md cursor-pointer font-semibold  text-textColor">
              Login
            </button>
            <button className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor px-6  py-1.5 font-semibold  text-textColor hover:bg-textColor hover:text-white hover:duration-500">
              Sign Up
            </button>
          </div>

          {!toggle ? (
            <button
              className="z-10 block lg:hidden"
              onClick={() => setToggle(!toggle)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="text-textColo h-11 w-11"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          ) : (
            <button
              className="z-10 block lg:hidden"
              onClick={() => setToggle(!toggle)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="text-textColo h-11 w-11"
              >
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
              </svg>
            </button>
          )}

          {/* Mobile Menu */}

          <ul
            className={`fixed flex h-full w-full flex-col items-center justify-center gap-5  bg-mobilebg uppercase text-textColor duration-500 ${
              !toggle ? "top-[-100%]" : "top-0"
            }`}
          >
            <li>
              <Link to={"/"} className="text-lg font-semibold">
                Online Degree
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-lg font-semibold">
                Find your New Career
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-lg font-semibold">
                Blog
              </Link>
            </li>
            <li>
              <Link to={"/"} className="text-lg font-semibold">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;

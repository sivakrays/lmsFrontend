import React, { useEffect, useState } from "react";
import "./Nav.css";
import { Link, Outlet, useLocation } from "react-router-dom";

const Nav = () => {
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  console.log(location.pathname);

  return (
    <>
      <div className="navbar w-full">
        <nav
          className={`flex h-20 items-center justify-around ${
            currentPath === "/course" ? `bg-coursebg shadow-sm ` : `bg-herobg`
          } md:h-28 `}
        >
          <Link to={"/"}>
            <div className=" flex items-center justify-center gap-2">
              <span className=" dayOne rounded-md bg-textColor px-4 py-1 text-lg font-bold text-white">
                Course
              </span>
              <span className="text-lg font-bold text-textColor">desk</span>
            </div>
          </Link>

          <div className="nav_link">
            <ul className="hidden gap-12 text-textColor lg:flex">
              <li>
                {currentPath === "/Contact" ||
                currentPath === "/coursedetails" ||
                currentPath === "/login" ||
                currentPath === "/signup" ||
                currentPath === "/course" ? (
                  <Link to={"/"} className="text-md font-semibold">
                    Home
                  </Link>
                ) : (
                  <a href="#home" className="text-md font-semibold">
                    Home
                  </a>
                )}
              </li>
              <li>
                {currentPath === "/Contact" ||
                currentPath === "/coursedetails" ||
                currentPath === "/login" ||
                currentPath === "/signup" ||
                currentPath === "/course" ? (
                  <Link to={"/"} className="text-md font-semibold">
                    Featured Courses
                  </Link>
                ) : (
                  <a href="#courses" className="text-md font-semibold">
                    Featured Courses
                  </a>
                )}
              </li>
              <li>
                {currentPath === "/Contact" ||
                currentPath === "/coursedetails" ||
                currentPath === "/login" ||
                currentPath === "/signup" ||
                currentPath === "/course" ? (
                  <Link to={"/"} className="text-md font-semibold">
                    Testimonials
                  </Link>
                ) : (
                  <a href="#testimonials" className="text-md font-semibold">
                    Testimonials
                  </a>
                )}
              </li>
              <li>
                <Link to={"Contact"} className="text-md font-semibold">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav_btn hidden gap-11 lg:flex">
            <button className="text-md cursor-pointer font-semibold  text-textColor">
              <Link to="login">Login</Link>
            </button>
            <button className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor px-6  py-1.5 font-semibold  text-textColor hover:bg-textColor hover:text-white hover:duration-500">
              <Link to="signup">Sign Up</Link>
            </button>
          </div>

          {!toggle ? (
            <button
              className="z-10 block lg:hidden"
              onClick={() => setToggle(!toggle)}
              data-testid="toggleBtn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="h-11 w-11 text-textColor"
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
                className="h-11 w-11 text-textColor"
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
            data-testid="mobile_menu"
          >
            <li>
              {currentPath === "/Contact" ||
              currentPath === "/coursedetails" ||
              currentPath === "/login" ||
              currentPath === "/signup" ||
              currentPath === "/course" ? (
                <Link
                  to={"/"}
                  className="text-md font-semibold"
                  onClick={handleToggle}
                >
                  Home
                </Link>
              ) : (
                <a
                  href="#home"
                  className="text-lg font-semibold"
                  onClick={handleToggle}
                >
                  Home
                </a>
              )}
            </li>
            <li>
              {currentPath === "/Contact" ||
              currentPath === "/coursedetails" ||
              currentPath === "/login" ||
              currentPath === "/signup" ||
              currentPath === "/course" ? (
                <Link
                  to={"/"}
                  className="text-md font-semibold"
                  onClick={handleToggle}
                >
                  Featured Courses
                </Link>
              ) : (
                <a
                  href="#courses"
                  className="text-md font-semibold"
                  onClick={handleToggle}
                >
                  Featured Courses
                </a>
              )}
            </li>
            <li>
              {currentPath === "/Contact" ||
              currentPath === "/coursedetails" ||
              currentPath === "/login" ||
              currentPath === "/signup" ||
              currentPath === "/course" ? (
                <Link
                  to={"/"}
                  className="text-md font-semibold"
                  onClick={handleToggle}
                >
                  Testimonials
                </Link>
              ) : (
                <a
                  href="#testimonials"
                  className="text-md font-semibold"
                  onClick={handleToggle}
                >
                  Testimonials
                </a>
              )}
            </li>
            <li>
              <Link
                to={"/contact"}
                className="text-md font-semibold"
                onClick={handleToggle}
              >
                Contact
              </Link>
            </li>
            <li>
              <button
                className="text-md w-[110px] cursor-pointer rounded-[10px] border-2 border-solid border-textColor bg-textColor  px-6 py-1.5  font-semibold text-white hover:bg-transparent hover:text-textColor hover:duration-500"
                onClick={handleToggle}
              >
                <Link to="/login">Login</Link>
              </button>
            </li>
            <li>
              <button
                className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor px-6  py-1.5 font-semibold  text-textColor hover:bg-textColor hover:text-white hover:duration-500"
                onClick={handleToggle}
              >
                <Link to="/signup">Sign Up</Link>
              </button>
            </li>
          </ul>
        </nav>
      </div>
      <Outlet />
    </>
  );
};

export default Nav;

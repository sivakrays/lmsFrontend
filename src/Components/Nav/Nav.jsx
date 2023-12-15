import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { Link, Outlet, useLocation } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import profile from "../../Assets/HeroSection/stelly-orange.svg";

const Nav = () => {
  const {
    logout,
    isTokenValid,
    showProfile,
    handleProfile,
    handleClickOutlet,
  } = useContext(authContext);
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [currentPath, setCurrentPath] = useState("");

  const handleToggle = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  // console.log(location.pathname);

  const handleProfileButtonClick = (e) => {
    e.stopPropagation(); // Prevent event propagation to the parent elements
    handleProfile();
  };
  const menuItem = [
    { name: "Home", path: "/" },
    { name: "Featured Course", path: "/course" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <div className="navbar w-full">
        <nav
          className={`flex h-20 items-center justify-around ${
            currentPath === "/course" ? `bg-coursebg shadow-sm ` : `bg-herobg`
          }   md:h-28 `}
          onClick={handleClickOutlet}
        >
          <Link to={"/"}>
            <div className=" flex items-center justify-center gap-2">
              <span className=" dayOne rounded-md bg-textColor px-4 py-1 text-lg font-bold text-white">
                Course
              </span>
              <span className="text-lg font-bold text-textColor">desk</span>
            </div>
          </Link>

          <div className="nav_link ">
            <ul className="flex gap-12">
              {menuItem.map((item, index) => (
                <li
                  className={`hidden gap-12 text-textColor   hover:opacity-100 lg:flex ${
                    currentPath === item.path ? "opacity-100" : "opacity-75"
                  }`}
                  key={index}
                >
                  <Link
                    to={item.path}
                    className={`text-md  font-semibold ${
                      currentPath === item.path ? "activeNav" : "nav"
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="nav_btn  hidden gap-11 lg:flex">
            {isTokenValid ? (
              <div className="relative">
                <div
                  className=" flex cursor-pointer items-center gap-x-2 "
                  onClick={handleProfileButtonClick}
                >
                  <img
                    src={profile}
                    alt=""
                    className="h-7 w-7 rounded-full bg-textColor"
                  />
                  <p className="text-md font-semibold text-textColor">manoj</p>
                </div>

                <div
                  className={` ${
                    showProfile
                      ? "absolute top-[50px] block  w-[200px] rounded border-2 bg-white py-3 shadow-md"
                      : "hidden"
                  }`}
                >
                  <div
                    className="text-md cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                    onClick={handleProfile}
                  >
                    <Link to="mylearnings">My Learnings</Link>
                  </div>
                  <div
                    className="cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                    onClick={handleProfile}
                  >
                    <Link to="/">Profile</Link>
                  </div>
                  <div
                    className="text-md cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                    onClick={logout}
                  >
                    Logout
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-8">
                <Link to="login">
                  <button className="text-md cursor-pointer font-semibold  text-textColor">
                    Login
                  </button>
                </Link>
                <Link to="signup">
                  <button className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor px-6  py-1.5 font-semibold  text-textColor hover:bg-textColor hover:text-white hover:duration-500">
                    Sign Up
                  </button>
                </Link>
              </div>
            )}
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
              <Link
                to={"/"}
                className="text-md font-semibold"
                onClick={handleToggle}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to={"/course"}
                className="text-md font-semibold"
                onClick={handleToggle}
              >
                Featured Course
              </Link>
            </li>
            <li>
              <Link
                to={"/Contact"}
                className="text-md font-semibold"
                onClick={handleToggle}
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to={"/mylearnings"}
                className="text-md font-semibold"
                onClick={handleToggle}
              >
                My Learning
              </Link>
            </li>
            <li>
              {isTokenValid ? (
                <button
                  className="text-md cursor-pointer rounded-[10px] border-2 border-solid bg-textColor px-6 py-1.5  font-semibold uppercase text-white"
                  onClick={logout}
                >
                  Logout
                </button>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Link to="login">
                    <button
                      className="text-md cursor-pointer  rounded-[10px] border-2 border-solid bg-textColor px-6 py-1.5 font-semibold uppercase text-white"
                      onClick={handleToggle}
                    >
                      Login
                    </button>
                  </Link>
                  <Link to="signup">
                    <button
                      className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor bg-textColor  px-6 py-1.5 font-semibold   uppercase text-white"
                      onClick={handleToggle}
                    >
                      Sign Up
                    </button>
                  </Link>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <main onClick={handleClickOutlet}>
        <Outlet />
      </main>
    </>
  );
};

export default Nav;

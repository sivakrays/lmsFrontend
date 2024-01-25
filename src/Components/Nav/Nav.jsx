import React, { useContext, useEffect, useState } from "react";
import "./Nav.css";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { authContext } from "../../Context/AuthContext";
import profile from "../../Assets/HeroSection/stelly-orange.svg";
import BadgeDetail from "../BadgeDetail/BadgeDetail";
import { cartContext } from "../../Context/CartContext";

const Cart = ({ totalCartItem }) => {
  return (
    <>
      <Link to={"addToCart"}>
        <div className="flex  cursor-pointer items-center justify-center">
          <div className="relative scale-75">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="h-8 w-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
              />
            </svg>
            <span className="absolute -top-2 left-4 rounded-full bg-red-500 p-0.5 px-2 text-sm text-red-50">
              {totalCartItem}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

const Nav = () => {
  const { totalCartItem } = useContext(cartContext);
  const { logout, isTokenValid, user } = useContext(authContext);
  const location = useLocation();
  const [toggle, setToggle] = useState(false);
  const [currentPath, setCurrentPath] = useState("");
  const navigate = useNavigate();

  const [clicked, setClicked] = useState(false);

  const handleToggle = () => {
    setToggle(!toggle);
  };
  useEffect(() => {
    setCurrentPath(location.pathname);
  }, [location.pathname]);

  const handleProfile = () => {
    setClicked(!clicked);
  };
  const unAuthorizedMenuItem = [
    { name: "Home", path: "/" },
    { name: "Featured Course", path: "/course" },
    { name: "Contact", path: "/contact" },
  ];
  const authorizedMenuItem = [
    { name: "Home", path: "/" },
    { name: "Featured Course", path: "/course" },
    { name: "My Learnings", path: "/mylearnings" },
    { name: "Contact", path: "/contact" },
  ];

  const handleLogOut = () => {
    logout();
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <>
      <div className="navbar w-full">
        <nav
          className={`flex h-20 items-center justify-around  ${
            currentPath === "/course" ? `bg-coursebg shadow-sm ` : `bg-herobg`
          }   md:h-28 `}
        >
          <Link to={"/"}>
            <div className=" flex  items-center justify-center gap-2 ">
              <span className=" dayOne rounded-md bg-textColor px-4 py-1 text-lg font-bold text-white">
                Course
              </span>
              <span className="text-lg font-bold text-textColor">desk</span>
            </div>
          </Link>

          <div className="nav_link ">
            {isTokenValid ? (
              <div className="flex ">
                <ul className="flex gap-12">
                  {authorizedMenuItem.map((item, index) => (
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
            ) : (
              <div>
                <ul className="flex gap-12">
                  {unAuthorizedMenuItem.map((item, index) => (
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
            )}
          </div>

          {/* showing profile submenu */}
          <div className="nav_btn  z-10 hidden gap-11  lg:flex">
            {isTokenValid ? (
              <div className="relative flex lg:gap-5 xl:gap-8">
                <BadgeDetail />
                <Cart totalCartItem={totalCartItem} />
                <div
                  className=" flex cursor-pointer items-center gap-x-2 "
                  onClick={handleProfile}
                >
                  <img
                    src={profile}
                    alt=""
                    className="h-7 w-7 rounded-full bg-textColor"
                  />
                  <p className="text-md font-semibold text-textLightColor">
                    {/* {localStorage.getItem("Current User")} */}
                    {user || localStorage.getItem("Current User")}
                  </p>
                </div>
                <div
                  className={` ${
                    clicked
                      ? "showMenu absolute  top-[50px] block  w-[200px] rounded border-2 bg-white py-3 shadow-md"
                      : "hidden"
                  }`}
                >
                  <Link to="profile">
                    <div
                      className="cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                      onClick={handleProfile}
                    >
                      Profile
                    </div>
                  </Link>
                  {isTokenValid &&
                  localStorage.getItem("Role").toLocaleLowerCase() ===
                    "admin" ? (
                    <>
                      <Link to="/dashboard">
                        <div
                          className="cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                          onClick={handleProfile}
                        >
                          DashBoard
                        </div>
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                  <div
                    className="text-md cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                    onClick={handleLogOut}
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
                {/* <Link to="signup">
                  <button className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor px-6  py-1.5 font-semibold  text-textColor hover:bg-textColor hover:text-white hover:duration-500">
                    Sign Up
                  </button>
                </Link> */}
              </div>
            )}
          </div>
          {!toggle ? (
            <>
              <div className="z-10 flex items-center gap-4 lg:hidden">
                <Cart totalCartItem={totalCartItem} />
                <button
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
              </div>
            </>
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
            {isTokenValid && (
              <li>
                <Link
                  to={"/mylearnings"}
                  className="text-md font-semibold"
                  onClick={handleToggle}
                >
                  My Learning
                </Link>
              </li>
            )}
            {isTokenValid && localStorage.getItem("Role") === "Admin" ? (
              <>
                <Link to="/dashboard">
                  <div
                    className="cursor-pointer p-2 font-semibold text-textColor hover:bg-herobg"
                    onClick={handleProfile}
                  >
                    DashBoard
                  </div>
                </Link>
              </>
            ) : (
              ""
            )}
            <li>
              {isTokenValid ? (
                <div>
                  <button
                    className="text-md cursor-pointer font-semibold  uppercase text-textColor"
                    onClick={handleLogOut}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3">
                  <Link to="login">
                    <button
                      className="text-md font-semiboldnuppercase cursor-pointer rounded-[10px] border-2 border-solid border-textColor bg-textColor px-6 py-1.5 text-white"
                      onClick={handleToggle}
                    >
                      Login1
                    </button>
                  </Link>
                  {/* <Link to="signup">
                    <button
                      className="text-md cursor-pointer rounded-[10px] border-2 border-solid border-textColor bg-textColor  px-6 py-1.5 font-semibold   uppercase text-white"
                      onClick={handleToggle}
                    >
                      Sign Up
                    </button>
                  </Link> */}
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
      <main onClick={() => setClicked(false)}>
        <Outlet />
      </main>
    </>
  );
};

export default Nav;

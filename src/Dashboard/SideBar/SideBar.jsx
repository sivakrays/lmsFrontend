import React, { useContext, useState } from "react";
import "./SideBar.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { PiUserSwitchFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa6";
import { GiAchievement } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";
import { IoLogOut } from "react-icons/io5";
import { authContext } from "../../Context/AuthContext";

const BottomBar = ({ role }) => {
  return (
    <>
      {/* Mobile BottomBar */}
      <Tooltip id="my-tooltip1" place="top" />
      <div>
        <div className="">
          <Outlet />
        </div>
        <ul className="fixed bottom-0 flex h-14 w-full items-center justify-around gap-3 rounded-tl-md rounded-tr-md  bg-textColor py-2">
          <li>
            <Link
              to={"/dashboard"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="DashBoard"
            >
              <MdDashboard className="bottomIcon h-7 w-7 cursor-pointer object-cover text-herobg sm:h-7 " />
            </Link>
          </li>
          {role === "admin" && (
            <li>
              <Link
                to={"/courses"}
                data-tooltip-id="my-tooltip1"
                data-tooltip-content="MyCourse"
              >
                <FaLayerGroup className="bottomIcon h-7 w-7 cursor-pointer object-cover text-herobg sm:h-6 " />
              </Link>
            </li>
          )}
          <li>
            <Link
              to={"/leaderboard"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="LeaderBoard"
            >
              <GiAchievement className="bottomIcon h-7 w-7 object-cover  text-herobg sm:h-8 " />
            </Link>
          </li>
          {role !== "admin" && (
            <li>
              <Link
                to={"/users"}
                data-tooltip-id="my-tooltip1"
                data-tooltip-content="Users"
              >
                <FaUsers className="bottomIcon h-7 w-7 object-cover text-herobg sm:h-6  " />
              </Link>
            </li>
          )}
          <li className=" flex items-center justify-center text-herobg">
            <button data-tooltip-id="my-tooltip1" data-tooltip-content="Logout">
              <IoLogOut className="h-7 w-7" />
            </button>
          </li>
        </ul>
      </div>
    </>
  );
};

const SideBar = () => {
  const navigate = useNavigate();

  const { logout } = useContext(authContext);

  const role = localStorage.getItem("role");
  console.log(role);
  const logOut = () => {
    logout();
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      <div className="relative hidden sm:flex">
        <div className="sidenavLinks fixed flex h-full flex-col justify-between bg-textColor">
          <ul className=" flex  w-16 flex-col gap-11 ">
            <li className="mx-auto mt-11 text-herobg">
              <Link to={"/dashboard"}>
                <MdDashboard className="mx-auto h-8 w-9 cursor-pointer text-herobg" />
              </Link>
            </li>
            {role === "admin" && (
              <li>
                <Link to={"/courses"}>
                  <FaLayerGroup className="mx-auto h-7 w-9 cursor-pointer text-herobg" />
                </Link>
              </li>
            )}

            <li>
              <Link to={"/leaderboard"}>
                <GiAchievement className="mx-auto h-9 w-9  text-herobg" />
              </Link>
            </li>
            {role !== "admin" && (
              <li>
                <Link to={"/users"}>
                  <FaUsers className="mx-auto h-9 w-9  text-herobg" />
                </Link>
              </li>
            )}
          </ul>
          <ul className="item-center flex justify-center pb-10">
            <li className=" text-herobg">
              <button
                onClick={() => logOut()}
                data-tooltip-id="my-tooltip1"
                data-tooltip-content="Logout"
              >
                <IoLogOut className="h-[40px] w-[40px]" />
              </button>
            </li>
          </ul>
        </div>

        <div className="h-full w-full bg-herobg sm:ml-16">
          <Outlet />
        </div>
      </div>

      <div className="relative flex w-full flex-col  sm:hidden">
        <BottomBar role={role} />
      </div>
    </>
  );
};

export default SideBar;

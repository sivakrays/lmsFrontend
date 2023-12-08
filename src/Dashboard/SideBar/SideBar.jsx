import React from "react";
import "./SideBar.css";
import { Link, Outlet } from "react-router-dom";
import { PiUserSwitchFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa6";
import { GiAchievement } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { Tooltip } from "react-tooltip";

const SideBar = () => {
  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      <div className="relative hidden sm:flex">
        <ul className="fixed flex h-screen w-16 flex-col gap-11 bg-textColor">
          <li className="mx-auto mt-11 text-herobg">
            <Link
              to={"/profile"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Profile"
            >
              <PiUserSwitchFill className="mx-auto h-8 w-9 cursor-pointer text-herobg" />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="DashBoard"
            >
              <MdDashboard className="mx-auto h-7 w-9 cursor-pointer text-herobg" />
            </Link>
          </li>
          <li>
            <Link
              to={"/myCourse"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="MyCourse"
            >
              <FaLayerGroup className="mx-auto h-6 w-9 cursor-pointer text-herobg" />
            </Link>
          </li>
          <li>
            <Link
              to={"/leaderboard"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="LeaderBoard"
            >
              <GiAchievement className="mx-auto h-8 w-9  text-herobg" />
            </Link>
          </li>
          <li>
            <Link
              to={"/users"}
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Users"
            >
              <FaUsers className="mx-auto h-6 w-9  text-herobg" />
            </Link>
          </li>
        </ul>
        <div className="h-full w-full bg-herobg sm:ml-16">
          <Outlet />
        </div>
      </div>

      {/* Mobile BottomBar */}
      <Tooltip id="my-tooltip1" place="top" />
      <div className="relative flex w-full flex-col  sm:hidden">
        <div className="">
          <Outlet />
        </div>
        <ul className="fixed bottom-0 flex h-12 w-full items-center justify-around gap-6 rounded-l-md rounded-r-md  bg-textColor py-2">
          <li className=" text-herobg">
            <Link
              to={"/profile"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="Profile"
            >
              <PiUserSwitchFill className="h-7 w-9 cursor-pointer text-herobg sm:h-8 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="DashBoard"
            >
              <MdDashboard className="h-6 w-9 cursor-pointer text-herobg sm:h-7 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/myCourse"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="MyCourse"
            >
              <FaLayerGroup className="h-5 w-9 cursor-pointer text-herobg sm:h-6 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/leaderboard"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="LeaderBoard"
            >
              <GiAchievement className="h-7 w-9  text-herobg sm:h-8 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/users"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="Users"
            >
              <FaUsers className="h-5 w-9 text-herobg sm:h-6  " />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;

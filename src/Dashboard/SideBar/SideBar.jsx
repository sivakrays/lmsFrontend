import React from "react";
import "./SideBar.css";
import { Link, Outlet } from "react-router-dom";
import { PiUserSwitchFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa6";
import { GiAchievement } from "react-icons/gi";
import { FaUsers } from "react-icons/fa6";
import { RiUploadCloud2Fill } from "react-icons/ri";
import { Tooltip } from "react-tooltip";

const SideBar = () => {
  return (
    <>
      <Tooltip id="my-tooltip" place="right" />
      <div className="relative hidden sm:flex">
        <ul className="fixed flex h-full w-16 flex-col gap-11 bg-textColor">
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
            <Link to={"/dashboard"}>
              <MdDashboard className="mx-auto h-8 w-9 cursor-pointer text-herobg" />
            </Link>
          </li>
          <li>
            <Link to={"/upload"}>
              <RiUploadCloud2Fill className="mx-auto h-9 w-9  text-herobg" />
            </Link>
          </li>
          <li>
            <Link to={"/myCourse"}>
              <FaLayerGroup className="mx-auto h-7 w-9 cursor-pointer text-herobg" />
            </Link>
          </li>
          <li>
            <Link to={"/leaderboard"}>
              <GiAchievement className="mx-auto h-9 w-9  text-herobg" />
            </Link>
          </li>
          <li>
            <Link to={"/users"}>
              <FaUsers className="mx-auto h-9 w-9  text-herobg" />
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
        <ul className="fixed bottom-0 flex h-14 w-full items-center justify-around gap-3 rounded-tl-md rounded-tr-md  bg-textColor py-2">
          <li className=" text-herobg">
            <Link
              to={"/profile"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="Profile"
            >
              <PiUserSwitchFill className="bottomIcon h-7 w-7 cursor-pointer object-cover text-herobg sm:h-8 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/dashboard"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="DashBoard"
            >
              <MdDashboard className="bottomIcon h-7 w-7 cursor-pointer object-cover text-herobg sm:h-7 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/upload"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="UploadCourse"
            >
              <RiUploadCloud2Fill className="bottomIcon h-7 w-7 object-cover text-herobg sm:h-6  " />
            </Link>
          </li>
          <li>
            <Link
              to={"/myCourse"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="MyCourse"
            >
              <FaLayerGroup className="bottomIcon h-7 w-7 cursor-pointer object-cover text-herobg sm:h-6 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/leaderboard"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="LeaderBoard"
            >
              <GiAchievement className="bottomIcon h-7 w-7 object-cover  text-herobg sm:h-8 " />
            </Link>
          </li>
          <li>
            <Link
              to={"/users"}
              data-tooltip-id="my-tooltip1"
              data-tooltip-content="Users"
            >
              <FaUsers className="bottomIcon h-7 w-7 object-cover text-herobg sm:h-6  " />
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default SideBar;

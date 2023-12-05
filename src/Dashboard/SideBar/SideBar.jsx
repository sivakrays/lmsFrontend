import React from "react";
import "./SideBar.css";
import { Link, Outlet } from "react-router-dom";
import { PiUserSwitchFill } from "react-icons/pi";
import { MdDashboard } from "react-icons/md";
import { FaLayerGroup } from "react-icons/fa6";
import { MdOutlineLeaderboard } from "react-icons/md";
import { GrAchievement } from "react-icons/gr";
import { GiAchievement } from "react-icons/gi";
import { PiUsersFourFill } from "react-icons/pi";
import { FaUsers } from "react-icons/fa6";
const SideBar = () => {
  return (
    <>
      <div className=" flex   ">
        <ul className="hidden h-screen w-16 flex-col gap-11 bg-textColor sm:flex">
          <li className="mx-auto mt-11 text-herobg">
            <Link to={"/profile"}>
              <PiUserSwitchFill className="mx-auto h-8 w-9 cursor-pointer text-herobg" />
            </Link>
          </li>
          <li>
            <Link to={"/dashboard"}>
              <MdDashboard className="mx-auto h-8 w-9 cursor-pointer text-herobg" />
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
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SideBar;

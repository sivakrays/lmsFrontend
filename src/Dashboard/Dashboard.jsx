import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";
import { Link } from "react-router-dom";
import data from "../Data/Data";

const DashBoardContent = () => {
  const role = localStorage.getItem("role");
  return (
    <>
      <div className="min-h-screen w-full bg-herobg">
        <div className="ml-1 p-4 md:pl-12  ">
          <div className="profile_header">
            <h2 className="dayOne text-2xl text-textColor md:pt-5">
              Dashboard
            </h2>
            <h4 className="text-textLightColor">
              Welcome to{" "}
              {role === "admin" ? (
                <Link to="/" className="dayOne">
                  {data[0].title}
                </Link>
              ) : (
                <>{data[0].title}</>
              )}{" "}
              Dashboard
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <div className="hidden h-screen w-full sm:flex">
        <div>
          <SideBar />
        </div>
        <DashBoardContent />
      </div>

      {/* Mobile DashBoard */}
      <div className="flex h-screen w-full flex-col sm:hidden">
        <div className="h-screen">
          <DashBoardContent />
        </div>
        <div>
          <SideBar />
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";

const DashBoardContent = () => {
  return (
    <>
      <div className="h-screen w-full bg-herobg">
        <div className="mx-auto w-11/12  ">
          <div className="profile_header">
            <h2 className="dayOne pt-9 text-2xl text-textColor">Dashboard</h2>
            <h4 className="text-textLightColor">
              Welcome to Course Desk Dashboard
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

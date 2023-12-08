import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";

const DashBoardContent = () => {
  return (
    <>
      <div className="h-screen w-full bg-herobg">
        <div>DashBoard Content</div>
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

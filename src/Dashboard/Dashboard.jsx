import React from "react";
import "./Dashboard.css";
import SideBar from "./SideBar/SideBar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div className="flex h-screen w-full">
        <div>
          <SideBar />
        </div>
        <div>Dashboard Page</div>
      </div>
    </>
  );
};

export default Dashboard;

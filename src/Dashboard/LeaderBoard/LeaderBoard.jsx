import React from "react";
import "./LeaderBoard.css";
import data from "../../Data/Data";
import { Link } from "react-router-dom";

const LeaderBoard = () => {
  return (
    <>
      <div className="h-screen w-full bg-herobg">
        <div className="ml-1 p-4 md:pl-12">
          <div className="profile_header">
            <h2 className="dayOne text-2xl text-textColor md:pt-5">
              LeaderBoard
            </h2>
            <h4 className="text-textLightColor">
              Welcome to{" "}
              <Link to="/" className="dayOne">
                {data[0].title}
              </Link>{" "}
              LeaderBoard
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;

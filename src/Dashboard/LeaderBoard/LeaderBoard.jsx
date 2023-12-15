import React from "react";
import "./LeaderBoard.css";

const LeaderBoard = () => {
  return (
    <>
      <div className="h-screen w-full bg-herobg">
        <div className="mx-auto w-11/12  ">
          <div className="profile_header">
            <h2 className="dayOne pt-9 text-2xl text-textColor">
              Leader Board
            </h2>
            <h4 className="text-textLigntColor">
              Welcome to Course Desk Leader Board Page
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeaderBoard;

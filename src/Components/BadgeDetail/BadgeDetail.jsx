import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";

import bronze from "../../Assets/reward/Bronze Medal.png";
import silver from "../../Assets/reward/Silver Medal.png";
import gold from "../../Assets/reward/Gold Medal.png";

const BadgeDetail = () => {
  const { totalBronze, totalSilver, totalGold } = useContext(authContext);

  console.log(totalBronze, totalSilver, totalGold, "from badge");

  return (
    <>
      <div className="flex  items-center justify-evenly lg:gap-4 xl:gap-6  ">
        <div className="flex items-center justify-center gap-2">
          <img
            src={bronze}
            className="object-contain lg:h-5 lg:w-5 xl:h-7 xl:w-7"
          ></img>
          <div>{totalBronze}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={silver}
            className="object-contain lg:h-5 lg:w-5 xl:h-7 xl:w-7"
          ></img>
          <div>{totalSilver}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={gold}
            className="object-contain lg:h-5 lg:w-5 xl:h-8 xl:w-8"
          ></img>
          <div>{totalGold}</div>
        </div>
      </div>
    </>
  );
};

export default BadgeDetail;

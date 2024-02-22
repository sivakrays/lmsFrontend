import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";

import bronze1 from "../../Assets/reward/Bronze Medal.png";
import silver1 from "../../Assets/reward/Silver Medal.png";
import gold1 from "../../Assets/reward/Gold Medal.png";

const BadgeDetail = ({ bronze, silver, gold }) => {
  // const { totalBronze, totalSilver, totalGold } = useContext(authContext);

  return (
    <>
      <div className="flex  items-center justify-evenly lg:gap-4 xl:gap-6  ">
        <div className="flex items-center justify-center gap-2">
          <img
            src={bronze1}
            className="object-contain lg:h-5 lg:w-5 xl:h-7 xl:w-7"
          ></img>
          <div>{bronze}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={silver1}
            className="object-contain lg:h-5 lg:w-5 xl:h-7 xl:w-7"
          ></img>
          <div>{silver}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={gold1}
            className="object-contain lg:h-5 lg:w-5 xl:h-8 xl:w-8"
          ></img>
          <div>{gold}</div>
        </div>
      </div>
    </>
  );
};

export default BadgeDetail;

import React, { useContext, useState, useEffect } from "react";
import { authContext } from "../../Context/AuthContext";

import bronze from "../../Assets/reward/Bronze Medal.png";
import silver from "../../Assets/reward/Silver Medal.png";
import gold from "../../Assets/reward/Gold Medal.png";

const BadgeDetail = () => {
  // const { totalBronze, totalSilver, totalGold } = useContext(authContext);

  const [tbronze, setBronze] = useState(0);

  useEffect(() => {
    let bronzeValue = localStorage.getItem("bronze");
    if (bronzeValue !== "") {
      setBronze(bronzeValue);
    }
  }, [tbronze]);

  return (
    <>
      <div className="flex  items-center justify-evenly lg:gap-4 xl:gap-6  ">
        <div className="flex items-center justify-center gap-2">
          <img
            src={bronze}
            className="object-contain lg:h-5 lg:w-5 xl:h-7 xl:w-7"
          ></img>
          <div>{localStorage.getItem("silver")}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={silver}
            className="object-contain lg:h-5 lg:w-5 xl:h-7 xl:w-7"
          ></img>
          <div>{localStorage.getItem("silver")}</div>
        </div>
        <div className="flex items-center justify-center gap-2">
          <img
            src={gold}
            className="object-contain lg:h-5 lg:w-5 xl:h-8 xl:w-8"
          ></img>
          <div>{localStorage.getItem("gold")}</div>
        </div>
      </div>
    </>
  );
};

export default BadgeDetail;

import React from "react";

import badge from "../../Assets/Badge/Badge.png";
import badge1 from "../../Assets/Badge/Silver.png";
import badge2 from "../../Assets/Badge/Bronze.png";
import silver from "../../Assets/Badge/Silver.png";
import bronze from "../../Assets/Badge/Bronze.png";

import "./Reward.css";

const Reward = ({ setIsReward, energyPoints, autoPlayNext }) => {
  console.log(energyPoints);

  return (
    <>
      <div className="absolute top-0 min-h-screen w-[72%] bg-herobg ">
        <div className="rewardCard  relative  mx-auto mt-28 h-[430px]   w-[350px] rounded-2xl border bg-white">
          <div className="flex items-center justify-evenly">
            <div className="closebtn absolute right-0 top-0 m-2 flex items-center  rounded-full bg-blue-500 text-textColor drop-shadow-2xl">
              {/* <button onClick={() => setIsReward(false)} data-testid="close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="white"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button> */}
            </div>
            <p className="dayOne mt-8 text-center text-2xl text-gray-500">
              Congratulations!
            </p>
          </div>
          <div className="mx-auto  flex w-[300px] items-center justify-center">
            {energyPoints === 3 && (
              <img src={badge} alt="reward1" className="h-56 drop-shadow-2xl" />
            )}
            {energyPoints === 2 && (
              <img
                src={badge1}
                alt="reward1"
                className="h-56 drop-shadow-2xl"
              />
            )}
            {energyPoints === 1 && (
              <img
                src={badge2}
                alt="reward1"
                className="h-56 drop-shadow-2xl"
              />
            )}
            {energyPoints === 0 && (
              <img src={badge} alt="reward1" className="h-56 drop-shadow-2xl" />
            )}
          </div>
          <div className="rewardContent mx-auto mt-5 flex w-[300px] flex-col gap-4 ">
            <p className="flex flex-col items-center gap-2 text-gray-500">
              <span>Well done! You have earned,</span>
              <span className="text-xl font-semibold">
                {energyPoints === 3 && " Enthusiast - Gold Badge"}
                {energyPoints === 2 && "Admirer - Silver Badge"}
                {energyPoints === 1 && "Supporter - Bronze Badge"}
                {energyPoints === 0 && "Diligent - Work hard!"}
              </span>
            </p>
          </div>
          <button
            type="button"
            onClick={() => autoPlayNext()}
            className="absolute bottom-0 w-full rounded-b-2xl border border-blue-600 bg-blue-500 py-2 text-center text-white"
          >
            Continue
          </button>
          {/* <div className="mx-auto w-[300px] text-center">
            <button
              className="mt-6 w-[200px] rounded-lg bg-red-500 p-2 font-semibold text-white"
              onClick={handleClick}
            >
              {energyPoint == 0 ? "Retry" : "Claim"}
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Reward;

import React from "react";
import Bronze from "../../Assets/reward/Bronze Medal.png";
import Silver from "../../Assets/reward/Silver Medal.png";
import Gold from "../../Assets/reward/Gold Medal.png";
import start from "../../Assets/reward/star.png";

import "./Reward.css";

const Reward = ({ setRewardModal, energyPoint }) => {
  return (
    <>
      <div className="mt-8 flex h-screen w-screen items-center justify-center">
        <div className="rewardCard  relative  h-[500px] w-[350px] rounded-2xl   bg-[#ffc645]">
          <div className="closebtn absolute right-0 m-5 text-textColor drop-shadow-2xl ">
            <button onClick={() => setRewardModal(false)} data-testid="close">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mx-auto mt-8 flex w-[300px] items-center justify-center">
            {energyPoint == 0 && (
              <img src={start} alt="reward1" className="h-48 drop-shadow-2xl" />
            )}
            {energyPoint == 1 && (
              <img
                src={Bronze}
                alt="reward1"
                className="h-48 drop-shadow-2xl"
              />
            )}
            {energyPoint == 2 && (
              <img
                src={Silver}
                alt="reward1"
                className="h-48 drop-shadow-2xl"
              />
            )}
            {energyPoint == 3 && (
              <img src={Gold} alt="reward1" className="h-56 drop-shadow-2xl" />
            )}
          </div>
          <div className="rewardContent mx-auto mt-5 flex w-[300px] flex-col gap-4 ">
            <p className="dayOne text-center text-2xl text-textColor">
              {energyPoint == 0
                ? "Try again and get the Points :)"
                : "congratulations!"}
            </p>
            <p className="text-center font-semibold text-textColor">
              Well done! Your dedication and effort have paid off. We're proud
              of your achievement! 🌟🎓
            </p>
          </div>
          <div className="mx-auto w-[300px] text-center">
            <button
              className="mt-6 w-[200px] rounded-lg bg-red-500 p-2 font-semibold text-white"
              onClick={() => setRewardModal(false)}
            >
              {energyPoint == 0 ? "Retry" : "Claim"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reward;

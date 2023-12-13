import React from "react";
import rewards from "../../Assets/reward/Tropy Star.png";
import "./Reward.css";

const Reward = ({ setRewardModal }) => {
  return (
    <>
      <div className="mt-8 flex h-screen w-screen items-center justify-center">
        <div className="rewardCard  relative  h-[500px] w-[350px] rounded-2xl border-2  bg-white ">
          <div className="closebtn absolute right-0 m-5 text-textColor drop-shadow-2xl ">
            <button onClick={() => setRewardModal(false)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                class="h-6 w-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mx-auto mt-8 flex w-[300px] items-center justify-center">
            <img src={rewards} alt="reward1" className="h-48 drop-shadow-2xl" />
          </div>
          <div className="rewardContent mx-auto mt-5 flex w-[300px] flex-col gap-4 ">
            <p className="dayOne text-center text-2xl text-textColor">
              congratulations!
            </p>
            <p className="text-center text-textLigntColor">
              Well done! Your dedication and effort have paid off. We're proud
              of your achievement! 🌟🎓
            </p>
          </div>
          <div className="mx-auto w-[300px] text-center">
            <button className=" shadow23 day mt-6 w-[200px] rounded-lg bg-red-500 p-2 text-white">
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Reward;

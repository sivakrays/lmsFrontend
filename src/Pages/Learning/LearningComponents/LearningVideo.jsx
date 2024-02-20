import React, { useState } from "react";
import { Player } from "video-react";
import ReactPlayer from "react-player";

const LearningVideo = ({ videoUrl, autoPlayNext, playPrevious, isLast }) => {
  return (
    <React.Fragment>
      <div className="relative">
        <ReactPlayer
          controls
          width={"100%"}
          height={"81vh"}
          url={videoUrl}
          playing={true}
          onEnded={autoPlayNext}
          style={{
            backgroundColor: "#FCFAF0",
          }}
          config={{
            file: {
              attributes: {
                controlsList: "nodownload",
              },
            },
          }}
        />
        {/* <Player>
        <source src={`${videoUrl}`} />
      </Player> */}
        {/* Play Previous Functionality */}
        <div
          className={`absolute left-0 top-[50%] cursor-pointer rounded-sm border-0 bg-textLightColor text-white`}
        >
          <div className="flex h-12 w-7 items-center justify-center">
            <button type="button" onClick={() => playPrevious()}>
              <svg
                data-accordion-icon
                className=" h-4 w-4 shrink-0 rotate-[270deg]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </div>
        </div>
        {/* Play Next Functionality */}
        {isLast !== true && (
          <div
            className={`absolute right-0 top-[50%] cursor-pointer rounded-sm border-0 bg-textLightColor text-white`}
          >
            <div className="flex h-12 w-7 items-center justify-center">
              <button type="button" onClick={() => autoPlayNext()}>
                <svg
                  data-accordion-icon
                  className=" h-4 w-4 shrink-0 rotate-90"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5 5 1 1 5"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default LearningVideo;

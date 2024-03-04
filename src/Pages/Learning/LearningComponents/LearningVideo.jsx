import { post } from "jquery";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { checkAndRefreshToken } from "../../../utils/RefreshToken/RefreshToken";

const LearningVideo = ({
  videoUrl,
  autoPlayNext,
  playPrevious,
  isLast,
  userId,
  courseId,
  sectionId,
  subSectionId,
}) => {
  const [playedTime, setPlayedTime] = useState(0);

  const handleProgress = (state) => {
    const currentSecondsWhole = Math.round(state.playedSeconds);
    setPlayedTime(currentSecondsWhole);
    console.log(currentSecondsWhole);
  };

  const sendPlayedSecondsToApi = async () => {
    if (playedTime > 0) {
      console.log("previously played Seconds", playedTime);
      const currentToken = JSON.parse(localStorage.getItem("token"));
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshedToken}`,
          },
        };

        const data = {
          userId: userId,
          courseId: courseId,
          sectionId: sectionId,
          subSectionId: subSectionId,
          playedSeconds: playedTime,
          watched: true,
        };

        console.log(data);

        const res = await post("/user/saveCourseVideoDuration", data, config);
        console.log(res.data);
      } catch (err) {
        console.log("error");
      }
    }
  };

  const videoEnded = () => {
    autoPlayNext();
  };

  return (
    <React.Fragment>
      <div className="relative">
        <ReactPlayer
          controls
          width={"100%"}
          height={"81vh"}
          url={videoUrl}
          playing={true}
          onReady={sendPlayedSecondsToApi}
          onEnded={videoEnded}
          onProgress={handleProgress}
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

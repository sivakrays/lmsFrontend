import React, { useState } from "react";
import ReactPlayer from "react-player";
import Accordion from "../../Components/Accordian/Accordian";
import Quiz from "../../Components/Quiz/Quiz";

const MyVideo = () => {
  const [videoUrl, setVideoUrl] = useState(
    "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
  );
  const [isVideoAll, setIsVideoAll] = useState(true);
  const [isQuizClicked, setIsQuizClicked] = useState(false);
  const accordianDetails = [
    {
      key: 1,
      accordianName: "Introduction",
      nestedItems: [
        {
          key: 1,
          accordianName: "Introduction",
          previewText:
            "The Complete Personal Finance for Kids and Teenagers Course by Steeve Simbert is a comprehensive, engaging, and fun online program, designed to boost the financial literacy of the younger generation. It uses entertaining animated cartoon videos to simplify complex financial, business, and economic concepts, covering everything from basic personal finance to investment strategies and retirement savings. ",
          link: "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
        },
      ],
    },
    {
      key: 2,
      accordianName: "Personal Finance",
      nestedItems: [
        {
          key: 1,
          accordianName: "Invest In Yourself",
          previewText:
            "If you want to be better than you are today, you must do something to improve yourself.",
          quiz: "Invest In Yourself Quiz",
          link: "https://www.youtube.com/watch?v=VxmTTvGezro",
        },
        {
          key: 2,
          accordianName: "Financial Freedom",
          previewText:
            " In this episode, you’ll learn the following from Prof Stevy:What “Financial Freedom” is Benefits of having financial freedom .How to become financially free",
          quiz: "Financial Freedom Quiz",
          link: "https://www.youtube.com/watch?v=0W0wqqy8ct8",
        },
      ],
    },
    {
      key: 3,
      accordianName: "The Three Little Pigs & Financial Planning",
      nestedItems: [
        {
          key: 1,
          accordianName: "Invest In Yourself",
          previewText:
            "If you want to be better than you are today, you must do something to improve yourself.",
          quiz: "Invest In Yourself Quiz",
          link: "https://www.youtube.com/watch?v=CaAuFwJJ8sA",
        },
        {
          key: 2,
          accordianName: "Financial Freedom",
          previewText:
            " In this episode, you’ll learn the following from Prof Stevy:What “Financial Freedom” is Benefits of having financial freedom .How to become financially free",
          quiz: "Financial Freedom Quiz",
          link: "https://www.youtube.com/watch?v=-OWR2oyKbf8",
        },
      ],
    },
  ];
  const isSmallScreen = window.innerWidth < 1024;
  const handleCollapse = () => {
    setIsVideoAll(!isVideoAll);
  };

  const setUrl = (link) => {
    console.log("Valueeeeee", link);
    setVideoUrl(link);
    setIsQuizClicked(false);
  };
  const handleQuizOpen = () => {
    setIsQuizClicked(!isQuizClicked);
  };

  const myLearningVideo = () => {
    console.log("videoUrl........", videoUrl);
    return (
      <div className="relative  w-[100%]">
        <ReactPlayer
          controls
          width={isSmallScreen ? "100%" : "70%"}
          //style={{ width: isSmallScreen ? "100%" : "70%" }}
          height="100%"
          url={videoUrl}
          className=" lg:fixed "
        />
      </div>
    );
  };
  return (
    <>
      <div className=" hidden   w-full  lg:flex ">
        <div className="  w-full  pl-1  pt-20 md:pt-28  lg:w-[30%] lg:pt-28">
          <div className=" cursor-pointer p-3" onClick={handleCollapse}>
            {isVideoAll ? (
              <p className="text-sm font-semibold text-textColor">
                Collapse All
              </p>
            ) : (
              <p className="text-sm font-semibold text-textColor">
                {" "}
                Expand All
              </p>
            )}
          </div>
          <div className=" h-auto ">
            <Accordion
              accordianDetails={accordianDetails}
              path="MyVideo"
              setUrl={setUrl}
              isVideoAllOpen={isVideoAll}
              handleQuizOpen={handleQuizOpen}
              isQuizClicked={isQuizClicked}
            />
          </div>
        </div>

        <div className="lg:w-[70%] ">
          {isQuizClicked ? <Quiz /> : myLearningVideo()}
        </div>
      </div>

      {/* small device view  */}

      <div className=" flex  w-full flex-col  pt-14 md:pt-20 lg:hidden">
        <div className=" mt-6 w-full  ">
          {isQuizClicked ? <Quiz /> : myLearningVideo()}
        </div>
        <div className=" pl-1 ">
          <div className=" cursor-pointer p-3" onClick={handleCollapse}>
            {isVideoAll ? (
              <p className="text-sm font-semibold text-textColor">
                Collapse All
              </p>
            ) : (
              <p className="text-sm font-semibold text-textColor">
                {" "}
                Expand All
              </p>
            )}
          </div>
          <div className="  h-auto  w-full">
            <Accordion
              accordianDetails={accordianDetails}
              path="MyVideo"
              setUrl={setUrl}
              isVideoAllOpen={isVideoAll}
              handleQuizOpen={handleQuizOpen}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyVideo;

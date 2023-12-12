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

  const handleCollapse = () => {
    setIsVideoAll(!isVideoAll);
  };

  const setUrl = (link) => {
    console.log("Valueeeeee", link);
    setVideoUrl(link);
  };
  const handleQuizOpen = () => {
    setIsQuizClicked(!isQuizClicked);
  };

  const myLearningVideo = () => {
    console.log("videoUrl........", videoUrl);
    return (
      <div className="relative  w-full">
        <ReactPlayer
          controls
          width="70%"
          height="100%"
          url={videoUrl}
          className=" md:fixed md:right-0 md:top-0"
        />
      </div>
    );
  };
  return (
    <div className=" flex  w-full flex-col-reverse md:flex md:flex-row">
      <div className="relative h-screen w-full pl-1   pt-16 md:h-full  md:w-[30%] md:pt-28">
        <div
          className=" absolute right-2 top-5 cursor-pointer p-3"
          onClick={handleCollapse}
        >
          {isVideoAll ? (
            <p className="text-sm font-semibold text-textColor">Collapse All</p>
          ) : (
            <p className="text-sm font-semibold text-textColor"> Expand All</p>
          )}
        </div>
        <div className=" ">
          <Accordion
            accordianDetails={accordianDetails}
            path="MyVideo"
            setUrl={setUrl}
            isVideoAllOpen={isVideoAll}
            handleQuizOpen={handleQuizOpen}
          />
        </div>
      </div>

      <div className=" w-full   md:w-[70%]   xl:pt-20">
        {isQuizClicked ? <Quiz /> : myLearningVideo()}
      </div>
    </div>
  );
};

export default MyVideo;

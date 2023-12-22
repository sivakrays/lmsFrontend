import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Accordion from "../../Components/Accordian/Accordian";
import Quiz from "../../Components/Quiz/Quiz";
import Modal from "../../Components/Modal/Modal";
import { get } from "../../ApiCall/ApiCall";

const MyVideo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isrewardModal, setRewardModal] = useState(false);
  const [energyPoint, setEnergyPoint] = useState(0);

  const [videoUrl, setVideoUrl] = useState(
    "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
  );
  const [isVideoAll, setIsVideoAll] = useState(true);
  const [isQuizClicked, setIsQuizClicked] = useState(false);
  const [accordionDetails, setAccordionDetails] = useState([]);
  const [quizzArray, setQuizzArray] = useState([]);
  const [subSectionId, setSubSectionId] = useState("");

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      "Acess-Control-Allow-Headers": "*",
      Accept: "application/json",
      courseId: "258",
    },
  };

  useEffect(() => {
    const getAccordionDetails = async () => {
      await get("/user/getCourseById", config)
        .then((res) => {
          setAccordionDetails(res && res.data && res.data.sections);
        })
        .catch((err) => console.log(err));
    };

    getAccordionDetails();
  }, []);

  // const accordionDetails = {
  //   courseId: 3253,
  //   title: "Website development",
  //   authorName: "Mark Antony",
  //   description: "hello world.",
  //   thumbNail: "string",
  //   enrolled: 12,
  //   category: "Programming",
  //   ratings: 5,
  //   language: "english",
  //   overview: "good",
  //   whatYouWillLearn:
  //     "The Complete Personal Finance for Kids and Teenagers Course by Steeve Simbert is a comprehensive, engaging, and fun online program, designed to boost the financial literacy of the younger generation. It uses entertaining animated cartoon videos to simplify complex financial, business, and economic concepts, covering everything from basic personal finance to investment strategies and retirement savings.",

  //   price: 20000,
  //   date: "2023-12-16T00:00:00.000+00:00",
  //   sections: [
  //     {
  //       sectionId: 2353,
  //       key: 1,
  //       title: "Introduction",
  //       subSections: [
  //         {
  //           subSectionId: 1,
  //           key: 1,
  //           title: "Introduction",
  //           description:
  //             "If you want to be better than you are today, you must do something to improve yourself.",
  //           link: "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
  //           quizList: null,
  //         },
  //         {
  //           subSectionId: 2,
  //           key: 2,
  //           title: "Invest Yourself",
  //           description:
  //             "If you want to be better than you are today, you must do something to improve yourself.",
  //           link: "https://www.youtube.com/watch?v=CaAuFwJJ8sA",
  //           quizList: [
  //             {
  //               quizId: 1,
  //               title: "Invest Yourself",
  //               key: 1,
  //               question: "What does invest in yourself mean?",
  //               options: [
  //                 "Working to improve your skills and knowledge to give yourself a better future.",
  //                 "Spending all your money to buy delicious treats.",
  //                 "Using most of your money to buy expensive things that you like.",
  //                 "Delaying a task that you are supposed to do.",
  //               ],
  //               answer: 0,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //     {
  //       sectionId: 2354,
  //       key: 2,
  //       title: "Personal Finance",
  //       subSections: [
  //         {
  //           subSectionId: 1,
  //           key: 2,
  //           title: "Personal Finance",
  //           description:
  //             "If you want to be better than you are today, you must do something to improve yourself.",
  //           link: "https://www.youtube.com/watch?v=CaAuFwJJ8sA",
  //           quizList: [
  //             {
  //               quizId: 1,
  //               title: "Personal Finance",
  //               key: 1,
  //               question: "What does invest in yourself mean?",
  //               options: [
  //                 "Working to improve your skills and knowledge to give yourself a better future.",
  //                 "Spending all your money to buy delicious treats.",
  //                 "Using most of your money to buy expensive things that you like.",
  //                 "Delaying a task that you are supposed to do.",
  //               ],
  //               answer: 0,
  //             },
  //           ],
  //         },
  //         {
  //           subSectionId: 2,
  //           key: 2,
  //           title: "Finance",
  //           description:
  //             "If you want to be better than you are today, you must do something to improve yourself.",
  //           link: "https://www.dropbox.com/scl/fi/6sqhtxqkf1uero0qip0eg/1-Introduction.mp4?rlkey=vbpa0hsfsj2hqm3pztsqfmrib&dl=0",
  //           quizList: [
  //             {
  //               quizId: 1,
  //               title: "Finance",
  //               key: 1,
  //               question: "What does invest in yourself mean?",
  //               options: [
  //                 "Working to improve your skills and knowledge to give yourself a better future.",
  //                 "Spending all your money to buy delicious treats.",
  //                 "Using most of your money to buy expensive things that you like.",
  //                 "Delaying a task that you are supposed to do.",
  //               ],
  //               answer: 0,
  //             },
  //           ],
  //         },
  //       ],
  //     },
  //   ],
  // };
  const isSmallScreen = window.innerWidth < 1024;
  const handleCollapse = () => {
    setIsVideoAll(!isVideoAll);
  };

  const setUrl = (link) => {
    setVideoUrl(link);
    setIsQuizClicked(false);
  };
  const handleQuizOpen = (quizItem, subSectionId) => {
    console.log("QuizzArray", quizItem.length);
    setQuizzArray(quizItem);
    setSubSectionId(subSectionId);
    setIsQuizClicked(true);
  };

  const myLearningVideo = () => {
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
      <div className=" hidden w-full lg:flex ">
        <div className="  w-full  pl-1  pt-20 md:pt-28  lg:w-[30%] lg:pt-28">
          <div className=" h-auto " data-testid="accordion">
            <Accordion
              accordianDetails={accordionDetails}
              path="MyVideo"
              setUrl={setUrl}
              isVideoAllOpen={isVideoAll}
              handleQuizOpen={handleQuizOpen}
              isQuizClicked={isQuizClicked}
            />
          </div>
          <div
            className=" float-right mr-3 w-28 cursor-pointer   rounded-md bg-yellowColor p-2"
            onClick={handleCollapse}
          >
            {isVideoAll ? (
              <p className=" text-center  text-sm font-semibold text-textColor">
                Collapse All
              </p>
            ) : (
              <p className="text-center text-sm font-semibold text-textColor">
                {" "}
                Expand All
              </p>
            )}
          </div>
        </div>

        <div className="lg:w-[70%] ">
          {isQuizClicked ? (
            <>
              <div className="right-0 top-0 w-[70%] lg:fixed">
                <Quiz
                  setRewardModal={setRewardModal}
                  setEnergyPoint={setEnergyPoint}
                  energyPoint={energyPoint}
                  quizzArray={quizzArray && quizzArray}
                  subSectionId={subSectionId}
                />
                {isrewardModal && (
                  <Modal
                    isrewardModal={isrewardModal}
                    setRewardModal={setRewardModal}
                    energyPoint={energyPoint}
                  />
                )}
              </div>
            </>
          ) : (
            myLearningVideo()
          )}
        </div>
      </div>

      {/* small device view  */}

      <div className=" flex  w-full flex-col  pt-14 md:pt-20 lg:hidden">
        <div className=" mt-6 w-full  ">
          {isQuizClicked ? (
            <>
              <div className="">
                <Quiz
                  setRewardModal={setRewardModal}
                  setEnergyPoint={setEnergyPoint}
                  energyPoint={energyPoint}
                  quizzArray={quizzArray && quizzArray}
                  subSectionId={subSectionId}
                />
                {isrewardModal && (
                  <Modal
                    isrewardModal={isrewardModal}
                    setRewardModal={setRewardModal}
                    energyPoint={energyPoint}
                  />
                )}
              </div>
            </>
          ) : (
            myLearningVideo()
          )}{" "}
        </div>
        <div className=" mt-2 pl-1">
          <div className="  h-auto  w-full">
            <Accordion
              accordianDetails={accordionDetails}
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

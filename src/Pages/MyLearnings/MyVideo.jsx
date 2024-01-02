import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import Accordion from "../../Components/Accordian/Accordian";
import Quiz from "../../Components/Quiz/Quiz";
import Modal from "../../Components/Modal/Modal";
import { get } from "../../ApiCall/ApiCall";
import Loader from "../../Components/Loader/Loader";

const MyVideo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [isrewardModal, setRewardModal] = useState(false);
  const [energyPoint, setEnergyPoint] = useState(0);
  const [badge, setBadge] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [isVideoAll, setIsVideoAll] = useState(true);
  const [isQuizClicked, setIsQuizClicked] = useState(false);
  const [accordionDetails, setAccordionDetails] = useState([]);
  const [quizzArray, setQuizzArray] = useState([]);
  const [subSectionId, setSubSectionId] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      "Acess-Control-Allow-Headers": "*",
      Accept: "application/json",
      courseId: "1",
    },
  };

  useEffect(() => {
    const getAccordionDetails = async () => {
      await get("/user/getCourseById", config)
        .then((res) => {
          setAccordionDetails(res && res.data && res.data.sections);
          setVideoUrl(
            res && res.data && res.data.sections[0].subSections[0].link,
          );
        })
        .catch((err) => console.log(err));
    };

    getAccordionDetails();
  }, []);

  const isSmallScreen = window.innerWidth < 1024;
  console.log(window.innerWidth);
  const handleCollapse = () => {
    setIsVideoAll(!isVideoAll);
  };

  const setUrl = (link) => {
    setVideoUrl(link);
    setIsQuizClicked(false);
  };
  const handleQuizOpen = (quizItem, subSectionId) => {
    setEnergyPoint(0);
    setCurrentPage(1);
    setQuizzArray(quizItem);
    setSubSectionId(subSectionId);
    setIsQuizClicked(true);
    setVideoUrl("");
  };

  const myLearningVideo = () => {
    return (
      <div className="relative  w-[100%]">
        <ReactPlayer
          controls
          width={isSmallScreen ? "100%" : "70%"}
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
        {accordionDetails.length > 0 ? (
          <>
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

            <div className="h-auto w-full lg:w-[70%]">
              {isQuizClicked ? (
                <>
                  <div className="sticky right-0 top-0  h-[110vh] lg:w-full">
                    <Quiz
                      setRewardModal={setRewardModal}
                      setEnergyPoint={setEnergyPoint}
                      energyPoint={energyPoint}
                      quizzArray={quizzArray && quizzArray}
                      subSectionId={subSectionId}
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      setBadge={setBadge}
                      badge={badge}
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
          </>
        ) : (
          <>
            <div className="flex h-[100vh] w-full items-center justify-center">
              <Loader color={"#334456"} />
            </div>
          </>
        )}
      </div>

      {/* small device view  */}

      <div className=" flex  w-full flex-col  pt-14 md:pt-20 lg:hidden">
        {accordionDetails.length > 0 ? (
          <>
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
                      setCurrentPage={setCurrentPage}
                      currentPage={currentPage}
                      setBadge={setBadge}
                      badge={badge}
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
          </>
        ) : (
          <div className="flex h-[100vh] w-full items-center justify-center">
            <Loader color={"#334456"} />
          </div>
        )}
      </div>
    </>
  );
};

export default MyVideo;

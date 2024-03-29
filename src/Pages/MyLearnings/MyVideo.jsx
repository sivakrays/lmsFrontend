import React, { useState, useEffect, useContext } from "react";
import ReactPlayer from "react-player";
import Accordion from "../../Components/Accordian/Accordian";
import Quiz from "../../Components/Quiz/Quiz";
import Modal from "../../Components/Modal/Modal";
import { get, post } from "../../ApiCall/ApiCall";
import Loader from "../../Components/Loader/Loader";
import { useNavigate, useParams } from "react-router-dom";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import "./MyVideo.css";

const MyVideo = () => {
  const id = useParams();
  const navigate = useNavigate();
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
  const [subSectionId, setSubSectionId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [sectionId, setSectionId] = useState(null);
  const [sectionIndex, setSectionIndex] = useState(0);
  const [subSectionLength, setSubSectionLength] = useState(null);
  const [isNextButtonVisible, setIsNextButtonVisible] = useState(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [activeQuizItem, setActiveQuizItem] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  const bearer_token = JSON.parse(localStorage.getItem("token"));

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setToken(currentToken);

    const fetchVideoDetails = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        setToken(refreshedToken);

        const config = {
          headers: {
            Authorization: `Bearer ${bearer_token}`,
            courseId: id.id,
          },
        };

        const res = await get("/user/getCourseById", config);

        if (res.status === 200) {
          setAccordionDetails(res.data.sections);
          setVideoUrl(
            res.data.sections[sectionIndex].subSections[currentIndex].link,
          );
          setSubSectionLength(
            res.data.sections[sectionIndex].subSections.length,
          );
          setSectionId(res.data.sections[sectionIndex].sectionId);
          setSubSectionId(
            res.data.sections[sectionIndex].subSections[currentIndex]
              .subSectionId,
          );
        } else if (res.status === 204) {
          navigate("/mylearnings");
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    if (currentToken) {
      fetchVideoDetails();
    } else {
      console.log("Token not present");
    }
    handleVideoClick(currentIndex, sectionId, subSectionId);
  }, [token]);

  useEffect(() => {
    if (
      accordionDetails.length > 0 &&
      accordionDetails[sectionIndex] &&
      accordionDetails[sectionIndex].subSections &&
      accordionDetails[sectionIndex].subSections.length > 0 &&
      accordionDetails[sectionIndex].subSections[currentIndex]
    ) {
      setSubSectionLength(accordionDetails[sectionIndex].subSections.length);

      setVideoUrl(
        accordionDetails[sectionIndex].subSections[currentIndex].link,
      );
    }
    handleVideoClick(currentIndex, sectionId, subSectionId);
  }, [currentIndex, sectionId]);

  const isSmallScreen = window.innerWidth < 1024;

  const handleCollapse = () => {
    setIsVideoAll(!isVideoAll);
  };

  const setUrl = (
    link,
    index,
    subSectionId,
    accordionSectionId,
    accordionItemIndex,
  ) => {
    setVideoUrl(link);
    setIsQuizClicked(false);
    setCurrentIndex(index);
    setSubSectionId(subSectionId);
    setSectionId(accordionSectionId);
    setSectionIndex(accordionItemIndex);
  };

  const handleQuizOpen = (
    quizItem,
    subSectionId,
    index,
    accordionSectionId,
    accordionItemIndex,
  ) => {
    setEnergyPoint(0);
    setCurrentPage(1);
    setQuizzArray(quizItem);
    setSubSectionId(subSectionId);
    setIsQuizClicked(true);
    setVideoUrl("");
    setCurrentIndex(index);
    setSectionId(accordionSectionId);
    //setSubSectionLength(subSectionLength);
    setSectionIndex(accordionItemIndex);
    //setActiveQuiz(true);
  };

  const handleNext = () => {
    if (currentIndex === subSectionLength - 1) {
      setSectionId(sectionId + 1);
      setSectionIndex(sectionIndex + 1);
      setCurrentIndex(0);
      setIsNextButtonVisible(false);
    } else {
      setCurrentIndex(currentIndex + 1);
      setIsNextButtonVisible(false);
    }
  };

  const setNextVisible = () => {
    const lastSection =
      accordionDetails &&
      accordionDetails.length > 0 &&
      accordionDetails[accordionDetails.length - 1];

    const lastSubSection =
      lastSection &&
      lastSection.subSections &&
      lastSection.subSections > 0 &&
      lastSection.subSections[lastSection.subSections.length - 1];

    const lastItemTitle = lastSubSection && lastSubSection.title;

    const currentTitle =
      accordionDetails &&
      accordionDetails.length > 0 &&
      accordionDetails[sectionId] &&
      accordionDetails[sectionId].subSections &&
      accordionDetails[sectionId].subSections.length > 0 &&
      accordionDetails[sectionId].subSections[currentIndex] &&
      accordionDetails[sectionId].subSections[currentIndex].title;
    if (currentTitle === lastItemTitle) {
      setIsNextButtonVisible(false);
    } else {
      setIsNextButtonVisible(true);
    }
  };

  const handleVideoClick = (index, accordionSectionId, subSectionId) => {
    setActiveVideo({
      index: index,
      sectionId: accordionSectionId,
      subSectionId: subSectionId,
    });
    setActiveSection({ sectionId: accordionSectionId });
    setActiveQuizItem(null);
  };

  const handleQuizItemClick = (index, accordionSectionId, subSectionId) => {
    setActiveQuizItem({
      index: index,
      sectionId: accordionSectionId,
      subSectionId: subSectionId,
    });
    setActiveSection({ sectionId: accordionSectionId });

    setActiveVideo(null);
  };

  const myLearningVideo = () => {
    return (
      <div className="relative w-[100%] " data-testid="learningvideo">
        <ReactPlayer
          controls
          width={isSmallScreen ? "100%" : "70%"}
          height="85%"
          url={videoUrl}
          className=" lg:fixed "
          onEnded={setNextVisible}
          onStart={() => setIsNextButtonVisible(false)}
        />
        {isNextButtonVisible && (
          <button
            className="nextButton border-textLigntColor flex h-10 cursor-pointer flex-row items-center justify-center rounded-md bg-textColor px-12 font-medium text-white "
            onClick={handleNext}
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="  w-full lg:flex ">
        {accordionDetails && accordionDetails.length > 0 ? (
          <>
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
                      setUrl={setUrl}
                      setIsQuizClicked={setIsQuizClicked}
                    />
                    {isrewardModal && (
                      <Modal
                        isrewardModal={isrewardModal}
                        setRewardModal={setRewardModal}
                        energyPoint={energyPoint}
                        currentIndex={currentIndex}
                        setCurrentIndex={setCurrentIndex}
                        isQuizClicked={isQuizClicked}
                        setIsQuizClicked={setIsQuizClicked}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        setSubSectionLength={setSubSectionLength}
                        subSectionLength={subSectionLength}
                        setSubSectionId={setSubSectionId}
                        subSectionId={subSectionId}
                        sectionId={sectionId}
                        handleVideoClick={handleVideoClick}
                      />
                    )}
                  </div>
                </>
              ) : (
                myLearningVideo()
              )}
            </div>

            <div className="  w-full  pl-1  pt-20 md:pt-28  lg:w-[30%] lg:pt-28">
              <div className=" h-auto " data-testid="accordion">
                <Accordion
                  accordianDetails={accordionDetails}
                  path="MyVideo"
                  setUrl={setUrl}
                  // isVideoAllOpen={isVideoAll}
                  handleQuizOpen={handleQuizOpen}
                  isQuizClicked={isQuizClicked}
                  setSectionId={setSectionId}
                  setSubSectionLength={setSubSectionLength}
                  subSectionLength={subSectionLength}
                  sectionIndex={sectionIndex}
                  setSectionIndex={setSectionIndex}
                  activeVideo={activeVideo}
                  activeQuizItem={activeQuizItem}
                  setActiveQuizItem={setActiveQuizItem}
                  setActiveVideo={setActiveVideo}
                  handleVideoClick={handleVideoClick}
                  handleQuizItemClick={handleQuizItemClick}
                  activeSection={activeSection}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex h-[40vh] w-full items-center justify-center sm:hidden">
              <Loader color={"#334456"} height={"10%"} width={"10%"} />
            </div>

            <div className="hidden h-[100vh] w-full items-center justify-center sm:flex">
              <Loader color={"#334456"} height={"4%"} width={"4%"} />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default MyVideo;

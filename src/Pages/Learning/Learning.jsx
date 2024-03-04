import React, { useContext, useEffect, useRef, useState } from "react";
import "./Learning.css";
import { useParams } from "react-router-dom";
import { get } from "../../ApiCall/ApiCall";
import LearningQuiz from "./LearningComponents/LearningQuiz";
import LearningVideo from "./LearningComponents/LearningVideo";
import DetailsAccordion from "./LearningComponents/DetailsAccordion";
import Loader from "../../Components/Loader/Loader";
import Nav from "../../Components/Nav/Nav";
import Reward from "../../Components/Reward/Reward";
import { authContext } from "../../Context/AuthContext";

const Learning = () => {
  const { id } = useParams();

  const { userId } = useContext(authContext);

  const [accordionDetails, setAccordionDetails] = useState([]);
  const [videoUrl, setVideoUrl] = useState(null);

  const [isQuizVisible, setIsQuizVisible] = useState(false);

  const [clickedSubSection, setClickedSubSection] = useState(null);
  const [clickedQuiz, setClickedQuiz] = useState("");

  const [quizArray, setQuizArray] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [clickedOption, setClickedOption] = useState("");
  const [energyPoints, setEnergyPoints] = useState(0);

  const [isLast, setIsLast] = useState(null);

  // Section Highlighted state
  const [clickedAccordion, setClickedAccordion] = useState(-1);
  const [isReward, setIsReward] = useState(false);
  // AutoPlay states

  const [finishContent, setFinishContent] = useState(false);

  const [lastSection, setLastSection] = useState(null);
  const [lastSubSection, setLastSubSection] = useState(null);

  // find Previous Id States

  const prevSectionIdRef = useRef(0);
  const prevSubSectionIdRef = useRef(0);

  const [currentSectionId, setCurrentSectionId] = useState(0);
  const [currentSubSectionId, setCurrentSubSectionId] = useState(0);

  const [prevSectionId, setPrevSectionId] = useState(0);
  const [prevSubSectionId, setPrevSubSectionId] = useState(0);

  const handleClickSubSection = (videoLink, subSectionId) => {
    setIsQuizVisible(false);
    setVideoUrl(videoLink);

    setClickedSubSection(subSectionId);
    setClickedOption("");
    setClickedQuiz("");
    setEnergyPoints(0);
    // reward Visibility state
    setIsReward(false);

    // find previous
    prevSubSectionIdRef.current = currentSubSectionId;
    setCurrentSubSectionId(subSectionId);

    console.log("clicked subsection", subSectionId);
    setPrevSubSectionId(prevSubSectionIdRef.current);
    console.log("previous SubSection", prevSubSectionIdRef.current);
  };

  const handleClickQuiz = (quiz, quizId, subSectionId) => {
    setClickedSubSection(subSectionId);
    setCurrentPage(1);
    setIsQuizVisible(true);
    setQuizArray(quiz);
    setClickedQuiz(quizId);
    setClickedOption("");
    setEnergyPoints(0);
    // reward Visibility state
    setIsReward(false);
  };

  const [apiLoading, setApiLoading] = useState(true);

  const [bronze, setBronze] = useState(localStorage.getItem("bronze") || 0);
  const [silver, setSilver] = useState(localStorage.getItem("silver") || 0);
  const [gold, setGold] = useState(localStorage.getItem("gold") || 0);

  // fetch Course learning details based on courseID
  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));

    const fetchVideoDetails = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            courseId: id,
          },
        };

        const res = await get("/user/getCourseById", config);
        setAccordionDetails(res.data.sections);
        if (res) {
          setApiLoading(false);
        }
        if (
          res.data.sections.length > 0 &&
          res.data.sections[0].subSections.length > 0
        ) {
          setVideoUrl(res.data.sections[0].subSections[0].link);
          setClickedSubSection(
            res.data.sections[0].subSections[0].subSectionId,
          );
          setCurrentSectionId(res.data.sections[0].sectionId);
          setCurrentSubSectionId(
            res.data.sections[0].subSections[0].subSectionId,
          );

          const lastSectionIndex = res.data.sections.length - 1;
          const lastSubSectionIndex =
            res.data.sections[lastSectionIndex].subSections.length - 1;

          // Extract IDs for comparison
          const lastSectionId = res.data.sections[lastSectionIndex].sectionId;
          const lastSubSectionId =
            res.data.sections[lastSectionIndex].subSections[lastSubSectionIndex]
              .subSectionId;

          setLastSection(lastSectionId);
          setLastSubSection(lastSubSectionId);
          setClickedAccordion(res.data.sections[0].sectionId);
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
  }, [id]);

  const autoPlayNext = () => {
    // Find the current section and subsection index
    const currentSectionIndex = accordionDetails.findIndex((section) =>
      section.subSections.some((sub) => sub.subSectionId === clickedSubSection),
    );

    const currentSubSectionIndex = accordionDetails[
      currentSectionIndex
    ]?.subSections.findIndex((sub) => sub.subSectionId === clickedSubSection);

    // Check if there is a next subsection in the current section
    if (
      currentSectionIndex !== -1 &&
      currentSubSectionIndex !== -1 &&
      currentSubSectionIndex + 1 <
        accordionDetails[currentSectionIndex].subSections.length
    ) {
      const nextSubSection =
        accordionDetails[currentSectionIndex].subSections[
          currentSubSectionIndex + 1
        ];
      setVideoUrl(nextSubSection.link);
      setClickedSubSection(nextSubSection.subSectionId);
      setClickedOption("");
      setClickedQuiz("");
      setEnergyPoints(0);

      // disable the quiz Visible section
      setIsQuizVisible(false);
    } else {
      // If there is no next subsection in the current section, check if there is a next section
      if (currentSectionIndex + 1 < accordionDetails.length) {
        const nextSection = accordionDetails[currentSectionIndex + 1];
        console.log(nextSection.sectionId);
        setVideoUrl(nextSection.subSections[0].link);
        setClickedSubSection(nextSection.subSections[0].subSectionId);
        setClickedOption("");
        setClickedQuiz("");
        setEnergyPoints(0);
        setIsQuizVisible(false);
        setClickedAccordion(nextSection.sectionId);
      } else {
        // You've reached the end of the course
        setIsLast(true);
        alert("course Ended");
        console.log("End of the course");
      }
    }
  };

  const playPrevious = () => {
    // Find the current section and subsection index
    const currentSectionIndex = accordionDetails.findIndex((section) =>
      section.subSections.some((sub) => sub.subSectionId === clickedSubSection),
    );

    const currentSubSectionIndex = accordionDetails[
      currentSectionIndex
    ]?.subSections.findIndex((sub) => sub.subSectionId === clickedSubSection);

    // Check if there is a previous subsection in the current section
    if (
      currentSectionIndex !== -1 &&
      currentSubSectionIndex !== -1 &&
      currentSubSectionIndex - 1 >= 0
    ) {
      const prevSubSection =
        accordionDetails[currentSectionIndex].subSections[
          currentSubSectionIndex - 1
        ];
      setVideoUrl(prevSubSection.link);
      setClickedSubSection(prevSubSection.subSectionId);
      setClickedOption("");
      setClickedQuiz("");
      setEnergyPoints(0);
    } else {
      // If there is no previous subsection in the current section, check if there is a previous section
      if (currentSectionIndex - 1 >= 0) {
        const prevSection = accordionDetails[currentSectionIndex - 1];
        const lastSubSectionIndex = prevSection.subSections.length - 1;
        const lastSubSection = prevSection.subSections[lastSubSectionIndex];
        setVideoUrl(lastSubSection.link);
        setClickedSubSection(lastSubSection.subSectionId);
        setClickedOption("");
        setClickedQuiz("");
        setEnergyPoints(0);
        setClickedAccordion(prevSection.sectionId);
      } else {
        // You're already at the beginning of the course
        console.log("Already at the beginning of the course");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen  ">
        <Nav bronze={bronze} gold={gold} silver={silver} />
        {apiLoading === true ? (
          <>
            <div className="flex h-[40vh] w-full items-center justify-center sm:hidden">
              <Loader color={"#334456"} height={"10%"} width={"10%"} />
            </div>

            <div className="hidden h-[100vh] w-full items-center justify-center bg-herobg sm:flex">
              <Loader color={"#334456"} height={"4%"} width={"4%"} />
            </div>
          </>
        ) : (
          <div className="flex flex-col sm:pt-28 lg:flex-row">
            <div className="lg:w-[72%]">
              {isQuizVisible === true ? (
                <>
                  <LearningQuiz
                    quizArray={quizArray}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    clickedOption={clickedOption}
                    setClickedOption={setClickedOption}
                    energyPoints={energyPoints}
                    setEnergyPoints={setEnergyPoints}
                    clickedSubSection={clickedSubSection}
                    autoPlayNext={autoPlayNext}
                    // Badge Details
                    setBronze={setBronze}
                    setSilver={setSilver}
                    setGold={setGold}
                    // Reward Visibility state
                    setIsReward={setIsReward}
                  />
                  {isReward === true && (
                    <>
                      <Reward
                        setIsReward={setIsReward}
                        energyPoints={energyPoints}
                        autoPlayNext={autoPlayNext}
                      />
                    </>
                  )}
                </>
              ) : (
                <LearningVideo
                  videoUrl={videoUrl}
                  lastSection={lastSection}
                  lastSubSection={lastSubSection}
                  autoPlayNext={autoPlayNext}
                  playPrevious={playPrevious}
                  isLast={isLast}
                  /*send Seconds data*/
                  accordionDetails={accordionDetails}
                  userId={userId}
                  courseId={id}
                  sectionId={prevSectionId}
                  subSectionId={prevSubSectionId}
                />
              )}
            </div>
            <div className=" right-0 top-28 lg:fixed lg:w-[28%]">
              <div>
                <p className="text-textLightColorr flex w-full items-center justify-between  gap-3 border border-b-0 border-gray-200 bg-textColor p-5 font-semibold text-white">
                  Course Contents
                </p>

                <DetailsAccordion
                  accordionDetails={accordionDetails}
                  setVideoUrl={setVideoUrl}
                  handleClickSubSection={handleClickSubSection}
                  clickedSubSection={clickedSubSection}
                  handleClickQuiz={handleClickQuiz}
                  clickedQuiz={clickedQuiz}
                  setClickedAccordion={setClickedAccordion}
                  clickedAccordion={clickedAccordion}
                  // Reward Visibility state
                  setIsReward={setIsReward}
                  // find previousID
                  setCurrentSectionId={setCurrentSectionId}
                  prevSectionIdRef={prevSectionIdRef}
                  currentSectionId={currentSectionId}
                  setPrevSectionId={setPrevSectionId}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Learning;

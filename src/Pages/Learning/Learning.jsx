import React, { useEffect, useState } from "react";
import "./Learning.css";
import { useParams } from "react-router-dom";
import { get } from "../../ApiCall/ApiCall";
import LearningQuiz from "./LearningComponents/LearningQuiz";
import LearningVideo from "./LearningComponents/LearningVideo";
import DetailsAccordion from "./LearningComponents/DetailsAccordion";

const Learning = () => {
  const { id } = useParams();

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

  // AutoPlay states

  const [lastSection, setLastSection] = useState(null);
  const [lastSubSection, setLastSubSection] = useState(null);

  const handleClickSubSection = (videoLink, subSectionId) => {
    setIsQuizVisible(false);
    setVideoUrl(videoLink);
    setClickedSubSection(subSectionId);
    setClickedOption("");
    setClickedQuiz("");
    setEnergyPoints(0);
  };

  const handleClickQuiz = (quiz, quizId, subSectionId) => {
    setClickedSubSection(subSectionId);
    setCurrentPage(1);
    setIsQuizVisible(true);
    setQuizArray(quiz);
    setClickedQuiz(quizId);
    setClickedOption("");
    setEnergyPoints(0);
  };

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

        if (
          res.data.sections.length > 0 &&
          res.data.sections[0].subSections.length > 0
        ) {
          setVideoUrl(res.data.sections[0].subSections[0].link);
          setClickedSubSection(
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
    } else {
      // If there is no next subsection in the current section, check if there is a next section
      if (currentSectionIndex + 1 < accordionDetails.length) {
        const nextSection = accordionDetails[currentSectionIndex + 1];
        setVideoUrl(nextSection.subSections[0].link);
        setClickedSubSection(nextSection.subSections[0].subSectionId);
        setClickedOption("");
        setClickedQuiz("");
        setEnergyPoints(0);
      } else {
        // You've reached the end of the course
        setIsLast(true);
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
      } else {
        // You're already at the beginning of the course
        console.log("Already at the beginning of the course");
      }
    }
  };

  return (
    <>
      <div className="min-h-screen  sm:pt-28">
        <div className="flex flex-col lg:flex-row">
          <div className="lg:w-[72%]">
            {isQuizVisible === true ? (
              <LearningQuiz
                quizArray={quizArray}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                clickedOption={clickedOption}
                setClickedOption={setClickedOption}
                energyPoints={energyPoints}
                setEnergyPoints={setEnergyPoints}
                clickedSubSection={clickedSubSection}
              />
            ) : (
              <LearningVideo
                videoUrl={videoUrl}
                lastSection={lastSection}
                lastSubSection={lastSubSection}
                autoPlayNext={autoPlayNext}
                playPrevious={playPrevious}
                isLast={isLast}
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
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Learning;
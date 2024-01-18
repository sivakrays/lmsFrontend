import React, { useEffect, useState } from "react";
import Arrow from "../../Assets/coursedetails/AccordianArrow.svg";
import Tv from "../../Assets/coursedetails/tv.svg";
import Modal from "../Modal/Modal";
import { FcIdea } from "react-icons/fc";

const NestedAccordionItem = ({
  title,
  previewText,
  videoPath,
  quiz,
  setUrl,
  link,
  handleQuizOpen,
  subSectionId,
  key2,
}) => {
  const [isNestedAccordionOpen, setIsNestedAccordionOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  const toggleNestedAccordion = () => {
    setIsNestedAccordionOpen(!isNestedAccordionOpen);
  };

  const toggleModal1 = () => {
    setIsModalOpen1(false);
    setIsVideoVisible(false);
  };

  const showPreview = () => {
    setIsVideoVisible(!isVideoVisible);
    setIsModalOpen1(!isModalOpen1);
  };

  //   setQuizCompleted(true);

  //   const currentIndex = accordianDetails
  //     .flatMap((item) => item.subSections)
  //     .findIndex((item) => item.subSectionId === subSectionId);

  //   if (currentIndex < accordianDetails.length - 1) {
  //     const nextVideo = accordianDetails[currentIndex + 1].subSections[0];
  //     setActiveVideo(nextVideo);
  //   }

  //   if (handleQuizCompletion) {
  //     handleQuizCompletion();
  //   }
  // };

  // useEffect(() => {
  //   if (quizCompleted && activeVideo) {
  //     // Auto-play the next video after quiz completion.
  //     setUrl(activeVideo.link);
  //     setIsVideoVisible(true);
  //     setIsModalOpen1(true);
  //   }
  // }, [quizCompleted, activeVideo]);

  return (
    <>
      <div>
        <div
          type="button"
          className=" flex w-full items-center gap-5  border p-5 font-medium text-textColor hover:bg-gray-100  rtl:text-right "
        >
          <div className="flex w-3/4  items-center gap-5 ">
            {videoPath === "MyVideo" ? (
              <button
                onClick={() => setUrl(link, key2, subSectionId)}
                className="flex items-center gap-5"
                data-testid="videoButton"
              >
                <img
                  src={Tv}
                  alt=""
                  className="h-4 w-4 hover:text-yellowColor "
                />
                <span className=" text-xs  text-textColor  hover:text-yellowColor hover:underline md:text-sm">
                  {title}
                </span>
              </button>
            ) : (
              <button
                onClick={showPreview}
                className="flex items-center gap-5"
                data-testid="videoButtonCourse"
              >
                <img src={Tv} alt="" className="h-4 w-4" />
                <span className=" text-xs text-textColor  underline  md:text-sm">
                  {title}
                </span>
              </button>
            )}

            <button onClick={toggleNestedAccordion}>
              <img
                src={Arrow}
                alt=""
                className={`  h-3 w-3 shrink-0  ${
                  isNestedAccordionOpen ? "rotate-180" : ""
                } `}
              />
            </button>
          </div>
          <div
            className={`${
              videoPath === "MyVideo"
                ? "hidden"
                : "hidden w-full md:flex md:w-1/4  md:justify-end md:gap-4"
            }`}
          >
            <p
              className="text-xs  text-textColor underline  md:text-sm"
              onClick={showPreview}
            >
              Preview
            </p>
            <span className="text-xs text-textColor md:text-sm">05.26</span>
          </div>
        </div>
        <div className={` ${isNestedAccordionOpen ? "block" : "hidden"}`}>
          <div className="border  border-b-0 p-5 ">
            {previewText && (
              <p className="text-textLigntColor ">{previewText}</p>
            )}
          </div>
        </div>
        {quiz && quiz.length !== 0 && quiz[0].question.length >= 1 && (
          <div
            onClick={
              videoPath === "MyVideo"
                ? () => handleQuizOpen(quiz, subSectionId)
                : undefined
            }
            className=" flex w-full cursor-pointer items-center  gap-5 border p-5  hover:bg-gray-100  rtl:text-right "
          >
            <span>
              <FcIdea className=" h-5 w-5 hover:rounded hover:bg-violet-700" />
            </span>
            <p className="text-sm font-medium text-textColor hover:text-violet-700  ">
              {title}
            </p>
          </div>
        )}
      </div>

      {isVideoVisible && !videoPath && (
        <Modal
          isModalOpen1={isModalOpen1}
          path="video"
          toggleModal1={toggleModal1}
        />
      )}
    </>
  );
};

const AccordionItem = ({
  title,
  nestedItems,
  isAllOpen,
  videoPath,
  setUrl,
  isVideoAllOpen,
  handleQuizOpen,
  key1,
  setSectionId,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // console.log("nestedItems", key1);

  useEffect(() => {
    if (isAllOpen || isVideoAllOpen) {
      setIsAccordionOpen(true);
    } else {
      setIsAccordionOpen(false);
    }
  }, [isAllOpen, isVideoAllOpen]);

  const toggleAccordion = (sectionId, path) => {
    setIsAccordionOpen(!isAccordionOpen);
    console.log("sectionId", sectionId);
    if (path == "MyVideo") {
      setSectionId(sectionId - 1);
    }
  };

  return (
    <>
      <h2>
        <button
          type="button"
          onClick={() => toggleAccordion(key1, videoPath)}
          className="flex w-full items-center justify-between gap-3  border 
           p-5 font-medium text-textColor hover:bg-gray-100 
             rtl:text-right "
          data-testid="accordion-item"
        >
          <span className=" md:text-md dayOne text-sm text-textColor">
            {title}
          </span>
          <img
            src={Arrow}
            alt=""
            className={`h-3 w-3 shrink-0  ${
              isAccordionOpen || isAllOpen ? "rotate-180" : ""
            } `}
          />
        </button>
      </h2>
      <div className={` ${isAccordionOpen || isAllOpen ? "block" : "hidden"}`}>
        <div>
          {nestedItems &&
            nestedItems.map((item, index) => (
              <div key={index}>
                <NestedAccordionItem
                  key2={index}
                  title={item.title}
                  previewText={item.description}
                  link={item.link}
                  quiz={item.quizList}
                  isAllOpen={isAllOpen}
                  videoPath={videoPath}
                  setUrl={setUrl}
                  handleQuizOpen={handleQuizOpen}
                  subSectionId={item.subSectionId}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

const Accordion = ({
  accordianDetails,
  isAllOpen,
  path,
  setUrl,
  isVideoAllOpen,
  handleQuizOpen,
  setSectionId,
}) => {
  //console.log("AccordionDetails", accordianDetails);
  return (
    <div className="mb-8 bg-white">
      {accordianDetails &&
        accordianDetails.map((item, index) => (
          <div key={index}>
            <AccordionItem
              key1={item.key}
              title={item.title}
              nestedItems={item.subSections}
              isAllOpen={isAllOpen}
              isVideoAllOpen={isVideoAllOpen}
              videoPath={path}
              setUrl={setUrl}
              handleQuizOpen={handleQuizOpen}
              setSectionId={setSectionId}
            />
          </div>
        ))}
    </div>
  );
};

export default Accordion;

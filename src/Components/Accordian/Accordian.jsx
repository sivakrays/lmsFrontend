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
  nestedIndex,
  activeQuiz,
  isActiveVideo,
  isActiveQuizItem,
  handleVideoClick,
  handleQuizItemClick,
  accordionSectionId,
  sectionId,
  accordionItemIndex,
}) => {
  const [isNestedAccordionOpen, setIsNestedAccordionOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [activeNestedItem, setActiveNestedItem] = useState(null);

  // console.log("accordionSectionId", accordionSectionId);

  const toggleNestedAccordion = () => {
    setIsNestedAccordionOpen(!isNestedAccordionOpen);
    if (videoPath === "MyVideo") {
      setActiveNestedItem(isNestedAccordionOpen ? null : subSectionId);
    }
  };

  const toggleModal1 = () => {
    setIsModalOpen1(false);
    setIsVideoVisible(false);
  };

  const showPreview = () => {
    setIsVideoVisible(!isVideoVisible);
    setIsModalOpen1(!isModalOpen1);
  };

  return (
    <>
      <div>
        <div
          type="button"
          className={`flex w-full items-center gap-5  border p-5 font-medium text-textColor hover:bg-gray-100  rtl:text-right ${
            isActiveVideo ? "bg-gray-100" : ""
          } `}
        >
          <div className="flex w-3/4  items-center gap-5 ">
            {videoPath === "MyVideo" ? (
              <button
                onClick={() => {
                  setUrl(
                    link,
                    nestedIndex,
                    subSectionId,
                    accordionSectionId,
                    accordionItemIndex,
                  );
                  handleVideoClick();
                }}
                className=" flex items-center gap-5"
                data-testid="videoButton"
              >
                <img
                  src={Tv}
                  alt=""
                  className="h-4 w-4 hover:text-yellowColor "
                />
                <span
                  className={`text-xs  text-textColor  hover:text-yellowColor hover:underline md:text-sm `}
                >
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
        {quiz && quiz.length !== 0 && (
          <div
            onClick={
              videoPath == "MyVideo"
                ? () => {
                    handleQuizOpen(
                      quiz,
                      subSectionId,
                      nestedIndex,
                      accordionSectionId,
                      accordionItemIndex,
                    );
                    handleQuizItemClick();
                  }
                : undefined
            }
            className={`flex w-full cursor-pointer items-center  gap-5 border p-5  hover:bg-gray-100  rtl:text-right ${
              isActiveQuizItem ? "bg-gray-100" : ""
            } `}
          >
            <span>
              <FcIdea className=" h-5 w-5 hover:rounded hover:bg-violet-700" />
            </span>
            <p
              className={` ${
                activeQuiz === true
                  ? "text-sm font-medium text-violet-700"
                  : "text-sm font-medium text-textColor  hover:text-violet-700 "
              }  `}
            >
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
  accordionSectionId,
  nestedItems,
  isAllOpen,
  videoPath,
  setUrl,
  isVideoAllOpen,
  handleQuizOpen,
  accordionItemIndex,
  setSubSectionLength,
  //sectionIndex,
  setSectionIndex,
  activeQuiz,
  activeVideo,
  activeQuizItem,
  setSectionId,
  sectionId,
  handleQuizItemClick,
  handleVideoClick,
  currentSectionIndex,
  isActiveSection,
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    if (isAllOpen || isVideoAllOpen) {
      setIsAccordionOpen(true);
    } else {
      setIsAccordionOpen(false);
    }
  }, [isAllOpen, isVideoAllOpen]);

  const toggleAccordion = (path) => {
    const length = nestedItems.length;

    if (path == "MyVideo") {
      //setActiveAccordion(isAccordionOpen ? null : accordionItemIndex);
      //setActiveAccordion(accordionItemIndex);

      setSubSectionLength(length);
      //setSectionIndex(accordionItemIndex);
    }
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <>
      <h2>
        <button
          type="button"
          onClick={() =>
            toggleAccordion(accordionItemIndex, videoPath, accordionSectionId)
          }
          className={`flex w-full items-center justify-between gap-3  border 
           p-5 font-medium text-textColor hover:bg-gray-100 
             rtl:text-right ${isActiveSection ? "bg-gray-100" : ""}`}
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
                  accordionSectionId={accordionSectionId}
                  accordionItemIndex={accordionItemIndex}
                  nestedIndex={index}
                  title={item.title}
                  previewText={item.description}
                  link={item.link}
                  quiz={item.quizList}
                  isAllOpen={isAllOpen}
                  videoPath={videoPath}
                  setUrl={setUrl}
                  handleQuizOpen={handleQuizOpen}
                  subSectionId={item.subSectionId}
                  //sectionIndex={sectionIndex}
                  //sectionId={sectionId}
                  currentSectionIndex={currentSectionIndex}
                  setSectionIndex={setSectionIndex}
                  //activeQuiz={activeQuiz}
                  isActiveVideo={
                    activeVideo &&
                    activeVideo.index === index &&
                    activeVideo.sectionId === accordionSectionId
                    ///activeVideo.sectionIndex === currentSectionIndex
                  }
                  isActiveQuizItem={
                    activeQuizItem &&
                    activeQuizItem.index === index &&
                    activeQuizItem.sectionId === accordionSectionId
                  }
                  handleVideoClick={() =>
                    handleVideoClick(
                      index,
                      accordionSectionId,
                      item.subSectionId,
                    )
                  }
                  handleQuizItemClick={() =>
                    handleQuizItemClick(
                      index,
                      accordionSectionId,
                      item.subSectionId,
                    )
                  }
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
  setSubSectionLength,
  sectionIndex,
  setSectionIndex,
  activeVideo,
  activeQuizItem,
  setActiveQuizItem,
  setActiveVideo,
  handleQuizItemClick,
  handleVideoClick,
  activeSection,
}) => {
  const [active, setActive] = useState(false);
  return (
    <div className="mb-8 bg-white">
      {accordianDetails &&
        accordianDetails.map((item, index) => (
          <div key={index}>
            <AccordionItem
              accordionItemIndex={index}
              title={item.title}
              accordionSectionId={item.sectionId}
              nestedItems={item.subSections}
              isAllOpen={isAllOpen}
              isVideoAllOpen={isVideoAllOpen}
              videoPath={path}
              setUrl={setUrl}
              handleQuizOpen={handleQuizOpen}
              setSectionId={setSectionId}
              setSubSectionLength={setSubSectionLength}
              //sectionIndex={sectionIndex}
              setSectionIndex={setSectionIndex}
              activeVideo={activeVideo}
              activeQuizItem={activeQuizItem}
              setActiveQuizItem={setActiveQuizItem}
              setActiveVideo={setActiveVideo}
              handleQuizItemClick={handleQuizItemClick}
              handleVideoClick={handleVideoClick}
              currentSectionIndex={index}
              isActiveSection={
                activeSection && activeSection.sectionId === item.sectionId
              }
            />
          </div>
        ))}
    </div>
  );
};

export default Accordion;

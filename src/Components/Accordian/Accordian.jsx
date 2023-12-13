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
    console.log("showpreview called");
    setIsVideoVisible(!isVideoVisible);
    setIsModalOpen1(!isModalOpen1);
  };

  return (
    <>
      <div>
        <button
          type="button"
          className=" flex w-full items-center gap-5  border p-5 font-medium text-textColor hover:bg-gray-100  rtl:text-right "
        >
          <div className="flex w-3/4  items-center gap-5 ">
            {videoPath === "MyVideo" ? (
              <button
                onClick={() => setUrl(link)}
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
                data-testid="videoButton"
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
        </button>
      </div>

      <div className={` ${isNestedAccordionOpen ? "block" : "hidden"}`}>
        <div className="border border-b-0  p-5 ">
          {previewText && <p className="text-textLigntColor ">{previewText}</p>}
        </div>

        {quiz && (
          <div
            onClick={handleQuizOpen}
            className=" flex w-full cursor-pointer items-center  gap-5 border p-5  hover:bg-gray-100  rtl:text-right "
          >
            <span>
              <FcIdea className=" h-5 w-5 hover:rounded hover:bg-violet-700" />
            </span>
            <p className="text-sm font-medium text-textColor hover:text-violet-700  ">
              {quiz}
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
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    console.log("isAllOpen", isAllOpen);
    if (isAllOpen || isVideoAllOpen) {
      setIsAccordionOpen(true);
    } else {
      setIsAccordionOpen(false);
    }
  }, [isAllOpen, isVideoAllOpen]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <>
      <h2>
        <button
          type="button"
          onClick={toggleAccordion}
          className="flex w-full items-center justify-between gap-3  border 
           p-5 font-medium text-textColor hover:bg-gray-100 
             rtl:text-right "
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
          {nestedItems.map((item) => (
            <NestedAccordionItem
              key={item.key}
              title={item.accordianName}
              previewText={item.previewText}
              link={item.link}
              quiz={item.quiz}
              isAllOpen={isAllOpen}
              videoPath={videoPath}
              setUrl={setUrl}
              handleQuizOpen={handleQuizOpen}
            />
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
}) => {
  return (
    <div className="mb-8 bg-white">
      {accordianDetails.map((item) => (
        <AccordionItem
          key={item.key}
          title={item.accordianName}
          nestedItems={item.nestedItems}
          isAllOpen={isAllOpen}
          isVideoAllOpen={isVideoAllOpen}
          videoPath={path}
          setUrl={setUrl}
          handleQuizOpen={handleQuizOpen}
        />
      ))}
    </div>
  );
};

export default Accordion;

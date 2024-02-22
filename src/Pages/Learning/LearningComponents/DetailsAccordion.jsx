import React from "react";
import Tv from "../../../Assets/coursedetails/tv.svg";
import { FcIdea } from "react-icons/fc";

const DetailsAccordion = ({
  accordionDetails,
  handleClickSubSection,
  clickedSubSection,
  handleClickQuiz,
  clickedQuiz,
  clickedAccordion,
  setClickedAccordion,
  setIsReward,
}) => {
  const toggleAccordion = (index) => {
    // if (index === clickedAccordion) {
    //   setClickedAccordion(-1);
    //   return;
    // }
    // setClickedAccordion(index);
    setClickedAccordion(index);
    setIsReward(false);
  };

  return (
    <>
      <div className="scrollable-div lg:pb-40">
        {/* Accordion heading */}
        {accordionDetails &&
          accordionDetails.map((section, index) => (
            <React.Fragment key={index}>
              <h2
                className={``}
                onClick={() => toggleAccordion(section.sectionId)}
              >
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3  border border-b-0 border-gray-200 p-5 font-medium text-gray-500 
                   ${
                     clickedAccordion === section.sectionId
                       ? "bg-textColor text-white"
                       : ""
                   } `}
                >
                  <span
                    className={`text-left ${
                      clickedAccordion === section.sectionId
                        ? "bg-textColor text-white"
                        : ""
                    }`}
                  >
                    {section.title}
                  </span>
                  {clickedAccordion === section.sectionId ? (
                    <div>
                      <svg
                        data-accordion-icon
                        className="h-3 w-3 shrink-0 rotate-180"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div>
                      <svg
                        data-accordion-icon
                        className="h-3 w-3 shrink-0 "
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </div>
                  )}
                </button>
              </h2>
              <hr />
              {/* Accordion body */}
              <div className="flex flex-col border-l-[1px]">
                {clickedAccordion === section.sectionId &&
                  section.subSections.map((subSection, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <div
                        className={`flex cursor-pointer items-center border px-5 hover:bg-gray-500 hover:text-white ${
                          clickedSubSection === subSection.subSectionId
                            ? "bg-gray-500 text-white"
                            : ""
                        }`}
                        onClick={() =>
                          handleClickSubSection(
                            subSection.link,
                            subSection.subSectionId,
                          )
                        }
                      >
                        {/* <input
                          type="checkbox"
                          name="contentViewed"
                          id=""
                          onChange={() => {}}
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className={`h-4 w-4 text-textColor hover:text-white ${
                            clickedSubSection === subSection.subSectionId
                              ? "text-white"
                              : ""
                          }`}
                        >
                          <path
                            fill="currentColor"
                            d="M21 3H3c-1.11 0-2 .89-2 2v12a2 2 0 0 0 2 2h5v2h8v-2h5a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2m0 14H3V5h18m-5 6l-7 4V7"
                          />
                        </svg>
                        <p className="cursor-pointer p-3 ">
                          {subSection.title}
                        </p>
                      </div>
                      {subSection.quizList[0] &&
                        subSection.quizList[0].question.length !== 0 && (
                          <div
                            className={`flex cursor-pointer items-center border px-5 pl-10 hover:bg-gray-400 hover:text-white  ${
                              clickedQuiz === subSection.quizList[0].quizId
                                ? "bg-gray-400 text-white"
                                : ""
                            }
                             `}
                            onClick={() =>
                              handleClickQuiz(
                                subSection.quizList,
                                subSection.quizList[0].quizId,
                                subSection.subSectionId,
                              )
                            }
                          >
                            {/* <input
                              type="checkbox"
                              name="contentViewed"
                              id=""
                              onChange={() => {}}
                            /> */}
                            <FcIdea className=" h-4 w-4" />
                            <p className="cursor-pointer p-3 ">Quiz</p>
                          </div>
                        )}
                    </React.Fragment>
                  ))}
              </div>

              <hr />
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default DetailsAccordion;

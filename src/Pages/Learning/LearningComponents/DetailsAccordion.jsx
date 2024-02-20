import React, { useState } from "react";

const DetailsAccordion = ({
  accordionDetails,
  handleClickSubSection,
  clickedSubSection,
  handleClickQuiz,
  clickedQuiz,
}) => {
  const [clickedAccordion, setClickedAccordion] = useState(-1);
  const toggleAccordion = (index) => {
    if (index === clickedAccordion) {
      setClickedAccordion(-1);
      return;
    }
    setClickedAccordion(index);
  };

  return (
    <>
      <div className="scrollable-div lg:pb-40">
        {/* Accordion heading */}
        {accordionDetails &&
          accordionDetails.map((section, index) => (
            <React.Fragment key={index}>
              <h2 className={``} onClick={() => toggleAccordion(index)}>
                <button
                  type="button"
                  className={`flex w-full items-center justify-between gap-3  border border-b-0 border-gray-200 p-5 font-medium text-gray-500 
                   ${
                     clickedAccordion === index ? "bg-textColor text-white" : ""
                   } `}
                >
                  <span
                    className={`text-left ${
                      clickedAccordion === index
                        ? "bg-textColor text-white"
                        : ""
                    }`}
                  >
                    {section.title}
                  </span>
                  {clickedAccordion === index ? (
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
                {clickedAccordion === index &&
                  section.subSections.map((subSection, subIndex) => (
                    <React.Fragment key={subIndex}>
                      <div
                        className={`flex cursor-pointer px-5 hover:bg-gray-500 hover:text-white ${
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
                        <input
                          type="checkbox"
                          name=""
                          id=""
                          checked={clickedAccordion === index ? true : false}
                          onChange={() => {}}
                        />
                        <p className="cursor-pointer p-3 ">
                          {subSection.title}
                        </p>
                      </div>
                      {subSection.quizList[0] &&
                        subSection.quizList[0].question.length !== 0 && (
                          <div
                            className={`ml-10 flex cursor-pointer px-5 hover:bg-gray-500 hover:text-white  ${
                              clickedQuiz === subSection.quizList[0].quizId
                                ? "bg-gray-500 text-white"
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
                            <input
                              type="checkbox"
                              name=""
                              id=""
                              checked={
                                clickedAccordion === index ? true : false
                              }
                              onChange={() => {}}
                            />
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

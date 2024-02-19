import React, { useEffect, useState } from "react";
import Pagination from "./Pagination";

const LearningQuiz = ({
  quizArray,
  currentPage,
  setCurrentPage,
  clickedOption,
  setClickedOption,
  energyPoints,
  setEnergyPoints,
}) => {
  const [currentAns, setCurrentAns] = useState("");

  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(quizArray && quizArray.length / itemsPerPage);
  const currentQuestions =
    quizArray && quizArray.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setCurrentAns(currentQuestions[0].answer - 1);
  }, [currentQuestions]);

  const handleNext = () => {
    if (clickedOption === currentAns) {
      setEnergyPoints(energyPoints + 1);

      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setClickedOption("");
      }, 500);
    } else {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleSubmit = () => {
    setTimeout(() => {
      setClickedOption("");
    }, 500);
  };

  return (
    <>
      {/* {quizArray && quizArray.map((quiz, i) => <p key={i}>{quiz.question}</p>)} */}
      <div className="h-auto lg:h-[80vh] ">
        <h3 className=" dayOne px-5 pt-2  text-2xl font-semibold text-textColor">
          Quiz
        </h3>
        {currentQuestions.map((q, index) => (
          <div key={index}>
            <div className="space-y-4 p-5 ">
              <label
                htmlFor={`question-${index}`}
                className="dayOne text-lg text-textColor"
              >
                {q.key} {") "}
                {q.question}
              </label>
              <div className="answer flex flex-col gap-5">
                {q.options.map((option, index) => (
                  <div key={index} className="">
                    <button
                      className={`q_answer flex w-full cursor-pointer items-center gap-3 rounded-[10px] border  p-2 text-left text-textLightColor duration-300 hover:border-textColor hover:boxShadow sm:w-[90%] xl:w-[90%] ${
                        index === clickedOption &&
                        "border-[#008000] boxShadow1 hover:boxShadow1"
                      }
                       `}
                      onClick={() => setClickedOption(index)}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full md:w-full md:max-w-3xl">
              <Pagination
                quizArray={quizArray}
                id={q.key}
                quizid1={q.quizId}
                currentPage={currentPage}
                totalPages={totalPages}
                handleNext={handleNext}
                handleSubmit={handleSubmit}
                clickedOption={clickedOption}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default LearningQuiz;

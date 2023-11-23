import React, { useState, useEffect } from "react";
import Video from "../Video/Video";
import "./Modal.css";

const Modal = ({
  toggleModal,
  isModalOpen,
  setIsModalOpen,
  handleAccept,
  quiz,
  quiztitle,
  isModalOpen1,
  toggleModal1,
  path,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const itemsPerPage = 2;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(quiz && quiz.length / itemsPerPage);

  const currentQuestions =
    quiz && quiz.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    setSelectedAnswers({});
  }, [quiz]);

  const handleAnswerChange = (questionId, answerIndex) => {
    setSelectedAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionId]: answerIndex,
    }));
  };

  return (
    <div className="mt-24 flex  items-center justify-center">
      {/* Main modal */}
      {isModalOpen1 && path && (
        <div
          className=" fixed  top-0 flex   w-full items-center justify-center overflow-y-auto overflow-x-hidden border-2 pt-28 md:inset-0 "
          data-modal-backdrop="static"
          style={{ backgroundColor: "rgba(252, 250, 240, 0.7)" }}
        >
          <div className="relative  max-h-full w-full max-w-2xl">
            {/* Modal content */}
            <div className="relative h-auto rounded-lg border-2 bg-coursebg shadow ">
              {/* Modal header */}
              <div className=" rounded-t border-b p-4  md:p-5">
                <div className="flex items-center justify-between">
                  <h6 className="text-sm text-textColor">Course Preview</h6>
                  <button onClick={toggleModal1}>X</button>
                </div>
                <div>
                  <h2 className="dayOne text-textColor">
                    The Complete Personal Finance for Kids and Teenagers Course
                  </h2>
                </div>
              </div>

              {/* Modal body */}
              <div className="w-full">
                <Video />
              </div>
              {/* Modal footer */}
            </div>
          </div>
        </div>
      )}

      {isModalOpen && (
        <div
          className="fixed top-0 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
          data-modal-backdrop="static"
          data-testid="modal"
          style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
        >
          <div className="relative max-h-full w-full max-w-2xl rounded-lg border-b bg-coursebg p-4 shadow">
            <div className="flex flex-col items-center justify-between rounded-t border-b pb-5">
              <h3 className=" dayOne text-2xl  font-semibold text-textColor">
                {quiztitle}
              </h3>
            </div>
            {currentQuestions.map((q) => (
              <div key={q.id} className="relative">
                <div className="space-y-4 p-4 md:p-5">
                  <label
                    htmlFor={`question-${q.id}`}
                    className="text-textColor"
                  >
                    {q.question}
                  </label>
                  <div className="answer flex gap-5">
                    {q.options.map((option, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`ans-${q.id}`}
                          id={`question-${q.id}-option-${index}`}
                          className="h-5 w-4"
                          required={index === 0}
                          checked={selectedAnswers[q.id] === index}
                          onChange={() => handleAnswerChange(q.id, index)}
                        />
                        <span className="text-sm text-textLigntColor">
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-between border-t">
              <div className="flex items-center rounded-b  border-gray-200 p-4 md:p-5">
                <button
                  onClick={handleAccept}
                  type="button"
                  className="rounded-lg bg-textColor px-5 py-2.5 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300"
                >
                  Resume
                </button>
              </div>
              <div className="mb-5 mt-4 flex flex-col items-center">
                <span className="text-sm text-textColor">
                  Total{" "}
                  <span className="font-semibold text-textColor">
                    {quiz.length}
                  </span>{" "}
                  Questions
                </span>
                <div className="xs:mt-0 mt-2 inline-flex">
                  <button
                    onClick={() => setCurrentPage(currentPage - 1)}
                    className={`flex h-10 items-center justify-center rounded-l bg-textColor px-4 text-base font-medium text-white  ${
                      currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
                    }`}
                    disabled={currentPage === 1}
                  >
                    Prev
                  </button>
                  <button
                    onClick={() => setCurrentPage(currentPage + 1)}
                    className={`flex h-10 items-center justify-center rounded-r border-0 border-l border-textLigntColor bg-textColor px-4 text-base font-medium text-white  ${
                      currentPage === totalPages
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

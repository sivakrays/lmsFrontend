import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";

const Quiz = () => {
  const quiz = [
    {
      id: 1,
      title: "Finance Quiz-1",
      question: `What does "invest in yourself" mean?`,
      options: [
        "Working to improve your skills and knowledge to give yourself a better future.",
        "Spending all your money to buy delicious treats.",
        "Using most of your money to buy expensive things that you like.",
        "Delaying a task that you are supposed to do.",
      ],
      answer: 1,
    },
    {
      id: 2,
      title: "Finance Quiz-2",
      question: "Why is it important to invest in yourself?",
      options: [
        "Because it is not good to invest in others.",
        "It is better to spend your money now instead of saving it.",
        "To equip myself with knowledge and skills that will help improve my life.",
        "To treat myself as a business and to beat my competition.",
      ],
      answer: 3,
    },
    {
      id: 3,
      title: "Finance Quiz-3",
      question:
        "What is the best thing to do with your money after you get paid?",
      options: [
        "Use all of it to buy expensive toys.",
        "Hide the money so no one can find it.",
        "Invest money in important things.",
        "Spend it on what my friends are buying.",
      ],
      answer: 2,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(quiz && quiz.length / itemsPerPage);

  const [energyPoint, setEnergyPoint] = useState(1);

  const [clickedOption, setClickedOption] = useState();
  const [currentAns, setCurrentAns] = useState();
  const [checked, setChecked] = useState(false);

  const currentQuestions =
    quiz && quiz.slice(indexOfFirstItem, indexOfLastItem);

  const handleSubmit = () => {
    if (clickedOption === currentAns) {
      setEnergyPoint(energyPoint + 1);
      console.log("Total Energy Point", energyPoint);
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      console.log("correct");
    } else {
      setChecked(true);
      console.log("wrong");
    }
  };

  const handleNext = () => {
    if (clickedOption === currentAns) {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setClickedOption();
      }, 2000);
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
      });
      setEnergyPoint(energyPoint + 1);
      console.log(energyPoint);
      console.log("correct");
    } else {
      setTimeout(() => {
        setCurrentPage(currentPage + 1);
        setClickedOption();
        setChecked(false);
      }, 2000);
      setChecked(true);
      console.log("wrong");
    }
  };

  // console.log("selected Answer", clickedOption);
  useEffect(() => {
    setCurrentAns(currentQuestions[0].answer);
    // console.log("Current Question Answer is: ", currentAns);
  }, currentQuestions);
  const Pagination = ({ id }) => {
    return (
      <>
        <div className="flex justify-between">
          <div className="flex items-center rounded-b p-4 md:p-5">
            <span className="text-sm text-textColor ">
              <span className="font-semibold">{id} </span>
              <span> of </span>
              <span className="font-semibold text-textColor">
                {quiz.length}
              </span>
              <span> Questions</span>
            </span>
          </div>
          <div className=" mt-4 flex flex-col items-center">
            <div className="xs:mt-0 mt-2 inline-flex">
              {currentPage === totalPages ? (
                <button
                  className={`flex h-10 items-center justify-center rounded border-0 border-l border-textLigntColor bg-textColor px-6 text-base font-medium text-white  ${
                    checked === true ? "cursor-not-allowed opacity-50 " : ""
                  }`}
                  disabled={checked === true}
                  onClick={handleSubmit}
                >
                  Submit
                </button>
              ) : (
                <button
                  onClick={() => handleNext()}
                  className={`flex h-10 items-center justify-center rounded-md border-textLigntColor bg-textColor px-8 text-base font-medium text-white  ${
                    currentPage === totalPages || checked === true
                      ? "cursor-not-allowed opacity-50 "
                      : ""
                  }`}
                  disabled={checked === true}
                >
                  Next
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="flex h-screen items-center justify-center border bg-herobg p-3 md:p-0">
      <div className=" w-full max-w-3xl rounded-lg border-2 border-textColor bg-white p-4 shadow-sm boxShadow">
        <div className=" rounded-t border-b pb-5">
          <h3 className=" dayOne text-2xl  font-semibold text-textColor">
            Financial Quiz
          </h3>
        </div>
        {currentQuestions.map((q) => (
          <div key={q.id}>
            <div className="space-y-4 p-5 ">
              <label
                htmlFor={`question-${q.id}`}
                className="dayOne text-lg text-textColor"
              >
                {q.id} {") "}
                {q.question}
              </label>
              <div className="answer flex flex-col gap-5">
                {q.options.map((option, index) => (
                  <div key={index} className="flex  items-center gap-2">
                    {/* {checked === true && index === currentAns && (
                      <p className="p-0 text-left text-sm text-red-700">
                        Correct Answer
                      </p>
                    )} */}
                    <button
                      className={`text-md q_answer flex w-full cursor-pointer items-center  gap-3 rounded-[10px] border p-2 text-textLigntColor duration-300 hover:border-textColor hover:boxShadow ${
                        checked === true
                          ? index === currentAns &&
                            "boxShadow1 border-green-700 "
                          : index === clickedOption &&
                            "border-textColor boxShadow"
                      }`}
                      onClick={() => setClickedOption(index)}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <hr />
            <Pagination id={q.id} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

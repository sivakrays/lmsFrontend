import React, { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import success from "../../Assets/reward/star.png";
import { post } from "../../ApiCall/ApiCall";

const Quiz = ({
  setRewardModal,
  energyPoint,
  setEnergyPoint,
  quizzArray,
  subSectionId,
}) => {
  console.log("quiz array form auiz page", quizzArray);

  // const sendPoints = () => {
  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "application/json",
  //     },
  //   };
  //   const data = {
  //     userId: localStorage.getItem("userID"),
  //     energyPoint: energyPoint,
  //     badge: badge,
  //     sectionId: subSectionId,
  //   };
  //   post("/user/quiz", config, data)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));
  // };

  const [isMotivationalBoxVissble, setMotivationalBoxVissble] = useState(false);
  const [isCorrectAns, setCorrectAns] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(quizzArray && quizzArray.length / itemsPerPage);

  const [clickedOption, setClickedOption] = useState();
  const [currentAns, setCurrentAns] = useState();

  const currentQuestions =
    quizzArray && quizzArray.slice(indexOfFirstItem, indexOfLastItem);

  const starsConfeeti = () => {
    var defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["FFE400", "FFBD00", "E89400", "FFCA6C", "FDFFB8"],
    };

    function shoot() {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    }

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };
  const fireworkConfetti = () => {
    var duration = 4 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
      return Math.random() * (max - min) + min;
    }
    var interval = setInterval(function () {
      var timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }
      var particleCount = 50 * (timeLeft / duration);
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      });
    }, 250);
  };

  const handleSubmit = () => {
    if (clickedOption === currentAns) {
      setMotivationalBoxVissble(true);
      setCorrectAns(true);
      confetti({
        particleCount: 300,
        spread: 80,
        origin: { y: 0.6 },
      });
      setEnergyPoint(energyPoint + 1);
      console.log("Your EnergyPoint is :", energyPoint);
      setEnergyPoint(energyPoint);
      console.log("correct");

      if (isMotivationalBoxVissble === false) {
        setTimeout(() => {
          setClickedOption();
          setRewardModal(true);
          setMotivationalBoxVissble(false);
          fireworkConfetti();
          starsConfeeti();
        }, 1000);
      }
    } else {
      setCorrectAns(false);
      setMotivationalBoxVissble(true);
      if (isMotivationalBoxVissble === false) {
        setTimeout(() => {
          setClickedOption();
          setRewardModal(true);
          setMotivationalBoxVissble(false);
          fireworkConfetti();
          starsConfeeti();
        }, 1000);
      }
      console.log("Your EnergyPoint is :", energyPoint);
      console.log("wrong");
    }
  };

  const handleNext = () => {
    if (clickedOption === currentAns) {
      setMotivationalBoxVissble(true);
      setCorrectAns(true);
      confetti({
        particleCount: 300,
        spread: 80,
        origin: { y: 0.6 },
      });
      setEnergyPoint(energyPoint + 1);
      console.log(energyPoint);
      console.log("correct");

      if (isMotivationalBoxVissble === false) {
        setTimeout(() => {
          setClickedOption();
          setMotivationalBoxVissble(false);
          setCurrentPage(currentPage + 1);
        }, 1000);
      }
    } else {
      setCorrectAns(false);
      setMotivationalBoxVissble(true);
      console.log("wrong");
      if (isMotivationalBoxVissble === false) {
        setTimeout(() => {
          setClickedOption();
          setMotivationalBoxVissble(false);
          setCurrentPage(currentPage + 1);
        }, 1000);
      }
    }
  };

  console.log("selected Answer", clickedOption);
  useEffect(() => {
    setCurrentAns(currentQuestions[0].answer);
  }, currentQuestions);

  console.log("correct answer", currentAns);
  const Pagination = ({ id }) => {
    return (
      <div className="">
        <div className=" absolute bottom-0 right-96 hidden lg:block">
          {" "}
          {isMotivationalBoxVissble && (
            <MotivationalBox
              isMotivationalBoxVissble={isMotivationalBoxVissble}
              setMotivationalBoxVissble={() => setMotivationalBoxVissble(false)}
            />
          )}
        </div>
        <div className="flex items-center justify-between  lg:mt-4">
          <div className="flex items-center rounded-b p-4 md:p-5">
            <span className="text-sm text-textColor ">
              <span className="font-semibold">{id} </span>
              <span> of </span>
              <span className="font-semibold text-textColor">
                {quizzArray.length}
              </span>
              <span> Questions</span>
            </span>
          </div>
          <div>
            {/* ${checked === true ? "cursor-not-allowed opacity-50 " : ""} */}
            {/*  disabled={checked === true} */}
            {currentPage === totalPages ? (
              <button
                className={`flex h-10 items-center justify-center rounded border-0 border-l border-textLigntColor bg-textColor px-6 text-base font-medium text-white   ${
                  isMotivationalBoxVissble === true
                    ? "cursor-not-allowed opacity-50 "
                    : ""
                }
                `}
                onClick={handleSubmit}
              >
                Submit
              </button>
            ) : (
              // || checked === true
              // disabled={checked === true}
              <button
                onClick={() => handleNext()}
                className={`flex h-10 items-center justify-center rounded-md border-textLigntColor bg-textColor px-8 text-base font-medium text-white   ${
                  currentPage === totalPages ||
                  isMotivationalBoxVissble === true
                    ? "cursor-not-allowed opacity-50 "
                    : ""
                }`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MotivationalBox = ({
    isMotivationalBoxVissble,
    setMotivationalBoxVissble,
  }) => {
    return (
      <>
        <div className="relative flex h-[95px] w-[240px]  items-center justify-between rounded-md border-2 border-textColor bg-coursebg p-5 boxShadow">
          {isCorrectAns ? (
            <>
              <button
                className="absolute  cursor-pointer text-textLigntColor"
                onClick={() => setMotivationalBoxVissble(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <img src={success} className="w-16 drop-shadow-xl" />
              </div>
              <div>
                <p className="dayOne text-textColor">Nice Work!</p>
                <p className="text-sm font-semibold text-textColor">
                  Keep Going :)
                </p>
              </div>
            </>
          ) : (
            <>
              <button
                className="absolute right-1 top-1 cursor-pointer text-textLigntColor "
                onClick={() => setMotivationalBoxVissble(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
              <div>
                <img src={success} className="w-16 drop-shadow-xl" />
              </div>
              <div>
                <p className="dayOne text-textColor">Better Luck !</p>
                <p className="text-sm font-semibold text-textColor">
                  Work Hard :)
                </p>
              </div>
            </>
          )}
        </div>
      </>
    );
  };

  return (
    <div className="relative flex h-auto items-center justify-center bg-white p-2 md:p-0">
      <div className=" h-full w-full rounded-lg bg-white md:p-5 lg:p-10 lg:pt-40 xl:max-w-4xl xl:p-12 xl:pt-48 ">
        <div className=" rounded-t border-b pb-5">
          <h3 className=" dayOne text-2xl  font-semibold text-textColor">
            {currentQuestions[0].title}
          </h3>
        </div>
        {currentQuestions.map((q, index) => (
          <div key={q.key}>
            <div className="space-y-4 p-5 ">
              <label
                htmlFor={`question-${q.key}`}
                className="dayOne text-lg text-textColor"
              >
                {q.key} {") "}
                {q.question}
              </label>
              <div className="answer flex flex-col gap-5">
                {q.options.map((option, index) => (
                  <div key={index} className="">
                    <button
                      className={`q_answer flex w-full cursor-pointer items-center gap-3 rounded-[10px] border  p-2 text-left text-textLigntColor duration-300 hover:border-textColor hover:boxShadow sm:w-[90%] xl:w-[90%] ${
                        // checked === true
                        //   ? index === currentAns &&
                        //     "border-green-700 boxShadow1 "
                        //   :
                        index === clickedOption && "border-textColor boxShadow"
                      }`}
                      onClick={() => setClickedOption(index)}
                    >
                      {option}
                    </button>
                  </div>
                ))}
              </div>
            </div>
            {/* <hr /> */}
            <div className="w-full md:w-full md:max-w-3xl">
              <Pagination
                id={q.key}
                setMotivationalBoxVissble={setMotivationalBoxVissble}
                isMotivationalBoxVissble={isMotivationalBoxVissble}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

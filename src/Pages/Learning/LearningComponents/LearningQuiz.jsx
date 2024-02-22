import React, { useContext, useEffect, useState } from "react";
import Pagination from "./Pagination";
import { post } from "../../../ApiCall/ApiCall";
import { authContext } from "../../../Context/AuthContext";
import success from "../../../Assets/reward/star.png";
import confetti from "canvas-confetti";
import Reward from "../../../Components/Reward/Reward";

const LearningQuiz = ({
  quizArray,
  currentPage,
  setCurrentPage,
  clickedOption,
  setClickedOption,
  energyPoints,
  setEnergyPoints,
  clickedSubSection,
  autoPlayNext,
  setBronze,
  setSilver,
  setGold,
  setIsReward,
}) => {
  const [currentAns, setCurrentAns] = useState("");
  // const {
  //   setTotalBronze,
  //   setTotalSilver,
  //   setTotalGold,
  //   totalBronze,
  //   totalSilver,
  //   totalGold,
  // } = useContext(authContext);

  const itemsPerPage = 1;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const totalPages = Math.ceil(quizArray && quizArray.length / itemsPerPage);
  const currentQuestions =
    quizArray && quizArray.slice(indexOfFirstItem, indexOfLastItem);

  const [motivationBox, setMotivationalBox] = useState(null);

  useEffect(() => {
    setCurrentAns(currentQuestions[0].answer - 1);
  }, [currentQuestions]);

  const handleNext = () => {
    if (clickedOption === currentAns) {
      setEnergyPoints(energyPoints + 1);
      confetti({
        particleCount: 300,
        spread: 80,
        origin: { y: 0.6 },
      });
      // alert("true");
      setTimeout(() => {
        setClickedOption("");
        setCurrentPage(currentPage + 1);
      }, 500);
    } else {
      // alert("false");

      setClickedOption("");
      setCurrentPage(currentPage + 1);
    }
  };

  const submitEnergyPoint = () => {
    setEnergyPoints(energyPoints + 1);
    console.log(energyPoints);
  };

  const sendPoints = async (increaseEnergy) => {
    switch (increaseEnergy) {
      case 1:
        var badge = 3;
        break;
      case 2:
        var badge = 2;
        break;
      case 3:
        var badge = 1;
        break;
      default:
        var badge = 0;
    }

    try {
      const currentToken = JSON.parse(localStorage.getItem("token"));
      const userID = localStorage.getItem("userID");

      if (increaseEnergy !== 0 && badge !== 0) {
        const config = {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            "Content-Type": "application/json",
          },
        };

        const points = {
          userId: userID,
          energyPoints: increaseEnergy,
          badge: badge,
          subSectionId: clickedSubSection,
        };

        console.log(points);

        const res = await post("/user/saveBadge", points, config);
        const bronze = res.data.bronze;
        const silver = res.data.silver;
        const gold = res.data.gold;
        localStorage.setItem("bronze", bronze);
        localStorage.setItem("silver", silver);
        localStorage.setItem("gold", gold);

        if (res) {
          // autoPlayNext();
          setIsReward(true);
        }
        // updateBadgeCount(res.data.bronze, res.data.silver, res.data.gold);
        setBronze(res.data.bronze);
        setSilver(res.data.silver);
        setGold(res.data.gold);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const MotivationalBox = () => {
    return (
      <>
        <div className="relative flex h-[95px] w-[240px]  items-center justify-between rounded-md border-2 border-textColor bg-coursebg p-5 boxShadow">
          <>
            <button className="absolute  cursor-pointer text-textLightColor">
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

          <>
            <button className="absolute right-1 top-1 cursor-pointer text-textLightColor ">
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
        </div>
      </>
    );
  };

  const handleSubmit = async () => {
    if (clickedOption === currentAns) {
      setEnergyPoints(energyPoints + 1);
      const increaseEnergy = energyPoints + 1;
      console.log(increaseEnergy);
      // alert("true", increaseEnergy);
      confetti({
        particleCount: 300,
        spread: 80,
        origin: { y: 0.6 },
      });
      setTimeout(() => {
        setClickedOption("");
        sendPoints(increaseEnergy);
        setIsReward(true);
      }, 500);
    } else {
      // alert("false");
      console.log(energyPoints);
      sendPoints(energyPoints);
    }
    setTimeout(() => {
      setClickedOption("");
      setIsReward(true);
      // autoPlayNext();
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

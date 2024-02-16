import React, { useEffect, useRef, useState } from "react";
import ReactPlayer from "react-player";
import Modal from "../Modal/Modal";

const Video = () => {
  const startTimeToPlay = 35;

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.seekTo(startTimeToPlay);
    }
  }, []);

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
    },
    // {
    //   id: 4,
    //   title: "Finance Quiz-4",
    //   question: "What is the concept of supply and demand in economics?",
    //   options: [
    //     "The relationship between the availability and desire for goods",
    //     "A marketing strategy",
    //     "Government regulation",
    //   ],
    // },
    // {
    //   id: 5,
    //   title: "Finance Quiz-5",
    //   question: "What is a budget?",
    //   options: [
    //     "A financial plan for spending",
    //     "A type of loan",
    //     "A form of tax",
    //   ],
    // },
    // {
    //   id: 6,
    //   title: "Finance Quiz-6",
    //   question: "What is interest?",
    //   options: [
    //     "The cost of borrowing money",
    //     "A type of tax",
    //     "Profit from an investment",
    //   ],
    // },
    // {
    //   id: 7,
    //   title: "Finance Quiz-7",
    //   question: "What is inflation?",
    //   options: [
    //     "The increase in the general price level of goods and services",
    //     "A decrease in the money supply",
    //     "A type of investment",
    //   ],
    // },
    // {
    //   id: 8,
    //   title: "Finance Quiz-8",
    //   question: "What does GDP stand for?",
    //   options: [
    //     "Gross Domestic Product",
    //     "General Distribution of Profits",
    //     "Global Development Plan",
    //   ],
    // },
    // {
    //   id: 9,
    //   title: "Finance Quiz-9",
    //   question: "What is a credit score used for?",
    //   options: [
    //     "To assess a person's creditworthiness",
    //     "To measure income",
    //     "To determine tax rates",
    //   ],
    // },
    // {
    //   id: 10,
    //   title: "Finance Quiz-10",
    //   question: "What is a mutual fund?",
    //   options: [
    //     "A pool of money from multiple investors used to buy a diversified portfolio",
    //     "A type of bank account",
    //     "A government financial program",
    //   ],
    // },
  ];

  const playerRef = useRef(null);
  const [playedSecondsWhole, setPlayedSecondsWhole] = useState(0);
  const [shouldPause, setShouldPause] = useState(false);
  const [videoAccepted, setVideoAccepted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setShouldPause(false);
  };

  const handleAccept = () => {
    setVideoAccepted(true);
    closeModal();
    setShouldPause(false);
  };

  const handleProgress = (state) => {
    const currentSecondsWhole = Math.round(state.playedSeconds);
    setPlayedSecondsWhole(currentSecondsWhole);

    if (playedSecondsWhole === 5) {
      handlePause(5);
    }
    if (playedSecondsWhole === 10) {
      handlePause1(10);
    }
  };

  const handlePause1 = (specificTimeToPause) => {
    const tolerance = 0.5;

    if (
      Math.abs(playedSecondsWhole - specificTimeToPause) < tolerance &&
      !shouldPause &&
      !videoAccepted
    ) {
    } else {
      setShouldPause(true);
      setIsModalOpen(true);
    }
  };

  const handlePause = (specificTimeToPause) => {
    const tolerance = 0.5;
    if (
      Math.abs(playedSecondsWhole - specificTimeToPause) < tolerance &&
      !shouldPause &&
      !videoAccepted
    ) {
      setShouldPause(true);
      setIsModalOpen(true);
    }
  };

  return (
    <div className="h-auto overflow-y-hidden bg-herobg ">
      <div
        className="video mx-auto w-[95%] sm:w-[90%]"
        data-testid="video-player"
      >
        <ReactPlayer
          ref={playerRef}
          url="https://krays-lms-s3.s3.ap-south-1.amazonaws.com/LmsCourse//360d4784-898a-4995-8eef-9ea36976c98c"
          controls
          width="100%"
          height="10%"
          playing={!shouldPause}
          onContextMenu={(e) => e.preventDefault()}
          onProgress={handleProgress}
        />

        <p>PlayedSeconds : {playedSecondsWhole}</p>
      </div>

      <Modal
        toggleModal={toggleModal}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
        handleAccept={handleAccept}
        quiz={quiz}
        quiztitle="Quiz-1"
      />
    </div>
  );
};

export default Video;

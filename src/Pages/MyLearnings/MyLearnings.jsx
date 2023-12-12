import React from "react";
import LearningCard from "../../Components/LearningCard/LearningCard";
import courseImg from "../../Assets/courseCard/courseImg.jpg";

const MyLearnings = () => {
  const cardDetails = [
    {
      key: 1,
      image: courseImg,
      title: "The Complete Personal Finance For Kids and Teenagers Course",
      author: "Steeve Simbert",
    },
    {
      key: 2,
      image: courseImg,
      title: "The Complete Personal Finance For Kids and Teenagers Course",
      author: "Steeve Simbert",
    },
    {
      key: 3,
      image: courseImg,
      title: "The Complete Personal Finance For Kids and Teenagers Course",
      author: "Steeve Simbert",
    },
    {
      key: 4,
      image: courseImg,
      title: "The Complete Personal Finance For Kids and Teenagers Course",
      author: "Steeve Simbert",
    },
  ];
  return (
    <div className="header  mx-auto w-full  pt-24 ">
      <div className="mx-auto  w-[90%] justify-evenly ">
        <h1 className="dayOne mt-10  p-8 text-center  text-3xl text-textColor  xl:text-left">
          My Learnings
        </h1>
        <div className="flex  flex-wrap items-center justify-center">
          {cardDetails.map((cardDetails) => {
            return <LearningCard cardDetails={cardDetails} />;
          })}
        </div>
      </div>
    </div>
  );
};

export default MyLearnings;

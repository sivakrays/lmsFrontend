import React from "react";
import LearningCard from "../../Components/LearningCard/LearningCard";
import "./MyLearnings.css";

const MyLearnings = () => {
  const cardDetails = [
    {
      key: 1,
      image: "https://img-c.udemycdn.com/course/750x422/5039162_eb97_5.jpg",
      title: "The Complete Personal Finance For Kids and Teenagers Course",
      author: "Steeve Simbert",
    },
    {
      key: 2,
      image:
        "https://us.123rf.com/450wm/jaaakworks/jaaakworks1511/jaaakworks151100024/47825772-cartoon-business-team-steal-money-from-boss.jpg?ver=6",
      title: "Financial Foundations for Kids",
      author: "Amelia Bright",
    },
    {
      key: 3,
      image:
        "https://bookstr.com/wp-content/uploads/2023/04/childrens-financial-literacy-featured-image-750x400.jpg",
      title: "Money Matters Junior",
      author: "Emma Dollarwise",
    },
    {
      key: 4,
      image: "https://tm4k.ala.org/images/background.jpg",
      title: "Junior Money Management",
      author: "Oliver Pennyfield",
    },
  ];
  return (
    <div className="header myLearning h-full w-full bg-herobg  pt-24 xl:h-screen">
      <div className=" mx-auto w-[90%] ">
        <h1 className="dayOne mt-10  p-8 text-center  text-3xl text-textColor  xl:text-left">
          My Learnings
        </h1>
        <div className="flex  flex-wrap items-center ">
          {cardDetails.map((cardDetails) => {
            return (
              <div key={cardDetails.key}>
                <LearningCard cardDetails={cardDetails} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MyLearnings;

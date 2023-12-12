import React from "react";
import { useNavigate } from "react-router-dom";

const LearningCard = ({ cardDetails }) => {
  const navigate = useNavigate();
  const goToVideo = () => {
    navigate("/myvideo");
  };
  return (
    <div className="p-4" onClick={goToVideo}>
      <div className="flex   w-[280px] cursor-pointer  flex-col rounded    shadow ">
        <img
          src={cardDetails.image}
          alt=""
          className="h-3/5 w-full rounded-t  object-cover"
        />
        <div className="mb-4  p-4">
          <h1 className="dayOne text-md  text-textColor">
            {cardDetails.title}
          </h1>
          <p className=" mt-4 text-sm text-textLigntColor">
            {cardDetails.author}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;

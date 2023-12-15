import React from "react";
import { useNavigate } from "react-router-dom";
import star from "../../Assets/courseCard/star.png";

const LearningCard = ({ cardDetails }) => {
  const navigate = useNavigate();
  const goToVideo = () => {
    navigate(`/myvideo/${cardDetails.key}`);
  };
  return (
    <div className="  p-4" onClick={goToVideo}>
      <div className="flex w-[280px]  cursor-pointer flex-col  rounded bg-white    shadow-md ">
        <div className="h-3/5 w-full ">
          <img
            src={cardDetails.image}
            alt=""
            className=" h-[200px] w-full rounded-t  object-cover"
          />
        </div>
        <div className="mb-4 flex flex-col gap-4  p-4">
          <div className="h-14">
            <h1 className="dayOne text-md  text-textColor">
              {cardDetails.title.length > 40
                ? `${cardDetails.title.substring(0, 40)}...`
                : cardDetails.title}
            </h1>
          </div>
          <div className="h-3">
            <p className=" mt-1 text-sm text-textLigntColor">
              {cardDetails.author}
            </p>
          </div>
          <div className="mt-1  flex items-center  justify-between   ">
            <p className="  text-center text-xs text-textLigntColor">
              80% Completed
            </p>

            <div className="flex">
              <img src={star} alt="" className="w-4 object-contain" />
              <img src={star} alt="" className="w-4 object-contain" />
              <img src={star} alt="" className="w-4 object-contain" />
              <img src={star} alt="" className="w-4 object-contain" />
              <img src={star} alt="" className="w-4 object-contain" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearningCard;

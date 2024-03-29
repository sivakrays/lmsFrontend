import React from "react";
import { useNavigate } from "react-router-dom";
import star from "../../Assets/courseCard/star.png";

const LearningCard = ({ cardDetails }) => {
  const navigate = useNavigate();
  const goToVideo = () => {
    // navigate(`/myvideo/${cardDetails.courseId}`);
    navigate(`/learning/${cardDetails.courseId}`);
  };
  return (
    <div className="p-4  " onClick={goToVideo} data-testid="learningCard">
      <div className="flex w-[250px]  cursor-pointer flex-col  rounded border-2 border-textColor bg-white   shadow-md boxShadow">
        <div className="h-3/5 w-full p-1.5">
          <img
            src={`${cardDetails.thumbNail}`}
            alt=""
            className=" h-36 w-full rounded-t-xl  object-cover"
          />
        </div>
        <div className="mb-4 flex flex-col gap-4  p-4">
          <div className="h-14">
            <h1 className="dayOne text-md  text-textColor">
              {cardDetails.title && cardDetails.title.length > 40
                ? `${cardDetails.title.substring(0, 40)}...`
                : cardDetails.title}
            </h1>
          </div>
          <div className="h-3">
            <p className=" mt-1 text-sm text-textLightColor">
              {cardDetails.author}
            </p>
          </div>
          <div className="mt-1  flex items-center  justify-between   ">
            <p className="  text-center text-xs text-textLightColor">
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

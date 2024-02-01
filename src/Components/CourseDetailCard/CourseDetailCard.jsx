import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CourseDetailCard.css";

import cardImage from "../../Assets/courseCard/courseImg.jpg";
import playCircle from "../../Assets/coursedetails/PlayCircle.svg";
import Alarm from "../../Assets/coursedetails/Alarm.svg";
import file from "../../Assets/coursedetails/file.svg";
import folder from "../../Assets/coursedetails/folder.svg";
import trophy from "../../Assets/coursedetails/trophy.svg";
import YoutubeTv from "../../Assets/coursedetails/YoutubeTv.svg";

const Card = ({ img, price }) => {
  const [isCardFixed, setIscardFixed] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isFixed = scrollPosition > 50;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const reachedBottom =
      scrollPosition + windowHeight >= 0.95 * documentHeight;
    setIscardFixed(isFixed);
    setIsAtBottom(reachedBottom);
    if (reachedBottom === true) {
      setIscardFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCardFixed]);

  return (
    <div
      className={` hidden h-[360px] w-80 rounded-lg border-2 bg-white  xl:block ${
        isCardFixed ? "fixedCard " : ""
      }`}
    >
      <div className="relative">
        <img src={img} alt="" className="h-52 w-full rounded-t-lg " />
        <img
          src={playCircle}
          alt=""
          className="centerImg w-20 cursor-pointer"
        />
        <p className="centerText text-sm text-white">Preview this course</p>
      </div>

      <div className="mx-2 mt-4 flex h-52  flex-col ">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-textColor">
            {price}.Rs{" "}
            <span className=" text-sm font-thin text-textLightColor line-through">
              {" "}
              ₹2,999
            </span>{" "}
            <span className="text-sm font-medium text-textColor"> 83% off</span>
          </p>
        </div>
        <div className="mt-5 flex flex-col  items-center space-y-4 ">
          <button className=" w-full border-2 border-textColor bg-mobilebg p-3 boxShadow">
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;

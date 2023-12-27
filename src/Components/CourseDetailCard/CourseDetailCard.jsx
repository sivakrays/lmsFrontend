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

const Card = () => {
  const [isCardFixed, setIscardFixed] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isFixed = scrollPosition > 200;
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
      className={` hidden h-[450px] w-80 rounded-lg border-2 bg-white  xl:block ${
        isCardFixed ? "fixedCard" : ""
      }`}
    >
      <div className="relative">
        <img src={cardImage} alt="" className="h-52 w-full rounded-t-lg " />
        <img
          src={playCircle}
          alt=""
          className="centerImg w-20 cursor-pointer"
        />
        <p className="centerText text-sm text-white">Preview this course</p>
      </div>

      <div className="mx-2 mt-4 flex h-52  flex-col ">
        {/* <div className="flex flex-col">
          <p className="text-2xl font-bold text-textColor">
            ₹449{" "}
            <span className=" text-sm font-thin text-textLigntColor line-through">
              {" "}
              ₹2,999
            </span>{" "}
            <span className="text-sm font-medium text-textColor"> 83% off</span>
          </p>
          <div className="mb-3 flex">
            <img src={Alarm} alt="" className="mr-2 w-4 object-contain" />
            <p className="text-sm font-bold text-red-700">
              1 day{" "}
              <span className="text-sm font-light text-red-700">
                left at this price!
              </span>
            </p>
          </div>
        </div>
        <div className="mb-2 flex flex-col  items-center space-y-4 ">
          <button className=" w-full border-2 border-textColor bg-mobilebg p-3 boxShadow">
            Add to cart
          </button>
          <button className=" w-full border-2 border-textColor p-3 boxShadow">
            Buy now
          </button>
        </div> */}

        <div className="space-y-3">
          <p className="text-lg text-textColor">This course includes:</p>
          <div className="flex items-center gap-2">
            <span>
              <img src={YoutubeTv} alt="" className="w-4 object-contain" />
            </span>
            <span className="text-sm text-textColor">
              {" "}
              4 hours on-demand video
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <img src={file} alt="" className="w-4 object-contain" />
            </span>
            <span className="text-sm text-textColor"> 1 article</span>
          </div>
          <div className="flex items-center gap-2">
            <span>
              <img src={folder} alt="" className="w-4 object-contain" />
            </span>
            <span className="text-sm text-textColor">
              28 downloadable resources
            </span>
          </div>
          {/* <div className="flex items-center gap-2">
            <span>
              <img src={mobile} alt="" className="w-4 object-contain" />
            </span>
            <span className="text-sm text-textColor">
              Access on mobile and TV
            </span>
          </div> */}
          {/* <div className="flex items-center gap-2">
            <span>
              <img src={infinity} alt="" className="w-4 object-contain" />
            </span>
            <span className="text-sm text-textColor">Full lifetime access</span>
          </div> */}
          <div className="flex items-center gap-2">
            <span>
              <img src={trophy} alt="" className="w-4 object-contain" />
            </span>
            <span className="text-sm text-textColor">
              Certificate of completion
            </span>
          </div>
        </div>
        <Link>
          <p className="mt-4 text-sm font-bold text-textColor underline">
            Share
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Card;

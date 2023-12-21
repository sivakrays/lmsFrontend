import React, { useState, useEffect } from "react";
import "./CourseDetail.css";
import { Link } from "react-router-dom";
import star from "../../Assets/courseCard/star.png";
import ForwardArrow from "../../Assets/coursedetails/forwardArrow.svg";
import Globe from "../../Assets/coursedetails/Globe.svg";
import alert from "../../Assets/coursedetails/alert.svg";
import cardImage from "../../Assets/courseCard/courseImg.jpg";
import playCircle from "../../Assets/coursedetails/PlayCircle.svg";
import Alarm from "../../Assets/coursedetails/Alarm.svg";

import downArrow from "../../Assets/coursedetails/downArrow.svg";
import upArrow from "../../Assets/coursedetails/upArrow.svg";

import Accordion from "../../Components/Accordian/Accordian";
import Card from "../../Components/CourseDetailCard/CourseDetailCard";
import Footer from "../../Sections/Footer/Footer";
import { get } from "../../ApiCall/ApiCall";

const CourseDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [readMore, setReadMore] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [itemsToShow, setItemToShow] = useState([]);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      "Acess-Control-Allow-Headers": "*",
      Accept: "application/json",
      courseId: "258",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Course Detail render");
        const res = await get("/user/getCourseById", config);
        setData(res.data);
        console.log(res.data);
        const allListItems =
          res.data &&
          res.data.whatYouWillLearn
            .split(".")
            .filter((sentence) => sentence.trim() !== "");
        setItemToShow(readMore ? allListItems : allListItems.slice(0, 8));
        setLoading(false);
        console.log(res.data);
      } catch (err) {
        console.log("error", err);
        setLoading(true);
      }
    };

    fetchData();
  }, [readMore]);

  console.log("dataaaaaaaa", data);

  const showAll = () => {
    console.log("Working");
    setIsAllOpen(!isAllOpen);
  };

  console.log("isAllOpen", isAllOpen);

  return (
    <div className=" bg-herobg pt-16 md:pt-24 lg:pt-20   xl:pt-28">
      {loading && <p>loading...</p>}

      {data && (
        <section className="courseHeader relative mb-6  py-3  xl:bg-textColor xl:px-40">
          <div className="relative w-full bg-textColor">
            {/* display untill 1024px */}
            <div className=" mx-auto h-60 w-full md:h-96 xl:hidden">
              <img
                src={cardImage}
                alt=""
                className="h-60 w-full object-cover md:h-96"
              />
            </div>
            <div className="xl:hidden">
              <img
                src={playCircle}
                alt=""
                className="centerImg w-20 cursor-pointer"
              />
            </div>
          </div>
          {/*  */}

          <div className="mx-auto w-10/12   lg:h-[350px] lg:w-[85ch] xl:mx-0 xl:w-[60ch]">
            <div className="">
              <div className="flex flex-row">
                <img src={ForwardArrow} alt="" className="w-3" />
                <p className="my-2 text-sm text-[#C0C3FA]">{data.category}</p>
              </div>

              <h1 className="dayOne text-3xl font-medium leading-normal text-textColor xl:text-white">
                {data.title}
              </h1>
              <p className="my-3 text-lg leading-normal text-textColor  xl:text-white">
                {data.description}
              </p>
              <div className="flex flex-col ">
                <div className="my-2 flex  gap-3">
                  <div className="flex">
                    <p className="mr-2 text-[10px] text-[#F9CA47] md:text-sm">
                      {data.ratings}
                    </p>
                    <img src={star} alt="" className="w-4 object-contain" />
                    <img src={star} alt="" className="w-4 object-contain" />
                    <img src={star} alt="" className="w-4 object-contain" />
                    <img src={star} alt="" className="w-4 object-contain" />
                    <img src={star} alt="" className="w-4 object-contain" />
                  </div>
                  <Link>
                    <p className=" text-[10px] text-[#C0C3FA] underline md:text-sm">
                      (123 ratings)
                    </p>
                  </Link>
                  <p className=" text-[10px] text-textColor md:text-sm xl:text-white">
                    {data.enrolled}
                  </p>
                </div>
                <p className=" text-[10px] text-textColor md:text-sm xl:text-white">
                  Created by{" "}
                  <Link>
                    <span className="text-[#C0C3FA] underline">
                      {data.authorName}
                    </span>
                  </Link>
                </p>
                <div className="flex  flex-col  gap-2 xl:flex-row xl:gap-3 ">
                  <div className="flex flex-row items-center gap-2">
                    <img src={alert} alt="" className="w-5" />
                    <p className="my-2 text-[10px] text-textColor xl:text-white">
                      {` Last updated ${
                        data && data.date && data.date.substring(0, 10)
                      }`}
                    </p>
                  </div>

                  <div className="flex flex-row items-center gap-2">
                    <img src={Globe} alt="" className="w-5" />
                    <p className="text-[10px] text-textColor xl:text-white">
                      {data.language}
                    </p>
                  </div>
                </div>
              </div>
              {/* display till 1024 */}
              <div className="lg: mx-1 mt-4 flex h-52 flex-col xl:hidden">
                <div className="flex flex-col">
                  <p className="text-2xl font-bold text-textColor">
                    ₹449{" "}
                    <span className=" text-sm font-thin text-textLigntColor line-through">
                      {" "}
                      ₹2,999
                    </span>{" "}
                    <span className="text-sm font-medium text-textColor">
                      {" "}
                      83% off
                    </span>
                  </p>
                  <div className="mb-3 flex">
                    <img
                      src={Alarm}
                      alt=""
                      className="mr-2 w-4 object-contain"
                    />
                    <p className="text-sm font-bold text-red-700">
                      1 day{" "}
                      <span className="text-sm font-light text-red-700">
                        left at this price!
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mb-2 flex flex-col  items-center space-y-4 md:items-start  ">
                  <button className=" w-full border-2 border-textColor bg-mobilebg p-3 boxShadow md:w-3/4">
                    Buy Now
                  </button>

                  <p className="text-text-color text-sm">
                    30-Day Money-Back Guarantee
                  </p>
                </div>

                <Link>
                  <p className="mt-4 text-sm font-bold text-textColor underline">
                    Share
                  </p>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute right-40 top-10 xl:block">
            <Card />
          </div>
        </section>
      )}
      {/* what you will learn section */}
      {data && (
        <section className=" mx-auto w-[90%]   lg:mt-44 xl:mt-20 xl:w-[80%] ">
          <div className="topShadow mb-10  border  bg-white px-4 py-2  xl:w-[80ch]">
            <div className="mb-3   xl:w-full">
              <h1 className="dayOne text-xl font-bold text-textColor">
                What you'll learn
              </h1>
              <div className="">
                <ul className="place-iems-center grid list-outside list-disc grid-cols-1 gap-4  p-4   text-sm duration-500 md:grid-cols-2">
                  {itemsToShow &&
                    itemsToShow.map((item, index) => (
                      <li key={index} data-testid="list">
                        {item}
                      </li>
                    ))}
                </ul>
                <div className="  flex h-11 w-full flex-row">
                  <button
                    className="  flex "
                    onClick={() => setReadMore(!readMore)}
                  >
                    {readMore ? "Show less" : "Show more"}
                    <span>
                      {readMore ? (
                        <img src={downArrow} alt="" />
                      ) : (
                        <img src={upArrow} alt="" />
                      )}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      {/* Accordian Section */}
      {data && (
        <section className=" mx-auto w-[90%] xl:w-[80%]">
          <div className="sm:py-2 xl:w-[80ch]">
            <div className="mb-8 ">
              <h1 className=" dayOne p-2  text-xl font-bold text-textColor">
                Course content
              </h1>
              <div className="p-2 sm:flex sm:justify-between ">
                <p className=" text-xs sm:text-sm">
                  7 sections • 29 lectures • 4h 9m total length
                </p>
                {isAllOpen ? (
                  <span className="text-sm">
                    <button
                      className="text-xs  text-yellowColor sm:text-sm"
                      onClick={showAll}
                    >
                      Collapse all sections
                    </button>
                  </span>
                ) : (
                  <span className="text-sm">
                    <button
                      className="text-xs  text-yellowColor sm:text-sm"
                      onClick={showAll}
                    >
                      Expand all sections
                    </button>
                  </span>
                )}
              </div>
            </div>
            <div>
              <Accordion
                accordianDetails={data && data.sections}
                isAllOpen={isAllOpen}
              />
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default CourseDetails;

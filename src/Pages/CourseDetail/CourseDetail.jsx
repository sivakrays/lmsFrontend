import React, { useState, useEffect } from "react";
import "./CourseDetail.css";
import { Link } from "react-router-dom";
import star from "../../Assets/courseCard/star.png";
import ForwardArrow from "../../Assets/coursedetails/forwardArrow.svg";
import Globe from "../../Assets/coursedetails/Globe.svg";
import alert from "../../Assets/coursedetails/alert.svg";
import cardImage from "../../Assets/courseCard/courseImg.jpg";
import playCircle from "../../Assets/coursedetails/PlayCircle.svg";

import downArrow from "../../Assets/coursedetails/downArrow.svg";
import upArrow from "../../Assets/coursedetails/upArrow.svg";

import Accordion from "../../Components/Accordian/Accordian";
import Card from "../../Components/CourseDetailCard/CourseDetailCard";
import Footer from "../../Sections/Footer/Footer";
import { get } from "../../ApiCall/ApiCall";
import Loader from "../../Components/Loader/Loader";

const CourseDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [readMore, setReadMore] = useState(false);
  const [isAllOpen, setIsAllOpen] = useState(false);
  const [itemsToShow, setItemToShow] = useState([]);
  const [data, setData] = useState({});

  const config = {
    headers: {
      "Content-Type": "application/json",
      "Acess-Control-Allow-Origin": "*",
      "Acess-Control-Allow-Headers": "*",
      Accept: "application/json",
      courseId: "1",
    },
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        //console.log("Course Detail render");
        const res = await get("/user/getCourseById", config);
        setData(res.data);
        // console.log(res.data);
        // console.log(res.data);
        const allListItems =
          res.data &&
          res.data.whatYouWillLearn
            .split(".")
            .filter((sentence) => sentence.trim() !== "");
        setItemToShow(readMore ? allListItems : allListItems.slice(0, 8));
        //console.log(res.data);
      } catch (err) {
        //console.log("error", err);
      }
    };

    fetchData();
  }, [readMore]);

  const showAll = () => {
    // console.log("Working");
    setIsAllOpen(!isAllOpen);
  };

  return (
    <div className=" bg-herobg pt-16 md:pt-24 lg:pt-20   xl:pt-28">
      {Object.keys(data).length > 0 ? (
        <div>
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

              <div className="mx-auto w-10/12   lg:h-[250px] lg:w-[85ch] xl:mx-0 xl:w-[60ch]">
                <div className="">
                  <div className="flex flex-row">
                    <img src={ForwardArrow} alt="" className="w-3" />
                    <p className="my-2 text-sm text-[#C0C3FA]">
                      {data.category}
                    </p>
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
                </div>
              </div>
              {/* <div className="absolute top-10 xl:right-[150px] xl:block  "> */}
              <div className="card">
                <Card />
              </div>
            </section>
          )}
          {/* what you will learn section */}
          {data && (
            <section className=" mx-auto mt-10  w-[90%]  xl:mt-20 xl:w-[80%] ">
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
                      {itemsToShow && itemsToShow.length > 8 ? (
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
                      ) : (
                        ""
                      )}
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
        </div>
      ) : (
        <div className=" flex h-[45vh] w-full items-center justify-center ">
          <Loader color={"#334456"} />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CourseDetails;

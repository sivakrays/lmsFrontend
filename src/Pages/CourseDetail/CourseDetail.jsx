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

const CourseDetails = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [readMore, setReadMore] = useState(false);
  const allListItems = [
    "Learn about personal finance, budgeting and how to manage your money",
    "Better understand money and the economy",
    "Understand the role of tax, banks, interest rates, inflation",
    "Understand debt, student loan, and bankruptcy",
    "Why you should start saving at a young age",
    "Understand Roth 401(k) vs 401(k)",
    "Understand Traditional IRA vs. Roth IRA",
    "Understand risk vs. reward",
    "Learn about basic investments",
    "The difference between stocks vs. bonds",
    "Understand Mutual Funds vs. Index Funds",
    "Understand compounding interest",
    "Learn about diversification",
    "Learn about protecting yourself and insurance",
    "26 downloadable resources summarizing each lecture, including homework questions",
    "26 quizzes, consisting of 78 multiple choice questions (3 questions per each episode's quiz)",
  ];
  const accordianDetails = [
    {
      key: 1,
      accordianName: "Introduction",
      nestedItems: [
        {
          key: 1,
          accordianName: "Introduction",
          previewText:
            "The Complete Personal Finance for Kids and Teenagers Course by Steeve Simbert is a comprehensive, engaging, and fun online program, designed to boost the financial literacy of the younger generation. It uses entertaining animated cartoon videos to simplify complex financial, business, and economic concepts, covering everything from basic personal finance to investment strategies and retirement savings. ",
          quiz: "",
        },

        // Add other nested items as needed
      ],
    },
    {
      key: 2,
      accordianName: "Personal Finance",
      nestedItems: [
        {
          key: 1,
          accordianName: "Invest In Yourself",
          previewText:
            "If you want to be better than you are today, you must do something to improve yourself.",
          quiz: "Invest In Yourself Quiz",
        },
        {
          key: 2,
          accordianName: "Financial Freedom",
          previewText:
            " In this episode, you’ll learn the following from Prof Stevy:What “Financial Freedom” is Benefits of having financial freedom .How to become financially free",
          quiz: "Financial Freedom Quiz",
        },

        // Add other nested items as needed
      ],
    },
    {
      key: 3,
      accordianName: "The Three Little Pigs & Financial Planning",
      nestedItems: [
        {
          key: 1,
          accordianName: "Invest In Yourself",
          previewText:
            "If you want to be better than you are today, you must do something to improve yourself.",
          quiz: "Invest In Yourself Quiz",
        },
        {
          key: 2,
          accordianName: "Financial Freedom",
          previewText:
            " In this episode, you’ll learn the following from Prof Stevy:What “Financial Freedom” is Benefits of having financial freedom .How to become financially free",
          quiz: "Financial Freedom Quiz",
        },

        // Add other nested items as needed
      ],
    },
    // Add other items as needed
  ];

  const itemsToShow = readMore ? allListItems : allListItems.slice(0, 8);

  return (
    <div className=" bg-herobg pt-16 md:pt-24 lg:pt-20   xl:pt-28">
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
              <p className="my-2 text-sm text-[#C0C3FA]">Accounting</p>
            </div>

            <h1 className="text-3xl font-medium leading-normal text-textColor xl:text-white">
              The Complete Personal Finance For Kids and Teenagers Course
            </h1>
            <p className="my-3 text-lg leading-normal text-textColor  xl:text-white">
              Teach your children financial literacy through a fun, animated
              cartoon by an Oxford grad
            </p>
            <div className="flex flex-col ">
              <div className="my-2 flex  gap-3">
                <div className="flex">
                  <p className="mr-2 text-[10px] text-[#F9CA47] md:text-sm">
                    5.0
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
                  9164 students
                </p>
              </div>
              <p className=" text-[10px] text-textColor md:text-sm xl:text-white">
                Created by{" "}
                <Link>
                  <span className="text-[#C0C3FA] underline">
                    Steeve Simbert
                  </span>
                </Link>
              </p>
              <div className="flex  flex-col  gap-2 xl:flex-row xl:gap-3 ">
                <div className="flex flex-row items-center gap-2">
                  <img src={alert} alt="" className="w-5" />
                  <p className="my-2 text-[10px] text-textColor xl:text-white">
                    {" "}
                    Last updated 10/2023
                  </p>
                </div>

                <div className="flex flex-row items-center gap-2">
                  <img src={Globe} alt="" className="w-5" />
                  <p className="text-[10px] text-textColor xl:text-white">
                    English
                  </p>
                </div>
              </div>
            </div>
            {/* display till 1024 */}
            <div className="lg: mx-2 mt-4 flex h-52 flex-col xl:hidden">
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
                  <img src={Alarm} alt="" className="mr-2 w-4 object-contain" />
                  <p className="text-sm font-bold text-red-700">
                    1 day{" "}
                    <span className="text-sm font-light text-red-700">
                      left at this price!
                    </span>
                  </p>
                </div>
              </div>
              <div className="mb-2 flex flex-col  items-center space-y-4 md:items-start  ">
                <button className=" boxShadow w-full border-2 border-textColor bg-mobilebg p-3 md:w-3/4">
                  Add to cart
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
        <div className="absolute right-40 top-10 ">
          <Card />
        </div>
      </section>
      {/* what you will learn section */}
      <section className=" mx-auto  lg:mt-44 xl:mt-20 xl:w-[80%]">
        <div className="mb-20 border bg-white px-4 py-2 xl:w-[80ch]">
          <div className="mb-3   xl:w-full">
            <h1 className="text-xl font-bold text-textColor">
              What you'll learn
            </h1>
            <div className="">
              <ul class="place-iems-center  grid list-outside list-disc grid-cols-1  gap-4   p-4 text-sm md:grid-cols-2">
                {itemsToShow.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
              <div className="flex flex-row  shadow-2xl">
                <button
                  className=" flex "
                  onClick={() => setReadMore(!readMore)}
                >
                  {readMore ? "Show less" : "Show more"}
                  <span>
                    {readMore ? (
                      <img src={downArrow} alt="" srcset="" />
                    ) : (
                      <img src={upArrow} alt="" srcset="" />
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Accordian Section */}
      <section className=" mx-auto  xl:w-[80%]">
        <div className="px-4  sm:py-2 xl:w-[80ch]">
          <div className="mb-8 ">
            <h1 className=" p-2 text-xl font-bold text-textColor">
              Course content
            </h1>
            <div className="p-2 sm:flex sm:justify-between ">
              <p className=" text-xs sm:text-sm">
                7 sections • 29 lectures • 4h 9m total length
              </p>
              <span className="text-sm">
                <button className="text-yellowColor  text-xs sm:text-sm">
                  Expand all sections
                </button>
              </span>
            </div>
          </div>
          <div>
            <Accordion accordianDetails={accordianDetails} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default CourseDetails;

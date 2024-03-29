import React, { useState, useEffect } from "react";
import "./CourseDetail.css";
import { Link, useParams } from "react-router-dom";
import star from "../../Assets/courseCard/star.png";
import ForwardArrow from "../../Assets/coursedetails/forwardArrow.svg";
import Globe from "../../Assets/coursedetails/Globe.svg";
import alert from "../../Assets/coursedetails/alert.svg";
import cardImage from "../../Assets/courseCard/courseImg.jpg";
import playCircle from "../../Assets/coursedetails/PlayCircle.svg";
import Accordion from "../../Components/Accordian/Accordian";
import Card from "../../Components/CourseDetailCard/CourseDetailCard";
import Footer from "../../Sections/Footer/Footer";
import { get, post } from "../../ApiCall/ApiCall";
import Loader from "../../Components/Loader/Loader";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";

const CourseDetails = () => {
  const id = useParams();

  console.log(id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [isAllOpen, setIsAllOpen] = useState(false);
  const [data, setData] = useState({});

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setToken(currentToken);

    const fetchCourseDetails = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        setToken(refreshedToken);

        const config = {
          headers: {
            courseId: id.id,
            Authorization: `Bearer ${refreshedToken}`,
            // tenantId: "public",
          },
        };

        const res = await get("/user/getCourseById", config);
        if (res.status === 200 && res.data) {
          setData(res.data);
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    if (currentToken) {
      fetchCourseDetails();
    } else {
      console.log("Token not present");
    }
  }, [id.id, token]);

  const showAll = () => {
    setIsAllOpen(!isAllOpen);
  };

  return (
    <div className=" bg-herobg pt-16 md:pt-28 lg:pt-28   xl:pt-28">
      {Object.keys(data).length > 0 ? (
        <div>
          {data && (
            <section className="courseHeader relative mb-6 py-3  lg:h-80  lg:bg-textColor lg:px-40">
              <div className="relative  w-full bg-textColor">
                {/* display untill 1024px */}
                <div className=" mx-auto h-60 w-full md:h-96 lg:hidden">
                  <img
                    src={cardImage}
                    alt=""
                    className="h-60 w-full object-cover md:h-96"
                  />
                </div>
                <div className="lg:hidden">
                  <img
                    src={playCircle}
                    alt=""
                    className="centerImg w-20 cursor-pointer"
                  />
                </div>
              </div>
              {/*  */}

              <div className="mx-auto h-auto w-10/12   lg:mx-0 lg:w-[60ch]">
                <div className="">
                  <div className="flex flex-row">
                    <img src={ForwardArrow} alt="" className="w-3" />
                    <p className="my-2 text-sm text-[#C0C3FA]">
                      {data.category}
                    </p>
                  </div>

                  <h1 className="dayOne text-3xl font-medium leading-normal text-textColor lg:text-white">
                    {data.title}
                  </h1>
                  <p className="my-3 text-lg leading-normal text-textColor  lg:text-white">
                    {data.description.length > 40
                      ? `${data.description.substring(0, 140)}...`
                      : data.description}
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
                      <p className=" text-[10px] text-textColor md:text-sm lg:text-white">
                        {data.enrolled}
                      </p>
                    </div>
                    <p className=" text-[10px] text-textColor md:text-sm lg:text-white">
                      Created by{" "}
                      <Link>
                        <span className="text-[#C0C3FA] underline">
                          {data.authorName}
                        </span>
                      </Link>
                    </p>
                    <div className="flex  flex-col  gap-2 lg:gap-3 xl:flex-row ">
                      <div className="flex flex-row items-center gap-2">
                        <img src={alert} alt="" className="w-5" />
                        <p className="my-2 text-[10px] text-textColor lg:text-white">
                          {` Last updated ${
                            data && data.date && data.date.substring(0, 10)
                          }`}
                        </p>
                      </div>

                      <div className="flex flex-row items-center gap-2">
                        <img src={Globe} alt="" className="w-5" />
                        <p className="text-[10px] text-textColor lg:text-white">
                          {data.language}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="absolute top-10 xl:right-[150px] xl:block  "> */}
              <div className="card">
                <Card
                  img={data.thumbNail}
                  price={data.price}
                  courseId={data.courseId}
                />
              </div>
            </section>
          )}
          {/* what you will learn section */}
          {data && (
            <section className=" mx-auto mt-10  w-[90%]  lg:mt-20 lg:w-[80%] ">
              <div className="topShadow mb-10  border  bg-white px-4 py-2  lg:w-[80ch]">
                <div className="mb-3   lg:w-full">
                  <h1 className="dayOne text-xl font-bold text-textColor">
                    What you'll learn
                  </h1>
                  <div className="">
                    <p className="text-sm text-textColor">
                      {data.whatYouWillLearn}
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {/* Accordian Section */}
          {data && (
            <section className=" mx-auto w-[90%] lg:w-[80%]">
              <div className="sm:py-2 lg:w-[80ch]">
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
        <>
          <div className="flex  h-[45vh] w-full items-center justify-center md:hidden">
            <Loader color={"#334456"} height={"10%"} width={"10%"} />
          </div>
          <div className="hidden  h-[45vh] w-full items-center justify-center md:flex">
            <Loader color={"#334456"} height={"5%"} width={"5%"} />
          </div>
        </>
      )}

      <Footer />
    </div>
  );
};

export default CourseDetails;

import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import data from "../../Data/Data";

import course1 from "../../Assets/Home/course1.jpg";
import course2 from "../../Assets/Home/course2.jpg";
import course3 from "../../Assets/Home/course3.webp";
import course4 from "../../Assets/Home/course4.jpg";

import Button from "../../Components/Button/Button";
import CourseCard from "../../Components/CourseCard/CourseCard";
import CategorySection from "../../Sections/CategorySection/CategorySection";
import PromoVideo from "../../Sections/PromoVideo/PromoVideo";
import Footer from "../../Sections/Footer/Footer";
import { get } from "../../ApiCall/ApiCall";
import { ToastContainer } from "react-toastify";
import floatimg1 from "../../Assets/HeroSection/books.png";
import floatimg from "../../Assets/HeroSection/img1234.png";

import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import { authContext } from "../../Context/AuthContext";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";

const Home = () => {
  const { isTokenValid } = useContext(authContext);
  const [courseData, setCourseData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));

    const fetchCourse = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${currentToken}`,
            Accept: "application/json",
            pageNo: 0,
            pageSize: 6,
          },
        };

        const res = await get("/user/getAllCourse", config);
        if (res.status === 200 && res.data.content) {
          setLoading(false);
          if (res.data.content.length !== courseData)
            setCourseData(res.data.content);
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    if (currentToken) {
      fetchCourse();
    } else {
      console.log("Token not present");
    }
  }, []);

  const BeforeLoginData = [
    {
      id: "1",
      thumbNail: course1,
      category: "Programming",
      title: "Game development: Programming with java Plus C#",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "2",
      thumbNail: course2,
      category: "Medical",
      title: "Medical Basics 101: Anatomy of whole human body research basis ",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "3",
      thumbNail: course3,
      category: "AI/ML",
      title: "Supervised Machine Learning: Regression and Classification",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "4",
      thumbNail: course4,
      category: "Design",
      title: "Product design and analysis: Psychical Goods creation for us",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "5",
      thumbNail: course1,
      category: "Psychology",
      title: `Psychology : How to solve anxiety problem easily`,
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "6",
      thumbNail: course2,
      category: "Finance",
      title: "Business Communication: How to deal with clients Professionaly",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
  ];

  return (
    <main className="relative w-full bg-herobg">
      {/* Hero Section */}
      <section
        className="hero hero_container h-full pt-20 md:pt-20 lg:pt-28"
        id="home"
      >
        <div className="hero-container mx-auto flex w-[85%] flex-wrap gap-5 sm:gap-0">
          <div className="order-last flex flex-col justify-center gap-5 md:p-7 lg:order-first lg:w-[40%]">
            <p className="dayOne text-4xl text-textColor">
              {data[0].landingHeading}
            </p>
            <p className="text-lg font-semibold text-textColor">
              {data[0].landingSubHeading}
            </p>
            <p className="text-justify text-sm text-textLightColor">
              {data[0].landingContent}
            </p>
            <div>
              <Button path="/course" name="Explore courses" />
            </div>
          </div>
          <div className="order-first flex justify-center sm:p-9  lg:order-last lg:w-[60%]">
            <img src={data[0].landingImg} alt="" className="heroImg" />
          </div>
        </div>

        <div className="center h-22  mt-7 flex animate-bounce items-center justify-center text-textColor duration-700 sm:mt-10 lg:mt-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8l8-8z"
            />
          </svg>
        </div>
        <p className="dayOne py-3 text-center text-textColor">
          Learn more than 10 Expert Courses
        </p>
      </section>

      {/* Course Section */}
      <section className="course  h-full bg-coursebg">
        <div className="course_container mx-auto w-[85%] justify-center gap-6 py-8 lg:flex lg:py-0">
          <div className="courseLeft flex flex-col gap-3 rounded border-textColor py-3 sm:mx-auto sm:w-[60%] md:mb-7 md:items-center md:border-2 md:px-2 md:text-center lg:mb-0 lg:ml-4 lg:w-[30%] lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:px-0 lg:py-0">
            <div className="courseSVG ">
              <img
                src={data[0].featureImg1}
                alt=""
                className="w-14 rounded border border-textColor p-1 lg:w-28 xl:w-20   "
              />
            </div>
            <div className="courseDES flex flex-col">
              <div className="desHeading dayOne text-textColor lg:text-sm xl:text-xl">
                {data[0].featureHeading1}
              </div>
              <div className="desText text-textLightColor lg:text-sm ">
                {data[0].featureContent1}
              </div>
            </div>
            <div className="divider hidden h-14 rounded border-r-4 border-textLightColor lg:flex"></div>
            <div className="divider mb-4 w-11 rounded border-b-4 border-textLightColor lg:hidden"></div>
          </div>

          <div className="courseCenter flex flex-col gap-3 rounded border-textColor py-3 sm:mx-auto sm:w-[60%] md:mb-7 md:items-center md:border-2 md:px-2 md:text-center lg:mb-0 lg:w-[30%] lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:px-0 lg:py-0">
            <div className="courseSVG ">
              <img
                src={data[0].featureImg2}
                alt=""
                className="w-14 rounded border border-textColor p-1 lg:w-28 xl:w-20"
              />
            </div>
            <div className="courseDES flex flex-col">
              <div className="desHeading dayOne text-textColor lg:text-sm xl:text-xl">
                {data[0].featureHeading2}
              </div>
              <div className="desText text-textLightColor lg:text-sm">
                {data[0].featureContent2}
              </div>
            </div>
            <div className="divider hidden h-14 rounded border-r-4 border-textLightColor lg:flex"></div>
            <div className="divider mb-4 w-11 rounded border-b-4 border-textLightColor lg:hidden"></div>
          </div>

          <div className="courseRight flex flex-col gap-3 rounded border-textColor py-3 sm:mx-auto sm:w-[60%] md:mb-7 md:items-center md:border-2 md:px-2 md:text-center lg:mb-0 lg:mr-4 lg:w-[30%] lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:px-0 lg:py-0">
            <div className="courseSVG ">
              <img
                src={data[0].featureImg3}
                alt=""
                className="w-14 rounded border border-textColor p-1 lg:w-28 xl:w-20"
              />
            </div>
            <div className="courseDES flex flex-col">
              <div className="desHeading dayOne text-textColor lg:text-sm xl:text-xl">
                {data[0].featureHeading3}
              </div>
              <div className="desText text-textLightColor lg:text-sm">
                {data[0].featureContent3}
              </div>
            </div>
          </div>
        </div>
        <div
          id="courses"
          className="courseHeading flex flex-col items-center justify-center gap-3 sm:gap-3 md:gap-5 lg:flex-row xl:gap-16 xl:py-14"
        >
          <p className="dayOne text-2xl text-textColor md:text-3xl">
            {data[0].featureMainHeading}
          </p>
          <p className=" sm:text-md px-4 text-justify text-textLightColor sm:w-[60%] sm:text-center md:w-[45%] md:text-[14px] lg:w-[35%] xl:w-[25%] xl:text-sm">
            {data[0].featureMainContent}
          </p>
        </div>
        <div className="cardSection">
          <div className="cardDiv relative mx-auto flex w-[75%] flex-wrap items-center justify-center gap-5 pb-14 md:w-[90%] md:gap-20 lg:w-[75%]">
            <div className="floatingChild absolute -right-32 top-0 hidden lg:block">
              <img src={floatimg} alt="" className=" w-44" />
            </div>
            {/* Course Card with Data */}

            {isTokenValid ? (
              !loading ? (
                <>
                  {courseData.length > 0 ? (
                    courseData.map((course, index) => (
                      <div key={index}>
                        <CourseCard course={course} path="homeCard" />
                      </div>
                    ))
                  ) : (
                    <div className="mt-5 flex h-[20vh] w-full items-center justify-center">
                      <p className=" text-lg font-semibold text-textLightColor">
                        No Data Found
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex h-[20vh] w-full items-center justify-center md:hidden">
                    <Loader color={"#334456"} height={"10%"} width={"10%"} />
                  </div>
                  <div className="hidden h-[20vh] w-full items-center justify-center md:flex">
                    <Loader color={"#334456"} height={"5%"} width={"5%"} />
                  </div>
                </>
              )
            ) : (
              <>
                {BeforeLoginData.map((course, index) => (
                  <div key={index}>
                    <CourseCard course={course} path="homeCard" />
                  </div>
                ))}
              </>
            )}

            <div className="floatingChild absolute -left-32 bottom-0 hidden lg:block ">
              <img src={floatimg1} alt="" className=" w-36" />
            </div>
          </div>
          <div className="courseBtn mx-auto flex w-[75%] items-center justify-center pb-12">
            <Button path="/course" name="Explore courses" />
          </div>
        </div>
      </section>

      {/* Category */}
      <section className="category pb-16 pt-7">
        <div className="categoryHeading">
          <p className="dayOne p-10 pb-12 text-center text-2xl text-textColor">
            {data[0].featureCardHeading}
          </p>
        </div>
        <CategorySection />
      </section>

      {/* Promo and testimonials */}
      <section className="promo">
        <PromoVideo />
      </section>

      {/* Footer */}
      <Footer />

      <ToastContainer
        position="top-center"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </main>
  );
};

export default Home;

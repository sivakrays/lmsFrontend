import React, { useContext, useEffect, useState } from "react";
import "./Home.css";

import feature1 from "../../Assets/courseCard/c1.png";
import feature2 from "../../Assets/courseCard/c2.png";
import feature3 from "../../Assets/courseCard/c3.png";

import hero from "../../Assets/HeroSection/hero.png";

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

const Home = () => {
  const { isTokenValid } = useContext(authContext);
  const [courseData, setCourseData] = useState([]);
  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Origin": "*",
        "Acess-Control-Allow-Headers": "*",
        Accept: "application/json",
        pageNo: 0,
        pageSize: 6,
      },
    };
    get("/user/getAllCourse", config)
      .then((res) => {
        setCourseData(res.data.content);
      })
      .catch((err) => console.log(err));
  }, []);

  const BeforeLoginData = [
    {
      id: "1",
      img: course1,
      category: "Programming",
      title: "Game development: Programming with java Plus C#",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "2",
      img: course2,
      category: "Medical",
      title: "Medical Basics 101: Anatomy of whole human body research basis ",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "3",
      img: course3,
      category: "AI/ML",
      title: "Supervised Machine Learning: Regression and Classification",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "4",
      img: course4,
      category: "Design",
      title: "Product design and analysis: Psychical Goods creation for us",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "5",
      img: course1,
      category: "Psychology",
      title: `Psychology and Consultation: How to solve anxiety problem easily`,
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "6",
      img: course2,
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
              Every child is born genius
            </p>
            <p className="text-lg font-semibold text-textColor">
              Let CuriousKids help your child enhance these
            </p>
            <p className="text-sm text-textLigntColor">
              We offer personalised lessons powered by AI, aimed at kids between
              3-12 years. With our cross curricular approach, we ensure your
              child gets the best.
            </p>
            <div>
              <Button path="/course" name="Explore courses" />
            </div>
          </div>
          <div className="order-first flex justify-center sm:p-9  lg:order-last lg:w-[60%]">
            <img src={hero} alt="" className="heroImg" />
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
                src={feature1}
                alt=""
                className="w-14 rounded border border-textColor p-1 lg:w-28 xl:w-20   "
              />
            </div>
            <div className="courseDES flex flex-col">
              <div className="desHeading dayOne text-textColor lg:text-sm xl:text-xl">
                Best Platform
              </div>
              <div className="desText text-textLigntColor lg:text-sm ">
                Lorem ipsum dolor sit amet, consec temporidunt ut labore
                veniam...
              </div>
            </div>
            <div className="divider hidden h-14 rounded border-r-4 border-textLigntColor lg:flex"></div>
            <div className="divider mb-4 w-11 rounded border-b-4 border-textLigntColor lg:hidden"></div>
          </div>

          <div className="courseCenter flex flex-col gap-3 rounded border-textColor py-3 sm:mx-auto sm:w-[60%] md:mb-7 md:items-center md:border-2 md:px-2 md:text-center lg:mb-0 lg:w-[30%] lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:px-0 lg:py-0">
            <div className="courseSVG ">
              <img
                src={feature2}
                alt=""
                className="w-14 rounded border border-textColor p-1 lg:w-28 xl:w-20"
              />
            </div>
            <div className="courseDES flex flex-col">
              <div className="desHeading dayOne text-textColor lg:text-sm xl:text-xl">
                Great materials
              </div>
              <div className="desText text-textLigntColor lg:text-sm">
                Lorem ipsum dolor sit amet, consec temporidunt ut labore
                veniam...
              </div>
            </div>
            <div className="divider hidden h-14 rounded border-r-4 border-textLigntColor lg:flex"></div>
            <div className="divider mb-4 w-11 rounded border-b-4 border-textLigntColor lg:hidden"></div>
          </div>

          <div className="courseRight flex flex-col gap-3 rounded border-textColor py-3 sm:mx-auto sm:w-[60%] md:mb-7 md:items-center md:border-2 md:px-2 md:text-center lg:mb-0 lg:mr-4 lg:w-[30%] lg:flex-row lg:items-center lg:gap-7 lg:border-0 lg:px-0 lg:py-0">
            <div className="courseSVG ">
              <img
                src={feature3}
                alt=""
                className="w-14 rounded border border-textColor p-1 lg:w-28 xl:w-20"
              />
            </div>
            <div className="courseDES flex flex-col">
              <div className="desHeading dayOne text-textColor lg:text-sm xl:text-xl">
                Professional Course
              </div>
              <div className="desText text-textLigntColor lg:text-sm">
                Lorem ipsum dolor sit amet, consec temporidunt ut labore
                veniam...
              </div>
            </div>
          </div>
        </div>
        <div
          id="courses"
          className="courseHeading flex flex-col items-center justify-center gap-3 sm:gap-3 md:gap-5 lg:flex-row xl:gap-16 xl:py-14"
        >
          <p className="dayOne text-2xl text-textColor md:text-3xl">
            Featured Courses
          </p>
          <p className=" sm:text-md px-4 text-justify text-textLigntColor sm:w-[60%] sm:text-center md:w-[45%] md:text-[14px] lg:w-[35%] xl:w-[25%] xl:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod temporidunt ut labore veniam...
          </p>
        </div>
        <div className="cardSection">
          <div className="cardDiv relative mx-auto flex w-[75%] flex-wrap items-center justify-center gap-5 pb-14 md:w-[90%] md:gap-20 lg:w-[75%]">
            <div className="floatingChild absolute -right-32 top-0 hidden lg:block">
              <img src={floatimg} alt="" className=" w-44" />
            </div>
            {/* Course Card with Data */}

            {isTokenValid ? (
              courseData.length > 0 ? (
                <>
                  {courseData &&
                    courseData.map((course, index) => (
                      <div key={index}>
                        <CourseCard course={course} path="homeCard" />
                      </div>
                    ))}
                </>
              ) : (
                <div className="flex h-[20vh] w-full items-center justify-center">
                  <Loader color={"#334456"} />
                </div>
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
            Feature of this course
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

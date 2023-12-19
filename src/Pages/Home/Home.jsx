import React from "react";
import "./Home.css";
import heroImg from "../../Assets/HeroSection/Mask group.svg";
import frame from "../../Assets/HeroSection/Frame.svg";
import img1 from "../../Assets/HeroSection/Exclude.svg";
import videoImg from "../../Assets/HeroSection/Video.svg";

import heroImg1 from "../../Assets/HeroSection/Untitled design.png";

import feature1 from "../../Assets/courseCard/c1.png";
import feature2 from "../../Assets/courseCard/c2.png";
import feature3 from "../../Assets/courseCard/c3.png";

import hero from "../../Assets/HeroSection/hero.png";

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

const Home = () => {
  // get('',config).then((res)=>{

  // })
  const courseData = [
    {
      id: "1",
      img: "https://img-c.udemycdn.com/course/750x422/5039162_eb97_5.jpg",
      category: "Programming1",
      title: "Game development: Programming with java Plus C#",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "2",
      img: "https://us.123rf.com/450wm/jaaakworks/jaaakworks1511/jaaakworks151100024/47825772-cartoon-business-team-steal-money-from-boss.jpg?ver=6",
      category: "Medical1",
      title: "Medical Basics 101: Anatomy of whole human body research basis ",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "3",
      img: "https://bookstr.com/wp-content/uploads/2023/04/childrens-financial-literacy-featured-image-750x400.jpg",
      category: "AI/ML1",
      title: "Supervised Machine Learning: Regression and Classification",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "4",
      img: "https://tm4k.ala.org/images/background.jpg",
      category: "Design1",
      title: "Product design and analysis: Psychical Goods creation for us",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "5",
      img: "https://bookstr.com/wp-content/uploads/2023/04/childrens-financial-literacy-featured-image-750x400.jpg",
      category: "Psychology1",
      title: `Psychology and Consultation: How to solve anxiety problem easily`,
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "6",
      img: "https://tm4k.ala.org/images/background.jpg",
      category: "Finance1",
      title: "Business Communication: How to deal with clients Professionaly",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
  ];

  return (
    <main className="relative w-full bg-herobg">
      {/* Hero Section */}
      <section
        className="hero hero_container h-full pt-14 md:pt-20 lg:pt-28"
        id="home"
      >
        <div className="mx-auto flex w-[85%] flex-wrap-reverse">
          <div className="flex flex-col  justify-center gap-5  p-7 md:w-[40%]">
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
          <div className="flex  justify-center  p-9 md:w-[60%]">
            <img src={hero} alt="" className="rounded-sm" />
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
        {/* <div className="md:px-16  lg:flex">
          <div className="heroLeft my-9 space-y-5 sm:my-14 sm:space-y-8 md:space-y-8 lg:space-y-10">
            <div className=" mx-auto  flex sm:w-[85%] md:w-[90%] lg:w-[100%]">
              <h1 className="heading dayOne px-5 text-3xl font-bold text-textColor sm:text-5xl md:text-5xl lg:px-0 lg:text-3xl xl:text-6xl">
                Boost your skill <br /> with experts
              </h1>
            </div>

            <p className="mx-auto w-[85%] flex-1 text-lg font-semibold  text-textLigntColor sm:w-4/5 lg:w-[100%]">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, <br />{" "}
              sed do eiusmod temporidunt ut labore veniam...
            </p>
            <div className=" flex gap-8 px-8 sm:px-28 md:gap-14 lg:px-0">
              <Button path="/course" name="Explore courses" />
              <img src={img1} alt="" className="btnImg" />
            </div>
          </div>

          <div className="heroCenter relative flex items-center justify-center">
            <img src={heroImg} alt="" className="heroImg" />
            <img
              src={videoImg}
              alt=""
              className="videoImg  absolute left-[70%] top-20 w-24 "
            />
          </div>

          <div className="heroRight mx-auto mt-11 flex w-[80%] flex-col justify-center sm:w-[90%] sm:flex-row sm:gap-5 md:w-[90%] lg:mt-20 lg:w-[10%] lg:flex-col lg:gap-2 xl:w-[15%] xl:gap-4">
            <div className="campaign">
              <p className="dayOne text-xl text-textColor sm:text-xl md:text-2xl">
                320 k
              </p>
              <p className="text-textLigntColor sm:text-xs md:text-sm xl:text-lg">
                Successfull Campaign
              </p>
            </div>

            <div className="divider mb-4 mt-4 border-b-2 lg:mb-0 lg:mt-0"></div>

            <div className="successRate">
              <p className="dayOne text-xl text-textColor sm:text-xl md:text-2xl">
                100%
              </p>
              <p className="text-textLigntColor sm:text-xs md:text-sm   xl:text-lg">
                Success Rate
              </p>
            </div>

            <div className="divider mb-4 mt-4 border-b-2 lg:mb-0 lg:mt-0"></div>

            <div className="happyClients">
              <p className="dayOne text-xl text-textColor sm:text-xl md:text-2xl">
                20k
              </p>
              <p className="text-textLigntColor sm:text-xs md:text-sm xl:text-lg">
                Happy Clients
              </p>
            </div>

            <div className="divider mb-4 mt-4 border-b-2 lg:mb-0 lg:mt-0 "></div>

            <div className="reviews">
              <p className="dayOne text-xl text-textColor sm:text-xl md:text-2xl">
                200
              </p>
              <p className="text-textLigntColor sm:text-xs md:text-sm xl:text-lg">
                5 Star Reviews
              </p>
            </div>

            <div className="frameImg mt-6 hidden lg:mt-0 lg:block">
              <img src={frame} alt="" className="w-12 sm:w-16" />
            </div>
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
          Learn from more than 160 member universities
        </p> */}
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
            {courseData.map((course) => (
              <div key={course.id}>
                <CourseCard course={course} path="homeCard" />
              </div>
            ))}
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
            More Courses from Catagories
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

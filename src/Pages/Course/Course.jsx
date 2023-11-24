import React, { useEffect, useState } from "react";
import "./Course.css";
import CourseCard from "../../Components/CourseCard/CourseCard";
import cardImg from "../../Assets/courseCard/courseImg.jpg";
import cardImg1 from "../../Assets/courseCard/courseImg1.jpg";
import Footer from "../../Sections/Footer/Footer";
import Search from "../../Components/Search/Search";
import { get } from "../../ApiCall/ApiCall";

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  // const [courseData, setCourseData] = useState([])
  // const config = {
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // };

  // useEffect(()=>{
  //   get('getAllCourse',config).then((res)=>{
  //     setCourseData(res.data)
  //     console.log("response",res)
  //   })
  // },[])
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);

  const courseData = [
    {
      id: "1",
      img: cardImg,
      category: "Programming1",
      title: "Game development: Programming with java Plus C#",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "2",
      img: cardImg1,
      category: "Medical1",
      title: "Medical Basics 101: Anatomy of whole human body research basis ",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "3",
      img: cardImg,
      category: "AI/ML1",
      title: "Supervised Machine Learning: Regression and Classification",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "4",
      img: cardImg1,
      category: "Design1",
      title: "Product design and analysis: Psychical Goods creation for us",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "5",
      img: cardImg,
      category: "Psychology1",
      title: `Psychology and Consultation: How to solve anxiety problem easily`,
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "6",
      img: cardImg1,
      category: "Finance1",
      title: "Business Communication: How to deal with clients Professionaly",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "7",
      img: cardImg,
      category: "Programming",
      title: "Game development: Programming with java Plus C#",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "8",
      img: cardImg1,
      category: "Medical",
      title: "Medical Basics 101: Anatomy of whole human body research basis ",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "9",
      img: cardImg,
      category: "AI/ML",
      title: "Supervised Machine Learning: Regression and Classification",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "10",
      img: cardImg1,
      category: "Design",
      title: "Product design and analysis: Psychical Goods creation for us",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "11",
      img: cardImg,
      category: "Psychology",
      title: `Psychology and Consultation: How to solve anxiety problem easily`,
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
    {
      id: "12",
      img: cardImg1,
      category: "Finance",
      title: "Business Communication: How to deal with clients Professionaly",
      des: "consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam ipsum dolor sit amet...",
    },
  ];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentCourseData = courseData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(courseData.length / itemsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <section className="courseBg bg-coursebg pt-28">
      <div className="searchBar">
        <Search />
      </div>
      <div className="cardSection">
        <div className="cardDiv mx-auto flex w-[75%] flex-wrap items-center justify-center gap-5 pb-14 md:w-[90%] md:gap-20 lg:w-[75%]">
          {currentCourseData.map((course) => (
            <div key={course.id}>
              <CourseCard course={course} />
            </div>
          ))}
        </div>
        {/* Pagination */}
        <div className="mb-5 mt-4 flex flex-col items-center">
          <span className="text-sm text-textColor">
            Showing{" "}
            <span className="font-semibold text-textColor">
              {indexOfFirstItem + 1}
            </span>{" "}
            to{" "}
            <span className="font-semibold text-textColor">
              {Math.min(indexOfLastItem, courseData.length)}
            </span>{" "}
            of{" "}
            <span className="font-semibold text-textColor">
              {courseData.length}
            </span>{" "}
            Courses
          </span>
          <div className="xs:mt-0 mt-2 inline-flex">
            <button
              onClick={() => paginate(currentPage - 1)}
              className={`flex h-10 items-center justify-center rounded-l bg-textColor px-4 text-base font-medium text-white  ${
                currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
              }`}
              disabled={currentPage === 1}
            >
              <svg
                className="mr-2 h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 5H1m0 0 4 4M1 5l4-4"
                />
              </svg>
              Prev
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              className={`flex h-10 items-center justify-center rounded-r border-0 border-l border-textLigntColor bg-textColor px-4 text-base font-medium text-white  ${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
              disabled={currentPage === totalPages}
            >
              Next
              <svg
                className="ml-2 h-3.5 w-3.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <p className="h-[2px] border-b-2 bg-textColor text-textColor opacity-5"></p>
      <Footer />
    </section>
  );
};

export default Course;

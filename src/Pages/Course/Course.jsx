import React, { useEffect, useState } from "react";
import "./Course.css";
import CourseCard from "../../Components/CourseCard/CourseCard";
import Footer from "../../Sections/Footer/Footer";
import Search from "../../Components/Search/Search";
import { get } from "../../ApiCall/ApiCall";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [pageNo, setPageNo] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const [courseData, setCourseData] = useState([]);

  useEffect(() => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        "Acess-Control-Allow-Origin": "*",
        "Acess-Control-Allow-Headers": "*",
        // Authorization: `Bearer ${localStorage.getItem("token")}`,
        Accept: "application/json",
        pageNo: pageNo,
        pageSize: 6,
      },
    };
    get("/user/getAllCourse", config)
      .then((res) => {
        setCourseData(res.data.content);
        setTotalPage(res.data.totalPages);
        setTotalCourses(res.data.totalElements);
        console.log("response", res.data);
      })
      .catch((err) => console.log(err));
  }, [pageNo]);

  const paginate = (pageNo) => {
    if (pageNo >= 0 && pageNo <= totalpage) {
      setPageNo(pageNo);
    }
  };

  console.log(pageNo, "pageNUmber");
  return (
    <section className="courseBg bg-coursebg pt-28">
      <div className="searchBar">
        <Search />
      </div>
      <div className="cardSection">
        <div className="cardDiv mx-auto flex w-[75%] flex-wrap items-center justify-center gap-5 pb-14 md:w-[90%] md:gap-20 lg:w-[75%]">
          {courseData &&
            courseData.map((course, index) => (
              <div key={index}>
                <CourseCard course={course} path="course" />
              </div>
            ))}
        </div>

        <div className="mb-5 mt-4 flex flex-col items-center">
          <span className="text-sm text-textColor">
            Showing{" "}
            <span className="font-semibold text-textColor">{pageNo}</span> to{" "}
            <span className="font-semibold text-textColor">{pageNo}</span> of{" "}
            <span className="font-semibold text-textColor">{totalCourses}</span>
            Courses
          </span>
          <div className="xs:mt-0 mt-2 inline-flex">
            <button
              onClick={() => paginate(pageNo - 1)}
              className={`flex h-10 items-center justify-center rounded-l bg-textColor px-4 text-base font-medium text-white 
               ${pageNo === 0 ? "cursor-not-allowed opacity-50" : ""}
              `}
              disabled={pageNo === 0}
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
              onClick={() => paginate(pageNo + 1)}
              className={`flex h-10 items-center justify-center rounded-r border-0 border-l border-textLigntColor bg-textColor px-4 text-base font-medium text-white  
              ${pageNo === totalpage - 1 ? "cursor-not-allowed opacity-50" : ""}
              `}
              disabled={pageNo === totalpage - 1}
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
    </section>
  );
};

export default Course;

import React, { useEffect, useState } from "react";
import "./Course.css";
import CourseCard from "../../Components/CourseCard/CourseCard";
import Footer from "../../Sections/Footer/Footer";
import Search from "../../Components/Search/Search";
import { get } from "../../ApiCall/ApiCall";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";

const Course = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [searchLoading, setSearchLoading] = useState(false);

  const [apiLoading, setApiLoading] = useState(false);

  const [pageNo, setPageNo] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const [searchData, setSearchData] = useState("");
  const [courseData, setCourseData] = useState([]);
  const [pageSize] = useState(6);

  const calculateRange = () => {
    const startRange = pageNo * pageSize + 1;
    const endRange = Math.min((pageNo + 1) * pageSize, totalCourses);
    return { startRange, endRange };
  };
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setToken(currentToken);

    const fetchCourse = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        setToken(refreshedToken);

        const config = {
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
            Accept: "application/json",
            pageNo: pageNo,
            pageSize: 6,
          },
        };

        const res = await get("/user/getAllCourse", config);
        setCourseData(res.data.content);
        setTotalPage(res.data.totalPages);
        setTotalCourses(res.data.totalElements);
        if (res.data.content.length === 0) {
          setApiLoading(true);
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
  }, [pageNo, token]);

  // Search Api

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setToken(currentToken);
    const searchCourse = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        setToken(refreshedToken);

        const config = {
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
            Accept: "application/json",
          },
        };
        if (searchValue.length >= 3) {
          const res = await get(
            `/user/searchCourses?search=${searchValue}`,
            config,
          );
          setSearchData(res.data.content);
          if (res.data.length === 0) {
            setApiLoading(true);
            console.log(res.data.content.length);
          }
        }
      } catch (err) {
        console.log("error", err);
      }
    };

    if (currentToken) {
      searchCourse();
    } else {
      console.log("Token not Present");
    }
  }, [searchValue, token]);

  const paginate = (pageNo) => {
    if (pageNo >= 0 && pageNo <= totalpage) {
      setPageNo(pageNo);
    }
  };

  return (
    <section className="courseBg bg-coursebg pt-28">
      {(searchData && searchData.length > 0) ||
      (courseData && courseData.length > 0) ? (
        <>
          <div className="searchBar">
            <Search setSearchValue={setSearchValue} searchValue={searchValue} />
          </div>
          <div className="cardSection">
            <div className="cardDiv mx-auto flex w-[75%] flex-wrap items-center justify-center gap-5 pb-14 md:w-[90%] md:gap-20 lg:w-[75%]">
              {searchData && searchData.length > 0
                ? searchData &&
                  searchData.map((searchResult, index) => (
                    <div key={index}>
                      <CourseCard course={searchResult} path="course" />
                    </div>
                  ))
                : courseData &&
                  courseData.map((course, index) => (
                    <div key={index}>
                      <CourseCard course={course} path="course" />
                    </div>
                  ))}
            </div>
            <div className="mb-5 mt-4 flex flex-col items-center">
              <span className="text-sm text-textColor">
                Showing{" "}
                <span className="font-semibold text-textColor">
                  {calculateRange().startRange}
                </span>{" "}
                to{" "}
                <span className="font-semibold text-textColor">
                  {calculateRange().endRange}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-textColor">
                  {totalCourses}
                </span>{" "}
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13 5H1m0 0 4 4M1 5l4-4"
                    />
                  </svg>
                  Prev
                </button>
                <button
                  onClick={() => paginate(pageNo + 1)}
                  className={`flex h-10 items-center justify-center rounded-r border-0 border-l border-textLightColor bg-textColor px-4 text-base font-medium text-white  
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
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {apiLoading === true ? (
            <div className=" flex h-[40vh] items-center justify-center font-semibold text-textLightColor">
              No data Found
            </div>
          ) : (
            <>
              {" "}
              <div className="flex h-[40vh] w-full items-center justify-center sm:hidden">
                <Loader color={"#334456"} height={"10%"} width={"10%"} />
              </div>
              <div className="hidden h-[40vh] w-full items-center justify-center sm:flex">
                <Loader color={"#334456"} height={"4%"} width={"4%"} />
              </div>
            </>
          )}
        </>
      )}
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

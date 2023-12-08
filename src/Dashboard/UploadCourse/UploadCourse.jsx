import React, { useState } from "react";
import AddCourseForm from "./AddCourseForm";
import AddVideoForm from "./AddVideoForm";
import "./UploadCourse.css";

const UploadCourse = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPage = 2;
  const handleNext = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleSubmmit = () => {};

  return (
    <div className="   h-auto bg-herobg xl:h-screen">
      <div className="mx-auto w-11/12  ">
        <div className="profile_header">
          <h2 className="dayOne pt-9 text-2xl text-textColor">Profile</h2>
          <h4 className="text-textLigntColor">
            Welcome to Course Desk Profile page
          </h4>
        </div>
        <div className="  mb-4  mt-5 h-auto w-full rounded-md bg-white  pb-5 shadow  sm:mx-auto sm:w-full">
          <div className="mx-auto  w-[90%]   p-3 sm:w-3/4 lg:mx-auto lg:w-full">
            <form>
              {currentPage == 1 && <AddCourseForm />}
              {currentPage == 2 && <AddVideoForm />}
            </form>
            <div className="  mb-5 mt-5  flex justify-center">
              {currentPage == 2 && (
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevious}
                    className={`} flex h-10 items-center justify-center rounded bg-textColor px-4 text-base font-medium  
        text-white`}
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
                    onClick={handleSubmmit}
                    className={`} flex h-10 items-center justify-center rounded bg-textColor px-4 text-base font-medium  
        text-white`}
                  >
                    Submit
                  </button>
                </div>
              )}
              {currentPage == 1 && (
                <button
                  onClick={handleNext}
                  className={`flex h-10 items-center justify-center rounded border-0 border-l border-textLigntColor bg-textColor px-4 text-base font-medium text-white 
        `}
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
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadCourse;

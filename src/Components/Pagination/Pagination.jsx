import React from "react";

const Pagination = ({
  calculateRange,
  paginate,
  totalCourses,
  pageNo,
  totalpage,
}) => {
  return (
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
        of <span className="font-semibold text-textColor">{totalCourses}</span>{" "}
        Courses
      </span>
      <div className="xs:mt-0 mt-2 inline-flex">
        <button
          onClick={() => paginate(pageNo - 1)}
          className={`flex h-10 items-center justify-center rounded-l bg-textColor px-1.5 text-base font-medium text-white sm:px-4 
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
          <span className="text-sm sm:text-[16px]">Prev</span>
        </button>
        <button
          onClick={() => paginate(pageNo + 1)}
          className={`flex h-10 items-center justify-center rounded-r border-0 border-l border-textLightColor bg-textColor px-1.5 text-base font-medium text-white sm:px-4 
              ${
                pageNo === totalpage - 1 || pageNo === 0
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }
              `}
          disabled={pageNo === totalpage - 1 || pageNo === 0}
        >
          <span className="text-sm sm:text-[16px]"> Next</span>
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
  );
};

export default Pagination;

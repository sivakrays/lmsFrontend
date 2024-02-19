import React from "react";

const Pagination = ({
  quizArray,
  id,
  currentPage,
  totalPages,
  handleNext,
  handleSubmit,
  clickedOption,
}) => {
  return (
    <div className="relative">
      <div className="flex items-center justify-between  lg:mt-4">
        <div className="flex items-center rounded-b p-4 md:p-5">
          <span className="text-sm text-textColor ">
            <span className="font-semibold">{id} </span>
            <span> of </span>
            <span className="font-semibold text-textColor">
              {quizArray.length}
            </span>
            <span> Questions</span>
          </span>
        </div>
        <div>
          {currentPage === totalPages ? (
            <button
              className={`flex h-10 items-center justify-center rounded border-0 border-l border-textLightColor bg-textColor px-6 text-base font-medium text-white   ${
                clickedOption === "" ? "cursor-not-allowed opacity-50 " : ""
              }
                `}
              type="submit"
              onClick={() => handleSubmit()}
              disabled={clickedOption === ""}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className={`flex h-10 items-center justify-center rounded-md border-textLightColor bg-textColor px-8 text-base font-medium text-white ${
                currentPage === totalPages || clickedOption === ""
                  ? "cursor-not-allowed opacity-50 "
                  : ""
              } `}
              onClick={() => handleNext()}
              disabled={clickedOption === ""}
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;

import React from "react";
import "./Search.css";

const Search = () => {
  return (
    <>
      <div className=" searchContainer w-full sm:mx-auto sm:w-3/4 ">
        <div className="boxShadow mx-auto sm:w-3/4 md:mb-5 md:mt-5 lg:w-2/4">
          <form>
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-textLigntColor"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="h-4 w-4 text-textLigntColor"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full rounded-lg border border-textColor  p-4 pl-10 text-sm text-textColor focus:outline-none  "
                placeholder="Search"
                required
              />
              <button
                type="submit"
                className="absolute bottom-2.5 right-2.5 rounded-lg bg-textColor px-4 py-2 text-sm font-medium text-white focus:outline-none "
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;

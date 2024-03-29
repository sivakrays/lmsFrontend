import React from "react";
import "./Search.css";

const Search = ({ setSearchValue, searchValue }) => {
  return (
    <>
      <div className=" searchContainer w-full sm:mx-auto sm:w-3/4 ">
        <div className="mx-auto boxShadow sm:w-3/4 md:mb-5 md:mt-5 lg:w-2/4">
          <form onSubmit={(e) => e.preventDefault()}>
            <label
              htmlFor="default-search"
              className="text-textLightColor sr-only mb-2 text-sm font-medium"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  className="text-textLightColor h-4 w-4"
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
                // required
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
              <button
                onClick={() => setSearchValue("")}
                data-testid="Search"
                type="submit"
                className="absolute bottom-2.5 right-2.5 rounded-lg bg-textColor px-4 py-2 text-sm font-medium text-white focus:outline-none "
              >
                Clear
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Search;

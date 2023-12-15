import React, { useState } from "react";
import "./CourseFormInput.css";

const CourseFormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, id, errorMsg, path, type, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };

  const renderInput = () => {
    switch (type) {
      case "text":
        return (
          <input
            id={id}
            data-testid="inputBox"
            className=" courseInput block flex-1  rounded-md  bg-dashboardLightColor
             py-2.5  pl-1 text-textColor placeholder:text-gray-400 sm:text-sm  sm:leading-6"
            {...inputProps}
            onFocus={handleFocus}
            focused={focused.toString()}
            autoComplete="off"
            type={type}
          />
        );
      case "password":
        return (
          <input
            id={id}
            data-testid="inputBox"
            className=" courseInput block flex-1  rounded-md  bg-dashboardLightColor
             py-2.5  pl-1 text-textColor placeholder:text-gray-400 sm:text-sm  sm:leading-6"
            {...inputProps}
            onFocus={handleFocus}
            focused={focused.toString()}
            autoComplete="off"
            type={type}
          />
        );
      case "email":
        return (
          <input
            id={id}
            data-testid="inputBox"
            type={type}
            className="courseInputFile block rounded-md bg-dashboardLightColor  py-2   pl-1 text-textColor placeholder:text-gray-400 sm:text-sm  sm:leading-6"
            {...inputProps}
            onFocus={handleFocus}
            focused={focused.toString()}
            autoComplete="off"
          />
        );
      case "file":
        return (
          <input
            id={id}
            data-testid="inputBox"
            type={type}
            className="courseInputFile block rounded-md bg-dashboardLightColor  py-2   pl-1 text-textColor placeholder:text-gray-400 sm:text-sm  sm:leading-6"
            {...inputProps}
            onFocus={handleFocus}
            focused={focused.toString()}
            autoComplete="off"
          />
        );
      case "date":
        return (
          <input
            id={id}
            data-testid="inputBox"
            type={type}
            className="block rounded-md bg-dashboardLightColor  py-2.5   pl-1 text-textColor placeholder:text-gray-400 sm:text-sm  sm:leading-6"
            {...inputProps}
            onFocus={handleFocus}
            focused={focused.toString()}
            autoComplete="off"
          />
        );
      case "select":
        return (
          <select
            name="cars"
            id="cars"
            className="block  rounded-md bg-dashboardLightColor 
            py-3.5  pl-1 text-textColor placeholder:text-gray-400 sm:text-sm  sm:leading-6"
          >
            <option value="volvo">Volvo</option>
            <option value="saab">Saab</option>
            <option value="mercedes">Mercedes</option>
            <option value="audi">Audi</option>
          </select>
        );
      case "textarea":
        return (
          <textarea
            name="message"
            id="Message"
            cols="28"
            rows="3"
            className="block   resize-none rounded-md  bg-dashboardLightColor  py-2.5  pl-1
             text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6"
          ></textarea>
        );

      default:
        return null;
    }
  };
  return (
    <>
      <div
        className={` ${
          path === "profileModal"
            ? "w-full sm:w-[48%]"
            : "mt-4  lg:mt-2 lg:w-[48.7%] xl:w-[49.15%]"
        }`}
      >
        <div className=" ">
          <label
            className="block text-sm
            font-medium 
            leading-6
             text-textColor"
            data-testid="labelText"
            htmlFor={label}
          >
            {label}
          </label>
        </div>

        <div className=" mt-2">
          <div className="flex flex-col rounded-md  ">
            {renderInput()}
            <span
              className="errSpan mt-2 text-sm text-red-800"
              data-testid="errMsg"
            >
              {errorMsg}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseFormInput;

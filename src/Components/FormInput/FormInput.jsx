import React, { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, id, errorMsg, path, ...inputProps } = props;
  console.log(props);
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
      {path ? (
        <div className="mt-4 sm:col-span-7">
          <label
            className="block text-sm
            font-normal
            leading-6
             text-gray-900"
          >
            {label}
          </label>

          <div className="mt-2 ">
            <div className="flex  flex-col rounded-lg  sm:max-w-md">
              <input
                className="input block flex-1 rounded-lg border border-gray-300 py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm  sm:leading-6"
                {...inputProps}
                onFocus={handleFocus}
                focused={focused.toString()}
                autoComplete="off"
              />
              <span className="errSpan mt-2 text-sm text-red-800">
                {errorMsg}
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-4 sm:col-span-7">
          <label
            className="block text-lg 
            font-medium 
            leading-6
             text-gray-900"
          >
            {label}
          </label>

          <div className="mt-2 ">
            <div className="flex  flex-col rounded-lg  sm:max-w-md">
              <input
                className="input block flex-1 rounded-lg border border-gray-300 py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm  sm:leading-6"
                {...inputProps}
                onFocus={handleFocus}
                focused={focused.toString()}
                autoComplete="off"
              />
              <span className="errSpan mt-2 text-sm text-red-800">
                {errorMsg}
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FormInput;

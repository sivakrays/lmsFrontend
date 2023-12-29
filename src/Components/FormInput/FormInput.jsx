import React, { useState } from "react";
import "./FormInput.css";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, id, errorMsg, path, type, ...inputProps } = props;
  const handleFocus = (e) => {
    setFocused(true);
  };
  return (
    <>
      {path == "contact" ? (
        <div className="mt-4 sm:col-span-7">
          <label
            className="block text-sm
            font-normal
            leading-6
             text-textColor"
            data-testid="labelText"
            htmlFor={label}
          >
            {label}
          </label>

          <div className="mt-2 ">
            {type == "textarea" ? (
              <>
                <textarea
                  name="message"
                  id="Message"
                  cols="28"
                  rows="3"
                  className="inputContact w-full  resize-none rounded-lg border p-3"
                  {...inputProps}
                  onFocus={handleFocus}
                  focused={focused.toString()}
                  type={type}
                ></textarea>
                {/* <input
                  id={label}
                  data-testid="inputBox"
                  className="input block h-[70px] w-full flex-1 rounded-lg border border-gray-300 py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm  sm:leading-6"
                  {...inputProps}
                  onFocus={handleFocus}
                  focused={focused.toString()}
                  autoComplete="off"
                  type={type}
                /> */}
                <span
                  className="errSpan mt-2 text-sm text-red-800"
                  data-testid="errMsg"
                >
                  {errorMsg}
                </span>
              </>
            ) : (
              <div className="flex  flex-col rounded-lg  sm:max-w-md">
                <input
                  id={label}
                  data-testid="inputBox"
                  className="input block flex-1 rounded-lg border border-gray-300 py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm  sm:leading-6"
                  {...inputProps}
                  onFocus={handleFocus}
                  focused={focused.toString()}
                  autoComplete="off"
                  type={type}
                />
                <span
                  className="errSpan mt-2 text-sm text-red-800"
                  data-testid="errMsg"
                >
                  {errorMsg}
                </span>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="mt-4 sm:col-span-7">
          <label
            className="block text-lg 
            font-medium 
            leading-6
             text-textColor"
            data-testid="labelText"
            htmlFor={label}
          >
            {label}
          </label>

          <div className="mt-2 ">
            <div className="flex  flex-col rounded-lg  sm:max-w-md">
              <input
                id={label}
                data-testid="inputBox"
                className="input block flex-1 rounded-lg border border-gray-300 py-1.5  pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm  sm:leading-6"
                {...inputProps}
                onFocus={handleFocus}
                focused={focused.toString()}
                autoComplete="off"
                type={type}
              />
              <span
                className="errSpan mt-2 text-sm text-red-800"
                data-testid="errMsg"
              >
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

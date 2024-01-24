import React, { useState } from "react";
import "./FormInput.css";

import Select from "react-dropdown-select";

const FormInput = (props) => {
  const [focused, setFocused] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const {
    label,
    id,
    errorMsg,
    path,
    type,
    options,
    handleChange,
    handleDropdownChange,
    isButtonClicked,
    ...inputProps
  } = props;
  const handleFocus = (e) => {
    setFocused(true);
    // const isTextAreaValid = inputProps.value && inputProps.value.trim() !== "";
    // setIsValid(isTextAreaValid);
  };

  // const handleDropdownChange = (selectedOptions) => {
  //   console.log("selectedOptions", selectedOptions);
  //   const selectedValue =
  //     selectedOptions && selectedOptions.length > 0
  //       ? selectedOptions[0].value
  //       : "";
  //   const event = {
  //     target: {
  //       name: inputProps.name, // Assuming the name property is correctly set in inputProps
  //       value: selectedValue,
  //     },
  //   };
  //   inputProps.onChange(event);
  // };

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
                  id={label}
                  cols="28"
                  rows="3"
                  className="inputContact w-full  resize-none rounded-lg border p-3"
                  {...inputProps}
                  onFocus={handleFocus}
                  focused={focused.toString()}
                  type={type}
                ></textarea>

                <span
                  className={`errSpan mt-2 text-sm text-red-800 ${
                    isValid ? "block" : "hidden"
                  }`}
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
            {type == "dropdown" ? (
              <>
                <Select
                  options={options}
                  onChange={handleDropdownChange}
                  dropdownHeight="150px"
                  className="selectDropdown input"
                  style={{
                    border: "1px solid gray",
                    borderRadius: "8px",
                  }}
                  autoFocus={focused}
                  placeholder="Select Tenant"
                  value={inputProps.value}
                  disabled={isButtonClicked === true}
                />
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
                  disabled={isButtonClicked === true}
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
      )}
    </>
  );
};

export default FormInput;

import React, { useState } from "react";

const SelectField = ({
  label,
  name,
  value,
  onChange,
  options,
  required,
  formStyle,
}) => {
  const [error, setError] = useState(false);

  const handleValidation = (e) => {
    const selectedValue = e.target.value;
    setError(selectedValue === "");
  };

  return (
    <div className={`${formStyle}`}>
      <label htmlFor={name} className="text-textLightColor">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={(e) => {
          onChange(e);
          handleValidation(e);
        }}
        required={required}
        className={`rounded-md border bg-dashboardLightColor py-3.5 pl-1 text-textColor outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
          error ? "border-red-500" : ""
        }`}
      >
        <option value="">Please Select {label}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {error && (
        <p className="mt-1 text-sm text-red-500">
          Please select a value
          {/* {label.toLowerCase()} */}
        </p>
      )}
    </div>
  );
};

export default SelectField;

import React, { useState } from "react";

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  pattern,
  title,
  formStyle,
}) => {
  const [error, setError] = useState(false);
  const [letters, setLetters] = useState(0);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    if (name === "teachingDes") {
      setError(value.length < 50);
      setLetters(50);
    } else if (name === "courseDes") {
      setError(value.length < 20);
      setLetters(20);
    }
  };
  return (
    <div className={`${formStyle}`}>
      <label htmlFor={name} className="text-textLightColor">
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          name={name}
          id={name}
          value={value}
          required={required}
          onChange={(e) => {
            onChange(e);
            handleValidation(e);
          }}
          className={`rounded-md border bg-dashboardLightColor py-2.5 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            error ? "border-red-500" : ""
          }`}
        ></textarea>
      ) : (
        <input
          type={type}
          name={name}
          id={name}
          value={value}
          required={required}
          pattern={pattern}
          title={title}
          accept=".jpg, .jpeg, .png, .gif"
          onChange={(e) => {
            onChange(e);
            handleValidation(e);
          }}
          className={`rounded-md border bg-dashboardLightColor py-2.5 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6 ${
            error ? "border-red-500" : ""
          }`}
        />
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          Must contain the {letters} letters in {label.toLowerCase()}
          {/* Please enter a valid {label.toLowerCase()} */}
        </p>
      )}
    </div>
  );
};

export default InputField;

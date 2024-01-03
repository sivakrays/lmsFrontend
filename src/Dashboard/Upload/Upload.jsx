import React, { useState } from "react";
import data from "../../Data/Data";

const InputField = ({ label, name, type, value, onChange, required }) => {
  const [error, setError] = useState(false);

  const handleValidation = (e) => {
    const { validity } = e.target;

    setError(!validity.valid);
  };

  return (
    <div className="flex w-full flex-col md:w-[40%]">
      <label htmlFor={name} className="text-textLigntColor">
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
          Please enter a valid {label.toLowerCase()}
        </p>
      )}
    </div>
  );
};

const SelectField = ({ label, name, value, onChange, options, required }) => {
  const [error, setError] = useState(false);

  const handleValidation = (e) => {
    const selectedValue = e.target.value;
    setError(selectedValue === "");
  };

  return (
    <div className="flex w-full flex-col md:w-[40%]">
      <label htmlFor={name} className="text-textLigntColor">
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
          Please select a {label.toLowerCase()}
        </p>
      )}
    </div>
  );
};

const Upload = () => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    thumbnail: "",
    authorName: "",
    category: "",
    teachingDes: "",
    courseDes: "",
    language: "",
    date: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Additional validation or submission logic can be added here
  };

  return (
    <div className="h-auto bg-white pb-16 md:pb-4">
      <div className="ml-1 p-4  md:pl-12 ">
        <div className="profile_header">
          <h2 className="dayOne text-2xl text-textColor md:pt-5">Upload</h2>
          <h4 className="text-textLigntColor">
            Welcome to <b className="dayOne">{data[0].title}</b> Upload page
          </h4>
        </div>
        <div className="uploadForm  mt-5">
          <form
            action=""
            className="flex flex-col flex-wrap gap-4 md:flex-row  md:gap-8"
            onSubmit={handleSubmit}
          >
            <InputField
              label="Course Title"
              name="courseTitle"
              type="text"
              value={formData.courseTitle}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Course thumbnail"
              name="thumbnail"
              type="file"
              value={formData.thumbnail}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Author Name"
              name="authorName"
              type="text"
              value={formData.authorName}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              options={["Finance", "Coding", "Designing"]}
              required
            />
            <InputField
              label="What you'll teach"
              name="teachingDes"
              type="textarea"
              value={formData.teachingDes}
              onChange={handleInputChange}
              required
            />
            <InputField
              label="Course Description"
              name="courseDes"
              type="textarea"
              value={formData.courseDes}
              onChange={handleInputChange}
              required
            />

            <SelectField
              label="Language"
              name="language"
              value={formData.language}
              onChange={handleInputChange}
              options={[
                "English",
                "Spanish",
                "Mandarin Chinese",
                "Hindi",
                "Arabic",
                "Bengali",
                "Russian",
                "Portuguese",
                "Japanese",
                "German",
                "French",
                "Korean",
                "Italian",
                "Tamil",
              ]}
              required
            />
            <InputField
              label="Update Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
            <button
              type="submit"
              className="rounded-md border bg-textLigntColor py-2.5 text-white md:w-[15%]"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Upload;

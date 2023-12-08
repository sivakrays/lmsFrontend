import React from "react";
import CourseFormInput from "../../Components/CourseFormInput/CourseFormInput";

const AddCourseForm = () => {
  const addCourseInput = [
    {
      id: 1,
      name: "Course Title",
      label: "Course Title",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 2,
      name: "Course Description",
      label: "Course Description",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 3,
      name: "Course Thumbnail",
      label: "Course Thumbnail",
      type: "file",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 4,
      name: "Course Price",
      label: "Course Price",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 4,
      name: "Course Category",
      label: "Course Category",
      type: "select",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 5,
      name: "Course Language",
      label: "Language",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 6,
      name: "Author Name",
      label: "Author Name",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 7,
      name: "Update Date",
      label: "Update Date",
      type: "date",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 8,
      name: "What You'll Learn",
      label: "What You'll Learn",
      type: "textarea",
      errorMsg: "Please enter valid email",
      required: true,
    },
  ];
  return (
    <div className="">
      <div className="flex  flex-col lg:flex-row lg:flex-wrap lg:gap-x-5 lg:gap-y-0">
        {addCourseInput.map((input) => (
          <CourseFormInput
            key={input.id}
            {...input}
            value=""
            onChange={() => {}}
          />
        ))}
      </div>
    </div>
  );
};

export default AddCourseForm;

import React from "react";
import CourseFormInput from "../../Components/CourseFormInput/CourseFormInput";

const AddVideoForm = () => {
  const addVideoInput = [
    {
      id: 1,
      name: "Video Title",
      label: "Video Title",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 2,
      name: "Video Description",
      label: "Video Description",
      type: "text",
      errorMsg: "Please enter valid email",
      required: true,
    },
    {
      id: 3,
      name: "Upload Video",
      label: "Upload Video",
      type: "file",
      errorMsg: "Please enter valid email",
      required: true,
    },
  ];
  return (
    <div className="">
      <div className="flex flex-col lg:flex-row lg:flex-wrap lg:gap-x-5 lg:gap-y-0">
        {addVideoInput.map((input) => (
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

export default AddVideoForm;

import React, { useState } from "react";
import data from "../../Data/Data";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { post } from "../../ApiCall/ApiCall";

const InputField = ({
  label,
  name,
  type,
  value,
  onChange,
  required,
  pattern,
  title,
}) => {
  const [error, setError] = useState(false);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    if (name === "teachingDes" || name === "courseDes") {
      setError(value.length < 50);
    }
  };

  return (
    <div className="flex w-full flex-col  lg:w-[45%] xl:w-[48%]">
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
          Must contain the 50 letters in {label.toLowerCase()}
          {/* Please enter a valid {label.toLowerCase()} */}
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
    <div className="flex w-full flex-col lg:w-[45%] xl:w-[48%]">
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

const CourseForm = ({
  setSectionFormVisibile,
  courseId,
  setCourseId,
  bearer_token,
}) => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    thumbnailBase64: "",
    authorName: "",
    category: "",
    teachingDes: "",
    courseDes: "",
    language: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "file" && e.target.files.length > 0) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onloadend = () => {
        setFormData({
          ...formData,
          [name]: file,
          [`${name}Base64`]: reader.result,
        });
      };

      reader.readAsDataURL(file);
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Course Api Call

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer_token}`,
    },
  };

  const sendCourseDetails = () => {
    const data = {
      title: formData.courseTitle,
      authorName: formData.authorName,
      description: formData.courseDes,
      thumbNail: formData.thumbnailBase64,
      category: formData.category,
      whatYouWillLearn: formData.teachingDes,
    };

    post("/user/saveCourse", data, config)
      .then((res) => {
        setCourseId(res.data.courseId);
        const courseID = JSON.parse(res.data.courseId);
        localStorage.setItem("Current Upload CourseId", courseID);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isTeachingDesValid = formData.teachingDes.length >= 50;
    const isCourseDesValid = formData.courseDes.length >= 50;

    if (!isTeachingDesValid || !isCourseDesValid) {
      console.log(
        "Please ensure teaching description and course description have a minimum of 50 characters.",
      );
      return;
    } else {
      setSectionFormVisibile(true);
      sendCourseDetails();
      // console.log("Form Data", formData);
    }
  };

  return (
    <div className="h-auto  pb-16 md:pb-4">
      <div className="ml-1 p-4 md:pl-12 ">
        <div className="profile_header">
          <h2 className="dayOne text-2xl text-textColor md:pt-5">Upload</h2>
          <h4 className="text-textLigntColor">
            Welcome to <b className="dayOne">{data[0].title}</b> Upload page
          </h4>
        </div>
        <div className="uploadForm mt-5 rounded-md bg-white p-3 shadow lg:w-[90%]">
          <form action="" className="" onSubmit={handleSubmit}>
            <div className="flex flex-col flex-wrap gap-4 md:flex-row  md:gap-8">
              <InputField
                label="Course Title"
                name="courseTitle"
                type="text"
                value={formData.courseTitle}
                onChange={handleInputChange}
                pattern=".{5,}"
                title="please ensure that field minimum have 5 letters"
                required
              />
              <InputField
                label="Course thumbnail"
                name="thumbnail"
                type="file"
                // value={formData.thumbnail}
                onChange={handleInputChange}
                required
              />
              <InputField
                label="Author Name"
                name="authorName"
                type="text"
                value={formData.authorName}
                onChange={handleInputChange}
                pattern=".{3,}"
                title="please ensure that field minimum have 3 letters"
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
            </div>
            <button
              // onClick={() => setSectionFormVisibile(true)}
              type="submit"
              className="mt-5 w-full rounded-md border bg-textLigntColor py-2.5 text-white md:w-[15%]"
            >
              Next
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const SectionForm = ({ courseId, setCourseId, bearer_token }) => {
  console.log(
    "courseId from sectionform",
    localStorage.getItem("Current Upload CourseId"),
  );
  const [sectionTitle, setSectionTitle] = useState("");
  const [subSections, setSubSections] = useState([
    {
      SubSectionTitle: "",
      SubSectionDes: "",
      VideoLink: "",
      isQuizAvailable: false,
      quizInputs: [
        { question: "", options: ["", ""], answer: "" },
        { question: "", options: ["", ""], answer: "" },
        { question: "", options: ["", ""], answer: "" },
      ],
    },
  ]);

  const [deserror, setDesError] = useState(false);

  const handleValidation = (e) => {
    const { name, value } = e.target;
    if (name === "SubSectionDes") {
      setDesError(value.length < 20);
    }
  };

  // Handle functions for SubSection
  const handleAddSubSection = () => {
    setSubSections((prevSubSections) => [
      ...prevSubSections,
      {
        SubSectionTitle: "",
        SubSectionDes: "",
        VideoLink: "",
        isQuizAvailable: false,
        quizInputs: [
          { question: "", options: ["", ""], answer: "" },
          { question: "", options: ["", ""], answer: "" },
          { question: "", options: ["", ""], answer: "" },
        ],
      },
    ]);
  };

  const handleSubSectionInputChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const updatedSubSections = [...subSections];

    if (type === "checkbox") {
      updatedSubSections[index] = {
        ...updatedSubSections[index],
        [name]: checked,
        quizInput: {
          ...updatedSubSections[index].quizInputs,
          options: updatedSubSections[index].quizInputs.options || [],
        },
      };
    } else {
      updatedSubSections[index] = {
        ...updatedSubSections[index],
        [name]: value,
      };
    }

    setSubSections(updatedSubSections);
  };

  const handleRemoveSubSection = (index) => {
    const list = [...subSections];
    list.splice(index, 1);
    setSubSections(list);
  };

  // Handle functions for Quiz

  const handleAddQuizOptions = (sectionIndex, quizIndex) => {
    const updatedSubSections = [...subSections];
    updatedSubSections[sectionIndex].quizInputs[quizIndex].options.push("");
    setSubSections(updatedSubSections);
  };

  const handleQuizTitleInputChange = (sectionIndex, quizIndex, event) => {
    const { value } = event.target;
    const updatedSubSections = [...subSections];
    updatedSubSections[sectionIndex].quizInputs[quizIndex].question = value;
    setSubSections(updatedSubSections);
  };
  const handleQuizAnswerInputChange = (sectionIndex, quizIndex, event) => {
    const { value } = event.target;
    const updatedSubSections = [...subSections];
    updatedSubSections[sectionIndex].quizInputs[quizIndex].answer = value;
    setSubSections(updatedSubSections);
  };

  const handleQuizOptionsInputChange = (
    sectionIndex,
    quizIndex,
    optionIndex,
    event,
  ) => {
    const { value } = event.target;
    const updatedSubSections = [...subSections];
    updatedSubSections[sectionIndex].quizInputs[quizIndex].options[
      optionIndex
    ] = value;
    setSubSections(updatedSubSections);
  };

  const handleRemoveQuizOptions = (sectionIndex, quizIndex, optionIndex) => {
    const updatedSubSections = [...subSections];
    updatedSubSections[sectionIndex].quizInputs[quizIndex].options.splice(
      optionIndex,
      1,
    ); // Remove the selected option
    setSubSections(updatedSubSections);
  };

  // Course Api Call

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${bearer_token}`,
    },
  };

  const sendCourseSectionDetails = () => {
    const data = [
      {
        title: sectionTitle,
        course_id: localStorage.getItem("Current Upload CourseId"),
        subSections: subSections.map((subSection) => ({
          title: subSection.SubSectionTitle,
          description: subSection.SubSectionDes,
          link: subSection.VideoLink,
          quizList: subSection.quizInputs,
        })),
      },
    ];
    console.log(data);
    post("/user/saveSection", data, config)
      .then((res) => {
        setCourseId(res.data.courseId);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deserror === false) {
      sendCourseSectionDetails();
      localStorage.removeItem("Current Upload CourseId");
    }
  };
  return (
    <div className="h-auto bg-white pb-16 md:pb-4">
      <div className="ml-1 p-4  md:pl-12 ">
        <div className="profile_header">
          <h2 className="dayOne text-2xl text-textColor md:pt-5">Upload</h2>
          <h4 className="text-textLigntColor">
            Welcome to{" "}
            <Link to="/" className="dayOne">
              {data[0].title}
            </Link>{" "}
            Upload page
          </h4>
        </div>
        <div className="uploadForm  mt-5">
          <div className="w-full rounded-md border bg-herobg p-4 shadow-sm lg:w-[75%]  xl:w-[75%]">
            <button className="mb-2.5 rounded-md  bg-textColor p-2 text-white">
              Course Section
            </button>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="rounded-md border bg-white p-4"
            >
              <div className="mb-2 flex flex-col gap-4 rounded ">
                <label className="text-textLigntColor">Section Name</label>
                <input
                  type="text"
                  name="sectionTitle"
                  id=""
                  value={sectionTitle}
                  onChange={(e) => setSectionTitle(e.target.value)}
                  pattern=".{3,}"
                  title="please ensure that field minimum have 3 letters"
                  required
                  className="w-full rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6 xl:w-[50%]"
                />
              </div>
              <hr className="my-5" />
              {subSections.map((ssection, i) => {
                return (
                  <div key={i}>
                    <div className="mb-3 flex items-center gap-3">
                      <p className="w-[70%] rounded-md bg-textLigntColor p-2 px-3 text-center text-white  sm:w-[30%] xl:w-[20%]">
                        Sub Section {i + 1}
                      </p>
                      {subSections.length > 1 && (
                        <button
                          className="rounded-sm border text-xl text-textLigntColor"
                          onClick={() => handleRemoveSubSection(i)}
                        >
                          <RxCross2 />
                        </button>
                      )}
                    </div>
                    <div className="subSection flex flex-wrap gap-3">
                      <div className="flex w-full flex-col xl:w-[49%]">
                        <label className="text-textLigntColor">
                          SubSection Title
                        </label>
                        <input
                          type="text"
                          name="SubSectionTitle"
                          value={ssection.SubSectionTitle}
                          onChange={(e) => handleSubSectionInputChange(i, e)}
                          pattern=".{3,}"
                          title="please ensure that field minimum have 3 letters"
                          required
                          className=" rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="flex w-full flex-col xl:w-[49%]">
                        <label className="text-textLigntColor">Video URL</label>
                        <input
                          type="text"
                          name="VideoLink"
                          value={ssection.VideoLink}
                          onChange={(e) => handleSubSectionInputChange(i, e)}
                          pattern=".{3,}"
                          title="please ensure that field minimum have 3 letters"
                          required
                          className=" rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6"
                        />
                      </div>
                      <div className="flex w-full flex-col">
                        <label className="text-textLigntColor">
                          SubSection Description
                        </label>
                        <textarea
                          name="SubSectionDes"
                          value={ssection.SubSectionDes}
                          onChange={(e) => {
                            handleValidation(e);
                            handleSubSectionInputChange(i, e);
                          }}
                          required
                          className={`rounded-md border bg-dashboardLightColor py-2.5 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6 `}
                        ></textarea>
                        {deserror && (
                          <p className="mt-1 text-sm text-red-500">
                            Must contain 20 letters
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <label className="text-textLigntColor">Quiz</label>
                        <input
                          type="checkbox"
                          name="isQuizAvailable"
                          checked={ssection.isQuizAvailable}
                          onChange={(e) => handleSubSectionInputChange(i, e)}
                          className="h-4 w-4 cursor-pointer"
                        />
                      </div>
                    </div>
                    {ssection.isQuizAvailable === true && (
                      <>
                        {ssection.quizInputs.map((quiz, quizIndex) => (
                          <div
                            key={quizIndex}
                            className="flex w-full flex-col xl:w-[100%]"
                          >
                            <hr className="my-3 border xl:w-[100%]" />
                            <label className="text-textLigntColor">
                              {`Question - ${quizIndex + 1} `}
                            </label>
                            <input
                              type="text"
                              name={`question-${i}-${quizIndex}`}
                              value={quiz.question}
                              onChange={(e) =>
                                handleQuizTitleInputChange(i, quizIndex, e)
                              }
                              required
                              className="rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6"
                            />
                            <button
                              type="button"
                              className="my-3  rounded-md bg-textLigntColor p-2 text-white"
                              onClick={(e) =>
                                handleAddQuizOptions(i, quizIndex)
                              }
                            >
                              Add Options
                            </button>
                            <div className="flex flex-wrap gap-3">
                              {" "}
                              {quiz.options.map((option, optionIndex) => (
                                <div
                                  key={optionIndex}
                                  className="flex w-full flex-col  xl:w-[49%]"
                                >
                                  <label className="text-textLigntColor">{`Option ${
                                    optionIndex + 1
                                  }`}</label>
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="text"
                                      name={`option-${i}-${quizIndex}-${optionIndex}`}
                                      value={option}
                                      onChange={(e) =>
                                        handleQuizOptionsInputChange(
                                          i,
                                          quizIndex,
                                          optionIndex,
                                          e,
                                        )
                                      }
                                      required
                                      className="w-full rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6"
                                    />
                                    {quiz.options.length > 2 && (
                                      <button
                                        className="rounded-sm border text-xl text-textLigntColor"
                                        onClick={() =>
                                          handleRemoveQuizOptions(
                                            i,
                                            quizIndex,
                                            optionIndex,
                                          )
                                        }
                                      >
                                        <RxCross2 />
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Answer input field*/}
                            <hr className="my-3 border xl:w-[100%]" />
                            <div className="flex flex-col">
                              <label className="text-textLigntColor">
                                {`Answer Of - ${quizIndex + 1} Question`}
                              </label>
                              <input
                                type="text"
                                name={`answer-${i}-${quizIndex}`}
                                value={quiz.answer}
                                onChange={(e) =>
                                  handleQuizAnswerInputChange(i, quizIndex, e)
                                }
                                pattern="^[0-9]"
                                title="Only Accept the Number"
                                required
                                className="rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        ))}
                      </>
                    )}
                    {subSections.length > 1 && <hr className="my-3 border" />}
                  </div>
                );
              })}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  className="my-3 rounded-md bg-textColor p-2 text-white"
                  onClick={handleAddSubSection}
                >
                  Add SubSection
                </button>
                <button
                  type="submit"
                  className="my-3 rounded-md bg-textColor p-2 px-3 text-white sm:px-5"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const Upload = () => {
  const [sectionFormVisible, setSectionFormVisibile] = useState(false);
  const [courseId, setCourseId] = useState("");
  const bearer_token = JSON.parse(localStorage.getItem("token"));

  return (
    <>
      {sectionFormVisible === true ? (
        <SectionForm
          setCourseId={setCourseId}
          courseId={courseId}
          bearer_token={bearer_token}
        />
      ) : (
        <CourseForm
          setSectionFormVisibile={setSectionFormVisibile}
          setCourseId={setCourseId}
          courseId={courseId}
          bearer_token={bearer_token}
        />
      )}
    </>
  );
};

export default Upload;

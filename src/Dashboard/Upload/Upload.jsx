import React, { useState } from "react";
import data from "../../Data/Data";
import Loader from "../../Components/Loader/Loader";
import { Link } from "react-router-dom";
import { RxCross2 } from "react-icons/rx";
import { post } from "../../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import InputField from "../../Components/CommonInputField/CommonInputField";
import SelectField from "../../Components/CommonSelectField/SelectField";

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

  const [loading, setloading] = useState(false);
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

  const successNotify = () =>
    toast.success("Register Successfully!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorNotify = (err) =>
    toast.error(err, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  // Course Api Call

  const sendCourseDetails = async () => {
    try {
      setloading(true);
      const refreshedToken = await checkAndRefreshToken(bearer_token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshedToken}`,
        },
      };

      const data = {
        title: formData.courseTitle,
        authorName: formData.authorName,
        description: formData.courseDes,
        thumbNail: formData.thumbnailBase64,
        category: formData.category,
        whatYouWillLearn: formData.teachingDes,
      };

      const res = await post("/user/saveCourse", data, config);
      setCourseId(res.data.courseId);
      const courseID = JSON.parse(res.data.courseId);
      localStorage.setItem("Current Upload CourseId", courseID);
      if (Boolean(res)) {
        successNotify();

        setTimeout(() => {
          setSectionFormVisibile(true);
        }, 1000);
      }
    } catch (err) {
      errorNotify("error");
      console.log(err);
    } finally {
      setloading(false);
    }
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
      sendCourseDetails();
    }
  };

  const formStyle = "flex w-full flex-col  lg:w-[45%] xl:w-[48%]";

  return (
    <div className="min-h-screen  pb-16 md:pb-4">
      <div className="ml-1 p-4 md:pl-12 ">
        <div className="profile_header">
          <h2 className="dayOne text-2xl text-textColor md:pt-5">Upload</h2>
          <h4 className="text-textLightColor">
            Welcome to{" "}
            <Link to="/" className="dayOne">
              {data[0].title}
            </Link>{" "}
            Upload page
          </h4>
        </div>
        {loading && (
          <div className="flex h-[40vh] w-full items-center justify-center">
            <Loader color={"#334456"} height={"15%"} width={"15%"} />
          </div>
        )}
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
                formStyle={formStyle}
              />
              <InputField
                label="Course thumbnail"
                name="thumbnail"
                type="file"
                // value={formData.thumbnail}
                onChange={handleInputChange}
                required
                formStyle={formStyle}
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
                formStyle={formStyle}
              />
              <SelectField
                label="Category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                options={["Finance", "Coding", "Designing"]}
                required
                formStyle={formStyle}
              />
              <InputField
                label="What you'll teach"
                name="teachingDes"
                type="textarea"
                value={formData.teachingDes}
                onChange={handleInputChange}
                required
                formStyle={formStyle}
              />
              <InputField
                label="Course Description"
                name="courseDes"
                type="textarea"
                value={formData.courseDes}
                onChange={handleInputChange}
                required
                formStyle={formStyle}
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
              className="mt-5 w-full rounded-md border bg-textLightColor py-2.5 text-white md:w-[15%]"
            >
              Next
            </button>
          </form>
        </div>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        data-testid="toast"
      />
    </div>
  );
};

const SectionForm = ({
  courseId,
  setCourseId,
  bearer_token,
  setSectionFormVisibile,
}) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [subSections, setSubSections] = useState([
    {
      SubSectionTitle: "",
      SubSectionDes: "",
      VideoLink: "",
      isQuizAvailable: false,
      quizInputs: [
        { key: 1, question: "", options: ["", ""], answer: "" },
        { key: 2, question: "", options: ["", ""], answer: "" },
        { key: 3, question: "", options: ["", ""], answer: "" },
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

  const successNotify = () =>
    toast.success("Register Successfully!", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const errorNotify = (err) =>
    toast.error(err, {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  // Course Api Call

  const sendCourseSectionDetails = async () => {
    try {
      const refreshedToken = await checkAndRefreshToken(bearer_token);
      const updatedConfig = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshedToken}`,
        },
      };

      const data = [
        {
          title: sectionTitle,
          // course_id: localStorage.getItem("Current Upload CourseId"),
          course_id: courseId,
          subSections: subSections.map((subSection) => ({
            title: subSection.SubSectionTitle,
            description: subSection.SubSectionDes,
            link: subSection.VideoLink,
            quizList: subSection.quizInputs,
          })),
        },
      ];

      const res = await post("/user/saveSection", data, updatedConfig);
      if (Boolean(res)) {
        successNotify();
        setTimeout(() => {
          setSectionFormVisibile(false);
        }, 1000);
        localStorage.removeItem("Current Upload CourseId");
        setCourseId("");
      }
    } catch (error) {
      errorNotify("error");
      console.error("Error saving section details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deserror === false) {
      sendCourseSectionDetails();
    }
  };
  return (
    <div className="h-auto bg-white pb-16 md:pb-4">
      <div className="ml-1 p-4  md:pl-12 ">
        <div className="profile_header">
          <h2 className="dayOne text-2xl text-textColor md:pt-5">Upload</h2>
          <h4 className="text-textLightColor">
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
                <label className="text-textLightColor">Section Name</label>
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
                      <p className="w-[70%] rounded-md bg-textLightColor p-2 px-3 text-center text-white  sm:w-[30%] xl:w-[20%]">
                        Sub Section {i + 1}
                      </p>
                      {subSections.length > 1 && (
                        <button
                          className="rounded-sm border text-xl text-textLightColor"
                          onClick={() => handleRemoveSubSection(i)}
                        >
                          <RxCross2 />
                        </button>
                      )}
                    </div>
                    <div className="subSection flex flex-wrap gap-3">
                      <div className="flex w-full flex-col xl:w-[49%]">
                        <label className="text-textLightColor">
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
                        <label className="text-textLightColor">Video URL</label>
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
                        <label className="text-textLightColor">
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
                        <label className="text-textLightColor">Quiz</label>
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
                            <label className="text-textLightColor">
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
                              className="my-3  rounded-md bg-textLightColor p-2 text-white"
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
                                  <label className="text-textLightColor">{`Option ${
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
                                        className="rounded-sm border text-xl text-textLightColor"
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
                              <label className="text-textLightColor">
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
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        data-testid="toast"
      />
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
          setSectionFormVisibile={setSectionFormVisibile}
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

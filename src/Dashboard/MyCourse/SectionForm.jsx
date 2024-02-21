import React, { useState } from "react";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { post } from "../../ApiCall/ApiCall";
import { RxCross2 } from "react-icons/rx";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import VideoUpload from "../../Components/VideoUpload/VideoUpload";

const SectionForm = ({
  courseId,
  setCourseId,
  bearer_token,
  setSectionFormVisibile,
  setIsCourseUpload,
  loading,
  setLoading,
  closeModal,
  setCourseUpdated,
}) => {
  const [sectionTitle, setSectionTitle] = useState("");
  const [uploadVideoLink, setUploadVideoLink] = useState("");

  console.log(uploadVideoLink);
  const [subSections, setSubSections] = useState([
    {
      SubSectionTitle: "",
      SubSectionDes: "",
      VideoLink: "",
      isQuizAvailable: false,
      quizInputs: [{ key: 1, question: "", options: ["", ""], answer: "" }],
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
        uploadVideo: false,
        quizInputs: [{ key: 1, question: "", options: ["", ""], answer: "" }],
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
    toast.success("Section Added Successfully", {
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

  const handleAddQuiz = (sectionIndex) => {
    setSubSections((prevSubSections) => {
      const updatedSubSections = [...prevSubSections];
      const newKey = updatedSubSections[sectionIndex].quizInputs.length + 1; // Calculate new key based on the length of quizInputs array
      updatedSubSections[sectionIndex].quizInputs.push({
        key: newKey,
        question: "",
        options: ["", ""],
        answer: "",
      });
      return updatedSubSections;
    });
  };

  const handleRemoveQuiz = (sectionIndex, quizIndex) => {
    const updatedSubSections = [...subSections];
    updatedSubSections[sectionIndex].quizInputs.splice(quizIndex, 1);
    setSubSections(updatedSubSections);
  };
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
          courseId: courseId,
          subSections: subSections.map((subSection) => ({
            title: subSection.SubSectionTitle,
            description: subSection.SubSectionDes,
            link: subSection.VideoLink || uploadVideoLink,
            quizList: subSection.quizInputs,
          })),
        },
      ];

      const res = await post("/user/saveSection", data, updatedConfig);
      setLoading(false);
      if (res.status === 200 && res.data) {
        successNotify();
        setCourseUpdated(true);
        setSectionTitle("");
        setSubSections([
          {
            SubSectionTitle: "",
            SubSectionDes: "",
            VideoLink: "",
            isQuizAvailable: false,
            quizInputs: [
              { key: 1, question: "", options: ["", ""], answer: "" },
            ],
          },
        ]);
      }
    } catch (error) {
      errorNotify("error");
      setLoading(false);
      console.error("Error saving section details:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (deserror === false) {
      sendCourseSectionDetails();
      setLoading(true);
      console.log(loading);
    }
  };
  return (
    <div className="relative mx-auto mb-8  mt-8 w-full rounded-md bg-white shadow sm:w-3/4 sm:p-8">
      <button
        type="button"
        onClick={() => closeModal()}
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full  border bg-textColor p-1 text-white"
      >
        x
      </button>
      <div className="uploadForm  mt-5">
        <div className="w-full rounded-md bg-herobg shadow-sm sm:border sm:p-4 ">
          <button
            type="button"
            className=" mb-2.5  rounded-md bg-textColor p-2 text-white"
          >
            Course Section
          </button>
          <form
            onSubmit={(e) => handleSubmit(e)}
            className="rounded-md bg-white p-4 sm:border"
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
                  <div className="mb-3 flex items-center justify-between gap-3 ">
                    <div className="flex w-full flex-col gap-5 sm:flex-row sm:items-center">
                      <p className=" rounded-md bg-textLightColor p-2 px-3 text-center  text-white ">
                        Sub Section {i + 1}
                      </p>
                      <label
                        htmlFor="uploadVideo"
                        className="flex items-center gap-2 text-textLightColor"
                      >
                        UploadVideo
                        <input
                          type="checkbox"
                          name="uploadVideo"
                          checked={ssection.uploadVideo}
                          onChange={(e) => handleSubSectionInputChange(i, e)}
                          className="h-4 w-4 cursor-pointer"
                        />
                      </label>
                    </div>
                    {subSections.length > 1 && (
                      <button
                        type="button"
                        className="rounded-sm border bg-textLightColor text-xl text-white"
                        onClick={() => handleRemoveSubSection(i)}
                      >
                        <RxCross2 />
                      </button>
                    )}
                  </div>
                  <div className="subSection flex flex-wrap gap-3">
                    <div className="flex w-full flex-col lg:w-[49%]">
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
                    {ssection.uploadVideo === true ? (
                      <div className="flex w-full flex-col lg:w-[49%]">
                        <label className="text-textLightColor">
                          Upload Video
                        </label>
                        <VideoUpload
                          courseId={courseId}
                          setUploadVideoLink={setUploadVideoLink}
                          sectionTitle={sectionTitle}
                        />
                      </div>
                    ) : (
                      <>
                        <div className="flex w-full flex-col lg:w-[49%]">
                          <label className="text-textLightColor">
                            Video URL
                          </label>
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
                      </>
                    )}

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

                    <div className="flex items-center gap-2 ">
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
                          {ssection.quizInputs.length > 1 && ( // Check if there are more than one quiz inputs
                            <button
                              type="button"
                              onClick={() => handleRemoveQuiz(i, quizIndex)}
                            >
                              Remove Quiz
                            </button>
                          )}
                          <label className="text-textLightColor">
                            {`Question - ${quizIndex + 1} `}
                          </label>
                          <div className="flex flex-col justify-center gap-5 lg:flex-row lg:items-center">
                            <input
                              type="text"
                              name={`question-${i}-${quizIndex}`}
                              value={quiz.question}
                              onChange={(e) =>
                                handleQuizTitleInputChange(i, quizIndex, e)
                              }
                              required
                              className="rounded-md border bg-dashboardLightColor py-2 pl-1 text-textColor placeholder:text-gray-400 sm:text-sm sm:leading-6 lg:w-[80%]"
                            />

                            <button
                              type="button"
                              className="my-3 rounded-md bg-textLightColor p-2 text-white lg:w-[20%]"
                              onClick={(e) =>
                                handleAddQuizOptions(i, quizIndex)
                              }
                            >
                              Add Options
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-3">
                            {quiz.options.map((option, optionIndex) => (
                              <div
                                key={optionIndex}
                                className="flex w-full flex-col  lg:w-[49%]"
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
                                      type="button"
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
                          {quizIndex === ssection.quizInputs.length - 1 && (
                            <button
                              type="button"
                              className="my-3 rounded-md bg-textLightColor p-2 text-white"
                              onClick={(e) => handleAddQuiz(i)}
                            >
                              Add Quiz
                            </button>
                          )}
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
                className="my-3 rounded-md bg-textColor p-2 px-3 text-white sm:px-5 md:w-[150px]"
                disabled={loading === true}
              >
                {loading === true ? (
                  <div className="flex cursor-progress items-center justify-center">
                    <Loader color={"#FFFFFF"} height={"15%"} width={"15%"} />
                  </div>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
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

export default SectionForm;

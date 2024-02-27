import React, { useState } from "react";
import VideoSave from "./VideoSave";

const UploadSection = () => {
  const [subSections, setSubSections] = useState([
    {
      subSectionTitle: "",
      isVideoUploadVisible: false,
      subsectionVideo: "",
      subSectionVideoUrl: "",
      subSectionDes: "",
      quizInputs: [{ question: "", options: ["", ""], answer: "" }],
    },
  ]);

  /* function for add multiple SubSections */

  const handleAddSubSection = () => {
    setSubSections([
      ...subSections,
      {
        subSectionTitle: "",
        isVideoUploadVisible: false,
        subsectionVideo: "",
        subSectionVideoUrl: "",
        subSectionDes: "",
        quizInputs: [{ question: "", options: ["", ""], answer: "" }],
      },
    ]);
  };

  /* function for delete SubSections */

  const handleDeleteSubSections = (index) => {
    const updatedSubSections = [...subSections];
    updatedSubSections.splice(index, 1);
    setSubSections(updatedSubSections);
  };

  /*subSection inputChange Function*/

  const subSectionInputChange = (index, e) => {
    const { name, value, type, checked } = e.target;
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

  /*Video Upload Functionality*/

  const handleVideoUpload = (file, index) => {
    const updatedSubSections = [...subSections];
    updatedSubSections[index].subsectionVideo = file.name;
    setSubSections(updatedSubSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted", subSections);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        {subSections.map((subSection, index) => (
          <div key={index} className="subSections">
            <div className="flex">
              <label>SubSectionTitle</label>
              <input
                className="border"
                type="text"
                name="subSectionTitle"
                onChange={(e) => subSectionInputChange(index, e)}
                value={subSection.subSectionTitle}
              />
            </div>

            <div className="flex">
              <label>Upload</label>
              <input
                className="h-4 w-4 cursor-pointer"
                type="checkbox"
                name="isVideoUploadVisible"
                onChange={(e) => {
                  subSectionInputChange(index, e);
                }}
                checked={subSection.isVideoUploadVisible}
              />
            </div>

            {subSection.isVideoUploadVisible === true ? (
              <div className="flex">
                <label>Upload Video</label>
                <VideoSave
                  handleVideoUpload={(file) => handleVideoUpload(file, index)}
                />
              </div>
            ) : (
              <div className="flex">
                <label>VideoUrl</label>
                <input
                  className="border"
                  type="text"
                  name="subSectionVideoUrl"
                  onChange={(e) => subSectionInputChange(index, e)}
                  value={subSection.subSectionVideoUrl}
                />
              </div>
            )}

            <div className="flex">
              <label>Description</label>
              <textarea
                className="border"
                name="subSectionDes"
                onChange={(e) => subSectionInputChange(index, e)}
                value={subSection.subSectionDes}
              />
            </div>
            {subSections.length > 1 && (
              <button
                type="button"
                className="my-4 rounded-md border p-1 px-4"
                onClick={() => handleDeleteSubSections(index)}
              >
                delete
              </button>
            )}
          </div>
        ))}
        {/* Click to add multiple SunSections */}
        <button
          className="bg-text rounded-md border p-1 px-4"
          type="button"
          onClick={handleAddSubSection}
        >
          Add SubSection
        </button>
        <button type="submit" className="rounded-md border p-1 px-4">
          Save
        </button>
      </form>
    </>
  );
};

export default UploadSection;

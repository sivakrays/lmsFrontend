import React, { useState } from "react";
import JoditEditor from "jodit-react";
import Preview from "./Preview";

import { FaArrowTurnDown } from "react-icons/fa6";
import { FaArrowTurnUp } from "react-icons/fa6";
import { post } from "../../ApiCall/ApiCall";

const DragableWidget = () => {
  const [widgets, setWidgets] = useState([]);
  const [editorContents, setEditorContents] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);

  // vidoe upload states
  const [uploading, setUploading] = useState(false);
  const [video, setVideo] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const currentToken = JSON.parse(localStorage.getItem("token"));

  // handle Drop functionality

  const handleOnDrag = (e, type) => {
    e.dataTransfer.setData("type", type);
  };

  // Handle drop functionality

  const handleOnDrop = (e, targetIndex) => {
    e.preventDefault();
    const widgetType = e.dataTransfer.getData("type");
    const newWidgets = [...widgets];
    newWidgets.splice(targetIndex, 0, widgetType);
    setWidgets(newWidgets);
    if (widgetType === "widget A") {
      setEditorContents([...editorContents, ""]);
    } else if (widgetType === "widget B") {
      setImageFiles([...imageFiles, null]);
    } else if (widgetType === "widget C") {
      setVideoFiles([...videoFiles, null]);
    }
  };

  // dragOver the widget functionality

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  // remove widget functionality

  const removeWidget = (index) => {
    const newWidgets = [...widgets];
    newWidgets.splice(index, 1);
    setWidgets(newWidgets);

    const newEditorContents = [...editorContents];
    newEditorContents.splice(index, 1);
    setEditorContents(newEditorContents);

    const newImageFiles = [...imageFiles];
    newImageFiles.splice(index, 1);
    setImageFiles(newImageFiles);

    const newVideoFiles = [...videoFiles];
    newVideoFiles.splice(index, 1);
    setVideoFiles(newVideoFiles);
  };

  // Editor input change functionality

  const handleEditorChange = (content, index) => {
    const newEditorContents = [...editorContents];
    newEditorContents[index] = content;
    setEditorContents(newEditorContents);
  };

  // Image change Functionality

  const handleImageChange = (file, index) => {
    if (!file) return; // If no file is selected, do nothing
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result;
      const newImageFiles = [...imageFiles];
      newImageFiles[index] = base64Data;
      setImageFiles(newImageFiles);
    };
  };

  // Video Change Functionality

  const handleVideoChange = (file, index) => {
    if (!file) return; // If no file is selected, do nothing
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const base64Data = reader.result;
      const newVideoFiles = [...videoFiles];
      newVideoFiles[index] = base64Data;
      setVideoFiles(newVideoFiles);
    };
  };

  // Widget up down Moving Functionality

  const moveWidget = (currentIndex, direction) => {
    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;
    const newWidgets = [...widgets];
    const widgetToMove = newWidgets.splice(currentIndex, 1)[0];
    newWidgets.splice(newIndex, 0, widgetToMove);
    setWidgets(newWidgets);

    const newEditorContents = [...editorContents];
    const editorContentToMove = newEditorContents.splice(currentIndex, 1)[0];
    newEditorContents.splice(newIndex, 0, editorContentToMove);
    setEditorContents(newEditorContents);

    const newImageFiles = [...imageFiles];
    const imageFileToMove = newImageFiles.splice(currentIndex, 1)[0];
    newImageFiles.splice(newIndex, 0, imageFileToMove);
    setImageFiles(newImageFiles);

    const newVideoFiles = [...videoFiles];
    const videoFileToMove = newVideoFiles.splice(currentIndex, 1)[0];
    newVideoFiles.splice(newIndex, 0, videoFileToMove);
    setVideoFiles(newVideoFiles);
  };

  // Publish the page Functionality

  const handlePublish = () => {
    const widgetData = widgets.map((widget, index) => {
      if (widget === "widget A") {
        return {
          type: "editor",
          content: editorContents[index],
        };
      } else if (widget === "widget B") {
        return {
          type: "video",
          content: videoFiles[index],
        };
      } else if (widget === "widget C") {
        return {
          type: "image",
          content: imageFiles[index],
        };
      } else if (widget === "widget D") {
        return {
          type: "image&Content",
          image: imageFiles[index],
          content: editorContents[index],
        };
      }
      return null;
    });

    console.log("Widget Data", widgetData);
  };

  //Video Upload Functionality

  const handleVideoUpload = async (index) => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", video);

    try {
      const res = await post(`/user/uploadFile?courseId=${"test"}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${currentToken}`,
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const percentCompleted = Math.round((loaded * 100) / total);
          setUploadProgress(percentCompleted);
        },
      });

      console.log(res.data);
      const newVideoFiles = [...videoFiles];
      newVideoFiles[index] = res.data;
      setVideoFiles(newVideoFiles);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  //change the order in image&content widget

  const [contentFirst, setContentFirst] = useState(false);
  const [clickedIndex, setClickedIndex] = useState("");

  const handleChangeOrder = (index) => {
    setContentFirst(!contentFirst);
    console.log(index, contentFirst);
  };

  return (
    <>
      <div>
        {/* Widget ToolBar */}
        <div className="widgets flex gap-3">
          <div
            className="widget border"
            draggable
            onDragStart={(e) => handleOnDrag(e, "widget A")}
          >
            Editor
          </div>
          <div
            className="widget border"
            draggable
            onDragStart={(e) => handleOnDrag(e, "widget B")}
          >
            Video
          </div>
          <div
            className="widget border"
            draggable
            onDragStart={(e) => handleOnDrag(e, "widget C")}
          >
            Image
          </div>
          <div
            className="widget border"
            draggable
            onDragStart={(e) => handleOnDrag(e, "widget D")}
          >
            Image + content
          </div>
        </div>

        {/* Widgets */}
        <div
          className="page min-h-screen w-full space-y-3 border"
          onDrop={(e) => handleOnDrop(e, widgets.length)}
          onDragOver={handleDragOver}
        >
          {widgets.map((widget, index) => {
            return (
              <div
                className="dropped-widget border p-1"
                key={index}
                onDrop={(e) => handleOnDrop(e, index + 1)}
                onDragOver={handleDragOver}
              >
                {widget === "widget A" && (
                  <JoditEditor
                    value={editorContents[index] || ""}
                    onChange={(content) => handleEditorChange(content, index)}
                  />
                )}

                {widget === "widget B" && (
                  <>
                    <div className="flex gap-3">
                      <label htmlFor="file-input" className="sr-only">
                        Choose file
                      </label>
                      <input
                        type="file"
                        name="video"
                        id="video"
                        className="focus:textColor focus:border-grey-200 block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3 focus:z-10 disabled:pointer-events-none disabled:opacity-50 "
                        onChange={(e) => {
                          // handleVideoChange(e.target.files[0], index)
                          setVideo(e.target.files[0]);
                        }}
                      />
                      <button
                        className="border-grey-400 rounded-md border px-3"
                        type="button"
                        onClick={() => handleVideoUpload(index)}
                      >
                        Upload
                      </button>
                    </div>
                    {uploading && (
                      <div className="progress-container">
                        <div
                          className="progress-bar"
                          style={{ width: `${uploadProgress}%` }}
                        >
                          {uploadProgress}%
                        </div>
                      </div>
                    )}
                  </>
                )}

                {widget === "widget C" && (
                  <>
                    <div className="flex gap-3">
                      {imageFiles[index] ? (
                        <img
                          src={imageFiles[index]}
                          alt={`Image ${index}`}
                          style={{
                            width: "20%",
                            height: "20%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        />
                      ) : (
                        <>
                          <label htmlFor="file-input" className="sr-only">
                            Choose file
                          </label>
                          <input
                            type="file"
                            name="image"
                            id="image"
                            className="focus:textColor focus:border-grey-200 block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3 focus:z-10 disabled:pointer-events-none disabled:opacity-50 "
                            onChange={(e) =>
                              handleImageChange(e.target.files[0], index)
                            }
                          />
                        </>
                      )}
                    </div>
                  </>
                )}

                {widget === "widget D" && (
                  <>
                    <button
                      type="button"
                      className="mb-2 rounded-md bg-gray-500 px-2 py-1.5 text-white"
                      onClick={() => handleChangeOrder(index)}
                    >
                      Change Order
                    </button>
                    <div
                      className={`flex flex-wrap ${
                        contentFirst === true && "flex-row-reverse"
                      }`}
                    >
                      <div className="min-h-[200px] w-1/2 border">
                        <>
                          <div className="flex gap-3">
                            {imageFiles[index] ? (
                              <img
                                src={imageFiles[index]}
                                alt={`Image ${index}`}
                                style={{
                                  width: "50%",
                                  height: "50%",
                                  marginLeft: "auto",
                                  marginRight: "auto",
                                }}
                              />
                            ) : (
                              <>
                                <label htmlFor="file-input" className="sr-only">
                                  Choose file
                                </label>
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  className="focus:textColor focus:border-grey-200 block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3 focus:z-10 disabled:pointer-events-none disabled:opacity-50 "
                                  onChange={(e) =>
                                    handleImageChange(e.target.files[0], index)
                                  }
                                />
                              </>
                            )}
                          </div>
                        </>
                      </div>
                      <div className="min-h-[200px] w-1/2 border">
                        <JoditEditor
                          value={editorContents[index] || ""}
                          onChange={(content) =>
                            handleEditorChange(content, index)
                          }
                        />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex gap-2">
                  {/*Position Button*/}
                  {index > 0 && (
                    <button
                      onClick={() => moveWidget(index, "up")}
                      className="my-2 rounded-md bg-textLightColor px-2 py-1 text-white"
                    >
                      {/* Move Up */}
                      <FaArrowTurnUp />
                    </button>
                  )}
                  {index < widgets.length - 1 && (
                    <button
                      onClick={() => moveWidget(index, "down")}
                      className="my-2 rounded-md bg-textLightColor px-2 py-1 text-white"
                    >
                      {/* Move Down */}
                      <FaArrowTurnDown />
                    </button>
                  )}

                  {/* Remove Button */}

                  <button
                    className="my-2 flex w-full items-end justify-end rounded-md   px-2  py-1 "
                    onClick={() => removeWidget(index)}
                  >
                    <svg
                      className="h-8 w-8 rounded-full bg-red-100 p-1 text-red-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      ></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/*Publish Button*/}
      <button
        className="my-5 w-[200px] rounded-md bg-textLightColor px-2 py-1.5 text-white"
        type="button"
        onClick={() => handlePublish()}
      >
        Publish
      </button>

      {/*Preview the page*/}
      <Preview
        widgets={widgets}
        videoFiles={videoFiles}
        editorContents={editorContents}
        imageFiles={imageFiles}
      />
      {/**/}
    </>
  );
};

export default DragableWidget;

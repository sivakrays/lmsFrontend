import React, { useState } from "react";
import "./VideoUpload.css";
import { post } from "../../ApiCall/ApiCall";

const VideoUpload = ({
  setUploadVideoLink,
  sectionTitle,
  subSections,
  setSubSections,
  i,
}) => {
  const [video, setVideo] = useState();
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const currentToken = JSON.parse(localStorage.getItem("token"));

  const handleVideoUpload = async () => {
    setUploading(true);

    const formData = new FormData();
    formData.append("file", video);

    try {
      const res = await post(
        `/user/uploadFile?courseId=${sectionTitle}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${currentToken}`,
          },
          onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentCompleted = Math.round((loaded * 100) / total);
            setUploadProgress(percentCompleted);
          },
        },
      );

      const updatedSubSections = [...subSections];
      updatedSubSections[i].VideoLink = res.data;
      setSubSections(updatedSubSections);
      setUploadVideoLink(res.data);
      console.log(updatedSubSections);
    } catch (error) {
      console.error("Error uploading video:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <div className="flex gap-3">
        <label htmlFor="file-input" className="sr-only">
          Choose file
        </label>
        <input
          type="file"
          name="file-input"
          id="file-input"
          className="focus:textColor focus:border-grey-200 block w-full rounded-lg border border-gray-200 text-sm shadow-sm file:me-4 file:border-0 file:bg-gray-50 file:px-4 file:py-3 focus:z-10 disabled:pointer-events-none disabled:opacity-50 "
          onChange={(e) => setVideo(e.target.files[0])}
        />

        <button
          className="border-grey-400 rounded-md border px-3"
          type="button"
          onClick={() => handleVideoUpload()}
        >
          Upload
        </button>
      </div>

      {uploading && (
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${uploadProgress}%` }}>
            {uploadProgress}%
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoUpload;

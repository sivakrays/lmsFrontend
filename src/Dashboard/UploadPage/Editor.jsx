import React, { useState, useRef, useMemo } from "react";
import JoditEditor from "jodit-react";
import { post } from "../../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { ToastContainer, toast } from "react-toastify";

const Editor = ({
  courseId,
  setCourseId,
  bearer_token,
  setIsCourseUpload,
  loading,
  setLoading,
  closeModal,
  setCourseUpdated,
}) => {
  const editor = useRef(null);
  const [content, setContent] = useState("");

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

  const handleSave = async () => {
    try {
      const refreshedToken = await checkAndRefreshToken(bearer_token);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshedToken}`,
        },
      };

      const data = {
        courseId: courseId,
        courseContent: content,
        userId: localStorage.getItem("userID"),
        isHtmlContent: true,
      };

      const res = await post("/user/saveHtmlCourse", data, config);
      setLoading(false);
      if (res.status === 200 && res.data) {
        successNotify();
        setCourseUpdated(true);
        setContent("");
      }
    } catch (error) {
      errorNotify("error");
      setLoading(false);
      console.error("Error saving section details:", error);
    }
  };

  const handleSubmit = () => {
    console.log(content);
    handleSave();
  };

  return (
    <div className="relative mx-auto mb-8  mt-8 w-full rounded-md bg-white shadow sm:w-[90%] sm:p-8">
      <button
        type="button"
        onClick={() => closeModal()}
        className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full  border bg-textColor p-1 text-white"
      >
        x
      </button>
      <div className="" draggable>
        <JoditEditor
          ref={editor}
          value={content}
          tabIndex={1}
          onBlur={(newContent) => setContent(newContent)}
          onChange={(newContent) => {}}
        />
      </div>
      <div draggable>
        <input type="file" name="" id="" />
      </div>
      <div draggable>
        <input type="file" name="" id="" />
      </div>
      <div className="mt-5 flex w-full justify-end">
        <button
          type="button"
          className="rounded-md bg-textColor px-3 py-2 text-white"
          onClick={() => handleSubmit()}
        >
          Publish
        </button>
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

export default Editor;

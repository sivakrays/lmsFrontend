import React, { useState } from "react";
import { post } from "../../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectField from "../../Components/CommonSelectField/SelectField";
import InputField from "../../Components/CommonInputField/CommonInputField";
import Loader from "../../Components/Loader/Loader";

const CourseForm = ({
  setSectionFormVisibile,
  courseId,
  setCourseId,
  bearer_token,
  setIsCourseUpload,
  setLoading,
  loading,
}) => {
  const [formData, setFormData] = useState({
    courseTitle: "",
    thumbnailBase64: "",
    authorName: "",
    category: "",
    teachingDes: "",
    courseDes: "",
    language: "",
    price: "",
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
      setLoading(true);
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
        price: formData.price,
      };

      const res = await post("/user/saveCourse", data, config);
      setCourseId(res.data.courseId);
      if (Boolean(res)) {
        successNotify();
        setTimeout(() => {
          setLoading(false);
          setSectionFormVisibile(true);
        }, 1000);
      }
    } catch (err) {
      errorNotify("error");
      console.log(err);
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
      setLoading(true);
    }
  };

  const formStyle = "flex w-full flex-col ";

  return (
    <div className="relative mx-auto mb-8  mt-8 w-[400px] rounded-md bg-white p-8 shadow">
      <button
        type="button"
        onClick={() => setIsCourseUpload(false)}
        className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full  border bg-textColor p-1 text-white"
      >
        x
      </button>
      <form onSubmit={handleSubmit}>
        <div className=" flex flex-col flex-wrap gap-4  md:flex-row md:gap-8">
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
          <InputField
            label="Price"
            name="price"
            type="text"
            value={formData.price}
            onChange={handleInputChange}
            required
            pattern="\d{1,5}"
            title="Please enter the valid amount in numbers"
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
            formStyle={formStyle}
          />
        </div>
        <button
          // onClick={() => setSectionFormVisibile(true)}
          type="submit"
          className="mt-5 w-full rounded-md border bg-textLightColor py-2.5 text-white md:w-[55%]"
          disabled={loading === true}
        >
          {loading === true ? (
            <div className="flex cursor-progress items-center justify-center">
              <Loader color={"#FFFFFF"} height={"15%"} width={"15%"} />
            </div>
          ) : (
            "Next"
          )}
        </button>
      </form>
    </div>
  );
};

export default CourseForm;

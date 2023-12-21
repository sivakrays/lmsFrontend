import React from "react";
import "./CourseCard.css";
import star from "../../Assets/courseCard/star.png";
import halfStar from "../../Assets/courseCard/halfStar.png";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const CourseCard = ({ course, path }) => {
  const { isTokenValid } = useContext(authContext);
  const navigate = useNavigate();

  const errorNotify = () =>
    toast.info("Please login to access this course", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const isAuthorizedUser = () => {
    if (isTokenValid) {
      navigate(`/coursedetails/${course.courseId}`);
    } else {
      errorNotify();
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

  return (
    <div
      className="mt-6 cursor-pointer rounded duration-500 ease-in-out boxShadow"
      onClick={isAuthorizedUser}
    >
      <div
        className={`courseCard flex ${
          path === "homeCard" ? "h-[350px]" : "h-[430px] "
        } w-[290px] flex-col gap-2 overflow-hidden rounded-lg border-2 border-textColor bg-cardbg `}
      >
        <div className="cardImg p-3">
          <div className="courseImgWrapper h-36 overflow-hidden rounded-lg">
            <img
              // src={`data:image/jpeg;base64,${course.thumbNail}`}
              src={course.img}
              alt="course thumbnail"
              className="courseImg h-full w-full object-cover"
            />
          </div>
        </div>
        <div className="courseTop flex items-center justify-between px-3">
          <div className="dayOne text-textColor">{course.category}</div>
          <div className="flex">
            <img src={star} alt="" className="w-4" />
            <img src={star} alt="" className="w-4" />
            <img src={star} alt="" className="w-4" />
            <img src={star} alt="" className="w-4" />
            <img src={halfStar} alt="" className="w-4" />
          </div>
        </div>
        <div className="courseDetails flex flex-col gap-5 px-3">
          <div className="courseHeading dayOne text-textColor">
            {course.title}
          </div>
          {path == "course" && (
            <div className="courseDes text-sm text-textLigntColor">
              {/* {course.description} */}
              {course.des}
            </div>
          )}
        </div>
        <div className="courseBtn flex items-center justify-between px-3 pb-3">
          <button
            className={`rounded-md ${
              path === "homeCard" && "mt-3"
            } bg-textColor px-5 py-2 text-white`}
          >
            Join
          </button>
          {!path === "homeCard" && (
            <p className="flex gap-2">
              <span className="dayOne text-sm text-textColor">
                {course.enrolled}
              </span>
              <span className="text-sm text-textLigntColor">Enrolled</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

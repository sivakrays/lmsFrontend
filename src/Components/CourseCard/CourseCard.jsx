import React from "react";
import "./CourseCard.css";
import star from "../../Assets/courseCard/star.png";
import halfStar from "../../Assets/courseCard/halfStar.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { toast } from "react-toastify";

const CourseCard = ({ course, path }) => {
  const { isTokenValid, userId } = useContext(authContext);
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
    <div className="mt-6 cursor-pointer rounded duration-500 ease-in-out boxShadow">
      <div
        className={`courseCard flex h-[340px] w-[260px] flex-col gap-2 overflow-hidden rounded-lg border-2 border-textColor bg-cardbg `}
      >
        <div className="cardImg p-3" onClick={isAuthorizedUser}>
          <div className="courseImgWrapper h-36 overflow-hidden rounded-lg">
            <img
              // src={`data:image/jpeg;base64,${course.thumbNail}`}
              // src={`${course.thumbNail}`}
              src={isTokenValid ? `${course.thumbNail}` : course.thumbNail}
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
          <div className="courseHeading dayOne h-11  text-textColor">
            {course.title.length > 40
              ? `${course.title.substring(0, 40)}...`
              : course.title}
          </div>
          {/* {path == "course" && (
            <div className="courseDes text-sm text-textLigntColor">
              {course.description.length > 40
                ? `${course.description.substring(0, 70)}...`
                : course.description}
            </div>
          )} */}
        </div>
        <div className="courseBtn flex items-center justify-between px-3 pb-3">
          <button
            className={`mt-3 rounded-md
             bg-textColor px-5 py-2 text-white shadow-sm`}
            onClick={isAuthorizedUser}
          >
            Join
          </button>

          <button
            onClick={() => console.log(course.courseId, userId)}
            className={`mt-3 rounded-md
             bg-yellow-300 px-5 py-2 font-medium text-textColor shadow-sm `}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;

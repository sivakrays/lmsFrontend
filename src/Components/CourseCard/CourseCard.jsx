import React from "react";
import "./CourseCard.css";
import star from "../../Assets/courseCard/star.png";
import halfStar from "../../Assets/courseCard/halfStar.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";

const CourseCard = ({ course }) => {
  const { isTokenValid } = useContext(authContext);

  return (
    <Link to={isTokenValid ? "/coursedetails" : "/login"}>
      <div className="mt-6 cursor-pointer rounded duration-500 ease-in-out boxShadow">
        <div className="courseCard flex h-[430px] w-[290px] flex-col gap-2 overflow-hidden rounded-lg border-2 border-textColor bg-cardbg">
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
            <div className="courseDes text-sm text-textLigntColor">
              {/* {course.description} */}
              {course.des}
            </div>
          </div>
          <div className="courseBtn flex items-center justify-between px-3 pb-3">
            <button className="rounded-md bg-textColor px-5 py-2 text-white">
              Join
            </button>
            <p className="flex gap-2">
              <span className="dayOne text-sm text-textColor">
                {course.enrolled}
              </span>
              <span className="text-sm text-textLigntColor">Enrolled</span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;

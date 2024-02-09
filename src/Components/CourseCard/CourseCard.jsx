import React from "react";
import "./CourseCard.css";
import star from "../../Assets/courseCard/star.png";
import halfStar from "../../Assets/courseCard/halfStar.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import { post } from "../../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { cartContext } from "../../Context/CartContext";

const CourseCard = ({ course, path }) => {
  const { isTokenValid, userId, token } = useContext(authContext);
  const { setCartUpdated, cartUpdated, setCartData } = useContext(cartContext);

  const navigate = useNavigate();
  const errorNotify = (err) =>
    toast.info(err, {
      position: "top-right",
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
      errorNotify("Please login to access this course");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

  const isCartAuthorized = () => {
    if (isTokenValid) {
      addCart(course.courseId, userId);
    } else {
      errorNotify("Please login to access this course");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

  const successNotify = () =>
    toast.success("Course Added to Cart", {
      position: "top-right",
      autoClose: 500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const currentToken = JSON.parse(localStorage.getItem("token"));
  const addCart = async (courseId, userId) => {
    try {
      const refreshedToken = await checkAndRefreshToken(currentToken);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${refreshedToken}`,
        },
      };

      const data = {
        userId: userId,
        courseId: courseId,
      };

      const res = await post("/user/saveCart", data, config);
      setCartUpdated(!cartUpdated);
      if (res.status === 200 && res.data !== "Course already exists") {
        successNotify();
        setCartData(res.data);
        console.log(res);
      } else {
        errorNotify("Course alredy exsist!");
      }
    } catch (err) {
      const error = err.response.data;
      errorNotify(error);
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
            onClick={() => isCartAuthorized()}
            className={`mt-3 rounded-md
             bg-yellow-300 px-5 py-2 font-medium text-textColor shadow-sm `}
          >
            Add to Cart
          </button>
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

export default CourseCard;

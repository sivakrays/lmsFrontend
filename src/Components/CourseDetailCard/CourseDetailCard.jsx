import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CourseDetailCard.css";

import cardImage from "../../Assets/courseCard/courseImg.jpg";
import playCircle from "../../Assets/coursedetails/PlayCircle.svg";
import Alarm from "../../Assets/coursedetails/Alarm.svg";
import file from "../../Assets/coursedetails/file.svg";
import folder from "../../Assets/coursedetails/folder.svg";
import trophy from "../../Assets/coursedetails/trophy.svg";
import YoutubeTv from "../../Assets/coursedetails/YoutubeTv.svg";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import { authContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { post } from "../../ApiCall/ApiCall";
import { cartContext } from "../../Context/CartContext";

const Card = ({ img, price, courseId }) => {
  const { isTokenValid, userId, token } = useContext(authContext);
  const { setCartUpdated, cartUpdated, setCartData } = useContext(cartContext);
  const [isCardFixed, setIscardFixed] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const isFixed = scrollPosition > 50;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const reachedBottom =
      scrollPosition + windowHeight >= 0.95 * documentHeight;
    setIscardFixed(isFixed);
    setIsAtBottom(reachedBottom);
    if (reachedBottom === true) {
      setIscardFixed(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isCardFixed]);

  const navigate = useNavigate();
  const [cartLoading, setCartLoading] = useState(false);

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

  const isCartAuthorized = () => {
    if (isTokenValid) {
      setCartLoading(true);
      addCart(courseId, userId);
    } else {
      errorNotify("Please login to access this course");
      setTimeout(() => {
        navigate("/login");
      }, 2500);
    }
  };

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
        setCartLoading(false);
        successNotify();
        setCartData(res.data);
        console.log(res);
      } else {
        errorNotify("Course alredy exsist!");
        setCartLoading(false);
      }
    } catch (err) {
      const error = err.response.data;
      errorNotify(error);
    }
  };

  return (
    <div
      className={` hidden h-[360px] w-80 rounded-lg border-2 bg-white  lg:block ${
        isCardFixed ? "fixedCard " : ""
      }`}
    >
      <div className="relative">
        <img src={img} alt="" className="h-52 w-full rounded-t-lg " />
        <img
          src={playCircle}
          alt=""
          className="centerImg w-20 cursor-pointer"
        />
        <p className="centerText text-sm text-white">Preview this course</p>
      </div>

      <div className="mx-2 mt-4 flex h-52  flex-col ">
        <div className="flex flex-col">
          <p className="text-2xl font-bold text-textColor">
            {price}.Rs{" "}
            <span className=" text-sm font-thin text-textLightColor line-through">
              {" "}
              ₹2,999
            </span>{" "}
            <span className="text-sm font-medium text-textColor"> 83% off</span>
          </p>
        </div>
        <div className="mt-5 flex flex-col  items-center space-y-4 ">
          <button
            className=" w-full border-2 border-textColor bg-mobilebg p-3 boxShadow"
            onClick={() => isCartAuthorized()}
          >
            Add to cart
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

export default Card;

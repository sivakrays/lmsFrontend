import React, { useState, useEffect } from "react";
import { get } from "../../ApiCall/ApiCall";
import LearningCard from "../../Components/LearningCard/LearningCard";
import Footer from "../../Sections/Footer/Footer";
import "./MyLearnings.css";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import Loader from "../../Components/Loader/Loader";

const MyLearnings = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [learnings, setLearnings] = useState([]);
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setToken(currentToken);
    const fetchCourse = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        const config = {
          headers: {
            Authorization: `Bearer ${refreshedToken}`,
            Accept: "application/json",
            pageNo: 0,
            pageSize: 4,
            // tenantId: "public",
          },
        };

        const res = await get("/user/getAllCourse", config);
        if (res) {
          setLoading(false);
        }
        setLearnings(res.data.content);
      } catch (err) {
        console.log("error", err);
      }
    };

    if (currentToken) {
      fetchCourse();
    } else {
      console.log("Token not present");
    }
  }, [token]);

  // const cardDetails = [
  //   {
  //     key: 1,
  //     image: "https://img-c.udemycdn.com/course/750x422/5039162_eb97_5.jpg",
  //     title: "The Complete Personal Finance For Kids and Teenagers Course",
  //     author: "Steeve Simbert",
  //   },
  //   {
  //     key: 2,
  //     image:
  //       "https://us.123rf.com/450wm/jaaakworks/jaaakworks1511/jaaakworks151100024/47825772-cartoon-business-team-steal-money-from-boss.jpg?ver=6",
  //     title: "Financial Foundations for Kids & Money Management",
  //     author: "Amelia Bright",
  //   },
  //   {
  //     key: 3,
  //     image:
  //       "https://bookstr.com/wp-content/uploads/2023/04/childrens-financial-literacy-featured-image-750x400.jpg",
  //     title: "Money Matters Junior and Teenagers Course",
  //     author: "Emma Dollarwise",
  //   },
  //   {
  //     key: 4,
  //     image: "https://tm4k.ala.org/images/background.jpg",
  //     title: "Junior Money Management and Financial Foundations for Kids",
  //     author: "Oliver Pennyfield",
  //   },
  // ];
  return (
    <div className="header myLearning learningContainer  w-full bg-herobg ">
      <div className=" mx-auto min-h-screen w-[90%] pt-12 lg:pt-28">
        <h1 className="dayOne py-5 text-center  text-3xl text-textColor  xl:text-left">
          My Learnings
        </h1>
        <div className="flex flex-wrap  items-center justify-center">
          {!loading ? (
            <>
              {learnings.length > 0 ? (
                learnings.map((cardDetails, index) => (
                  <div key={index}>
                    <LearningCard cardDetails={cardDetails} />
                  </div>
                ))
              ) : (
                <div className="flex  w-full items-center justify-center">
                  <p className=" text-lg font-semibold text-textLightColor">
                    No Data Found
                  </p>
                </div>
              )}
            </>
          ) : (
            <>
              <div className="flex h-[20vh] w-full items-center justify-center md:hidden">
                <Loader color={"#334456"} height={"10%"} width={"10%"} />
              </div>
              <div className="hidden h-[20vh] w-full items-center justify-center md:flex">
                <Loader color={"#334456"} height={"4%"} width={"4%"} />
              </div>
            </>
          )}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default MyLearnings;

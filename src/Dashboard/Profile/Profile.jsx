import React from "react";
import "./Profile.css";
import profile from "../../Assets/Promo/reviewer1.jpg";
import { FaLayerGroup } from "react-icons/fa6";
import cardImg from "../../Assets/courseCard/courseImg.jpg";

const Profile = () => {
  const profileDetails = [
    {
      id: 1,
      title: "User ID",
      data: "Desk10001",
    },
    {
      id: 2,
      title: "EMAIL ADDRESS",
      data: "steeve@gmail.com",
    },
    {
      id: 3,
      title: "USER NAME",
      data: "Steeve Simbert",
    },

    {
      id: 4,
      title: "ADDRESS",
      data: "123,Main Road, Chettikulam,639852",
    },

    {
      id: 5,
      title: "CITY",
      data: "Chettikulam",
    },
    {
      id: 6,
      title: "COUNTRY",
      data: "India",
    },
  ];

  const courseProgress = [
    {
      id: 1,
      title: "The Advanced Web Developer Bootcamp",
      category: "Development",
      progress: "75%",
      img: cardImg,
    },
    {
      id: 2,
      title: "Modern Javascript from The Begining",
      category: "Development",
      progress: "80%",
      img: cardImg,
    },
    {
      id: 3,
      title: "The Web Developer Bootcamp 2021",
      category: "Development",
      progress: "50%",
      img: cardImg,
    },
  ];

  return (
    <div className="h-auto bg-herobg pb-16 sm:h-auto sm:pb-3 xl:h-screen">
      <div className="mx-auto w-11/12  ">
        <div className="profile_header">
          <h2 className="dayOne pt-9 text-2xl text-textColor">Profile</h2>
          <h4 className="text-textLigntColor">
            Welcome to Course Desk Profile page
          </h4>
        </div>
        {/* Top section in Profile Dashboard */}
        <div className="flex flex-col sm:flex-row  sm:gap-6">
          <div className="mt-5 flex gap-6 rounded-md bg-white p-3 shadow-sm sm:w-full lg:w-[35%] xl:w-[25%]">
            <div className="user_profile">
              <img
                src={profile}
                alt=""
                className="h-[60px] w-[60px] rounded-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-semibold capitalize text-textColor sm:text-sm">
                Steeve Simbert
              </p>
              <p className="font-semibold text-[#b4b5c2] sm:text-sm">Admin</p>
            </div>
          </div>
          <div className="mt-5 hidden gap-6 rounded-md bg-white p-3 shadow-sm sm:flex sm:w-full lg:w-[35%] xl:w-[25%]">
            <div className="image flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f5f8fa]">
              <FaLayerGroup className="h-9 w-9 text-textColor" />
            </div>
            <div className="flex flex-col justify-center">
              <p className="font-semibold capitalize text-textColor sm:text-sm">
                My Course
              </p>
              <p className="font-semibold text-[#b4b5c2] sm:text-sm">
                28 Courses
              </p>
            </div>
          </div>
        </div>

        {/* Profile details in Profile Dashboard */}

        <div className="w-full gap-7 sm:flex ">
          <div className="profile_card mt-6 items-center rounded-md bg-white p-3 shadow-sm sm:w-[65%]">
            <div className="mb-4">
              <div className="flex  items-center justify-between">
                <p className="dayOne text-textColor">Personal Information</p>
                <button className="cursor-pointer rounded bg-textColor px-4 py-1.5 text-white sm:px-7">
                  Edit
                </button>
              </div>
              <div className="flex flex-col flex-wrap  sm:flex-row sm:gap-3">
                {profileDetails &&
                  profileDetails.map((item) => {
                    return (
                      <div
                        className=" mt-5 rounded-md bg-[#f5f8fa] p-4 sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[49%]"
                        key={item.id}
                      >
                        <p className="text-sm uppercase text-[#b4b5c2]">
                          {item.title}
                        </p>
                        <p className="font-bold text-textColor">{item.data}</p>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Course Progress */}
          <div className="course_progress sm:w-[35%] ">
            <div className="cursor-pointer">
              <div className="mt-5 flex  gap-6 rounded-md bg-white p-3 shadow sm:hidden sm:w-full lg:w-[35%] xl:w-[25%]">
                <div className="image flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#f5f8fa]">
                  <FaLayerGroup className="h-9 w-9 text-textColor" />
                </div>
                <div className="flex flex-col justify-center">
                  <p className="font-semibold capitalize text-textColor sm:text-sm">
                    My Course
                  </p>
                  <p className="font-semibold text-[#b4b5c2] sm:text-sm">
                    28 Courses
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-7 flex flex-col flex-wrap rounded-sm bg-white p-3">
              <div className="dayOne  text-xl text-textColor">
                Top Course Progress
              </div>
              {courseProgress &&
                courseProgress.map((item) => {
                  return (
                    <div
                      className="mt-5 flex items-center justify-center gap-5 rounded-md bg-[#f5f8fa] p-4 shadow-sm "
                      key={item.id}
                    >
                      <div>
                        <img
                          src={cardImg}
                          alt=""
                          className="h-[60px] w-[120px]  rounded-lg border object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-bold uppercase text-textColor">
                          {item.title}
                        </p>
                        <p className=" text-[#b4b5c2] ">{item.category}</p>
                      </div>
                      <div>
                        <p>{item.progress}</p>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

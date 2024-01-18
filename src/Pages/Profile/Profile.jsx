import React, { useState, useEffect } from "react";
import "./Profile.css";
import profile from "../../Assets/Promo/reviewer1.jpg";
import { FaLayerGroup } from "react-icons/fa6";
import cardImg from "../../Assets/courseCard/courseImg.jpg";
import Modal from "../../Components/Modal/Modal";
import bronze from "../../Assets/reward/Bronze Medal.png";
import gold from "../../Assets/reward/Gold Medal.png";
import silver from "../../Assets/reward/Silver Medal.png";
import children from "../../Assets/reward/graduation.png";
import { post } from "../../ApiCall/ApiCall";
import { get } from "../../ApiCall/ApiCall";

import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";

const Profile = () => {
  const [profileModal, setProfileModal] = useState(false);

  const openProfileModal = () => {
    setProfileModal(!profileModal);
    console.log(profileModal);
  };

  const [errors, setErrors] = useState({});

  const inputs = [
    {
      id: 1,
      name: "userName",
      label: "User Name",
      type: "text",
      pattern: "^[A-Za-z ]{3,}$",
      errorMsg: "Please enter correct name",
      required: true,
    },
    {
      id: 2,
      name: "gender",
      label: "Gender",
      type: "dropdown",
      errorMsg: "Please select an option",

      options: [
        {
          value: "",
          label: "Please select an option",
        },
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
      ],
      required: true,
    },
    {
      id: 3,
      name: "school",
      label: "School",
      type: "text",
      errorMsg: "Please enter your school name",

      required: true,
    },
    {
      id: 4,
      name: "standard",
      label: "Standard",
      type: "text",
      errorMsg: "Please enter valid number",
      pattern: "^(1[0-2]|[1-9])$",
      required: true,
    },

    {
      id: 5,
      name: "city",
      label: "City",
      type: "text",

      errorMsg: "Please enter city",
      required: true,
    },
    {
      id: 6,
      name: "country",
      label: "Country",
      type: "text",

      errorMsg: "Please enter country",
      required: true,
    },
  ];

  const [profileDetails, setProfileDetails] = useState([
    {
      id: 1,
      title: "USER NAME",
      data: localStorage.getItem("Current User") || "",
    },
    {
      id: 2,
      title: "GENDER",
      data: "",
    },
    {
      id: 3,
      title: "SCHOOL",
      data: "",
    },

    {
      id: 4,
      title: "CLASS",
      data: "",
    },

    {
      id: 5,
      title: "CITY",
      data: "",
    },
    {
      id: 6,
      title: "COUNTRY",
      data: "",
    },
  ]);
  console.log(profileDetails);

  const [formData, setFormData] = useState({
    userName: "",
    gender: "",
    school: "",
    standard: "",
    city: "",
    country: "",
  });

  const successNotify = () =>
    toast.success("Updated Successfully!", {
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

  const [token, setToken] = useState(JSON.parse(localStorage.getItem("token")));

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setToken(currentToken);
    const fetchProfileData = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        setToken(refreshedToken);
        const config = {
          headers: {
            id: 354,
          },
        };
        const response = await get("/user/getProfileById", config);
        const profileData = response.data;
        console.log(profileData);

        setFormData({
          userName: profileData.name || "",
          gender: profileData.gender || "",
          school: profileData.school || "",
          standard: profileData.standard || "",
          city: profileData.city || "",
          country: profileData.country || "",
        });

        const newProfileDetails = [
          {
            id: 1,
            title: "USER NAME",
            data:
              profileData.name || localStorage.getItem("Current User") || "",
          },
          { id: 2, title: "GENDER", data: profileData.gender || "" },
          { id: 3, title: "SCHOOL", data: profileData.school || "" },
          { id: 4, title: "STANDARD", data: profileData.standard || "" },
          { id: 5, title: "CITY", data: profileData.city || "" },
          { id: 6, title: "COUNTRY", data: profileData.country || "" },
        ];
        updateProfileDetails(newProfileDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfileData();
  }, []);

  const updateProfileDetails = (newDetails) => {
    console.log("Updated profile", newDetails);
    setProfileDetails(newDetails);
  };

  const profileApi = async () => {
    // Get user ID from localStorage
    const userId = localStorage.getItem("userID");

    // API Call
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const data = {
      id: userId,
      name: formData.userName,
      gender: formData.gender,
      school: formData.school,
      standard: formData.standard,
      city: formData.city,
      country: formData.country,
    };

    try {
      const res = await post("/user/saveAndEditProfile", data, config);
      successNotify();

      // if (userId === res.data.id) {
      //   const newProfileDetails = [
      //     { id: 1, title: "USER NAME", data: res.data.name || "" },
      //     { id: 2, title: "GENDER", data: res.data.gender || "" },
      //     { id: 3, title: "SCHOOL", data: res.data.school || "" },
      //     { id: 4, title: "STANDARD", data: res.data.standard || "" },
      //     { id: 5, title: "CITY", data: res.data.city || "" },
      //     { id: 6, title: "COUNTRY", data: res.data.country || "" },
      //   ];

      //   updateProfileDetails(newProfileDetails);

      //   localStorage.setItem("Current User", res.data.name);
      //   console.log(
      //     "Updated Name in Profile:",
      //     localStorage.getItem("Current User"),
      //   );
      // }

      // return res.data;
      const newdatas = res.data;
      updateProfileDetails(newdatas);
    } catch (error) {
      console.error("API Error:", error);
      errorNotify();
      throw error;
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (formData[name] !== value) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", formData);
    try {
      setErrors({});
      await profileApi();
    } catch (error) {
      console.log(error);
    }

    setProfileModal(false);
  };

  return (
    <div className="h-auto  bg-herobg pb-16 pt-28 sm:h-auto sm:pb-3 xl:h-screen">
      <div className="mx-auto w-11/12  ">
        <div className="profile_header flex justify-between ">
          <div className="flex flex-col">
            <div>
              <h2 className="dayOne pt-9 text-2xl text-textColor">Profile</h2>
              <h4 className="text-textLigntColor">
                Welcome to Course Desk Profile page
              </h4>
            </div>

            <div className=" mt-5 flex gap-6 rounded-md  bg-white p-3 shadow-sm sm:w-full lg:w-[100%] xl:w-[100%]">
              <div className="user_profile ">
                <img
                  src={profile}
                  alt=""
                  className="h-[60px] w-[60px] rounded-full object-cover"
                />
              </div>
              <div className="flex flex-col justify-center">
                <p className="font-semibold  text-textColor sm:text-sm">
                  {
                    profileDetails.find((item) => item.title === "USER NAME")
                      ?.data
                  }
                </p>
                <p className="font-semibold text-[#b4b5c2] sm:text-sm">
                  {localStorage.getItem("email")}
                </p>
              </div>
            </div>
          </div>

          <div className=" flex justify-center ">
            <img
              src={children}
              alt=""
              className="children-img  h-56 object-fill"
            />
          </div>

          <div className=" medals  mt-5 flex items-center justify-around gap-10 rounded-md  bg-white p-3  shadow-sm sm:w-full lg:w-[35%] xl:w-[25%]">
            <div className="image mt-2 flex h-[60px] w-[60px] flex-col items-center justify-center">
              <img
                className="h-[70px] w-[70px] object-contain"
                src={bronze}
                alt=""
              />
              <div className="mt-2 h-[60px] w-12 rounded-full bg-[#2d3a43]">
                <p className="flex justify-center text-white shadow-lg">
                  {localStorage.getItem("bronze")}
                </p>
              </div>
            </div>
            <div className="image ] flex h-[60px] w-[60px] flex-col items-center justify-center">
              <img
                className="h-[100px] w-[100px] object-contain"
                src={gold}
                alt=""
              />
              <div className="mt-2 h-[60px] w-12 rounded-full bg-[#2d3a43]">
                <p className="flex justify-center text-white shadow-lg">
                  {localStorage.getItem("gold")}
                </p>
              </div>
            </div>
            <div className="image mt-2 flex h-[60px] w-[60px] flex-col items-center justify-center">
              <img
                className="h-[70px] w-[70px] object-contain"
                src={silver}
                alt=""
              />
              <div className="mt-2 h-[60px] w-12 rounded-full bg-[#2d3a43]">
                <p className="flex justify-center text-white shadow-lg">
                  {localStorage.getItem("silver")}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Top section in Profile Dashboard */}

        {/* Profile details in Profile Dashboard */}

        <div className="mx-auto mt-5 w-full items-center justify-center  gap-7 lg:flex">
          <div className="profile_card mx-auto mt-6 rounded-md border-black bg-white p-3 shadow-sm lg:w-full">
            <div className="mb-4">
              <div className="mx-5  flex items-center justify-between">
                <p className="dayOne text-textColor">Personal Information</p>
                <button
                  className="cursor-pointer rounded bg-textColor px-4 py-1.5 text-white sm:px-7"
                  onClick={openProfileModal}
                >
                  Edit
                </button>
              </div>
              <div className="flex flex-col flex-wrap  justify-around sm:flex-row sm:gap-3">
                {profileDetails &&
                  profileDetails.map((item) => {
                    return (
                      <div
                        className=" mt-5 rounded-md border  bg-[#f5f8fa] p-4 sm:w-[48%] md:w-[48%] lg:w-[48%] xl:w-[30%]"
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
        </div>
      </div>
      {profileModal && (
        <Modal
          profileModal={profileModal}
          setProfileModal={setProfileModal}
          inputs={inputs}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          formData={formData}
          errors={errors}
        />
      )}
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

export default Profile;

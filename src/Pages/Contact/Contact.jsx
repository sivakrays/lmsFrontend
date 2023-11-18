import React, { useEffect, useState } from "react";
import phone from "../../Assets/form/phone.svg";
import email from "../../Assets/form/email.svg";
import location from "../../Assets/form/location.svg";
import smallCircle from "../../Assets/form/smallCircle.svg";
import bigCircle from "../../Assets/form/bighalfCircle.svg";
import FormInput from "../../Components/FormInput/FormInput";
import "./Contact.css";
import Footer from "../../Sections/Footer/Footer";

import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa6";
import { FaSquareXTwitter } from "react-icons/fa6";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumbe: "",
  });
  const contactInput = [
    {
      id: 1,
      name: "firstName",
      label: "First Name",
      type: "text",
      errorMsg: "Please enter valid name",
      required: true,
    },
    {
      id: 2,
      name: "lastName",
      label: "Last Name",
      type: "text",
      errorMsg: "Please enter valid name",
      required: true,
    },

    {
      id: 3,
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "Please enter valid email",
      required: true,
    },

    {
      id: 4,
      name: "phoneNumber",
      label: "Phone Number",
      type: "number",
      errorMsg: "Please enter valid phone number",
      required: true,
    },
    // {
    //   id: 5,
    //   name: "message",
    //   label: "Message",
    //   type: "text",
    //   maxlength: "50",
    //   errorMsg: "Please enter a message",
    //   required: true,
    // },
  ];

  return (
    <div className="h-[200vh] w-full  bg-herobg md:h-[150vh]">
      <div className="flex flex-col items-center justify-center pt-32">
        <h1 className=" dayOne p-2 text-3xl text-textColor">Contact Us</h1>
        <p className="m-3 text-lg text-textColor">
          Any questions or remarks? Just write us a message!
        </p>
      </div>

      <div
        className="md:boxShadow mx-auto mb-6 flex h-auto w-[95%] flex-wrap items-center rounded-lg 
      p-1 md:mx-auto md:mt-2 md:flex md:h-[600px]
       md:w-5/6 md:flex-nowrap md:bg-mobilebg md:p-3 lg:w-4/6"
      >
        <div
          className="relative mx-auto h-96 w-full overflow-hidden rounded-lg border 
        bg-yellowColor px-6 sm:h-[400px] sm:w-4/5 md:mx-auto md:h-full md:w-full lg:w-1/2"
        >
          <div
            className=" flex flex-col  items-center justify-center py-3 sm:flex  
          sm:flex-col sm:items-start sm:justify-center sm:py-4"
          >
            <h1 className="dayOne text-xl text-textColor sm:mt-3 md:mt-3">
              Contact Information
            </h1>
            <p className="text-sm text-textColor sm:mt-4 sm:text-lg md:mt-2 md:text-sm">
              Say something to start a live chat!
            </p>
          </div>
          <div className="space-y-3 sm:mt-8 md:mt-12 md:flex md:flex-col">
            <div className=" flex-start flex  flex-row items-center  justify-start ">
              <img
                src={phone}
                alt=""
                className="h-8 w-8 pr-2 sm:mb-3 sm:h-10 sm:w-10 sm:pr-3"
              />
              <p className="text-sm  text-textColor">+1023456798</p>
            </div>

            <div className="flex-start flex  flex-row items-center  justify-start ">
              <img
                src={email}
                alt=""
                className="h-8 w-8 pr-2 sm:mb-3 sm:h-10 sm:w-10 sm:pr-3"
              />
              <p className="text-sm text-textColor">demo@gmail.com</p>
            </div>
            <div className="flex-start flex  flex-row items-center  justify-start ">
              <img
                src={location}
                alt=""
                className=" h-8 w-8 pr-2 sm:mb-3 sm:h-10 sm:w-10 sm:pr-3"
              />
              <p className="text-sm text-textColor">
                {" "}
                132 abc street,
                <br />
                demo district <br />
                demo district demo district
              </p>
            </div>
          </div>
          <div className="">
            <img
              src={smallCircle}
              alt=""
              //width={120}
              className="absolute bottom-9 right-12  z-10 w-20 sm:w-24 md:w-32 "
            />
            <img
              src={bigCircle}
              alt=""
              //width={140}
              className="absolute bottom-0 right-0  w-24 sm:w-28 md:w-36"
            />
          </div>

          <div className=" absolute bottom-3  flex ">
            <FaInstagram className="mr-4 " />
            <FaFacebook className="mr-4" />
            <FaSquareXTwitter className="mr-4" />
          </div>
        </div>
        <div className="mx-auto  h-auto w-full sm:w-4/5  md:h-full md:w-full lg:w-1/2">
          <div className="md:mt-3  md:px-5">
            <form action="" className="md:space-y-3">
              {contactInput.map((input) => (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[contactInput.name]}
                  onChange={() => {}}
                  path
                />
              ))}
              <div className="sm:pr-8 md:pr-0">
                <label
                  className="block
            py-2
            text-sm
             font-normal leading-6 text-gray-900"
                >
                  Message
                </label>
                <textarea
                  name=""
                  id=""
                  cols="28"
                  rows="3"
                  className=" inputContact w-full  rounded-lg border"
                ></textarea>
              </div>
              <div className="mt-6  w-full sm:pr-8 md:pr-0">
                <button
                  type="submit"
                  className=" mx-auto mt-4 flex w-full items-center justify-center rounded-md bg-yellow-500
                   px-7 
                  py-3.5 text-sm font-semibold text-white
                   shadow-sm hover:bg-yellow-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
export default Contact;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../ApiCall/ApiCall";
import FormInput from "../../Components/FormInput/FormInput";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
  const [isSignupClicked, setIsSignupClicked] = useState(false);
  const [values, setValues] = useState({
    fullname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const inputs = [
    {
      id: 1,
      name: "fullname",
      label: "Full Name",
      type: "text",
      errorMsg: "Please enter correct name",
      required: true,
    },
    {
      id: 2,
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "Please enter valid email",
      required: true,
      //pattern: "^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$",
    },
    {
      id: 3,
      name: "password",
      label: "Password",
      type: "password",
      errorMsg:
        "Password must contain  atleast 6 characters and do not exceed 8 characters",
      pattern: `^[a-zA-Z0-9]{6,8}$`,
      required: true,
    },
    {
      id: 4,
      name: "confirmPassword",
      label: "Confirm Paasword",
      type: "password",
      errorMsg: "Password does not matched",
      pattern: values.password,
      required: true,
    },
  ];
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    setIsSignupClicked(true);
    e.preventDefault();
    if (values !== "") {
      signUp(values);
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
  const signUp = async ({ fullname, email, password, confirmPassword }) => {
    //API Call
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const data = {
      name: fullname,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    try {
      const response = await post(`/auth/register`, data, config);
      successNotify();
      setIsSignupClicked(false);
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      if (error.response.status === 403) {
        setIsSignupClicked(false);
        errorNotify("Please provide valid gmail");
      }
    }
  };

  return (
    <div className="imageBg flex  h-full w-full items-center justify-center bg-herobg px-1 pt-28">
      <div className="mx-auto mb-10  flex h-auto  w-[90%] flex-col rounded-md border-2 border-[#334456bf] bg-[#FFF7E0] p-5  boxShadow sm:w-96 md:mt-20">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="dayOne text-center text-3xl uppercase text-textColor">
            Signup
          </h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[inputs.name]}
              onChange={handleChange}
            />
          ))}

          <div className="mt-6 sm:col-span-7">
            <button
              type="submit"
              className={`mt-4 w-full rounded-md bg-yellow-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm
               hover:bg-yellow-600 ${
                 isSignupClicked
                   ? "cursor-progress opacity-50"
                   : "cursor-pointer"
               } `}
              data-testid="signupbutton"
              disabled={isSignupClicked === true}
            >
              SIGNUP
            </button>
          </div>
        </form>
        <div className="mt-8 w-full">
          <p className="text-textLigntColor">
            Already have an account? Please{" "}
            <span className="text-center text-blue-600 underline">
              <Link to="/login">login</Link>
            </span>
          </p>
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

export default Signup;

import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { authContext } from "../../Context/AuthContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login, isButtonClicked, setIsButtonClicked } =
    useContext(authContext);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const inputs = [
    {
      id: 1,
      name: "email",
      label: "Email",
      type: "email",
      errorMsg: "Please enter valid email",
      //pattern: `^[a-zA-Z0-9. _-]+@[a-zA-Z0-9. -]+.[a-zA-Z]{2,4}$`,
      required: true,
    },
    {
      id: 2,
      name: "password",
      label: "Password",
      type: "password",
      errorMsg:
        "Password must contain  atleast 6 characters do not exceed 8 characters",
      required: true,
      pattern: `^[a-zA-Z0-9]{6,8}$`,
    },
  ];

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    setIsButtonClicked(true);
    e.preventDefault();
    await login(values);
    const token = localStorage.getItem("token");
    if (token != null && token !== "") {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  };

  return (
    <div className="imageBg loginContainer flex w-full items-center justify-center bg-herobg px-1 pb-20 pt-28 lg:pt-36">
      <div className="flex h-auto w-[90%] flex-col rounded-md border-2 border-[#334456bf] bg-[#FFF7E0] p-5 boxShadow  sm:w-96 ">
        <form action="" onSubmit={handleSubmit} data-testid="form">
          <h1
            className="dayOne text-center text-3xl uppercase text-textColor"
            data-testid="header"
          >
            Login
          </h1>
          {inputs.map((input) => (
            <FormInput
              key={input.id}
              {...input}
              value={values[inputs.name]}
              onChange={handleChange}
              data-testid="input"
            />
          ))}

          <div className="mt-6 sm:col-span-7">
            <button
              data-testid="login"
              type="submit"
              className={`mt-4 w-full rounded-md bg-yellow-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 ${
                isButtonClicked
                  ? "cursor-progress opacity-50"
                  : "cursor-pointer"
              }`}
              disabled={isButtonClicked === true}
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className="mt-8">
          <p className="text-textLightColor" data-testid="para">
            {" "}
            If you don't have an account? Please{" "}
            <span
              className="text-center text-blue-600 underline"
              data-testid="link"
            >
              <Link to="/signup">signup</Link>
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

export default Login;

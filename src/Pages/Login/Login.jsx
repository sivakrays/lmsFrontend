import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { authContext } from "../../Context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(authContext);
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
      required: true,
    },
    {
      id: 2,
      name: "password",
      label: "Password",
      type: "password",
      errorMsg:
        "Password must contain 8 characters including one special character and one number",
      required: true,
      pattern: `^(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8}$`,
    },
  ];

  const successNotify = () =>
    toast.success("Register Successfully!", {
      position: "top-right",
      autoClose: 5000,
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
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  //console.log(values);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login successfull", values);
    //const data = JSON.stringify(values);
    login(values, successNotify, errorNotify);
    navigate("/home");
  };

  return (
    <div className="imageBg flex h-screen w-full items-center justify-center bg-herobg px-1">
      <div className="flex h-auto  w-96 flex-col rounded-md border-2 border-[#334456bf] bg-[#FFF7E0] p-5  boxShadow">
        <form action="" onSubmit={handleSubmit}>
          <h1 className="text-text text-center text-3xl uppercase">Login</h1>
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
              className="mt-4 w-full rounded-md bg-yellow-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 "
            >
              LOGIN
            </button>
          </div>
        </form>
        <div className="mt-8">
          <p>
            {" "}
            If you don't have an account? Please{" "}
            <span className="text-center text-blue-600 underline">
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
      />
    </div>
  );
};

export default Login;

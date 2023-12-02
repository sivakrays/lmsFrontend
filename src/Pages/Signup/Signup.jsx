import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../ApiCall/ApiCall";
import FormInput from "../../Components/FormInput/FormInput";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();
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
    },
    {
      id: 3,
      name: "password",
      label: "Password",
      type: "password",
      errorMsg: "Password must contain  atleast 6 characters",
      pattern: `^(?=.*[a-zA-Z\d])[a-zA-Z\d]{6,}$`,
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
    e.preventDefault();
    //console.log("handle submit called");
    if (values !== "") {
      // console.log("Signup successfull", values);
      //const data = JSON.stringify(values);
      //console.log("Data from signup", data);
      signUp(values);
    }
  };

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
  const signUp = async ({ fullname, email, password, confirmPassword }) => {
    // console.log("signup called");
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

    console.log("Dataaaa", data);
    try {
      const response = await post(`/register`, data, config);
      console.log("response", response);
      successNotify();
      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      console.log(error.message);
      errorNotify(error.message);
    }
    // .then((res) => {
    //   console.log("response",res);
    //   successNotify();
    //   setTimeout(() => {
    //     navigate("/login");
    //   }, 1000);
    // })
    // .catch((error) => {
    //   console.log(error.message);
    //   errorNotify(error.message);
    // });
  };

  return (
    <div className="imageBg flex  h-screen w-full items-center justify-center bg-herobg px-1 pt-20">
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
              className="mt-4 w-full rounded-md bg-yellow-500 px-7 py-2.5 text-sm font-semibold text-white shadow-sm
               hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2
                focus-visible:outline-indigo-600 "
              data-testid="signupbutton"
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

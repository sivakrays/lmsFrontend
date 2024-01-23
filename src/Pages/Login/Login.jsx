import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormInput from "../../Components/FormInput/FormInput";
import { authContext } from "../../Context/AuthContext";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./Login.css";
import { get } from "../../ApiCall/ApiCall";

const Login = () => {
  const navigate = useNavigate();
  const { login, isButtonClicked, setIsButtonClicked } =
    useContext(authContext);
  const [dropdown, setDropDown] = useState([]);

  useEffect(() => {
    const fetchTenant = async () => {
      try {
        const res = await get("/endpoint");
        const dropDownValue =
          res.data &&
          res.data.length > 0 &&
          res.data.map((item) => {
            return { label: item, value: item };
          });
        setDropDown(dropDownValue);
      } catch (error) {
        console.log("errr", error);
      }
    };
    fetchTenant();
  }, []);

  const [values, setValues] = useState({
    email: "",
    password: "",
    tenant: "",
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
    {
      id: 3,
      name: "tenant",
      label: "Tenant",
      type: "dropdown",
      // errorMsg:
      //   "Password must contain  atleast 6 characters do not exceed 8 characters",
      required: true,
    },
  ];

  const dropDown = [
    "option1",
    "option2",
    "option3",
    "option4",
    "option5",
    "option6",
    "option7",
    "option8",
    "option9",
    "option10",
  ];

  const options = dropDown.map((item) => {
    return { label: item, value: item };
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleDropdownChange = async (selectedOptions) => {
    console.log("selectedOptions", selectedOptions);
    const selectedValue =
      selectedOptions && selectedOptions.length > 0
        ? selectedOptions[0].value
        : "";

    console.log("selected Value", selectedValue);
    if (!selectedValue) {
      try {
        const config = {
          tenant: selectedValue,
        };
        const res = await post("/endPoint", config);
        const tenantId = res.data && res.data.tenantId;
        setValues((prevValues) => ({
          ...prevValues,
          tenant: tenantId,
        }));
      } catch (error) {
        console.log("errorr", error);
      }
    }
  };

  const handleSubmit = async (e) => {
    console.log("values", values);
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
              options={options}
              handleDropdownChange={handleDropdownChange}
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
          <p className="text-textLigntColor" data-testid="para">
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

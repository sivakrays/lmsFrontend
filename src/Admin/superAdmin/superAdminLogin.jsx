import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../../ApiCall/ApiCall";
import logo1 from "../../Assets/Admin/kraysLogoNoBg.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SuperAdminLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const pathName = window.location.pathname;
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);

  const successNotify = (msg) =>
    toast.success(msg, {
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

  const handleInputchange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });

    if (name === "email") {
      setEmailError("");
    } else if (name === "password") {
      setPasswordError("");
    }
  };

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (loginData.email === "") {
      setEmailError("Please fill the field");
      return false;
    } else if (!emailRegex.test(loginData.email)) {
      setEmailError("Invalid email format");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
    if (loginData.password === "") {
      setPasswordError("Please fill the field");
      return false;
    } else if (!passwordRegex.test(loginData.password)) {
      setPasswordError(
        "Password must be at least 6 characters long and include one digit and one special character",
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleTenantLogin = async () => {
    try {
      const config = {
        headers: {
          email: loginData.email,
          password: loginData.password,
        },
      };
      const res = await post(`tenant/tenantLogin`, {}, config);
      setLoading(false);
      if (res.status === 200) {
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("tenantId", res.data.tenantId);
        successNotify("Successfully Login");
        setTimeout(() => {
          navigate("/users");
        }, 1000);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 403) {
        errorNotify("Bad Credetials!");
        setLoginData({
          email: "",
          password: "",
        });
      } else if (err.message === "Network Error") {
        errorNotify("Poor Connection!");
      }
    }
  };

  const handleSuperAdminLogin = async () => {
    try {
      const config = {
        headers: {
          email: loginData.email,
          password: loginData.password,
        },
      };
      const res = await post(`admin/adminLogin`, {}, config);
      setLoading(false);
      if (res.status === 200) {
        successNotify("Successfully Login");

        setTimeout(() => {
          navigate("/users");
        }, 1000);
        localStorage.setItem("role", res.data.role);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 403) {
        errorNotify("Bad Credetials!");
        setLoginData({
          email: "",
          password: "",
        });
      } else if (err.message === "Network Error") {
        errorNotify("Poor Connection!");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const isEmailValid = validateEmail();
    const isValidPassword = validatePassword();
    if (!isEmailValid || !isValidPassword) {
      return;
    } else if (pathName === "/superAdmin") {
      handleSuperAdminLogin();
      setLoading(true);
    } else {
      handleTenantLogin();
      setLoading(true);
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="mb-6 flex items-center  text-2xl font-semibold text-textColor dark:text-white">
            <img
              className="  h-14 w-14 object-contain"
              src={logo1}
              alt="logo"
            />
            {pathName === "/superAdmin" && (
              <span className="text-textColor">Krays Infotech</span>
            )}
            {pathName === "/tenantAdmin" && (
              <span className="text-textColor">Tenant Login</span>
            )}
          </div>
          <div className="w-full rounded-lg bg-white shadow dark:border dark:border-gray-700 dark:bg-gray-800 sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-textColor dark:text-white md:text-2xl">
                Login to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-textColor dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-textColor dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 "
                    placeholder="name@company.com"
                    //required
                    value={loginData.email.trim()}
                    onChange={handleInputchange}
                  />
                  {emailError && (
                    <p className="mt-1 text-[10px] text-red-600">
                      {emailError}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-textColor dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 sm:text-sm"
                    //required
                    value={loginData.password.trim()}
                    onChange={handleInputchange}
                  />
                  {passwordError && (
                    <p className="mt-1 text-[10px] text-red-600 ">
                      {passwordError}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className={`w-full rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none  ${
                    loading === true
                      ? "cursor-progress opacity-50"
                      : "cursor-pointer"
                  }`}
                  disabled={loading === true}
                >
                  Login
                </button>
                {pathName !== "/superAdmin" && (
                  <div className="mt-8">
                    <p className="text-textLightColor" data-testid="para">
                      User's Login ! click here{" "}
                      <span
                        className="text-center text-blue-600 underline"
                        data-testid="link"
                      >
                        <Link to="/login">User</Link>
                      </span>
                    </p>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
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
    </>
  );
};

export default SuperAdminLogin;

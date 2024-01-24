import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { post } from "../../ApiCall/ApiCall";
import logo from "../../Assets/Admin/kraysLogo.jpg";
import logo1 from "../../Assets/Admin/kraysLogoNoBg.png";

const TenantAdminLogin = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
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
    } else if (passwordRegex) {
      setPasswordError(
        "Password must be at least 6 characters long and include one digit and one special character",
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEmailValid = validateEmail();
    // const isValidPassword = validatePassword();
    if (!isEmailValid) {
      return;
    } else {
      try {
        const config = {
          headers: {
            email: loginData.email,
            password: loginData.password,
          },
        };
        const res = await post(`tenant/tenantLogin`, {}, config);
        if (res !== "") {
          localStorage.setItem("role", "tenant");
          navigate("/users");
        }
      } catch (error) {
        console.log("err", error);
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 lg:py-0">
          <div className="mb-6 flex items-center text-2xl font-semibold text-gray-900 dark:text-white">
            <img
              className="  h-14 w-14 object-contain"
              src={logo1}
              alt="logo"
            />
            <span className="text-textColor">Tenant Login</span>
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
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 "
                    placeholder="name@company.com"
                    //required
                    value={loginData.email.trim()}
                    onChange={handleInputchange}
                  />
                  {emailError && (
                    <p className="text-sm text-red-600">{emailError}</p>
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
                    <p className="text-sm text-red-600 ">{passwordError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-yellow-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none "
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TenantAdminLogin;

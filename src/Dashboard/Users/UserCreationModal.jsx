import React, { useState } from "react";
import { post } from "../../ApiCall/ApiCall";
import InputField from "../../Components/CommonInputField/CommonInputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";

const UserCreationModal = ({
  setIsCreation,
  isCreation,
  loading,
  setLoading,
  closeModal,
  getAllData,
  setGetAllData,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

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

  const userRegistreation = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        tenantId: localStorage.getItem("tenantId"),
      },
    };

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
      role: formData.role,
    };
    try {
      const res = await post("/auth/register", data, config);
      setLoading(false);
      if (res.status === 200 && res.data) {
        setGetAllData(!getAllData);
        successNotify("User Created Successfully!");
        setFormData({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        setIsCreation(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 403) {
        errorNotify("user Alredy exist!");
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      userRegistreation();
      setError("");
      setLoading(true);
    } else {
      setError("Password And Confirm Password Must be Same");
    }
  };

  const formStyle = "flex w-full flex-col   ";

  return (
    <div
      className="fixed  top-0 h-full w-full overflow-y-auto overflow-x-hidden md:inset-0"
      data-modal-backdrop="static"
      data-testid="modal"
      style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
    >
      <div className="relative mx-auto  mt-5 w-[280px] rounded-md bg-white p-8 shadow sm:w-[400px]">
        <button
          type="button"
          onClick={() => closeModal()}
          className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-full  border bg-textColor p-1 text-white"
        >
          x
        </button>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="creationForm flex flex-col flex-wrap gap-4  md:flex-row md:gap-8">
            <InputField
              label="User Name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              pattern=".{5,}"
              title="please ensure that field minimum have 5 letters"
              required
              formStyle={formStyle}
            />
            <InputField
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              pattern="[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+"
              title="please Enter the valid E-Mail"
              required
              formStyle={formStyle}
            />
            <InputField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$"
              title="please Enter the valid Password"
              required
              formStyle={formStyle}
            />
            <InputField
              label="Confirm Password"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              pattern="^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$"
              title="please ensure Password and Confirm Password are Same"
              required
              formStyle={formStyle}
            />
            {error && <p className="text-xs text-red-700">{error}</p>}

            <div className="flex gap-3">
              <label
                htmlFor=""
                className="flex items-center gap-2 text-textLightColor"
              >
                Teacher
                <input
                  type="radio"
                  name="role"
                  id="role1"
                  value={"admin"}
                  className="cursor-pointer"
                  style={{ width: 17, height: 17 }}
                  checked={formData.role === "admin"}
                  onChange={handleInputChange}
                  required
                />
              </label>
              <label
                htmlFor=""
                className="flex items-center gap-2 text-textLightColor"
              >
                Student
                <input
                  checked={formData.role === "user"}
                  type="radio"
                  name="role"
                  id="role2"
                  value={"user"}
                  className="cursor-pointer"
                  style={{ width: 17, height: 17 }}
                  onChange={handleInputChange}
                  required
                />
              </label>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className=" mt-8 w-[150px] rounded-md border bg-textColor py-1.5 text-white"
              disabled={loading === true}
            >
              {loading === true ? (
                <div className="flex items-center justify-center">
                  <Loader color={"#FFFFFF"} height={"15%"} width={"15%"} />
                </div>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserCreationModal;

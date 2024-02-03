import React, { useState } from "react";
import { post } from "../../ApiCall/ApiCall";
import InputField from "../../Components/CommonInputField/CommonInputField";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../Components/Loader/Loader";

const CreationModal = ({
  setIsCreation,
  isCreation,
  loading,
  setLoading,
  closeModal,
  setGetAllData,
  getAllData,
}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    tenantId: "",
    issuer: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
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

  const tenantRegistreation = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const data = {
      email: formData.email,
      password: formData.password,
      tenantId: formData.tenantId,
      issuer: formData.issuer,
    };
    try {
      const res = await post("/tenant/registerTenant", data, config);
      console.log(res);
      if (Boolean(res)) {
        setIsCreation(false);
        setLoading(false);
        successNotify();
        setGetAllData(!getAllData);
      }
    } catch (error) {
      const err = error.response.data;
      if (error.response.status === 409) {
        errorNotify(err);
        setFormData({
          email: "",
          password: "",
          confirmPassword: "",
          tenantId: "",
          issuer: "",
        });
        setLoading(false);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      tenantRegistreation();
      setError("");
      setLoading(true);
    } else {
      setError("Password And Confirm Password Must be Same");
    }
  };

  const formStyle = "flex w-full flex-col   ";

  return (
    <div
      className="fixed top-0 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
      data-modal-backdrop="static"
      data-testid="modal"
      style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
    >
      <div className="relative mb-8 mt-28  w-[400px] rounded-md bg-white p-8 shadow">
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
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              pattern="/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/v"
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
            <InputField
              label="Tenant ID"
              name="tenantId"
              type="text"
              value={formData.tenantId}
              onChange={handleInputChange}
              pattern=".{5,}"
              title="please ensure that field minimum have 5 letters"
              required
              formStyle={formStyle}
            />
            <InputField
              label="Issuer"
              name="issuer"
              type="text"
              value={formData.issuer}
              onChange={handleInputChange}
              pattern=".{5,}"
              title="please ensure that field minimum have 5 letters"
              required
              formStyle={formStyle}
            />
          </div>
          <div>
            <button
              type="submit"
              className=" mt-8 w-[150px] rounded-md border bg-textColor py-1.5 text-white"
              disabled={loading === true}
            >
              {loading === true ? (
                <div className="flex cursor-progress items-center justify-center">
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

export default CreationModal;

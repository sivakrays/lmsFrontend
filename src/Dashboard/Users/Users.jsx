import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import data from "../../Data/Data";
import InputField from "../../Components/CommonInputField/CommonInputField";
import { get, post } from "../../ApiCall/ApiCall";

const CreationModal = ({ setIsCreation, isCreation }) => {
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
    } catch (error) {
      console.error("Error registering tenant:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      tenantRegistreation();
      setError("");
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
          onClick={() => setIsCreation(!isCreation)}
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
            {error && error}
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
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const UserCreationModal = ({ setIsCreation, isCreation }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const userRegistreation = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        tenantId: "sivaDB",
      },
    };

    const data = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirmPassword: formData.confirmPassword,
    };
    try {
      const res = await post("/auth/register", data, config);
      console.log(res);
    } catch (error) {
      console.error("Error registering tenant:", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password === formData.confirmPassword) {
      userRegistreation();
      setError("");
      setFormData({ name: "", email: "", password: "", confirmPassword: "" });
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
      <div className="relative w-[400px]  rounded-md bg-white p-8 shadow">
        <button
          type="button"
          onClick={() => setIsCreation(!isCreation)}
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
            {error && error}
          </div>
          <div>
            <button
              type="submit"
              className=" mt-8 w-[150px] rounded-md border bg-textColor py-1.5 text-white"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Users = () => {
  const [isCreation, setIsCreation] = useState(false);
  const [allUsers, setAllUsers] = useState([]);

  const role = "";

  useEffect(() => {
    const getAllTenantUser = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        const res = await get("/tenant/getAllTenants", config);
        setAllUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getAllUsers = async () => {
      console.log("working");
    };

    if (role === "admin") {
      getAllTenantUser();
    } else {
      getAllUsers();
    }
  }, [role]);

  return (
    <>
      <div className="h-screen w-full bg-herobg">
        <div className="mx-auto w-11/12  ">
          <div className="profile_header">
            <h2 className="dayOne pt-9 text-2xl text-textColor">Users</h2>
            <h4 className="text-textLightColor">
              Welcome to{" "}
              <Link to="/" className="dayOne">
                {data[0].title}
              </Link>{" "}
              Users Page
            </h4>
          </div>

          <div className="registreationContainer  h-auto   py-2 lg:w-[90%]">
            <div className="flex justify-end">
              <button
                onClick={() => setIsCreation(!isCreation)}
                className="mr-2 w-[150px] rounded-md border bg-textColor py-1.5 text-white"
              >
                Add
              </button>
            </div>
            <div className="w-full ">
              <div className="heading mt-2 flex justify-between rounded-md bg-gray-300 p-4">
                {["E-Mail", "Tenant ID", "Issuer"].map((heading, i) => (
                  <div className="w-2/6" key={i}>
                    <p className="text-[15px] font-semibold uppercase text-textColor">
                      {heading}
                    </p>
                  </div>
                ))}
              </div>
              {allUsers &&
                allUsers.map((tenant, i) => (
                  <div className="heading flex justify-between p-4" key={i}>
                    <div className="w-2/6">
                      <p>Manoj@gmail.com</p>
                    </div>

                    <div className="w-2/6">
                      <p>{tenant}</p>
                    </div>

                    <div className="w-2/6">
                      <p>Manoj</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Register Modal */}

        {role === "admin" && isCreation ? (
          <CreationModal
            setIsCreation={setIsCreation}
            isCreation={isCreation}
          />
        ) : (
          role === "" &&
          isCreation && (
            <UserCreationModal
              setIsCreation={setIsCreation}
              isCreation={isCreation}
            />
          )
        )}
      </div>
    </>
  );
};

export default Users;

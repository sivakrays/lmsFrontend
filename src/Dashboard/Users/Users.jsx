import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import data from "../../Data/Data";
import { get, post } from "../../ApiCall/ApiCall";
import CreationModal from "./CreationModal";
import UserCreationModal from "./UserCreationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserModal = ({
  role,
  isCreation,
  setIsCreation,
  loading,
  setLoading,
  closeModal,
}) => {
  return role === "admin" ? (
    <CreationModal
      setIsCreation={setIsCreation}
      isCreation={isCreation}
      loading={loading}
      setLoading={setLoading}
      closeModal={closeModal}
    />
  ) : (
    <UserCreationModal
      setIsCreation={setIsCreation}
      isCreation={isCreation}
      loading={loading}
      setLoading={setLoading}
      closeModal={closeModal}
    />
  );
};

const Users = () => {
  const [isCreation, setIsCreation] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const role = "admin";

  const closeModal = () => {
    setIsCreation(!isCreation);
    setLoading(false);
  };

  useEffect(() => {
    const getAllUserData = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      try {
        if (role === "admin") {
          const res = await get("/tenant/getAllTenants", config);
          setAllUsers(res.data);
        } else {
          const res = await get("/tenant/getAllTenants", config);
          setAllUsers(res.data);
        }
      } catch (err) {
        console.log(err);
      }
    };

    return () => getAllUserData();
  }, [role]);

  return (
    <>
      <div className="min-h-screen w-full bg-herobg">
        <div className="mx-auto w-11/12  ">
          <div className="profile_header">
            <h2 className="dayOne pt-4 text-2xl text-textColor sm:pt-9">
              Users
            </h2>
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
              <div className="heading mt-2 flex justify-between rounded-t-md bg-gray-300 p-4 ">
                <div className="w-2/6">
                  <p className="text-[15px] font-semibold uppercase text-textColor">
                    E-Mail
                  </p>
                </div>

                <div className="w-2/6">
                  <p className="text-[15px] font-semibold uppercase text-textColor">
                    TenantID
                  </p>
                </div>

                <div className="w-2/6">
                  <p className="text-[15px] font-semibold uppercase text-textColor">
                    Issuer
                  </p>
                </div>

                <div className="w-2/6">
                  <p className="text-[15px] font-semibold uppercase text-textColor">
                    Action
                  </p>
                </div>
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

                    <div className="w-2/6">
                      <p>Action</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>

        {/* Register Modal */}
        {isCreation && (
          <UserModal
            role={role}
            setIsCreation={setIsCreation}
            isCreation={isCreation}
            loading={loading}
            setLoading={setLoading}
            closeModal={closeModal}
          />
        )}
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
    </>
  );
};

export default Users;

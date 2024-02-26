import React, { useEffect, useState } from "react";
import "./Users.css";
import { Link } from "react-router-dom";
import data from "../../Data/Data";
import { del, get, post } from "../../ApiCall/ApiCall";
import CreationModal from "./CreationModal";
import UserCreationModal from "./UserCreationModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Pagination from "../../Components/Pagination/Pagination";
import Loader from "../../Components/Loader/Loader";
import "./Users.css";

const UserModal = ({
  role,
  isCreation,
  setIsCreation,
  loading,
  setLoading,
  closeModal,
  setGetAllData,
  getAllData,
}) => {
  return role === "owner" ? (
    <CreationModal
      setIsCreation={setIsCreation}
      isCreation={isCreation}
      loading={loading}
      setLoading={setLoading}
      closeModal={closeModal}
      setGetAllData={setGetAllData}
      getAllData={getAllData}
    />
  ) : (
    <UserCreationModal
      setIsCreation={setIsCreation}
      isCreation={isCreation}
      loading={loading}
      setLoading={setLoading}
      closeModal={closeModal}
      setGetAllData={setGetAllData}
      getAllData={getAllData}
    />
  );
};

const Users = () => {
  const [isCreation, setIsCreation] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getAllData, setGetAllData] = useState(false);
  const role = localStorage.getItem("role");

  const [isEmpty, setIsEmpty] = useState(true);

  //Pagination State
  const [pageNo, setPageNo] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  const [pageSize] = useState(10);

  const closeModal = () => {
    setIsCreation(!isCreation);
    setLoading(false);
  };

  useEffect(() => {
    const getAllUserData = async () => {
      const getAllUsers = async () => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            tenantId: localStorage.getItem("tenantId"),
            pageNo: parseInt(pageNo),
            pageSize: pageSize,
          },
        };
        const res = await get("/auth/getAllUser", config);
        setIsEmpty(false);
        if (res.status === 200 && res.data.content) {
          setAllUsers(res.data.content);
          setTotalPage(res.data.totalPages);
          setTotalCourses(res.data.totalElements);
        }
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            pageNo: parseInt(pageNo),
            pageSize: pageSize,
          },
        };
        switch (role) {
          case "owner":
            const res = await get("/admin/viewAllTenants", config);
            setIsEmpty(false);
            if (res.status === 200 && res.data.content) {
              setAllUsers(res.data.content);
              setTotalPage(res.data.totalPages);
              setTotalCourses(res.data.totalElements);
            }
            break;

          case "manager":
            getAllUsers();
            break;

          default:
            break;
        }
      } catch (err) {
        console.log(err);
        //  if (err.message === "Network Error") {
        //    errorNotify("Poor network Connection!");
        //  }
      }
    };

    getAllUserData();
  }, [getAllData, pageNo]);

  // Pagination logic

  const calculateRange = () => {
    const startRange = pageNo * pageSize + 1;
    const endRange = Math.min((pageNo + 1) * pageSize, totalCourses);
    return { startRange, endRange };
  };

  const paginate = (pageNo) => {
    if (pageNo >= 0 && pageNo <= totalpage) {
      setPageNo(pageNo);
    }
  };

  const [deleteLoader, setDeleteLoader] = useState(false);
  const [clickedItem, setClickedItem] = useState(null);

  const handleDelete = async (tenantId) => {
    setClickedItem(tenantId);
    setDeleteLoader(true);
    console.log(tenantId);
    try {
      switch (role) {
        case "owner":
          const config = {
            headers: {
              "Content-Type": "application/json",
              tenantId: localStorage.getItem("tenantId"),
              id: tenantId,
              pageNo: parseInt(pageNo),
              pageSize: pageSize,
            },
          };
          const response = await del(`/admin/deleteTenantById`, config);
          setDeleteLoader(false);
          if (response.status === 200 && response.data.content) {
            setAllUsers(response.data.content);
            setTotalPage(response.data.totalPages);
            setTotalCourses(response.data.totalElements);
          }
          break;
        case "manager":
          const config1 = {
            headers: {
              "Content-Type": "application/json",
              tenantId: localStorage.getItem("tenantId"),
              userId: tenantId,
              pageNo: parseInt(pageNo),
              pageSize: pageSize,
            },
          };
          const res = await del(`/auth/deleteUserById`, config1);
          setDeleteLoader(false);
          if (res.status === 200 && res.data.content) {
            setAllUsers(res.data.content);
            setTotalPage(res.data.totalPages);
            setTotalCourses(res.data.totalElements);
          }
          break;
        default:
          break;
      }
    } catch (err) {
      console.log(err);
    }
  };

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
                className="addBtn mr-2 rounded-md border bg-textColor py-1.5 text-white sm:w-[100px]"
              >
                Add
              </button>
            </div>
            <div className="w-full ">
              <div className="heading mt-2 flex justify-between rounded-t-md bg-gray-300 p-4 ">
                <div className="w-1/4">
                  <p className="heading text-[15px] font-semibold uppercase text-textColor">
                    E-Mail
                  </p>
                </div>

                <div className="w-1/4">
                  <p className="heading text-[15px] font-semibold uppercase text-textColor">
                    {role === "owner" ? "TenantID" : "role"}
                  </p>
                </div>

                <div className="w-1/4">
                  <p className="heading text-[15px] font-semibold uppercase text-textColor">
                    {role === "owner" ? "Issuer" : "Name"}
                  </p>
                </div>

                <div className="w-1/4">
                  <p className="heading text-[15px] font-semibold uppercase text-textColor">
                    Action
                  </p>
                </div>
              </div>
              <div className="rounded-b-md bg-white">
                {isEmpty === false ? (
                  allUsers.length > 0 ? (
                    <>
                      {allUsers.map((tenant, i) => (
                        <div key={i} className="cursor-pointer border-b">
                          <div className="heading flex  w-full flex-wrap justify-between  p-4">
                            <div className="w-1/4 overflow-scroll  ">
                              <p>{tenant.email}</p>
                            </div>

                            <div className="w-1/4 overflow-scroll  pl-3">
                              <p>
                                {role === "owner"
                                  ? `${tenant.tenantId}`
                                  : `${tenant.role}`}
                              </p>
                            </div>

                            <div className="w-1/4 overflow-scroll">
                              <p>
                                {role === "owner"
                                  ? `${tenant.issuer}`
                                  : `${tenant.name}`}
                              </p>
                            </div>

                            <div className="w-1/4 overflow-scroll">
                              <button
                                onClick={() => handleDelete(tenant.id)}
                                type="button"
                              >
                                {deleteLoader === true &&
                                clickedItem === tenant.id ? (
                                  <>
                                    <span className="flex w-[100px] items-center justify-center object-cover">
                                      <Loader
                                        color={"#334455"}
                                        height={"25%"}
                                        width={"25%"}
                                      />
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <svg
                                      className="h-8 w-8 rounded-full bg-red-100 p-1 text-red-600"
                                      fill="none"
                                      stroke="currentColor"
                                      viewBox="0 0 24 24"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                      ></path>
                                    </svg>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                      <Pagination
                        calculateRange={calculateRange}
                        paginate={paginate}
                        totalCourses={totalCourses}
                        pageNo={pageNo}
                        totalpage={totalpage}
                      />
                    </>
                  ) : (
                    <>
                      <p className="py-6 text-center font-semibold text-textLightColor">
                        No Data found
                      </p>
                    </>
                  )
                ) : (
                  <>
                    <div className="flex h-[20vh] w-full items-center justify-center md:hidden">
                      <Loader color={"#334456"} height={"10%"} width={"10%"} />
                    </div>
                    <div className="hidden h-[20vh] w-full items-center justify-center md:flex">
                      <Loader color={"#334456"} height={"4%"} width={"4%"} />
                    </div>
                  </>
                )}
              </div>
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
            setGetAllData={setGetAllData}
            getAllData={getAllData}
            // pagination data
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

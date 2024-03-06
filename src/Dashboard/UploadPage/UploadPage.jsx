import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../Data/Data";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseForm from "../MyCourse/CourseForm";
import { del, get } from "../../ApiCall/ApiCall";
import { checkAndRefreshToken } from "../../utils/RefreshToken/RefreshToken";
import Loader from "../../Components/Loader/Loader";
import "../MyCourse/MyCourse.css";
import Pagination from "../../Components/Pagination/Pagination";
import Editor from "./Editor";

const UploadModal = ({
  setIsCourseUpload,
  bearer_token,
  setCourseId,
  sectionFormVisible,
  setSectionFormVisibile,
  courseId,
  loading,
  setLoading,
  closeModal,
  setCourseUpdated,
}) => {
  return (
    <div
      className="fixed top-0  h-full w-full  overflow-y-auto overflow-x-hidden md:inset-0"
      data-modal-backdrop="static"
      data-testid="modal"
      style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
    >
      {sectionFormVisible === true ? (
        <Editor
          setCourseId={setCourseId}
          courseId={courseId}
          bearer_token={bearer_token}
          setSectionFormVisibile={setSectionFormVisibile}
          setIsCourseUpload={setIsCourseUpload}
          loading={loading}
          setLoading={setLoading}
          closeModal={closeModal}
          setCourseUpdated={setCourseUpdated}
        />
      ) : (
        <CourseForm
          setSectionFormVisibile={setSectionFormVisibile}
          setCourseId={setCourseId}
          courseId={courseId}
          bearer_token={bearer_token}
          setIsCourseUpload={setIsCourseUpload}
          loading={loading}
          setLoading={setLoading}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

const UploadPage = () => {
  const [isCourseUpload, setIsCourseUpload] = useState(false);
  const bearer_token = JSON.parse(localStorage.getItem("token"));
  const [courseId, setCourseId] = useState("");
  const [sectionFormVisible, setSectionFormVisibile] = useState(false);
  const [loading, setLoading] = useState(false);

  const [courseData, setCouresData] = useState([]);
  const [emptyData, setEmptyData] = useState(false);

  //Pagination State
  const [pageNo, setPageNo] = useState(0);
  const [totalpage, setTotalPage] = useState(0);
  const [totalCourses, setTotalCourses] = useState(0);

  // check course UPdated or not
  const [courseUpdated, setCourseUpdated] = useState(false);

  const [pageSize] = useState(4);

  const closeModal = () => {
    setLoading(false);
    setIsCourseUpload(false);
    setSectionFormVisibile(false);
  };

  const [apiLoading, setApiLoading] = useState(true);

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

  useEffect(() => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    const usersCoures = async () => {
      try {
        const refreshedToken = await checkAndRefreshToken(currentToken);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${refreshedToken}`,
            userId: localStorage.getItem("userID"),
            pageNo: pageNo,
            pageSize: pageSize,
          },
        };

        const res = await get("user/getCourseByUserId", config);
        setApiLoading(false);

        if (res.status === 200 && res.data.content.length > 0) {
          setTotalPage(res.data.totalPages);
          setTotalCourses(res.data.totalElements);
          setCouresData(res.data.content);
          setEmptyData(false);
        } else if (res.status === 200 && res.data.content.length === 0) {
          setEmptyData(true);
        }
      } catch (err) {
        const error = err.response;
        console.log(err);
      }
    };

    usersCoures();
  }, [pageNo, courseUpdated]);

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

  const handleDelete = async (courseId) => {
    const currentToken = JSON.parse(localStorage.getItem("token"));
    setClickedItem(courseId);
    setDeleteLoader(true);
    console.log(courseId);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentToken}`,
          courseId: courseId,
          pageNo: pageNo,
          pageSize: pageSize,
        },
      };
      const res = await del(`/user/deleteCourseById`, config);
      setDeleteLoader(false);
      if (res.status === 200 && res.data.content.length > 0) {
        setTotalPage(res.data.totalPages);
        setTotalCourses(res.data.totalElements);
        setCouresData(res.data.content);
        setEmptyData(false);
      } else if (res.status === 200 && res.data.content.length === 0) {
        setEmptyData(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="min-h-screen w-full  bg-herobg">
        <div className="sm:px-2 md:px-4 lg:pl-12 ">
          <div className="profile_header">
            <h2 className="dayOne text-2xl text-textColor md:pt-5">Course</h2>
            <h4 className="text-textLightColor">
              Welcome to{" "}
              <Link to="/" className="dayOne">
                {data[0].title}
              </Link>{" "}
              Course page
            </h4>
          </div>

          <div className=" w-full  py-2 lg:w-[90%]">
            <div className="flex justify-end">
              <button
                className="addBtn mr-2 rounded-md bg-textColor  py-1.5 text-white sm:w-[100px]"
                onClick={() => setIsCourseUpload(true)}
              >
                Add
              </button>
            </div>
            <div className="heading mt-2 flex w-full justify-between rounded-t-md border bg-gray-300 p-4">
              <div className="w-1/4">
                <p className="heading text-[15px] font-semibold uppercase text-textColor">
                  Image
                </p>
              </div>

              <div className="w-1/4">
                <p className="heading text-[15px] font-semibold uppercase text-textColor">
                  Title
                </p>
              </div>

              <div className="w-1/4">
                <p className="heading text-[15px] font-semibold uppercase text-textColor">
                  Category
                </p>
              </div>

              <div className="w-1/4">
                <p className="heading text-[15px] font-semibold uppercase text-textColor">
                  Author
                </p>
              </div>

              <div className="w-1/4">
                <p className="heading text-[15px] font-semibold uppercase text-textColor">
                  Action
                </p>
              </div>
            </div>

            <div className="rounded-b-md bg-white">
              {apiLoading === true ? (
                <>
                  <div className="flex h-[10vh] w-full items-center justify-center md:hidden">
                    <Loader color={"#334456"} height={"10%"} width={"10%"} />
                  </div>
                  <div className="hidden items-center justify-center py-5 md:flex">
                    <Loader color={"#334456"} height={"4%"} width={"4%"} />
                  </div>
                </>
              ) : emptyData === true ? (
                <>
                  <p className="py-5 text-center text-lg font-semibold text-textLightColor">
                    No Data Found !
                  </p>
                </>
              ) : (
                <>
                  {courseData.map((data, i) => (
                    <div key={i} className="cursor-pointer border-b">
                      <div className="heading flex items-center justify-between p-4">
                        <div className=" w-1/4  ">
                          <img
                            src={data.thumbNail}
                            alt=""
                            className="h-[50px]"
                          />
                        </div>

                        <div className="w-1/4 ">
                          <p>{data.title}</p>
                        </div>

                        <div className="w-1/4 ">
                          <p>{data.category}</p>
                        </div>

                        <div className="w-1/4 ">
                          <p>{data.authorName}</p>
                        </div>

                        <div className="w-1/4 ">
                          <button
                            onClick={() => handleDelete(data.courseId)}
                            type="button"
                          >
                            {deleteLoader === true &&
                            clickedItem === data.courseId ? (
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
                  <div className="pb-5">
                    <Pagination
                      calculateRange={calculateRange}
                      paginate={paginate}
                      totalCourses={totalCourses}
                      pageNo={pageNo}
                      totalpage={totalpage}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {isCourseUpload && (
          <UploadModal
            setIsCourseUpload={setIsCourseUpload}
            bearer_token={bearer_token}
            setCourseId={setCourseId}
            courseId={courseId}
            setSectionFormVisibile={setSectionFormVisibile}
            sectionFormVisible={sectionFormVisible}
            loading={loading}
            setLoading={setLoading}
            closeModal={closeModal}
            setCourseUpdated={setCourseUpdated}
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

export default UploadPage;

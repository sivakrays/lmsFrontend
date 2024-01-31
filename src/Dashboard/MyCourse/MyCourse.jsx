import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import data from "../../Data/Data";
import { cartContext } from "../../Context/CartContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CourseForm from "./CourseForm";
import SectionForm from "./SectionForm";

const UploadModal = ({
  setIsCourseUpload,
  bearer_token,
  setCourseId,
  sectionFormVisible,
  setSectionFormVisibile,
  courseId,
  loading,
  setLoading,
}) => {
  return (
    <div
      className="fixed top-0  h-full w-full  overflow-y-auto overflow-x-hidden md:inset-0"
      data-modal-backdrop="static"
      data-testid="modal"
      style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
    >
      {sectionFormVisible === true ? (
        <SectionForm
          setCourseId={setCourseId}
          courseId={courseId}
          bearer_token={bearer_token}
          setSectionFormVisibile={setSectionFormVisibile}
          setIsCourseUpload={setIsCourseUpload}
          loading={loading}
          setLoading={setLoading}
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
        />
      )}
    </div>
  );
};

const MyCourse = () => {
  const [isCourseUpload, setIsCourseUpload] = useState(false);
  const bearer_token = JSON.parse(localStorage.getItem("token"));
  const [courseId, setCourseId] = useState("");
  const [sectionFormVisible, setSectionFormVisibile] = useState(false);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <div className="h-screen w-full bg-herobg">
        <div className="ml-1 p-4 md:pl-12 ">
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

          <div className=" py-2 lg:w-[90%]">
            <div className="flex justify-end">
              <button
                className="mr-2 w-[150px] rounded-md border bg-textColor py-1.5 text-white"
                onClick={() => setIsCourseUpload(true)}
              >
                Add
              </button>
            </div>
            <div className="heading mt-2 flex w-full justify-between rounded-t-md bg-gray-300 p-4">
              <div className="w-1/4">
                <p className="text-[15px] font-semibold uppercase text-textColor">
                  Image
                </p>
              </div>

              <div className="w-2/4">
                <p className="text-[15px] font-semibold uppercase text-textColor">
                  Title
                </p>
              </div>

              <div className="w-1/4">
                <p className="text-[15px] font-semibold uppercase text-textColor">
                  Category
                </p>
              </div>

              <div className="w-1/4">
                <p className="text-[15px] font-semibold uppercase text-textColor">
                  Author
                </p>
              </div>
            </div>

            <div className="rounded-b-md bg-white">
              {/* {cartData.map((data, i) => (
                <div key={i} className="cursor-pointer border-t">
                  <div className="heading flex items-center justify-between p-4">
                    <div className=" w-1/4  ">
                      <img src={data.image} alt="" className="h-[50px]" />
                    </div>

                    <div className="w-2/4 ">
                      <p>{data.title}</p>
                    </div>

                    <div className="w-1/4 ">
                      <p>{data.category}</p>
                    </div>

                    <div className="w-1/4 ">
                      <p>{data.author}</p>
                    </div>
                  </div>
                </div>
              ))} */}
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

export default MyCourse;

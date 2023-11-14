import React from "react";
import "./Modal.css";

const Modal = ({ toggleModal, isModalOpen, setIsModalOpen, handleAccept }) => {
  //   const handleDecline = () => {
  //     // Handle the decline action
  //     closeModal();
  //   };

  return (
    <div className="flex h-full items-center justify-center">
      {/* Modal toggle */}
      {/* <button
        onClick={toggleModal}
        className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Toggle modal
      </button> */}

      {/* Main modal */}
      {isModalOpen && (
        <div
          className=" fixed top-0  flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden md:inset-0"
          data-modal-backdrop="static"
          style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
        >
          <div className="relative max-h-full w-full max-w-2xl p-4">
            {/* Modal content */}
            <div className="relative rounded-lg bg-coursebg shadow ">
              {/* Modal header */}
              <div className="flex items-center justify-between rounded-t border-b p-4  md:p-5">
                <h3 className="text-xl font-semibold text-gray-900 ">Quiz-1</h3>
                {/* <button
                  onClick={closeModal}
                  type="button"
                  className="ms-auto inline-flex h-8 w-8 items-center justify-center rounded-lg bg-transparent text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="static-modal"
                >
                  <svg
                    className="h-3 w-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button> */}
              </div>
              {/* Modal body */}
              <div className="space-y-4 p-4 md:p-5">
                <label htmlFor="" className="text-textColor">
                  The Video Duration is ?
                </label>
                <div className="answer flex gap-5">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="ans" id="" className="h-5 w-4" />
                    <span className="text-textLigntColor">10.53</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="ans" id="" className="h-5 w-4" />
                    <span className="text-textLigntColor">11.53</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="ans"
                      id=""
                      className="h-5 w-4"
                      required
                    />
                    <span className="text-textLigntColor">12.53</span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 p-4 md:p-5">
                <label htmlFor="" className="text-textColor">
                  Do you like this video?
                </label>
                <div className="answer flex gap-5">
                  <div className="flex items-center gap-2">
                    <input type="radio" name="ans" id="" className="h-5 w-4" />
                    <span className="text-textLigntColor">Yes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="radio" name="ans" id="" className="h-5 w-4" />
                    <span className="text-textLigntColor">No</span>
                  </div>
                </div>
              </div>
              {/* Modal footer */}
              <div className="flex items-center rounded-b border-t border-gray-200 p-4  md:p-5">
                <button
                  onClick={handleAccept}
                  type="button"
                  className="rounded-lg bg-textColor px-5 py-2.5 text-center text-sm font-medium text-white  focus:outline-none focus:ring-4 focus:ring-blue-300 "
                >
                  Resume
                </button>
                {/* <button
                  onClick={handleDecline}
                  type="button"
                  className="ms-3 rounded-lg border border-gray-200 bg-textLigntColor px-5 py-2.5 text-sm font-medium text-white  focus:z-10 focus:outline-none focus:ring-4 focus:ring-blue-300 "
                >
                  Decline
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;

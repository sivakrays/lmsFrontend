import React from "react";

const DeleteConfirmation = ({ handleYes, handleNo }) => {
  return (
    <div>
      <div
        className="fixed inset-0 flex h-full  w-full items-center  justify-center overflow-y-auto overflow-x-hidden"
        data-modal-backdrop="static"
        style={{ backgroundColor: "rgba(252, 250, 240, 0.90)" }}
      >
        <div className=" rounded-md bg-white p-8 shadow">
          <div>Are you sure you want to delete this item!</div>
          <div className="flex items-center justify-evenly pt-4">
            <button
              className="text w-14 rounded-lg border-[1px] bg-red-700 text-lg text-white hover:bg-red-400 hover:text-black"
              onClick={() => {
                handleYes();
              }}
            >
              Yes
            </button>
            <button
              className="text w-14 rounded-lg border-[1px] bg-green-700 text-lg text-white hover:bg-green-400 hover:text-black"
              onClick={() => {
                handleNo();
              }}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;

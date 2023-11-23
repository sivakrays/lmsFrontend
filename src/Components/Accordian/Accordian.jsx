import React, { useEffect, useState } from "react";
import Arrow from "../../Assets/coursedetails/AccordianArrow.svg";
import Tv from "../../Assets/coursedetails/tv.svg";
import Modal from "../Modal/Modal";

const NestedAccordionItem = ({ title, previewText }) => {
  const [isNestedAccordionOpen, setIsNestedAccordionOpen] = useState(false);
  const [isModalOpen1, setIsModalOpen1] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const path = "video";

  const toggleNestedAccordion = () => {
    setIsNestedAccordionOpen(!isNestedAccordionOpen);
  };

  const toggleModal1 = () => {
    setIsModalOpen1(false);
    setIsVideoVisible(false);
  };

  const showPreview = () => {
    setIsVideoVisible(!isVideoVisible);
    setIsModalOpen1(!isModalOpen1);
  };

  return (
    <>
      <button
        type="button"
        className="0 flex w-full items-center gap-5  border p-5 font-medium text-textColor hover:bg-gray-100  rtl:text-right "
      >
        <div className="flex w-3/4  items-center gap-5 ">
          <button onClick={showPreview} className="flex items-center gap-5">
            <img src={Tv} alt="" className="h-4 w-4" />
            <span className="text-xs  text-yellowColor underline md:text-sm">
              {title}
            </span>
          </button>

          <button onClick={toggleNestedAccordion}>
            <img
              src={Arrow}
              alt=""
              className={`  h-3 w-3 shrink-0  ${
                isNestedAccordionOpen ? "rotate-180" : ""
              } `}
            />
          </button>
        </div>
        <div className="hidden w-full md:flex md:w-1/4  md:justify-end md:gap-4">
          <p className="text-xs  text-yellowColor underline  md:text-sm">
            Preview
          </p>
          <span className="text-xs text-textColor md:text-sm">05.26</span>
        </div>
      </button>

      <div className={` ${isNestedAccordionOpen ? "block" : "hidden"}`}>
        <div className="border border-b-0  p-5 ">
          {previewText && <p className="text-textLigntColor ">{previewText}</p>}
        </div>
      </div>
      {isVideoVisible && (
        <Modal
          isModalOpen1={isModalOpen1}
          path={path}
          toggleModal1={toggleModal1}
        />
      )}
    </>
  );
};

const AccordionItem = ({ title, nestedItems, isAllOpen }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  useEffect(() => {
    console.log("isAllOpen", isAllOpen);
    if (isAllOpen) {
      setIsAccordionOpen(true);
    } else {
      setIsAccordionOpen(false);
    }
  }, [isAllOpen]);

  const toggleAccordion = () => {
    setIsAccordionOpen(!isAccordionOpen);
  };

  return (
    <>
      <h2>
        <button
          type="button"
          onClick={toggleAccordion}
          className="flex w-full items-center justify-between gap-3  border 
           p-5 font-medium text-textColor hover:bg-gray-100 
             rtl:text-right "
        >
          <span className=" md:text-md text-sm text-textColor">{title}</span>
          <img
            src={Arrow}
            alt=""
            className={`h-3 w-3 shrink-0  ${
              isAccordionOpen || isAllOpen ? "rotate-180" : ""
            } `}
          />
        </button>
      </h2>
      <div className={` ${isAccordionOpen || isAllOpen ? "block" : "hidden"}`}>
        <div>
          {nestedItems.map((item) => (
            <NestedAccordionItem
              key={item.key}
              title={item.accordianName}
              previewText={item.previewText}
              isAllOpen={isAllOpen}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Accordion = ({ accordianDetails, isAllOpen }) => {
  return (
    <div className="mb-8 bg-white">
      {accordianDetails.map((item) => (
        <AccordionItem
          key={item.key}
          title={item.accordianName}
          nestedItems={item.nestedItems}
          isAllOpen={isAllOpen}
        />
      ))}
    </div>
  );
};

export default Accordion;

import React, { useState } from "react";
import Arrow from "../../Assets/coursedetails/AccordianArrow.svg";
import Tv from "../../Assets/coursedetails/tv.svg";

const NestedAccordionItem = ({ title, previewText }) => {
  const [isNestedAccordionOpen, setIsNestedAccordionOpen] = useState(false);

  const toggleNestedAccordion = () => {
    setIsNestedAccordionOpen(!isNestedAccordionOpen);
  };

  const showPreview = () => {
    alert("Preview Showing");
  };

  return (
    <>
      <h2>
        <button
          type="button"
          onClick={toggleNestedAccordion}
          className="0 flex w-full items-center gap-5  border p-5 font-medium text-textColor hover:bg-gray-100  rtl:text-right "
        >
          <div className="flex w-3/4  items-center gap-5">
            <button onClick={showPreview}>
              <img src={Tv} alt="" className="h-4 w-4" />
            </button>
            <span className="text-yellowColor  text-xs underline md:text-sm">
              {title}
            </span>
            <img
              src={Arrow}
              alt=""
              className={`  h-3 w-3 shrink-0  ${
                isNestedAccordionOpen ? "rotate-180" : ""
              } `}
            />
          </div>
          <div className="hidden w-full md:flex md:w-1/4  md:justify-end md:gap-4">
            <p className="text-yellowColor  text-xs underline  md:text-sm">
              Preview
            </p>
            <span className="text-xs text-textColor md:text-sm">05.26</span>
          </div>
        </button>
      </h2>
      <div className={` ${isNestedAccordionOpen ? "block" : "hidden"}`}>
        <div className="border border-b-0  p-5 ">
          <p className="text-textLigntColor ">{previewText}</p>
        </div>
      </div>
    </>
  );
};

const AccordionItem = ({ title, nestedItems }) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

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
              isAccordionOpen ? "rotate-180" : ""
            } `}
          />
        </button>
      </h2>
      <div className={` ${isAccordionOpen ? "block" : "hidden"}`}>
        <div>
          {nestedItems.map((item) => (
            <NestedAccordionItem
              key={item.key}
              title={item.accordianName}
              previewText={item.previewText}
            />
          ))}
        </div>
      </div>
    </>
  );
};

const Accordion = ({ accordianDetails }) => {
  console.log("Acccc", accordianDetails);
  return (
    <div className="mb-8 bg-white">
      {accordianDetails.map((item) => (
        <AccordionItem
          key={item.key}
          title={item.accordianName}
          nestedItems={item.nestedItems}
        />
      ))}
    </div>
  );
};

export default Accordion;

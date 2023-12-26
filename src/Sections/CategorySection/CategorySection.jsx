import React from "react";
import "./CategorySection.css";

import readBook from "../../Assets/category/readBook.png";
import pencilKid from "../../Assets/category/pencilKid.png";
import flyingBook from "../../Assets/category/flyingBook.png";

const CategorySection = () => {
  const categoryData = [
    {
      id: 1,
      title: "Design",
      image: pencilKid,
      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa aut dignissimos voluptates quibusdam fugit quis id blanditiis porro numquam laudantium.",
    },
    {
      id: 2,
      title: "Business",
      image: readBook,

      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa aut dignissimos voluptates quibusdam fugit quis id blanditiis porro numquam laudantium.",
    },
    {
      id: 3,
      title: "Marketing",
      image: flyingBook,

      des: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa aut dignissimos voluptates quibusdam fugit quis id blanditiis porro numquam laudantium.",
    },
  ];

  return (
    <>
      <div className="mx-auto flex w-[75%] flex-wrap items-center justify-center gap-7 gap-x-32 md:w-[90%]">
        {categoryData.map((item) => (
          <div
            className="   relative flex h-[200px] w-[300px] flex-col rounded-md border-2 border-textColor p-4 transition delay-150 duration-300 ease-in-out  hover:-translate-y-2 md:h-[180px] "
            key={item.id}
          >
            <div className="absolute -left-10 top-[30%] ">
              <img src={item.image} className="h-14 w-14 md:h-20 md:w-20" />
            </div>

            <div className=" p-2">
              <h1 className="dayOne text-center text-lg font-semibold text-textColor">
                {item.title}
              </h1>
            </div>
            <div className="  md:px-4">
              <p className="text-center text-sm text-textLigntColor ">
                {item.des}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
  // return (
  //   <div className="categoryCardContainer mx-auto flex w-3/4 flex-row flex-wrap items-center justify-center gap-10">
  //     {categoryData.map((category) => (
  //       <div
  //         className="categoryCard boxShadow  relative h-24 w-44 cursor-pointer rounded border-2 border-textColor"
  //         key={category.id}
  //       >
  //         <div className="categoryImg absolute -top-7 left-14 flex h-12 w-12 items-center justify-center rounded-full bg-textColor">
  //           <img src={category.img} alt="category" className="h-5 w-5" />
  //         </div>
  //         <div className="categoryContent mt-6 flex flex-col items-center justify-center  gap-2">
  //           <div className="categoryTitle dayOne text-sm text-textColor">
  //             {category.title}
  //           </div>
  //           <div className="categoryDes text-xs text-textLigntColor">
  //             {category.des}
  //           </div>
  //         </div>
  //       </div>
  //     ))}
  //   </div>
  // );
};

export default CategorySection;

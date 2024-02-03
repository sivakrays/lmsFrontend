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
      des: "Neetie’s Design course immerses students in creative exploration, leveraging industry tools for innovative and impactful solutions.",
    },
    {
      id: 2,
      title: "Business",
      image: readBook,

      des: "Neetie’s Business course offers practical insights, real-world case studies, and mentorship for entrepreneurial success.",
    },
    {
      id: 3,
      title: "Marketing",
      image: flyingBook,

      des: "Neetie’s Marketing course blends theory with hands-on practice, utilizing industry trends and innovative strategies for success.",
    },
  ];

  return (
    <>
      <div className="mx-auto flex w-[75%] flex-wrap items-center justify-center gap-11  md:w-[90%]">
        {categoryData.map((item) => (
          <div
            className=" relative  flex h-[200px] w-[300px] cursor-pointer flex-col rounded-md border-2 border-textColor p-4 transition delay-150 duration-300 ease-in-out  hover:-translate-y-2 md:h-[180px] "
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
              <p className="text-textLightColor text-center text-sm ">
                {item.des}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default CategorySection;

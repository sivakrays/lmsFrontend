import React from "react";
import "./CategorySection.css";
import designCategory from "../../Assets/category/design.svg";
import bussinessCategory from "../../Assets/category/business.svg";
import marketingCategory from "../../Assets/category/marketing.svg";
import photographyCategory from "../../Assets/category/photography.svg";
import accountingCategory from "../../Assets/category/accounting.svg";

const CategorySection = () => {
  const categoryData = [
    {
      id: 1,
      img: designCategory,
      title: "Design",
      des: "Over 960 Courses",
    },
    {
      id: 2,
      img: bussinessCategory,
      title: "Business",
      des: "Over 960 Courses",
    },
    {
      id: 3,
      img: marketingCategory,
      title: "Marketing",
      des: "Over 960 Courses",
    },
    {
      id: 4,
      img: photographyCategory,
      title: "Photography",
      des: "Over 960 Courses",
    },
    {
      id: 5,
      img: accountingCategory,
      title: "Accounting",
      des: "Over 960 Courses",
    },
  ];

  return (
    <div className="categoryCardContainer mx-auto flex w-3/4 flex-row flex-wrap items-center justify-center gap-10">
      {categoryData.map((category) => (
        <div
          className="categoryCard boxShadow  relative h-24 w-44 cursor-pointer rounded border-2 border-textColor"
          key={category.id}
        >
          <div className="categoryImg absolute -top-7 left-14 flex h-12 w-12 items-center justify-center rounded-full bg-textColor">
            <img src={category.img} alt="category" className="h-5 w-5" />
          </div>
          <div className="categoryContent mt-6 flex flex-col items-center justify-center  gap-2">
            <div className="categoryTitle dayOne text-sm text-textColor">
              {category.title}
            </div>
            <div className="categoryDes text-xs text-textLigntColor">
              {category.des}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategorySection;

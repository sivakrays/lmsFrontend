import React from "react";
import "./PromoVideo.css";
import promo from "../../Assets/Promo/promo.mp4";
import reviewer1 from "../../Assets/Promo/reviewer1.jpg";
import reviewer2 from "../../Assets/Promo/reviewer2.jpg";
import star from "../../Assets/courseCard/star.png";
import halfStar from "../../Assets/courseCard/halfStar.png";
import Button from "../../Components/Button/Button";

import planet from "../../Assets/Promo/Frame-2.png";
import Alphabet from "../../Assets/Promo/Frame.png";
import pencil from "../../Assets/Promo/Frame-1.png";

import systamatic1 from "../../Assets/Promo/Group 39-1.png";
import systamatic from "../../Assets/Promo/Group 39.png";

import paperRocket from "../../Assets/Promo/Frame.svg";
import colorStars from "../../Assets/Promo/shape-4.png";
import stars from "../../Assets/Promo/Star.png";
import blueStar from "../../Assets/Promo/blueStar.svg";

const PromoVideo = () => {
  const systamaticCard = [
    {
      img: systamatic1,
      title: "Formal Tuition",
      des: "Eu turpis egestas pretium aenean pharetra magna ac.",
    },
    {
      img: systamatic,
      title: "Formal Tuition",
      des: "Eu turpis egestas pretium aenean pharetra magna ac.",
    },
    {
      img: systamatic,
      title: "Formal Tuition",
      des: "Eu turpis egestas pretium aenean pharetra magna ac.",
    },
    {
      img: systamatic1,
      title: "Formal Tuition",
      des: "Eu turpis egestas pretium aenean pharetra magna ac.",
    },
  ];

  return (
    <div>
      <div className="relative bg-coursebg">
        <div className="absolute left-10 top-10 hidden lg:block">
          <img
            src={paperRocket}
            alt=""
            className="animated-element h-14 w-14"
          />
        </div>

        <div className="absolute bottom-32 left-56 hidden lg:block">
          <img src={colorStars} alt="" className="animated-element h-14 w-14" />
        </div>
        <div className="absolute right-80 top-10 hidden lg:block">
          <img src={stars} alt="" className="animated-element h-8 w-8" />
        </div>
        <p className="promoHeading dayOne pt-6 text-center text-3xl text-textColor">
          Watch our promo video
        </p>
        <p className="mt-4 pb-6 text-center text-xs text-textLigntColor">
          consectetur adipiscing elit, sed do eiusmod tempot ut labore veniam
          ipsum...
        </p>

        <div className="video mx-auto flex w-3/4 items-center justify-center py-8">
          <video
            src={promo}
            width="650"
            height="500"
            controls
            className="rounded-lg border-2 border-textColor boxShadow"
          />
        </div>
        <div className="absolute bottom-32 lg:right-10 xl:right-20">
          <img
            src={blueStar}
            alt=""
            className=" animated-element hidden w-28 lg:block lg:h-12 xl:h-12 xl:w-12"
          />
        </div>
      </div>

      <div className="hero_container1">
        <div className="systamaticEducation  relative mx-auto  w-[90%] p-3">
          <div className="flex ">
            <div className="mx-auto flex w-[50ch] flex-col items-center justify-center text-center">
              <p className="dayOne font-semibold text-textLigntColor">
                Educational Programs
              </p>
              <p className="dayOne text-center text-3xl text-textColor">
                Step By Step Systematic Education
              </p>
            </div>
            <div className="absolute top-9 hidden md:block">
              <img src={planet} alt="course" className="w-32 opacity-60" />
            </div>
            <div className="absolute -top-10 right-0 hidden md:block">
              <div className="relative">
                <img src={Alphabet} alt="course" className="w-28" />
                <img
                  src={pencil}
                  alt="course"
                  className="absolute -right-7 top-0 w-20"
                />
              </div>
            </div>
          </div>
          {/* systamatic Cards */}
          <div className="systamaticcards mx-auto mt-16 flex w-[80%] flex-wrap items-center justify-center gap-12">
            {systamaticCard.map((card, index) => (
              <div
                id={index}
                className="systamaticCard mb-6 flex h-[190px] w-[390px] items-center justify-center gap-4 rounded-2xl border-2 border-textColor bg-herobg p-3 shadow boxShadow"
              >
                <div>
                  <img src={card.img} alt="" className="w-56 drop-shadow" />
                </div>
                <div className="flex flex-col">
                  <p className="dayOne text-lg text-textColor">
                    Formal Tuition
                  </p>
                  <p className="mt-3 text-sm text-textLigntColor">
                    Eu turpis egestas pretium aenean pharetra magna ac.
                  </p>
                  <p className="mt-3 w-[80px] border-b-2 border-dotted text-xs text-textColor">
                    Read more {"->"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoVideo;

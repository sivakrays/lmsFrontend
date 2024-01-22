import React from "react";
import "./PromoVideo.css";
import promo from "../../Assets/Promo/promo.mp4";
import planet from "../../Assets/Promo/Frame-2.png";
import Alphabet from "../../Assets/Promo/Frame.png";
import pencil from "../../Assets/Promo/Frame-1.png";
import sym1 from "../../Assets/Promo/sym1.jpeg";
import sym2 from "../../Assets/Promo/sym2.jpeg";
import sym3 from "../../Assets/Promo/sym3.jpeg";
import sym4 from "../../Assets/Promo/sym4.jpeg";
import paperRocket from "../../Assets/Promo/Frame.svg";
import colorStars from "../../Assets/Promo/shape-4.png";
import stars from "../../Assets/Promo/Star.png";
import blueStar from "../../Assets/Promo/blueStar.svg";
import { Link } from "react-router-dom";

const PromoVideo = () => {
  const systamaticCard = [
    {
      img: sym1,
      title: "Organized Syllabus:",
      des: "Comprehensive, sequential content fostering holistic educational growth.",
    },
    {
      img: sym2,
      title: "Structured Curriculum:",
      des: "Develop comprehensive curriculum, align with educational standards.",
    },
    {
      img: sym3,
      title: "Effective Instruction:",
      des: "Utilize varied teaching methods, encourage interaction, critical thinking.",
    },
    {
      img: sym4,
      title: "Continuous Monitoring:",
      des: "Monitor progress, adapt teaching strategies, cater to needs.",
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
        <p className="text-textLightColor mt-4 pb-6 text-center text-xs">
          "Discover Neetie's essence in our captivating, defining promotional
          video."
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
              <p className="dayOne text-textLightColor font-semibold">
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
          <div className="systamaticcards   mx-auto mt-16 flex w-[80%] flex-wrap items-center justify-center gap-12">
            {systamaticCard.map((card, index) => (
              <div
                key={index}
                className="systamaticCard  mb-6 flex h-[170px] items-center justify-center gap-4 rounded-2xl border-2 border-textColor bg-coursebg p-3 shadow boxShadow md:w-[400px]"
              >
                <div className="image-container mt-16 ">
                  <img src={card.img} alt="" className="mask" />
                </div>
                <div className="flex flex-col">
                  <p className="dayOne text-lg text-textColor">{card.title}</p>
                  <p className="text-textLightColor mt-3 text-sm">{card.des}</p>
                  <Link
                    to={"/course"}
                    className="hover:text-textLightColor mt-3 w-[105px] cursor-pointer rounded-md border-2 border-dotted p-1 text-xs font-semibold  text-textColor"
                  >
                    View Course {"->"}
                  </Link>
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

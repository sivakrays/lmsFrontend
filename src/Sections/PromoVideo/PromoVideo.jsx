import React from "react";
import "./PromoVideo.css";
import promo from "../../Assets/Promo/promo.mp4";
import reviewer1 from "../../Assets/Promo/reviewer1.jpg";
import reviewer2 from "../../Assets/Promo/reviewer2.jpg";
import star from "../../Assets/courseCard/star.png";
import halfStar from "../../Assets/courseCard/halfStar.png";
import Button from "../../Components/Button/Button";
import blueStar from "../../Assets/Promo/blueStar.svg";
import colorStars from "../../Assets/Promo/shape-4.png";
import stars from "../../Assets/Promo/Star.png";
import paperRocket from "../../Assets/Promo/Frame.svg";

const PromoVideo = () => {
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
        <div className="absolute bottom-20 lg:right-10 xl:right-20">
          <img
            src={blueStar}
            alt=""
            className=" animated-element hidden w-28 lg:block lg:h-14 xl:h-14 xl:w-14"
          />
        </div>
      </div>
      <div className="testimonialsbg" id="testimonials">
        <div className="testimonialsHeading flex flex-col items-center justify-center gap-3 sm:gap-3 md:gap-5 lg:flex-row xl:gap-16 xl:py-14">
          <p className="dayOne text-2xl text-textColor md:text-3xl">
            What our clients say
          </p>
          <p className=" sm:text-md px-4 text-justify text-textLigntColor sm:w-[60%] sm:text-center md:w-[45%] md:text-[14px] lg:w-[35%] xl:w-[25%] xl:text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod temporidunt ut labore veniam...
          </p>
        </div>
        <div className="reviewCards mx-auto mt-10 flex w-[85%] flex-wrap items-center justify-center gap-11 sm:w-3/4">
          <div className="leftCard relative w-[400px] rounded-lg border-2 border-textColor p-4 boxShadow sm:p-5">
            <img
              src={reviewer1}
              alt="reviewer"
              className="object-conver absolute -top-9 left-[34%]  h-[70px] w-[70px] rounded-full border-2 border-textColor sm:left-[40%]"
            />
            <div className="mt-9 space-y-2">
              <div className="reviewerName dayOne text-center text-textColor">
                Adam Smith
              </div>
              <div className="reviewerPosition text-center text-xs text-textLigntColor">
                Python Developer
              </div>
            </div>
            <div className="reviewerReview p-3 text-center text-sm text-textLigntColor">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco..
            </div>
            <div className="reviewStar flex items-center justify-center">
              <img src={star} alt="review Star" className="w-6" />
              <img src={star} alt="review Star" className="w-6" />
              <img src={star} alt="review Star" className="w-6" />
              <img src={star} alt="review Star" className="w-6" />
              <img src={halfStar} alt="review Star" className="w-6" />
            </div>
          </div>
          <div className="rightCard relative w-[400px] rounded-lg border-2 border-textColor p-5 boxShadow">
            <img
              src={reviewer2}
              alt="reviewer"
              className="object-conver absolute -top-9 left-[40%] h-[70px] w-[70px] rounded-full border-2 border-textColor shadow-lg"
            />
            <div className="mt-9 space-y-2">
              <div className="reviewerName dayOne text-center text-textColor">
                Maria Wilson
              </div>
              <div className="reviewerPosition text-center text-xs text-textLigntColor">
                Python Developer
              </div>
            </div>
            <div className="reviewerReview p-3 text-center text-sm text-textLigntColor">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco..
            </div>
            <div className="reviewStar flex items-center justify-center">
              <img src={star} alt="review Star" className="w-6" />
              <img src={star} alt="review Star" className="w-6" />
              <img src={star} alt="review Star" className="w-6" />
              <img src={star} alt="review Star" className="w-6" />
              <img src={halfStar} alt="review Star" className="w-6" />
            </div>
          </div>
        </div>
        <div className=" mt-10 flex items-center justify-center">
          <Button name={"View All Testimonials"} path="/" />
        </div>
      </div>
    </div>
  );
};

export default PromoVideo;

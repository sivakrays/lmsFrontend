import React from "react";
import "./Footer.css";
import appBtn from "../../Assets/Footer/appBtn.png";

import facebook from "../../Assets/Footer/facebook.svg";
import twitter from "../../Assets/Footer/twitter.svg";
import instagram from "../../Assets/Footer/instagram.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer className="footer bg-coursebg  py-9">
        <div className="flex flex-wrap justify-around gap-6 sm:gap-0">
          <div className=" flex flex-col gap-5 px-9 text-justify sm:mb-5 sm:px-6 md:mb-7 md:px-12 lg:mb-0 lg:w-[25%]  lg:px-0">
            <div className="footerLogo flex items-center gap-3">
              <span className=" dayOne rounded-md bg-textColor px-4 py-1 text-lg font-bold text-white">
                Course
              </span>
              <span className="text-lg font-bold text-textColor">desk</span>
            </div>
            <div className="footerDes text-textLigntColor">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco..
            </div>
          </div>
          <div className="p-375px">
            <div className="flex flex-col gap-5 ">
              <p className="dayOne text-lg text-textColor">Quick links</p>
              <ul className="flex flex-col gap-3 text-footerColor">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="course">Featured Courses</Link>
                </li>
                <li>
                  <Link to="contact">Contact</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="p-375px">
            <div className="flex flex-col gap-5">
              <p className="dayOne text-lg text-textColor">Catagories</p>
              <ul className="flex flex-col gap-3 text-footerColor">
                <li>Design</li>
                <li>Business</li>
                <li>Marketing</li>
                <li>Photography</li>
              </ul>
            </div>
          </div>
          <div>
            <div className="flex flex-col gap-5">
              <p className="dayOne text-lg text-textColor">Download App</p>
              <img
                src={appBtn}
                alt="playstoreBtn"
                className="h-12 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </footer>
      <div className="flex flex-wrap justify-around bg-white py-3">
        <p className="text-footerColor">
          © 2022 | course desk. All rights reserved.
        </p>
        <ul className="flex gap-6">
          <li>
            <img
              src={facebook}
              alt="sociallmedia"
              className="h-3 w-3 cursor-pointer object-contain sm:h-5 sm:w-5"
            />
          </li>
          <li>
            <img
              src={twitter}
              alt="sociallmedia"
              className="h-3 w-3 cursor-pointer object-contain sm:h-5 sm:w-5"
            />
          </li>
          <li>
            <img
              src={instagram}
              alt="sociallmedia"
              className="h-3 w-3 cursor-pointer object-contain sm:h-5 sm:w-5"
            />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;

import React from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import image from "../../../assets/images/logo.jpg";

const Footer = () => {
   return (
      <div
         className="flex w-full absolute top-full left-0 overflow-hidden items-center justify-center bg-white h-[330px] border-t-[12px] border-blue-700"
         id="footer"
      >
         <div className="flex justify-evenly px-3 md:px-0 container mx-auto max-w-7xl sm:px-6 text-gray-700 ">
            <div className="">
               <Link
                  to={`/${PATHS.HOME.IDENTITY}`}
                  className="w-1/2 flex justify-start mb-6"
               >
                  <img src={image} alt="" className="h-12 md:h-14 lg:h-16" />
               </Link>
               <ul className="text-gray-700 flex flex-col ">
                  <li className="text-xs md:text-sm my-2 inline-block">
                     Team of designers and developers in Greenwich University
                  </li>
                  <li className="text-xs md:text-sm my-2 inline-block">
                     ADDRESS: 6688 Princess Road, London, Greater London
                  </li>
                  <li className="text-xs md:text-sm my-2 inline-block">
                     PHONE: (012) 800 456 789-987
                  </li>
                  <li className="text-xs md:text-sm my-2 inline-block">
                     EMAIL: example.653@gmail.com
                  </li>
               </ul>
            </div>

            <div className="flex flex-col pl-10">
               <h2 className="text-base h-fit font-bold leading-none lg:text-lg lg:font-bold mb-6 pb-2">
                  Information
               </h2>
               <ul className="text-gray-700 flex flex-col">
                  <li className="text-xs md:text-sm my-2 inline-block">
                     About Us
                  </li>
                  <li className="text-xs md:text-sm my-2 inline-block">
                     Contact Us
                  </li>
                  <li className="text-xs md:text-sm my-2 inline-block">
                     Terms &amp; Conditions
                  </li>
                  <li className="text-xs md:text-sm my-2 inline-block">
                     Returns &amp; Exchanges
                  </li>
               </ul>
            </div>
            <div className="flex flex-col pl-10 h-full justify-normal">
               <h2 className="text-base font-bold lg:text-lg lg:font-bold mb-6 h-fit pb-2">
                  Follow
               </h2>
               <p className="text-xs md:text-sm my-2 inline-block">
                  Follow us to be notificated of sales
               </p>
            </div>
         </div>
      </div>
   );
};

export default Footer;

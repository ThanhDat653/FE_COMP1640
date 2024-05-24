/* eslint-disable react/style-prop-object */
import React from "react";
import Button from "../../../components/CustomButton";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";

const HeroSection = () => {
  return (
    <>
      <div className="absolute w-full h-[480px] md:h-[600px] top-0 left-0 bg-black/60 z-10"></div>
      <img
        src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        alt=""
        className="absolute w-full h-[480px] md:h-[600px] top-0 left-0 object-cover bg-black/10 z-0"
      />
      <div className="w-full h-[416px] md:h-[536px] lg:h-[460px] flex flex-col justify-center items-center">
        <div className="h-full w-full flex flex-col justify-center items-center z-20 text-white text-center">
          <h1 className=" font-bold text-3xl lg:text-5xl mb-6">
            Welcome to our MagazineHub
          </h1>
          <span className="font-normal px-4 mb-10 md:px-20 lg:px-64 text-sm md:text-base">
            In here, you can find a myriad of fanstatic articles contributed by
            the students belong to the University of Greenwich faculties. Have a
            nice day and enjoy the world of knowledge
          </span>
          <Link to={`/auth/${PATHS.AUTH.REGISTER}`}>
            <Button
              label="Join with us"
              type="primary"
              style="px-5 md:px-10 md:h-12 md:font-semibold"
            />
          </Link>
        </div>
      </div>
    </>
  );
};

export default HeroSection;

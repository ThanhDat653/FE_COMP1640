/* eslint-disable react/style-prop-object */
import React from "react";
import Searchbar from "../../../components/Searchbar";
import Button from "../../../components/CustomButton";
import { Link, useSearchParams } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { RootState } from "../../../redux/store";
import UserInformation from "./UserInformation";
import useRedux from "../../../hooks/useRedux";
import Sidebar from "./Sidebar";
import image from "../../../assets/images/logo.jpg";

const Header = () => {
   const [searchParams, setSearchParams] = useSearchParams();
   const { appSelector } = useRedux();
   const { isLogin, userInfor } = appSelector((state) => state.auth);

   const setParams = (key: string, value: string) => {
      setSearchParams((prevParams) => {
         if (value === null || value === "") {
            prevParams.delete(key);
         } else {
            prevParams.set(key, value);
         }
         return prevParams;
      });
   };

   return (
      <div className="w-full fixed top-0 left-0 bg-white shadow-lg flex flex-row justify-center items-center z-30">
         <div
            className={`h-16 md:h-20 lg:h-24 w-full lg:w-[960px] xl:w-[1200px] flex flex-row justify-between items-center px-4 md:px-10 lg:p-0`}
         >
            <div className="hidden md:block w-1/4">
               <Searchbar paramName="search" setParams={setParams} />
            </div>

            <Sidebar />
            <div className="block md:hidden w-full ml-5">
               <Searchbar paramName="search" setParams={setParams} />
            </div>
            <Link
               to={`/${PATHS.HOME.IDENTITY}`}
               className="w-1/4 hidden justify-center md:flex"
            >
               <img src={image} alt="" className="h-12 md:h-14 lg:h-16" />
            </Link>


            <div className="w-1/4 justify-end items-center hidden md:flex">
               {isLogin && userInfor ? (
                  <UserInformation data={userInfor} />
               ) : (
                  <div className="flex ">
                     <Link to={`/auth/${PATHS.AUTH.LOGIN}`}>
                        <Button label="Login" type={"border"} />
                     </Link>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Header;

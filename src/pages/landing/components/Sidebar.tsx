import { useState } from "react";
import useRedux from "../../../hooks/useRedux";
import {  protectedMenuItems } from "./UserInformation";
import { Link, useLocation } from "react-router-dom";
import { destroy } from "../../../redux/slices/authSlice";
import { PATHS } from "../../../constants/path";

const Sidebar = () => {
   const [open, setOpen] = useState(false);
   const { appSelector, dispatch } = useRedux();
   const { isLogin, userInfor } = appSelector((state) => state.auth);
   const matchingMenuItem = protectedMenuItems.find(
      (item) => item.path === `${userInfor?.role.toLowerCase()}`,
   );
   const location = useLocation();

   const closeModal = () => {
      setOpen(false);
   };

   const handleLogout = () => {
      dispatch(destroy());
      setOpen(false);
   };

   return (
      <div className="md:hidden">
         <button
            className="text-gray-200 pt-1 hover:text-gray-500"
            type="button"
            onClick={() => setOpen(true)}
         >
            <svg
               xmlns="http://www.w3.org/2000/svg"
               fill="none"
               viewBox="0 0 24 24"
               strokeWidth={1.5}
               stroke="currentColor"
               className="w-8 h-8 text-slate-800 pt-1 hover:text-slate-900"
            >
               <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
               />
            </svg>
         </button>
         <div
            className={`fixed top-0 z-50 w-60 h-screen p-4 overflow-y-auto transition-transform duration-300 md:hidden ${
               open ? "" : "-translate-x-full"
            } bg-gray-200`}
            style={{ left: open ? 0 : "-100%" }}
         >
            <div className="w-full flex justify-center items-center border-b border-gray-300 pb-4">
               <div className="flex flex-row justify-center items-center">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                     strokeWidth={1.5}
                     stroke="currentColor"
                     className="w-10 h-10 text-gray-700 hover:cursor-pointer hover:text-gray-600 transition-all duration-150"
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                     />
                  </svg>
               </div>
               <div className="w-full flex-1 flex flex-col justify-end items-start ml-2">
                  <h3 className="text-gray-700 font-medium text-sm truncate">
                     {isLogin
                        ? `${userInfor?.firstName} ${userInfor?.lastName}`
                        : "Username"}
                  </h3>
                  <span className="text-gray-500 text-sm truncate">
                     {isLogin ? userInfor?.role : "Role"}
                  </span>
               </div>
            </div>

            <div className="py-4 overflow-y-auto">
               <ul className="font-normal">
                  <li className="py-1">
                     <Link
                        to={`/${PATHS.HOME.IDENTITY}`}
                        className="w-full flex justify-start items-center pl-3 py-2 rounded-md text-left text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-150"
                        onClick={closeModal}
                     >
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5 mr-4"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                           />
                        </svg>
                        Home
                     </Link>
                  </li>
                  <li className="py-1">
                     <button className="w-full flex justify-start items-center pl-3 py-2 rounded-md text-left text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-150">
                        <svg
                           xmlns="http://www.w3.org/2000/svg"
                           fill="none"
                           viewBox="0 0 24 24"
                           strokeWidth={1.5}
                           stroke="currentColor"
                           className="w-5 h-5 mr-4"
                        >
                           <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Zm6-10.125a1.875 1.875 0 1 1-3.75 0 1.875 1.875 0 0 1 3.75 0Zm1.294 6.336a6.721 6.721 0 0 1-3.17.789 6.721 6.721 0 0 1-3.168-.789 3.376 3.376 0 0 1 6.338 0Z"
                           />
                        </svg>
                        My account
                     </button>
                  </li>
                  <li className="py-1">
                     {matchingMenuItem && (
                        <Link
                           to={
                              location.state?.from ||
                              `/${matchingMenuItem.path}`
                           }
                           className="w-full flex justify-start items-center pl-3 py-2 rounded-md text-left text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-150"
                           onClick={closeModal}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 mr-4"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
                              />
                           </svg>

                           {matchingMenuItem.lable}
                        </Link>
                     )}
                  </li>
                  <li className="py-1">
                     {isLogin ? (
                        <button
                           className="w-full flex justify-start items-center pl-3 py-2 rounded-md text-left text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-150"
                           onClick={() => {
                              handleLogout();
                              closeModal();
                           }}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 mr-4"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                              />
                           </svg>
                           Log out
                        </button>
                     ) : (
                        <Link
                           to={`/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.LOGIN}`}
                           className="w-full flex justify-start items-center pl-3 py-2 rounded-md text-left text-gray-700 hover:bg-blue-600 hover:text-white transition-all duration-150"
                           onClick={closeModal}
                        >
                           <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-5 h-5 mr-4"
                           >
                              <path
                                 strokeLinecap="round"
                                 strokeLinejoin="round"
                                 d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                              />
                           </svg>
                           Log in
                        </Link>
                     )}
                  </li>
               </ul>
            </div>
         </div>
         {open && (
            <div
               className="bg-black/40 h-screen w-screen absolute left-0 top-0 z-40 cursor-pointer"
               onClick={() => setOpen(false)}
            ></div>
         )}
      </div>
   );
};

export default Sidebar;

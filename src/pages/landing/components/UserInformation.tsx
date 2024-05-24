import React, { useEffect, useMemo, useState } from "react";
import { IUserInformation } from "../../../types/user.type";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { destroy } from "../../../redux/slices/authSlice";
import Loading from "../../../components/loading/Loading";
import useRedux from "../../../hooks/useRedux";
import { Link, Navigate, useLocation } from "react-router-dom";
import { PATHS } from "../../../constants/path";
import { RootState } from "../../../redux/store";
import { getUserProfile } from "../../../redux/slices/userSlice";

export interface UserInformationProps {
  data: IUserInformation;
}

export const protectedMenuItems = [
  {
    lable: "Contribution Page",
    path: `${PATHS.CONTRIBUTOR.IDENTITY}`,
  },
  { lable: "Coordinator Page", path: `${PATHS.COORDINATOR.IDENTITY}` },
  { lable: "Manager Page", path: `${PATHS.MANAGER.IDENTITY}` },
  { lable: "Admin Page", path: `${PATHS.ADMIN.IDENTITY}` },
];

const UserInformation = ({ data }: UserInformationProps) => {
  const { dispatch, appSelector } = useRedux();
  const [isLoading, setIsLoading] = useState(false);
  const matchingMenuItem = protectedMenuItems.find(
    (item) => item.path === `${data?.role.toLowerCase()}`
  );
  const location = useLocation();

  const handleLogout = () => {
    dispatch(destroy());
  };

  const userProfile = appSelector((state: RootState) => state.user.userProfile);
  const isProfileUpdated = appSelector((state) => state.user.isProfileUpdate);

  useEffect(() => {
    dispatch(getUserProfile());
    console.log("fetchng user detail");
  }, [dispatch]);

  useEffect(() => {
    if (isProfileUpdated) {
      // Dispatch action to fetch updated user profile
      dispatch(getUserProfile());
    }
  }, [dispatch, isProfileUpdated]);

  return (
    <>
      {isLoading && <Loading />}
      <div className="w-full flex flex-row justify-center items-center z-30">
        <div className="w-full flex flex-col justify-end items-end mr-3">
          <h3 className="text-gray-700 font-medium text-base truncate">
            {userProfile?.fullName}
          </h3>
          <span className="text-gray-500 text-sm">{data.role}</span>
        </div>
        <Menu as="div" className="relative z-50 inline-block text-left">
          {userProfile?.avatarUrl ? (
            <Menu.Button className="w-full flex flex-row justify-center items-center">
              {" "}
              <img
                className="w-14 h-12 mb-3 rounded-full shadow-lg mt-4 object-cover"
                src={userProfile.avatarUrl}
                alt="Profile"
              />{" "}
            </Menu.Button>
          ) : (
            <Menu.Button className="w-full flex flex-row justify-center items-center">
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
            </Menu.Button>
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute z-50 right-0 mt-2 w-48 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div className="py-3 px-2 flex flex-col items-start">
                <Menu.Item>
                  <Link
                    to={`/${PATHS.PROFILE.IDENTITY}/${PATHS.PROFILE.VIEW}`}
                    className="w-full pl-4 py-1 rounded text-left text-gray-700 hover:text-gray-900 hover:bg-slate-100 transition-all duration-150"
                  >
                    <button>My account</button>
                  </Link>
                </Menu.Item>
                {matchingMenuItem && (
                  <Menu.Item>
                    <Link
                      to={location.state?.from || `/${matchingMenuItem.path}`}
                      className="w-full pl-4 py-1 rounded text-left text-gray-700 hover:text-gray-900 hover:bg-slate-100 transition-all duration-150"
                    >
                      {matchingMenuItem.lable}
                    </Link>
                  </Menu.Item>
                )}
                <Menu.Item>
                  <button
                    className="w-full pl-4 py-1 rounded text-left text-gray-700 hover:text-gray-900 hover:bg-slate-100 transition-all duration-150"
                    onClick={handleLogout}
                  >
                    Log out
                  </button>
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default UserInformation;

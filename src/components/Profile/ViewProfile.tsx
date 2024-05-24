import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";
import { getUserProfile } from "../../redux/slices/userSlice";
import user from "../../../src/assets/images/user.png";
import { getCurrentUser } from "../../redux/slices/authSlice";

const ViewProfile = () => {
  const { appSelector, dispatch } = useRedux();
  const { userProfile } = appSelector((state: RootState) => state.user);

  useEffect(() => {
    dispatch(getUserProfile());
  }, [dispatch]);

  return (
    <div className="w-full mt-20 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <div className="flex flex-col items-center pb-10">
        {userProfile?.avatarUrl ? (
          <img
            className="w-32 h-32 mb-3 rounded-full shadow-lg mt-4 object-cover"
            src={userProfile.avatarUrl}
            alt="Profile"
          />
        ) : (
          <img
            className="w-24 h-24 mb-3 rounded-full shadow-lg mt-4"
            src={user}
            alt="Bonnie"
          />
        )}
        <div className="w-1/2 flex justify-center mt-12 max-lg:w-full">
          <div className="w-1/2 text-end">
            <span className="mb-1 text-xl font-medium text-gray-900 dark:text-white pr-9">
              Full Name:
            </span>
          </div>

          <div className="w-1/2 pl-10">
            <span className="mb-1 text-xl font-medium text-gray-500 dark:text-white ">
              {userProfile?.fullName}
            </span>
          </div>
        </div>

        <div className="w-1/2 flex justify-center mt-8 max-lg:w-full">
          <div className="w-1/2 text-end">
            <span className="mb-1 text-xl font-medium text-gray-900 dark:text-white pr-9">
              Email:
            </span>
          </div>

          <div className="w-1/2 pl-10">
            <span className="text-xl text-gray-500 dark:text-gray-400 ">
              {userProfile?.email}
            </span>
          </div>
        </div>

        {userProfile?.role !== "Admin" && userProfile?.role !== "Manager" && (
          <div className="w-1/2 flex justify-center mt-8 max-lg:w-full">
            <div className="w-1/2 text-end">
              <span className="mb-1 text-xl font-medium text-gray-900 dark:text-white pr-9">
                Faculty:
              </span>
            </div>

            <div className="w-1/2 pl-10">
              <span className="text-xl text-gray-500 dark:text-gray-400 ">
                {userProfile?.facultyName}
              </span>
            </div>
          </div>
        )}

        <div className="w-1/2 flex justify-center mt-8 max-lg:w-full">
          <div className="w-1/2 text-end">
            <span className="mb-1 text-xl font-medium text-gray-900 dark:text-white pr-9">
              Role:
            </span>
          </div>

          <div className="w-1/2 pl-10">
            <span className="text-xl text-gray-500 dark:text-gray-400 ">
              {userProfile?.role}
            </span>
          </div>
        </div>
        <div className="flex mt-12">
          <Link
            to={`/${PATHS.PROFILE.IDENTITY}/${PATHS.PROFILE.EDIT}`}
            className="inline-flex items-center px-8 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ViewProfile;

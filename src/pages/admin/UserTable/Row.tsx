/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from "react";
import { IUserData } from "../../../types/user.type";
import avatar from "../../../assets/images/Avatar.png";
import "flowbite";
import { Link } from "react-router-dom";
import { PATHS } from "../../../constants/path";

interface IRowProps {
  user?: IUserData;
  label?: string[];
}

const Row = ({ user, label }: IRowProps) => {
  const notAllowedToChangeFaculty = ["Admin", "Manager"];
  const isNotAllowedToChangeFaculty = notAllowedToChangeFaculty.includes(
    user?.role as string
  );

  return (
    <div className="grid grid-cols-12 items-center gap-3 py-4 bg-white border-t border-t-slate-200 min-w-[650px]">
      <span className="col-span-3 truncate">{user?.fullName}</span>
      <span className="col-span-2 truncate">{user?.email}</span>
      <img
        src={user?.avatarUrl || avatar}
        alt="avatar"
        className="col-span-1 truncate h-8 object-contain"
      />

      <span className="col-span-2 truncate">{user?.facultyName || "-"}</span>
      <div className="h-full col-span-1 text-left truncate text-xs font-medium text-gray-600 flex justify-start items-center">
        {user?.role}
      </div>
      <span className="col-span-1">
        <label className="relative inline-flex cursor-pointer items-center">
          <input id="switch" type="checkbox" className="peer sr-only" />
          <label htmlFor="switch" className="hidden"></label>
          {/* <div className="peer h-7 w-12 rounded-full border-2 bg-slate-200 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-cyan-500 peer-checked:after:translate-x-full peer-checked:after:border-white"></div> */}
          <div className="peer h-7 w-12 rounded-full border-2 after:absolute after:left-1 after:top-1 after:h-5 after:w-5 after:rounded-full after:border after:bg-white after:transition-all after:content-[''] bg-cyan-500 after:translate-x-full after:border-white"></div>
        </label>
      </span>

      <div className="col-span-1">
        <Link
          to={`/${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.CHANGE_ROLE}/${user?.email}`}
        >
          <button
            className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 ml-4"
            type="button"
          >
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
              />
            </svg>
          </button>
        </Link>
      </div>

      {!isNotAllowedToChangeFaculty && (
        <div className="col-span-1">
          <Link
            to={`/${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.CHANGE_FACULTY}/${user?.email}`}
          >
            <button
              className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5 ml-4"
              type="button"
            >
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                />
              </svg>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Row;

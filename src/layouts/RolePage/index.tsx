/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, startTransition, useEffect, useState } from "react";
import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useSearchParams,
} from "react-router-dom";
import Loading from "../../components/loading/Loading";
import useRedux from "../../hooks/useRedux";
import { getCurrentUser } from "../../redux/slices/authSlice";
import { getFaculty } from "../../redux/slices/facultySlice";
import Searchbar from "../../components/Searchbar";
import UserInformation from "../../pages/landing/components/UserInformation";
import { IUserInformation } from "../../types/user.type";
import { PATHS } from "../../constants/path";
import image from "../../assets/images/logo.jpg";
import clsx from "clsx";
import { getRole } from "../../redux/slices/roleSlice";

interface MenuItem {
  id: number;
  label: string;
  path: string;
  icon: string;
}

interface Menu {
  [key: string]: MenuItem[];
}

const menu: Menu = {
  Contributor: [
    {
      id: 1,
      label: "My Contribution",
      path: `${PATHS.CONTRIBUTOR.IDENTITY}/${PATHS.CONTRIBUTION.IDENTITY}?page=1`,
      icon: "contribution",
    },
    {
      id: 2,
      label: "Faculty Contribution",
      path: `${PATHS.CONTRIBUTOR.IDENTITY}/${PATHS.CONTRIBUTION.FACULTY}?page=1`,
      icon: "faculty",
    },
    {
      id: 3,
      label: "Contribute",
      path: `${PATHS.CONTRIBUTOR.IDENTITY}/${PATHS.CONTRIBUTION.CREATE}`,
      icon: "contribute",
    },
  ],
  Coordinator: [
    {
      id: 1,
      label: "Manage Faculty Contributions",
      path: `${PATHS.COORDINATOR.IDENTITY}/${PATHS.CONTRIBUTION.IDENTITY}?page=1`,
      icon: "contribution",
    },
    {
      id: 2,
      label: "Dashboard",
      path: `${PATHS.COORDINATOR.IDENTITY}/${PATHS.ADMIN.DASHBOARD}`,
      icon: "dashboard",
    },
    {
      id: 3,
      label: "Create Account",
      path: `${PATHS.COORDINATOR.IDENTITY}/${PATHS.COORDINATOR.CREATE_ACCOUNT}`,
      icon: "create-account",
    },
  ],
  Manager: [
    {
      id: 1,
      label: "Manage Contribution",
      icon: "contribution",
      path: `${PATHS.MANAGER.IDENTITY}/${PATHS.CONTRIBUTION.IDENTITY}?page=1`,
    },
    {
      id: 2,
      label: "Dashboard",
      icon: "dashboard",
      path: `${PATHS.MANAGER.IDENTITY}/${PATHS.ADMIN.DASHBOARD}`,
    },
    {
      id: 3,
      label: "Create Account",
      icon: "create-account",
      path: `${PATHS.MANAGER.IDENTITY}/${PATHS.MANAGER.CREATE_ACCOUNT}`,
    },
  ],
  Admin: [
    {
      id: 1,
      label: "Manage User",
      icon: "user",
      path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.MANAGE_USER}?page=1`,
    },
    {
      id: 2,
      label: "Manage Period",
      path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.PERIOD}`,
      icon: "time",
    },
    {
      id: 3,
      label: "Create Account",
      icon: "create-account",
      path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.CREATE_ALL}`,
    },
    {
      id: 4,
      label: "Manage Faculty",
      icon: "faculty",
      path: `${PATHS.ADMIN.IDENTITY}/${PATHS.ADMIN.FACULTY}`,
    },
  ],
};

const RolePage = () => {
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const { dispatch, appSelector } = useRedux();
  const { userInfor } = appSelector((state) => state.auth);
  const [isActive, setIsActive] = useState<number | 1>();

  const handleOnclick = (id: number) => {
    setIsActive(id);
  };

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

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(getFaculty());
    dispatch(getRole());
  }, [dispatch]);

  // useEffect(() => {
  //   if (userInfor) {
  //     const currentItem = menu[userInfor.role]?.find((item) => {
  //       return location.pathname
  //         .toLowerCase()
  //         .includes(item.label.toLowerCase().replace(/ /g, ""));
  //     });

  //     setIsActive(currentItem?.id);
  //   }
  // }, [location]);

  return userInfor ? (
    <div className="flex flex-row justify-center items-center bg-slate-100">
      {/* Side bar */}
      <div className="w-52 min-h-screen fixed z-50 top-0 left-0 bg-white border-r border-slate-100 flex flex-col items-center justify-start pt-5">
        <Link
          key={"home"}
          to={`/${PATHS.HOME.IDENTITY}`}
          className="w-1/3 flex justify-center mb-10"
        >
          <img src={image} alt="LOGO" className="h-full w-full" />
        </Link>
        <div className="flex flex-col justify-center items-start w-full px-6 gap-2">
          {menu[userInfor.role]?.map((item) => {
            return (
              <Link
                key={item.label}
                to={`/${item.path}`}
                className={clsx(
                  "py-2 px-3 w-full rounded-md text-sm drop-shadow flex justify-start items-center hover:bg-blue-600 hover:text-white transition-all duration-150",
                  isActive === item.id
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100"
                )}
                onClick={() => {
                  handleOnclick(item.id);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4 mr-4"
                >
                  {item.icon === "contribution" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 7.5h1.5m-1.5 3h1.5m-7.5 3h7.5m-7.5 3h7.5m3-9h3.375c.621 0 1.125.504 1.125 1.125V18a2.25 2.25 0 0 1-2.25 2.25M16.5 7.5V18a2.25 2.25 0 0 0 2.25 2.25M16.5 7.5V4.875c0-.621-.504-1.125-1.125-1.125H4.125C3.504 3.75 3 4.254 3 4.875V18a2.25 2.25 0 0 0 2.25 2.25h13.5M6 7.5h3v3H6v-3Z"
                    />
                  )}
                  {item.icon === "dashboard" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z"
                    />
                  )}
                  {item.icon === "create-account" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                    />
                  )}

                  {item.icon === "faculty" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"
                    />
                  )}

                  {item.icon === "contribute" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                    />
                  )}

                  {item.icon === "time" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
                    />
                  )}

                  {item.icon === "user" && (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z"
                    />
                  )}
                </svg>

                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        <Link to={`/${PATHS.HOME.IDENTITY}`}>
          <div className="absolute w-full px-4 py-2 flex flex-row justify-center items-center bottom-0 left-0 z-20 text-white font-medium bg-blue-500 shadow-sm hover:shadow transition-all duration-200">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
              />
            </svg>
            <span>Back to home</span>
          </div>
        </Link>
      </div>
      <div className="relative pl-52 w-[calc(100vw-208px)] flex-1 flex flex-col justify-center items-start min-h-screen">
        {/* Top bar */}
        <div className="h-20 md:px-5 lg:px-5 xl:px-10 w-[calc(100vw-208px)] fixed top-0 right-0 z-40 bg-white flex justify-between items-center drop-shadow">
          <h1 className="text-gray-700 font-semibold text-lg">
            {userInfor?.role}
          </h1>
          <div className="md:w-[260px] lg:w-[400px] xl:w-[500px]">
            <Searchbar paramName="search" setParams={setParams} />
          </div>
          <div className="w-fit text-sm">
            <UserInformation data={userInfor as IUserInformation} />
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 flex justify-center mt-20 overflow-x-hidden">
          <Suspense fallback={<Loading />}>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  ) : (
    <Navigate to={`/${PATHS.HOME.IDENTITY}`} />
  );
};

export default RolePage;

import { Suspense, useEffect, useMemo, useState } from "react";
import { Link, Navigate, Outlet, useLocation } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { PATHS } from "../../constants/path";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { destroy } from "../../redux/slices/authSlice";

const loading = () => <Loading />;

const variants = {
  [`/auth/${PATHS.AUTH.REGISTER}`]: {
    to: `/auth/${PATHS.AUTH.LOGIN}`,
    linkText: "Login",
    text: "Have an account?",
  },
  [`/auth/${PATHS.AUTH.LOGIN}`]: {
    to: `/auth/${PATHS.AUTH.SEND_OTP}`,
    linkText: "Reset Password",
    text: "Do you forget password?",
  },
};

const Authentication = () => {
  // const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);
  const { userInfor } = useSelector((state: RootState) => state.auth);

  const location = useLocation();

  const variant = useMemo(() => location.pathname, [location.pathname]);

  return (
    <>
      {userInfor && (
        <Navigate
          to={{
            pathname: `/${PATHS.HOME.IDENTITY}`,
          }}
        />
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <div className="relative min-w-screen min-h-screen flex justify-center items-center px-4">
          <Link to={`/${PATHS.HOME.IDENTITY}`}>
            <div className="absolute px-4 py-2 flex flex-row justify-between items-center rounded-md top-4 left-4 md:left-10 md:top-8 z-20 text-white font-medium bg-black/20 hover:bg-black/30 transition-all duration-200">
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
          <div className="relative bg-white/70 my-16 p-8 rounded shadow-2xl w-[420px] z-20">
            <Suspense fallback={loading()}>
              <Outlet />
            </Suspense>
            <div className="flex flex-col gap-8 justify-center items-center text-base mt-8 px-2 text-gray-500">
              <div className="flex gap-2">
                <div>{variants[variant]?.text || ""}</div>
                <Link
                  to={variants[variant]?.to || ""}
                  replace
                  className="cursor-pointer text-blue-600 hover:underline"
                >
                  {variants[variant]?.linkText || ""}
                </Link>
              </div>
            </div>
          </div>
          <img
            src="https://images.pexels.com/photos/2982449/pexels-photo-2982449.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
            className="fixed w-screen h-screen top-0 left-0 object-cover bg-black/10 z-0"
          />
          <div className="fixed w-screen h-screen top-0 left-0 bg-black/60 z-10"></div>
        </div>
      )}
    </>
  );
};

export default Authentication;

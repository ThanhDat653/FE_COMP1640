import React, { Suspense } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { PATHS } from "../constants/path";
// import Loading from "../components/loading/Loading";
import useRedux from "../hooks/useRedux";
import { getCurrentUser } from "../redux/slices/authSlice";
import Loading from "../components/loading/Loading";

type ProtectedRouteTypes = {
  component?: React.ComponentType;
};

function ProtectedRouteForLogin({
  component: RouteComponent,
}: ProtectedRouteTypes) {
  const { dispatch, appSelector } = useRedux();
  const location = useLocation();
  const navigate = useNavigate();
  const { userInfor, isLogin } = appSelector((state) => state.auth);

  if (!userInfor) dispatch(getCurrentUser());

  useEffect(() => {
    if (!isLogin)
      navigate(`/${PATHS.HOME.IDENTITY}`, {
        state: {
          from: location.pathname,
        },
      });
  }, [navigate, location.pathname, isLogin]);

  return RouteComponent ? (
    <Suspense fallback={<Loading />}>
      <RouteComponent />
    </Suspense>
  ) : null;
}

export default ProtectedRouteForLogin;

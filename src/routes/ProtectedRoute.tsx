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
   role?: string;
};

function ProtectedRoute({
   component: RouteComponent,
   role,
}: ProtectedRouteTypes) {
   const { dispatch, appSelector } = useRedux();
   const location = useLocation();
   const navigate = useNavigate();
   const { userInfor, isLogin } = appSelector((state) => state.auth);

   if (!userInfor) dispatch(getCurrentUser());

   useEffect(() => {
      if (!isLogin)
         navigate(`/${PATHS.AUTH.IDENTITY}`, {
            state: {
               from: location.pathname,
            },
         });
   }, [navigate, location.pathname, isLogin]);

   if (role && userInfor?.role) {
      const regex = new RegExp(`^${role}$`);

      if (!regex.test(userInfor.role)) {
         return (
            <Navigate to={{ pathname: `/${PATHS.HOME.IDENTITY}` }} replace />
         );
      }
   }

   return RouteComponent ? (
      <Suspense fallback={<Loading />}>
         <RouteComponent />
      </Suspense>
   ) : null;
}

export default ProtectedRoute;

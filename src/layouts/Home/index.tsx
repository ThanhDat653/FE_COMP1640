import React, { Suspense, useEffect } from "react";
import Header from "../../pages/landing/components/Header";
import Footer from "../../pages/landing/components/Footer";
import { Outlet } from "react-router-dom";
import { getCurrentUser } from "../../redux/slices/authSlice";
import useRedux from "../../hooks/useRedux";
import Loading from "../../components/loading/Loading";
import { getFaculty } from "../../redux/slices/facultySlice";

const Home = () => {
   const { dispatch } = useRedux();

   useEffect(() => {
      dispatch(getCurrentUser());
      dispatch(getFaculty());
   }, [dispatch]);

   return (
      <div className="relative w-screen pr-[5px] min-h-screen bg-white md:bg-gray-100 flex flex-col justify-start items-center">
         <Header />
         <div className="w-full mt-16 lg:mt-24 mb-10 lg:mb-16 px-4 md:px-10 lg:p-0 lg:w-[960px] xl:w-[1200px]">
            <Suspense fallback={<Loading />}>
               <Outlet />
            </Suspense>
         </div>
         <Footer />
      </div>
   );
};

export default Home;

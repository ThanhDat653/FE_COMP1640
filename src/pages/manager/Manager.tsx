/* eslint-disable react/style-prop-object */
import { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import {
   getContributionListWithToken,
   getZipAll,
} from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/loading/Loading";
import Table from "./components/ContributionTable/Table";
import StatusSelector from "../../components/Dropdown/StatusSelector";
import PeriodSelector from "../../components/Dropdown/PeriodSelector";
import SortSelector from "../../components/Dropdown/SortSelector";
import FacultySelector from "../../components/Dropdown/FacultySelector";

const Manager = () => {
   const location = useLocation();
   const { appSelector, dispatch } = useRedux();
   const [searchParams, setSearchParams] = useSearchParams();
   const { userInfor } = appSelector((state) => state.auth);
   const { list, totalPage, isLoading } = appSelector(
      (state) => state.contribution,
   );

   const setParams = (key: string, value: string | number) => {
      setSearchParams((prevParams) => {
         if (
            value === null ||
            value === "" ||
            value === undefined ||
            Number.isNaN(value)
         ) {
            prevParams.delete(key);
         } else {
            prevParams.set(key, value as string);
         }
         return prevParams;
      });
   };

   useEffect(() => {
      const query = searchParams.get("search") as string;
      const status = searchParams.get("status") as string;
      const period = searchParams.get("period") as string;
      const faculty = searchParams.get("faculty") as string;
      const sort = searchParams.get("sorts") as string;
      const page = parseInt(searchParams.get("page") as string);

      dispatch(
         getContributionListWithToken({
            filters: {
               status: status,
               period: period,
               facultyId: faculty,
               search: query,
            },
            sorts: sort,
            page: page,
            pageSize: 10,
         }),
      );
   }, [dispatch, userInfor, searchParams, location.pathname]);

   useEffect(() => {
      dispatch(getPeriod());
      dispatch(getZipAll());
   }, [dispatch]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         {isLoading && <Loading />}
         <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden md:max-w-screen-md lg:max-w-screen-lg xl:max-w-full">
            <div className="w-full flex flex-col gap-3 xl:gap-0 xl:flex-row justify-between items-start xl:items-end pb-5">
               <div className="w-full flex justify-start items-end">
                  <StatusSelector paramName="status" setParams={setParams} />
                  <PeriodSelector paramName="period" setParams={setParams} />
                  <FacultySelector paramName="faculty" setParams={setParams} />
               </div>
               <SortSelector paramName="sorts" setParams={setParams} />
            </div>
            <Table data={list} name="My contribution" />
            {list.length !== 0 && (
               <Pagination
                  total={totalPage}
                  paramName="page"
                  setParams={setParams}
               />
            )}
         </div>
      </div>
   );
};

export default Manager;

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import { getContributionListWithToken } from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../components/Pagination/Pagination";
import Loading from "../../components/loading/Loading";
import Table from "./components/ContributionTable/Table";
import StatusSelector from "../../components/Dropdown/StatusSelector";
import PeriodSelector from "../../components/Dropdown/PeriodSelector";
import SortSelector from "../../components/Dropdown/SortSelector";

const ContributorPage = () => {
   const location = useLocation();
   const [searchParams, setSearchParams] = useSearchParams();
   const { appSelector, dispatch } = useRedux();
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
      const sort = searchParams.get("sorts") as string;
      const page = parseInt(searchParams.get("page") as string);

      dispatch(
         getContributionListWithToken({
            filters: {
               email: userInfor?.email,
               status: status,
               period: period,
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
   }, [dispatch]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         {isLoading && <Loading />}
         <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="w-full flex justify-between items-end pb-5">
               <div className="w-full flex justify-start items-center">
                  <StatusSelector paramName="status" setParams={setParams} />
                  <PeriodSelector paramName="period" setParams={setParams} />
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

export default ContributorPage;

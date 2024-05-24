/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useLocation, useParams, useSearchParams } from "react-router-dom";
import ContributionList from "../../components/ContributionList/ContributionList";
import useRedux from "../../hooks/useRedux";
import { getContributionList } from "../../redux/slices/contributionSlice";
import { getPeriod } from "../../redux/slices/periodSlide";
import { RootState } from "../../redux/store";
import Pagination from "../../components/Pagination/Pagination";
import PeriodSelector from "../../components/Dropdown/PeriodSelector";
import SortSelector from "../../components/Dropdown/SortSelector";
import Loading from "../../components/loading/Loading";

interface IFilters {
   period: string | "";
}

const ContributionCategory = () => {
   const location = useLocation();
   const { dispatch, appSelector } = useRedux();
   const [searchParams, setSearchParams] = useSearchParams();
   const { faculty } = appSelector((state: RootState) => state.faculty);
   const { category } = useParams<{ category: string }>() || "";
   const { list, totalPage, isLoading } = appSelector(
      (state: RootState) => state.contribution,
   );
   const facultyId = faculty.find((item) => item.name === category)?.id;

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
      const period = searchParams.get("period") as string;
      const sort = searchParams.get("sorts") as string;
      const page = parseInt(searchParams.get("page") as string);

      dispatch(
         getContributionList({
            filters: {
               period: period,
               search: query,
               facultyId: facultyId,
            },
            sorts: sort,
            page: page,
            pageSize: 12,
         }),
      );
   }, [dispatch, searchParams, location.pathname, faculty]);

   useEffect(() => {
      dispatch(getPeriod());
   }, [dispatch]);

   return (
      <>
         {isLoading && <Loading />}
         <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-5 ">
            <div className="w-full flex justify-between items-end">
               <div className="w-full flex justify-start items-center">
                  <PeriodSelector paramName="period" setParams={setParams} />
               </div>

               <SortSelector paramName="sorts" setParams={setParams} />
            </div>
            <ContributionList
               categoryName={category || ""}
               data={list}
               type="full"
               for="guest"
            />
            {list.length !== 0 && (
               <Pagination
                  total={totalPage}
                  paramName="page"
                  setParams={setParams}
               />
            )}
         </div>
      </>
   );
};

export default ContributionCategory;

/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useMemo, useState } from "react";
import Loading from "../../../../components/loading/Loading";
import "flowbite";
import Card from "../../../../components/Dashboard/Card";
import DashboardTable from "./DashboardTable";
import useRedux from "../../../../hooks/useRedux";
import { getCoordinatorDashboard } from "../../../../redux/slices/dashboardSlice";
import { getPeriod } from "../../../../redux/slices/periodSlide";
import { useSearchParams } from "react-router-dom";
import DonutChart from "./DonutChart";

const Dashboard = () => {
   const { appSelector, dispatch } = useRedux();
   const [searchParams, setSearchParams] = useSearchParams();
   const [current, setCurrent] = useState<string>(
      searchParams.get("period") || "",
   );
   const { coordinatorDashboard, isLoading } = appSelector(
      (state) => state.dashboard,
   );
   const { period } = appSelector((state) => state.period);

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
      dispatch(getPeriod());
      dispatch(getCoordinatorDashboard(current));
      if (!searchParams.get("period")) setParams("period", period[0]?.id);
   }, [dispatch, current]);

   useEffect(() => {
      const param = searchParams.get("period");
      if (param) {
         const temp = period.find((item) => item.id === param);
         setCurrent(temp?.id as string);
      } else setCurrent("");
   }, [searchParams, period]);

   const renderChart = useMemo(() => {
      const convertObjectToArray = (obj: Object) => {
         const keys = Object.keys(obj);
         const values = Object.values(obj);
         return [keys, values];
      };

      if (coordinatorDashboard) {
         const [statusArray, percentageArray] = convertObjectToArray(
            coordinatorDashboard?.percentageOfContributionByStatus,
         );
         return <DonutChart x={statusArray} y={percentageArray} />;
      }
   }, [coordinatorDashboard]);

   const renderTable = useMemo(() => {
      if (coordinatorDashboard?.top5ContributorOfFaculty)
         return (
            <DashboardTable
               data={coordinatorDashboard?.top5ContributorOfFaculty}
               name="Top contributor"
            />
         );
   }, [coordinatorDashboard]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         {isLoading && <Loading />}
         <div className="px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="mr-3 mb-5">
               <label htmlFor="period" className="text-sm text-gray-600">
                  Period
               </label>
               <select
                  id="period"
                  className="block appearance-none w-40 lg:w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
                  value={current}
                  onChange={(event) => {
                     setParams("period", event.target.value);
                  }}
               >
                  {period?.map((item) => {
                     return (
                        <option key={item.id} value={item.id}>
                           {item.academicYear}
                        </option>
                     );
                  })}
               </select>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 xl:gap-5 mb-5">
               <Card
                  label="Contributor"
                  value={coordinatorDashboard?.topContributorFullName || "..."}
                  icon="top"
               />
               <Card
                  label="Contributions"
                  value={coordinatorDashboard?.totalOfContribution + ""}
                  icon="total-contributions"
               />
               <Card
                  label="Published"
                  value={
                     coordinatorDashboard?.totalOfPublishedContribution + ""
                  }
                  icon="total-published"
               />
               <Card
                  label="Feedback"
                  value={
                     coordinatorDashboard?.percentageOfFeedbackedContribution +
                     "%"
                  }
                  icon="feedback"
               />
            </div>
            <div className="w-full flex flex-col lg:grid lg:grid-cols-3 gap-5 ">
               <div className="lg:col-span-2 min-h-72">
                  {/* <DashboardTable
                     name="Top contributor"
                     data={coordinatorDashboard?.top5ContributorOfFaculty}
                  /> */}
                  {renderTable}
               </div>
               {renderChart}
            </div>
         </div>
      </div>
   );
};

export default Dashboard;

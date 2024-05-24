import React, { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";
import { getPeriod } from "../../redux/slices/periodSlide";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/functions";

const PeriodList = () => {
   const { dispatch, appSelector } = useRedux();
   const periods = appSelector((state: RootState) => state.period);

   useEffect(() => {
      dispatch(getPeriod());
   }, [dispatch]);

   return (
      <div className="w-[calc(100vw-208px)]">
         <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-center mt-8 p-4 w-full">
               {periods.period.map((p) => (
                  <Link to={`${p.id}`} className="w-full md:px-32 lg:px-0">
                     <button
                        type="button"
                        className="w-full py-5 px-8 text-gray-600 text-sm rounded-md bg-white flex flex-col items-start shadow hover:shadow-md transition-all duration-200 "
                     >
                        <div>
                           <span className="font-medium mr-2">
                              Academy year:
                           </span>
                           <span>{p.academicYear}</span>
                        </div>
                        <div>
                           <span className="font-medium mr-2">
                              First deadline:
                           </span>
                           <span>{formatDate(p.firstSubmissionDeadline)}</span>
                        </div>
                        <div>
                           <span className="font-medium mr-2">
                              Second deadline:
                           </span>
                           <span>{formatDate(p.secondSubmissionDeadline)}</span>
                        </div>
                     </button>
                  </Link>
               ))}
            </div>
         </div>
      </div>
   );
};

export default PeriodList;

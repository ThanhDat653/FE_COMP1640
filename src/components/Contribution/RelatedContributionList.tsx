import React, { useEffect } from "react";
import useRedux from "../../hooks/useRedux";
import Contribution from "./ContributionCard";
import { PATHS } from "../../constants/path";
import { getContributionList } from "../../redux/slices/contributionSlice";
import { Link } from "react-router-dom";

const RelatedContributionList = () => {
   const { dispatch, appSelector } = useRedux();
   const { list, detail } = appSelector((state) => state.contribution);
   const { faculty } = appSelector((state) => state.faculty);

   const facultyName = faculty.find((f) => f.id === detail?.facultyId);

   useEffect(() => {
      if (list.length === 0) dispatch(getContributionList({}));
   }, [dispatch]);

   return (
      <div className="md:col-span-1 pt-10 lg:pt-0 lg:pl-5 border-t-2 lg:border-t-0 border-slate-200">
         <h3 className="pl-2 mb-6 text-base text-blue-700 font-semibold border-l-4 border-blue-700">
            Related contributions
         </h3>

         <div className="h-full w-full hidden flex-col gap-2 justify-start items-start md:hidden lg:flex">
            {list.slice(0, 3).map((contribution) => {
               return (
                  <Link
                     to={`/${PATHS.CONTRIBUTION.IDENTITY}/${contribution.id}`}
                     className="w-full"
                     key={contribution.id}
                  >
                     <div
                        className={
                           "w-full h-36 lg:h-32 bg-white drop-shadow border rounded-md grid grid-cols-3 items-center overflow-hidden hover:cursor-pointer hover:drop-shadow-md hover:scale-[1.01] transition-all duration-300"
                        }
                     >
                        <img
                           src={
                              contribution.coverImageUrl ||
                              "https://th.bing.com/th/id/R.e7b98af026b39429f7b0e71a1f728ee7?rik=0WQqQyiogQB1LQ&pid=ImgRaw&r=0"
                           }
                           alt=""
                           className={"object-fill w-full"}
                        />
                        <div
                           className={
                              "flex flex-col w-full h-full p-3 col-span-2"
                           }
                        >
                           <h3
                              className={
                                 "text-sm w-ful text-gray-900 font-semibold mb-2 line-clamp-2"
                              }
                           >
                              {contribution.title}
                           </h3>
                           <span
                              className={
                                 "w-full flex-1 text-sm text-gray-500 truncate"
                              }
                           >
                              {contribution.description}
                           </span>
                           <div className="w-full flex justify-center items-center">
                              <span
                                 className={
                                    "w-full text-left text-sm lg:text-xs font-medium text-blue-600 hover:cursor-pointer"
                                 }
                              >
                                 Read more
                              </span>
                           </div>
                        </div>
                     </div>
                  </Link>
               );
            })}
         </div>

         <div className="h-full w-full flex flex-col md:grid md:grid-cols-2 gap-3 justify-start items-start lg:hidden">
            {list.slice(0, 4).map((contribution) => {
               return (
                  <Link
                     to={`/${PATHS.CONTRIBUTION.IDENTITY}/${contribution.id}`}
                     className="w-full"
                     key={contribution.id}
                  >
                     <div
                        className={
                           "w-full h-40 md:h-36 bg-white drop-shadow-lg border rounded-md grid grid-cols-3 items-center overflow-hidden hover:cursor-pointer hover:drop-shadow-md hover:scale-[1.01] transition-all duration-300"
                        }
                     >
                        <img
                           src={
                              contribution.coverImageUrl ||
                              "https://th.bing.com/th/id/R.e7b98af026b39429f7b0e71a1f728ee7?rik=0WQqQyiogQB1LQ&pid=ImgRaw&r=0"
                           }
                           alt=""
                           className={"object-fill w-full"}
                        />
                        <div
                           className={
                              "flex flex-col w-full h-full p-5 md:p-3 col-span-2"
                           }
                        >
                           <h3
                              className={
                                 "text-base md:text-sm w-full  text-gray-900 font-semibold mb-2 truncate"
                              }
                           >
                              {contribution.title}
                           </h3>
                           <span
                              className={
                                 "w-full flex-1 text-sm text-gray-500 line-clamp-2"
                              }
                           >
                              {contribution.description}
                           </span>
                           <div className="w-full flex justify-center items-center">
                              <span
                                 className={
                                    "w-full text-left text-xs font-medium text-blue-600 hover:cursor-pointer"
                                 }
                              >
                                 Read more
                              </span>
                           </div>
                        </div>
                     </div>
                  </Link>
               );
            })}
         </div>
      </div>
   );
};

export default RelatedContributionList;

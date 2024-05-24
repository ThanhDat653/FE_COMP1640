import Contribution from "../Contribution/ContributionCard";
import { IContributionData } from "../../types/contribution.type";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";
import clsx from "clsx";

interface IListProps {
   data: IContributionData[];
   categoryName: string;
   type: "full" | "category";
   for: "guest" | "user";
}

const ContributionList = (data: IListProps) => {
   return (
      <div className="w-full md:w-full lg:w-[960px] xl:w-[1200px] py-3 md:py-5 px-4">
         <div className="w-full my-8 flex flex-row justify-between items-center">
            <h3 className="pl-2 pb-1 leading-4 tracking-wide text-lg text-blue-700 font-semibold border-l-4 border-blue-700">
               {data.categoryName}
            </h3>
            {data.type === "category" && (
               <Link
                  to={`/${PATHS.CONTRIBUTION.IDENTITY}/${PATHS.CONTRIBUTION.CATEGORY}/${data.categoryName}`}
               >
                  <div className="flex flex-row justify-center items-center text-blue-500">
                     <span className="pb-1 mr-2">Explore more</span>
                     <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5"
                     >
                        <path
                           strokeLinecap="round"
                           strokeLinejoin="round"
                           d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                        />
                     </svg>
                  </div>
               </Link>
            )}
         </div>
         {data.data.length > 0 ? (
            <>
               <div className="w-full md:hidden grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 justify-between items-center">
                  {data.data.map((item) => (
                     <Contribution
                        type="horizontal"
                        contribution={item}
                        key={item.id}
                        for={data.for}
                        path={
                           data.for === "guest"
                              ? `/${PATHS.CONTRIBUTION.IDENTITY}/${item.id}`
                              : item.id
                        }
                     />
                  ))}
               </div>
               <div
                  className={clsx(
                     "w-full hidden md:grid md:gap-2 lg:gap-5 md:grid-cols-3 xl:grid-cols-4 justify-between",
                     data.type === "category" &&
                        "grid-rows-1 auto-rows-[0] md:overflow-y-hidden xl:overflow-y-visible",
                  )}
               >
                  {data.data.map((item) => (
                     <Contribution
                        type="vertical"
                        contribution={item}
                        key={item.id}
                        for={data.for}
                        path={
                           data.for === "guest"
                              ? `/${PATHS.CONTRIBUTION.IDENTITY}/${item.id}`
                              : item.id
                        }
                     />
                  ))}
               </div>
            </>
         ) : (
            <span className="text-center w-full text-gray-500">
               No contribution found matching your search.
            </span>
         )}
      </div>
   );
};

export default ContributionList;

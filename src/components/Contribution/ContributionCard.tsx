import { Link } from "react-router-dom";
import { IContributionData } from "../../types/contribution.type";
import clsx from "clsx";

interface IContributionProps {
   type: "vertical" | "horizontal";
   contribution: IContributionData;
   for: "guest" | "user";
   path: string;
}

const Contribution = (data: IContributionProps) => {
   return (
      <Link to={data.path} className="w-full">
         <div
            className={clsx(
               data.type === "horizontal" &&
                  "w-full h-40 md:h-48 lg:h-36 bg-white drop-shadow border rounded grid grid-cols-3 overflow-hidden hover:cursor-pointer hover:drop-shadow-md hover:scale-[1.01] transition-all duration-300",
               data.type === "vertical" &&
                  "md:w-full flex flex-col justify-center items-center rounded-lg overflow-hidden bg-white shadow-md hover:cursor-pointer hover:shadow-lg transition-all duration-200",
            )}
         >
            <img
               src={
                  data.contribution.coverImageUrl ||
                  "https://th.bing.com/th/id/R.e7b98af026b39429f7b0e71a1f728ee7?rik=0WQqQyiogQB1LQ&pid=ImgRaw&r=0"
               }
               alt=""
               className={clsx(
                  data.type === "horizontal" &&
                     "h-40 md:h-48 lg:h-36 object-cover col-span-1",

                  data.type === "vertical" && "object-cover w-full h-[180px]",
               )}
            />
            <div
               className={clsx(
                  data.type === "horizontal" &&
                     "h-full flex-1 p-5 col-span-2 flex flex-col",
                  data.type === "vertical" &&
                     "flex flex-col object-cover w-full h-[180px] p-6",
               )}
            >
               <h3
                  className={clsx(
                     data.type === "horizontal" &&
                        "text-lg  md:text-base lg:text-sm text-gray-900 font-semibold mb-2 line-clamp-1",

                     data.type === "vertical" &&
                        "text-lg md:text-base text-gray-900 font-semibold mb-2 truncate",
                  )}
               >
                  {data.contribution.title}
               </h3>
               <span
                  className={clsx(
                     data.type === "horizontal" &&
                        "w-full flex-1 text-sm text-gray-700 line-clamp-2",

                     data.type === "vertical" &&
                        "w-full flex-1 text-sm text-gray-600 line-clamp-3",
                  )}
               >
                  {data.contribution.description ||
                     `Lorem ipsum dolor sit
                     amet consectetur adipisicing elit. Officia ducimus iste,
                     inventore, necessitatibus earum nihil saepe amet facere in
                     odio eos minima mollitia voluptate modi debitis! Qui
                     deserunt quis impedit?`}
               </span>
               <div className="w-full flex justify-center items-center">
                  <span
                     className={clsx(
                        "w-full text-left text-sm lg:text-xs font-medium text-blue-600 hover:cursor-pointer",
                     )}
                  >
                     Read more
                  </span>
                  {data.for === "user" && (
                     <span className="w-full text-left text-sm font-medium text-emerald-700 hover:cursor-pointer">
                        {data.contribution.status}
                     </span>
                  )}
               </div>
            </div>
         </div>
      </Link>
   );
};

export default Contribution;

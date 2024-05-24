/* eslint-disable jsx-a11y/img-redundant-alt */
import { IContributionDetail } from "../../../../types/contribution.type";
import { ITopContributor } from "../../../../types/dashboard.type";
import avatar from "../../../../assets/images/Avatar.png";

interface ITableProps {
   name: string;
   data: ITopContributor[];
}

const DashboardTable = ({ name, data }: ITableProps) => {
   return (
      <>
         <div className="w-full bg-white flex flex-col text-sm px-6 py-6 rounded-lg drop-shadow-md h-full">
            <h2 className="text-lg font-bold text-blue-950 py-1">{name}</h2>
            <div className="w-full overflow-x-scroll">
               <div className="min-w-[520px] grid grid-cols-6 gap-4 text-gray-400 font-medium py-5">
                  <span className="col-span-1">Avatar</span>
                  <span className="col-span-2">Full Name</span>
                  <span className="col-span-2">Email</span>
                  <span className="col-span-1 text-center">Total</span>
               </div>

               <div>
                  {data?.map((contributor) => {
                     return (
                        <div
                           key={contributor.email}
                           className="min-w-[520px] w-full grid grid-cols-6 items-center gap-3 py-4 bg-white border-t border-t-slate-200 hover:bg-slate-50 transition-all duration-150"
                        >
                           <img
                              src={contributor.avatarUrl || avatar}
                              alt=""
                              className="col-span-1 h-8 object-contain"
                           />
                           <span className="col-span-2">
                              {contributor.fullName}
                           </span>
                           <span className="col-span-2">
                              {contributor.email}
                           </span>
                           <span className="col-span-1 text-center">
                              {contributor.contributionCount}
                           </span>
                        </div>
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default DashboardTable;

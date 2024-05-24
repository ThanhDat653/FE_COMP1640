/* eslint-disable jsx-a11y/img-redundant-alt */
import { IFacultyRank } from "../../../../types/dashboard.type";

interface ITableProps {
   name: string;
   data: IFacultyRank;
}

const DashboardTable = ({ name, data }: ITableProps) => {
   return (
      <>
         <div className="w-full bg-white flex flex-col text-sm px-6 py-6 rounded-lg drop-shadow-md h-full">
            <h2 className="text-lg font-bold text-blue-950 py-1">{name}</h2>
            <div className="w-full overflow-x-scroll">
               <div className="min-w-[480px] grid grid-cols-5 gap-4 text-gray-400 font-medium py-5">
                  <span className="col-span-1">#Rank</span>
                  <span className="col-span-2">Faculty</span>
                  <span className="col-span-2">Contributions</span>
               </div>

               <div>
                  {data &&
                     Object?.entries(data)?.map(([key, value], index) => (
                        <div
                           key={key}
                           className="min-w-[480px] w-full grid grid-cols-5 items-center gap-3 py-4 bg-white border-t border-t-slate-200 hover:bg-slate-50 transition-all duration-150"
                        >
                           <span className="col-span-1">{index + 1}</span>
                           <span className="col-span-2">{key}</span>
                           <span className="col-span-2">{value}</span>
                        </div>
                     ))}
               </div>
            </div>
         </div>
      </>
   );
};

export default DashboardTable;

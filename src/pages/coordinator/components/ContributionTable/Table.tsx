import { IContributionDetail } from "../../../../types/contribution.type";
import Row from "./Row";

interface ITableProps {
   name: string;
   data: IContributionDetail[];
}

const Table = ({ name, data }: ITableProps) => {
   return (
      <>
         <div className="w-full bg-white flex flex-col text-sm px-6 py-6 rounded-lg drop-shadow-md">
            <h2 className="text-lg font-bold text-blue-950 py-1">{name}</h2>
            <div className="w-full overflow-x-scroll">
               <div className="min-w-[940px] grid grid-cols-12 gap-4 text-gray-400 font-medium py-5">
                  <span className="col-span-4">Title</span>
                  <span className="col-span-2">Period</span>
                  <span className="col-span-2">Image</span>
                  <span className="col-span-3">CreatedAt</span>
                  <span className="col-span-1 text-center">Status</span>
               </div>

               <div>
                  {data.map((contribution) => {
                     return (
                        <Row
                           contribution={contribution}
                           key={contribution.id}
                        />
                     );
                  })}
               </div>
            </div>
         </div>
      </>
   );
};

export default Table;

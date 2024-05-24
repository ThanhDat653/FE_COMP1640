import React from "react";
import { SelectComponentProps } from "../../types/params.type";
import { useSearchParams } from "react-router-dom";
const status = ["Approved", "Processing", "Processed", "Rejected", "Published"];

const StatusSelector = ({ paramName, setParams }: SelectComponentProps) => {
   const [searchParams] = useSearchParams();

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setParams(paramName, e.target.value);
      setParams("page", "1");
   };

   return (
      <div className="mr-3">
         <label htmlFor="status" className="text-sm text-gray-600">
            Status
         </label>
         <select
            id="status"
            className="block appearance-none w-40 lg:w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
            defaultValue={(searchParams.get("status") as string) || "All"}
            onChange={(event) => {
               handleChange(event);
            }}
         >
            <option key={"all"} value={""}>
               All
            </option>
            {status?.map((item) => {
               return (
                  <option key={item} value={item}>
                     {item}
                  </option>
               );
            })}
         </select>
      </div>
   );
};

export default StatusSelector;

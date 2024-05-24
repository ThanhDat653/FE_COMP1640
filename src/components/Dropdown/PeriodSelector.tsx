import { useSearchParams } from "react-router-dom";
import useRedux from "../../hooks/useRedux";
import { SelectComponentProps } from "../../types/params.type";
import { useEffect, useState } from "react";

const PeriodSelector = ({ paramName, setParams }: SelectComponentProps) => {
   const { appSelector } = useRedux();
   const [searchParams] = useSearchParams();
   const { period } = appSelector((state) => state.period);
   const [current, setCurrent] = useState<string>();

   const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
      setParams(paramName, e.target.value);
      setParams("page", "1");
   };

   useEffect(() => {
      const param = searchParams.get("period");
      if (param) {
         const temp = period.find((item) => item.id === param);
         setCurrent(temp?.id);
      } else setCurrent("");
   }, [searchParams, period]);

   return (
      <div className="mr-3">
         <label htmlFor="period" className="text-sm text-gray-600">
            Period
         </label>
         <select
            id="period"
            className="block appearance-none w-40 lg:w-60 mt-[2px] h-9 bg-white border border-gray-400 px-2 rounded leading-tight focus:outline-none"
            value={current}
            onChange={(event) => {
               handleChange(event);
            }}
         >
            <option key={"all"} value={""}>
               All
            </option>
            {period?.map((item) => {
               return (
                  <option key={item.id} value={item.id}>
                     {item.academicYear}
                  </option>
               );
            })}
         </select>
      </div>
   );
};

export default PeriodSelector;

import React, { useEffect, useState } from "react";
import { SelectComponentProps } from "../../types/params.type";
import { useSearchParams } from "react-router-dom";

const SortSelector = ({ paramName, setParams }: SelectComponentProps) => {
  const [searchParams] = useSearchParams();
  const [current, setCurrent] = useState<string>(
    searchParams.get("sorts") || "title"
  );

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setParams(paramName, e.target.value);
    setParams("page", "1");
  };

  useEffect(() => {
    const param = searchParams.get("sorts");
    if (param) {
      setCurrent(param);
    } else setParams(paramName, "title");
  }, [searchParams, setParams, paramName]);

  return (
    <div className="flex justify-center items-center">
      <label htmlFor="sort" className="w-14 text-sm text-gray-600">
        Sort by:
      </label>
      <select
        id="sort"
        className="bg-transparent text-sm text-right appearance-none w-40 py-2 text-gray-500  border-0 rounded leading-tight focus:outline-none focus:ring-none hover:cursor-pointer"
        defaultValue={current}
        onChange={(event) => {
          handleChange(event);
        }}
      >
        <option key={1} value="title">
          Title (A-Z)
        </option>
        <option key={2} value="-title">
          Title (Z-A)
        </option>
        <option key={3} value="-createdAt">
          Created (Newest)
        </option>
        <option key={4} value="createdAt">
          Created (Oldest)
        </option>
      </select>
    </div>
  );
};

export default SortSelector;

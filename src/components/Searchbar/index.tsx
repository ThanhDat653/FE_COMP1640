/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { SelectComponentProps } from "../../types/params.type";
import { useLocation } from "react-router-dom";

const Searchbar = ({ paramName, setParams }: SelectComponentProps) => {
  const location = useLocation();
  const [search, setSearch] = useState<string>("");
  const [isSearchEnabled, setIsSearchEnabled] = useState(true);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setParams(paramName, search);
      setParams("page", "1");
    }
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    setSearch("");
  }, [location.pathname]);

  useEffect(() => {
    const pathname = location.pathname.toLowerCase();
    const disabledPaths = [
      "period",
      "createaccount",
      "faculty",
      "dashboard",
      "contribute",
    ];

    // Check if the pathname contains any of the disabled paths
    const isDisabled = disabledPaths.some((path) => pathname.includes(path));
    setIsSearchEnabled(!isDisabled);
  }, [location.pathname]);

  return (
    <div
      className="flex flex-row justify-between items-center h-10 w-full rounded-full
            border-[2px] border-gray-400 px-3"
    >
      <input
        type="text"
        name="search"
        placeholder="Search..."
        className="w-full h-full rounded-full outline-none ring-0 border-0 focus:outline-none focus:ring-0"
        onKeyDown={(e) => handleSearch(e)}
        onChange={(e) => handleOnChange(e)}
        value={search}
        disabled={!isSearchEnabled}
      />
      <button className="">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-5 h-5 text-gray-400"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </button>
    </div>
  );
};

export default Searchbar;

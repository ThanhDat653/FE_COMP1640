import clsx from "clsx";
import React from "react";

interface StatusProps {
   status?: string;
}

const Status = ({ status }: StatusProps) => {
   return (
      <div
         className={clsx(
            "h-full text-xs font-medium leading-none rounded-md flex items-center justify-center",
            status === "Approved" && "text-emerald-700 bg-emerald-100 ",
            status === "Processing" && "text-yellow-700 bg-yellow-100",
            status === "Processed" && "text-orange-800 bg-orange-100",
            status === "Rejected" && "text-rose-700 bg-rose-100",
            status === "Published" && "text-blue-700 bg-blue-100",
         )}
      >
         {status}
      </div>
   );
};

export default Status;

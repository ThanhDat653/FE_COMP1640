import clsx from "clsx";
import React from "react";

interface IButtonProps {
   label: string;
   type: "primary" | "secondary" | "border" | "warning";
   style?: string;
   onClick?: () => void;
}

const Button = ({ label, onClick, style, type }: IButtonProps) => {
   return (
      <button
         className={clsx(
            "rounded-lg px-4 h-10 min-w-28 font-medium flex justify-center items-center hover:shadow hover:shadow-black/25 hover:opacity-95 transition-all duration-200",
            type === "primary" && "bg-blue-600 text-white",
            type === "secondary" && "bg-blue-100 text-blue-600",
            type === "border" &&
               "bg-transparent text-blue-700 border-2 border-blue-600 hover:bg-blue-600 hover:text-white ",
            type === "warning" &&
               "bg-transparent text-rose-700 border-2 border-rose-600 hover:bg-rose-600 hover:text-white ",
            style,
         )}
         onClick={onClick}
      >
         {label}
      </button>
   );
};

export default Button;

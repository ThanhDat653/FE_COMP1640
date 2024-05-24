import React, { useEffect } from "react";

const Loading = () => {
   useEffect(() => {
      window.scrollTo(0, 0);
   });

   return (
      <div className="fixed z-50 h-screen min-w-[100vw] w-full top-0 left-0 flex justify-center items-center bg-black/25">
         <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-blue-500 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
         >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"></span>
         </div>
      </div>
   );
};

export default Loading;

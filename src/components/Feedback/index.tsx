import React from "react";
import { IFeedback } from "../../types/feedback.type";
import { formatDate } from "../../utils/functions";

interface IFeedbackProps {
   feedback: IFeedback;
}

const Feedback = ({ feedback }: IFeedbackProps) => {
   return (
      <div className="bg-white flex flex-col gap-2 w-full rounded-md shadow px-6 py-3 text-sm">
         <div className="flex justify-between w-full items-center text-gray-700">
            <h5
               className="font-medium truncate"
               title={`By: ${feedback.createdByFullName} (${feedback.createdByEmail})`}
            >
               {feedback.createdByFullName} ({feedback.createdByEmail})
            </h5>
            <span className="text-xs min-w-28 text-right">
               {formatDate(feedback?.lastModifiedAt)}
            </span>
         </div>
         <div className="fex-1 w-full">
            <p>{feedback?.content}</p>
         </div>
      </div>
   );
};

export default Feedback;

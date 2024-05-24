/* eslint-disable react/style-prop-object */

import { useParams } from "react-router-dom";
import { useEffect } from "react";
import useRedux from "../../../../hooks/useRedux";
import { formatDate } from "../../../../utils/functions";
import Loading from "../../../../components/loading/Loading";
import Button from "../../../../components/CustomButton";
import {
   approve,
   getContributionById,
   publish,
} from "../../../../redux/slices/contributionSlice";
import Status from "../../../../components/Contribution/Status";
import FeedbackList from "../../../../components/Feedback/FeedbackList";

const ViewContribution = () => {
   const { dispatch, appSelector } = useRedux();
   const { id } = useParams<{ id: string }>();
   const { isError, message, isLoading, detail } = appSelector(
      (state) => state.contribution,
   );

   let publishedDate = formatDate(detail?.lastModifiedAt as string);

   const handleApproveContribution = async (bool: boolean) => {
      if (id) {
         await dispatch(approve({ id: id, approved: bool }));
         await dispatch(getContributionById(id));
      }
   };

   const handlePublishContribution = async (bool: boolean) => {
      if (id) {
         await dispatch(publish({ id: id, published: bool }));
         await dispatch(getContributionById(id));
      }
   };

   useEffect(() => {
      if (id) {
         dispatch(getContributionById(id));
      }
   }, [dispatch, id]);

   return (
      <>
         {isLoading ? (
            <Loading />
         ) : (
            <div className="w-[calc(100vw-208px)] ">
               <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden md:max-w-screen-md lg:max-w-screen-lg xl:max-w-full">
                  <div className="flex flex-col lg:grid lg:grid-cols-5 justify-center items-start gap-4 pt-5">
                     <div
                        className="w-full h-full flex-1 pt-5 md:pt-10 my-5 md:my-0
                    bg-white rounded-md md:px-10 md:mb-5 items-start lg:col-span-3"
                     >
                        <div className="w-full flex flex-col justify-center items-center pb-5">
                           <div className="w-full lg:pt-0 border-b">
                              <div className="w-full flex justify-between items-center text-gray-400 font-normal text-sm">
                                 <span className="font-medium">
                                    {detail?.createdByFullName}
                                 </span>
                                 <span>{publishedDate}</span>
                              </div>
                              <div className="w-full my-5 flex justify-between items-center">
                                 <h1 className="leading-normal lg:leading-normal font-semibold text-2xl text-left text-gray-900 line-clamp-2">
                                    {detail?.title}
                                 </h1>
                                 <div className="h-5 w-20">
                                    <Status status={detail?.status} />
                                 </div>
                              </div>
                           </div>

                           <div className="w-full flex flex-col md:grid md:grid-cols-3 justify-center items-start gap-5 mt-5">
                              <div className="w-full max-w-[300px] col-span-2 md:col-span-1 object-cover flex flex-col justify-center items-center italic">
                                 <img
                                    src={detail?.coverImageUrl}
                                    alt="cover-poster"
                                    className="w-full object-cover"
                                 />
                                 <span className="text-sm text-center w-full mt-3">
                                    (Cover image)
                                 </span>
                              </div>
                              <div className="col-span-2">
                                 <p className="w-full mb-4 xl:mb-5 text-left text-gray-700 font-normal">
                                    {detail?.description} Lorem ipsum dolor sit
                                    amet consectetur adipisicing elit. Dolorum
                                    placeat molestias fuga similique repellat
                                    maiores voluptatem nesciunt, fugit
                                    doloremque veniam perferendis saepe.
                                    Quaerat, quasi suscipit quisquam itaque
                                    perferendis adipisci a!
                                 </p>
                                 <div className="w-full mt-5 py-5 flex justify-between items-center md:justify-start text-gray-700 border-t">
                                    <span className="md:mr-8">Document:</span>
                                    <a href={detail?.documentUrl}>
                                       <Button
                                          label="Download"
                                          type="primary"
                                          style="text-sm h-7"
                                       />
                                    </a>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="lg:col-span-2 w-full">
                        <FeedbackList />
                     </div>
                  </div>
               </div>
            </div>
         )}

         {isError && <span>{message}</span>}
      </>
   );
};

export default ViewContribution;

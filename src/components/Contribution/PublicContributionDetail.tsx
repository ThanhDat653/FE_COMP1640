/* eslint-disable react/style-prop-object */
import { RootState } from "../../redux/store";
import Loading from "../loading/Loading";
import { getContributionById } from "../../redux/slices/contributionSlice";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import Button from "../CustomButton";
import useRedux from "../../hooks/useRedux";
import { getFeedbackByContributionId } from "../../redux/slices/feedbackSlide";
import RelatedContributionList from "./RelatedContributionList";

function formatDate(timestamp: string | undefined): string {
  if (!timestamp) {
    return ""; // or any other default value or behavior you prefer
  }

  const date = new Date(timestamp);

  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Bangkok", // Set your desired time zone
    timeZoneName: "short",
  };

  const formattedDate = date.toLocaleString("en-GB", options);

  return formattedDate;
}

const PublicContributionDetail = () => {
  const { dispatch, appSelector } = useRedux();
  const { id } = useParams<{ id: string }>();
  const { isError, message, isLoading, detail } = appSelector(
    (state: RootState) => state.contribution
  );

  let publishedDate = formatDate(detail?.lastModifiedAt);

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
        <div
          className="w-full h-full flex-1 pt-5 md:pt-10 my-5 md:my-0
                    bg-white md:bg-transparent lg:grid lg:grid-cols-3 lg:gap-1 items-start"
        >
          <div className="flex flex-col justify-center items-center lg:px-3 lg:col-span-2 pb-5">
            <div className="w-full lg:pt-0 border-b">
              <div className="w-full flex justify-between items-center text-gray-400 font-normal text-sm">
                <span className="font-medium">{detail?.createdByFullName}</span>
                <span>{publishedDate}</span>
              </div>
              <h1 className="w-full my-5 leading-normal lg:leading-normal font-semibold text-2xl md:text-2xl text-left text-gray-800 line-clamp-2">
                {detail?.title}
              </h1>
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
                  {detail?.description}
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
          <RelatedContributionList />
        </div>
      )}
      {isError && <span>{message}</span>}
    </>
  );
};

export default PublicContributionDetail;

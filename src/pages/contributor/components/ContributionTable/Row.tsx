/* eslint-disable jsx-a11y/img-redundant-alt */
import { IContributionDetail } from "../../../../types/contribution.type";
import { formatDate } from "../../../../utils/functions";
import Status from "../../../../components/Contribution/Status";
import { Link } from "react-router-dom";
import useRedux from "../../../../hooks/useRedux";

interface IRowProps {
  contribution: IContributionDetail;
  label?: string[];
}

const Row = ({ contribution, label }: IRowProps) => {
  const { appSelector } = useRedux();
  const { period } = appSelector((state) => state.period);
  const periodYear = period?.find(
    (period) => period.id === contribution.periodId
  );
  return (
    <Link
      to={contribution?.id}
      replace
      className="min-w-[940px] grid grid-cols-12 items-center gap-3 py-4 bg-white border-t border-t-slate-200 hover:bg-slate-50 transition-all duration-150"
    >
      <span className="col-span-3 truncate">{contribution?.title}</span>
      <span className="col-span-4 truncate">{contribution?.description}</span>
      <span className="col-span-1 truncate">{periodYear?.academicYear}</span>
      <img
        src={contribution?.coverImageUrl}
        alt="cover image"
        className="col-span-1 truncate h-8 object-contain"
      />

      <span className="col-span-2 truncate">
        {formatDate(contribution?.createdAt || "")}
      </span>
      <div className="h-full col-span-1 text-center truncate">
        <Status status={contribution?.status} />
      </div>
    </Link>
  );
};

export default Row;

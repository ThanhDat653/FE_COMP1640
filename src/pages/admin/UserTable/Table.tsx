import Row from "./Row";
import { IUserData } from "../../../types/user.type";

interface ITableProps {
  name: string;
  data: IUserData[];
}

const Table = ({ name, data }: ITableProps) => {
  return (
    <>
      <div className="w-full bg-white flex flex-col text-sm px-6 py-6 rounded-lg drop-shadow-md md:max-w-screen-md lg:max-w-screen-lg xl:max-w-screen-xl 2xl:max-w-full overflow-hidden">
        <h2 className="text-lg font-bold text-blue-950 py-1">{name}</h2>

        <div className="w-full overflow-x-scroll">
          <div className="grid grid-cols-12 gap-4 text-gray-400 font-medium py-5 min-w-[650px]">
            <span className="col-span-3">Full Name</span>
            <span className="col-span-2">Email</span>
            <span className="col-span-1">Avatar</span>
            <span className="col-span-2">Faculty</span>
            <span className="col-span-1">Role</span>
            <span className="col-span-1">Active</span>
            <span className="col-span-1">Edit Role</span>
            <span className="col-span-1">Edit faculty</span>
          </div>
          {data.map((user) => {
            return <Row user={user} key={user.id} />;
          })}
        </div>
      </div>
    </>
  );
};

export default Table;

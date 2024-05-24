/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import useRedux from "../../../hooks/useRedux";
import Table from "./Table";
import { useLocation, useSearchParams } from "react-router-dom";
import Pagination from "../../../components/Pagination/Pagination";
import Loading from "../../../components/loading/Loading";
import { getUserList } from "../../../redux/slices/userSlice";
import { getRole } from "../../../redux/slices/roleSlice";
import FacultySelector from "../../../components/Dropdown/FacultySelector";
import RoleSelector from "../../../components/Dropdown/RoleSelector";
import { getFaculty } from "../../../redux/slices/facultySlice";

const UserManage = () => {
   const location = useLocation();
   const { appSelector, dispatch } = useRedux();
   const [searchParams, setSearchParams] = useSearchParams();
   const { userInfor } = appSelector((state) => state.auth);
   const { list, totalPage, isLoading } = appSelector((state) => state.user);

   const setParams = (key: string, value: string | number) => {
      setSearchParams((prevParams) => {
         if (
            value === null ||
            value === "" ||
            value === undefined ||
            Number.isNaN(value)
         ) {
            prevParams.delete(key);
         } else {
            prevParams.set(key, value as string);
         }
         return prevParams;
      });
   };

   useEffect(() => {
      const query = searchParams.get("search") as string;
      const role = searchParams.get("role") as string;
      const faculty = searchParams.get("faculty") as string;
      const sort = searchParams.get("sorts") as string;
      const page = parseInt(searchParams.get("page") as string);

      dispatch(
         getUserList({
            filters: {
               facultyId: faculty,
               role: role,
               search: query,
            },
            sorts: sort,
            page: page,
            pageSize: 10,
         }),
      );
   }, [dispatch, userInfor, searchParams, location.pathname]);

   useEffect(() => {
      dispatch(getRole());
      dispatch(getFaculty());
   }, [dispatch]);

   return (
      <div className="w-[calc(100vw-208px)] ">
         {isLoading && <Loading />}
         <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
            <div className="w-full flex justify-start items-center pb-5">
               <FacultySelector paramName="faculty" setParams={setParams} />
               <RoleSelector paramName="role" setParams={setParams} />
            </div>
            <Table data={list} name="Users" />
            {list.length !== 0 && (
               <Pagination
                  total={totalPage}
                  paramName="page"
                  setParams={setParams}
               />
            )}
         </div>
      </div>
   );
};

export default UserManage;

import React from "react";
import * as Yup from "yup";
import Input from "../../components/CustomInput";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { changeRole, clearMessage } from "../../redux/slices/authSlice";
import { IChangeRole } from "../../types/user.type";
import clsx from "clsx";
import { useParams } from "react-router-dom";
import Toast from "../../components/Toast";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

const ChangeRole = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { role } = useSelector((state: RootState) => state.role);
  const { message, isError } = useSelector((state: RootState) => state.auth);
  const { email } = useParams<{ email: string }>() || "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(validationSchema),
  });

  const defaultRoleValue: string | undefined =
    role.length > 0 ? role[0].id : undefined;

  // handle submit data
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInformation = { ...data };

    try {
      await dispatch(changeRole(userInformation as IChangeRole));
      console.log(userInformation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Dispatch clearMessage action after 3 seconds
  setTimeout(() => {
    dispatch(clearMessage());
  }, 3000);

  return (
    <div className="w-[calc(100vw-208px)] ">
      {isError && message ? (
        <Toast message={message} type="danger" />
      ) : (
        message && <Toast message={message} type="success" />
      )}
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden flex justify-center items-start">
        <div className=" bg-white/70 mt-5 p-8 rounded shadow-md  w-[600px] z-20">
          <h1 className="text-2xl font-semibold mb-6">Change Role</h1>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={clsx("mb-3")}>
              <input
                id="email"
                type="text"
                value={email ?? ""}
                className={clsx(
                  "mt-1 p-2 w-full border rounded outline-gray-700"
                )}
                placeholder="trung@gmail.com"
                {...register("email")}
                hidden
                autoComplete="username"
              />
            </div>

            <div className="relative mb-3">
              <label
                htmlFor="role"
                className="mr-1 text-gray-700 text-base font-normal"
              >
                Role
              </label>
              <select
                id="roleId"
                className="block appearance-none w-full bg-white border border-gray-400 mt-1 p-[10px] rounded leading-tight focus:outline-none"
                defaultValue={defaultRoleValue}
                {...(register && register("roleId", {}))}
              >
                {role?.map((role: any) => {
                  return (
                    <option key={role?.id} value={role?.id}>
                      {role?.name}
                    </option>
                  );
                })}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 pt-7 text-gray-700">
                <svg
                  className="fill-current h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 12L4 6h12z" />
                </svg>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-600 mt-3 hover:opacity-[0.97] text-white p-2 rounded w-full"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangeRole;

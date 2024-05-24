/* eslint-disable react/style-prop-object */
import React from "react";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/CustomInput";
import {
  clearMessage,
  createCoordinatorAccount,
} from "../../redux/slices/authSlice";
import { ICreateCoordinator } from "../../types/user.type";
import Toast from "../../components/Toast";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your first name"),
  lastName: Yup.string().required("Enter your last name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
});

const CreateCoordinator = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faculty } = useSelector((state: RootState) => state.faculty);
  const { message, isError } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(registerSchema),
  });

  const defaultValue: string | undefined =
    faculty.length > 0 ? faculty[0].id : undefined;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInformation = { ...data };

    try {
      await dispatch(
        createCoordinatorAccount(userInformation as ICreateCoordinator)
      );
      reset();
      console.log(userInformation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  // Dispatch clearMessage action after 3 seconds
  setTimeout(() => {
    dispatch(clearMessage());
  }, 4000);

  return (
    <div className="w-[calc(100vw-208px)] ">
      {message && isError ? (
        <Toast message={message} type="danger" />
      ) : (
        message && <Toast message={message} type="success" />
      )}
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden flex justify-center items-start">
        <div className=" bg-white/70 mt-5 p-8 rounded shadow-md w-[600px] z-20">
          <h1 className="text-2xl font-semibold mb-6">
            Create Coordinator Account
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-row justify-between items-start">
              <Input
                register={register}
                errors={errors}
                required
                id="firstName"
                label="First Name"
                type="text"
                placeholder="First name"
                style="mr-2 flex-1"
              />
              <Input
                register={register}
                errors={errors}
                required
                id="lastName"
                label="Last Name"
                type="text"
                placeholder="Last name"
                style="flex-1"
              />
            </div>
            <div className="relative mb-3">
              <label
                htmlFor="falcuty"
                className="mr-1 text-gray-700 text-base font-normal"
              >
                Falcuty
              </label>
              <select
                id="facultyId"
                className="block appearance-none w-full bg-white border border-gray-400 mt-1 p-[10px] rounded leading-tight focus:outline-none"
                defaultValue={defaultValue}
                {...(register && register("facultyId", {}))}
              >
                {faculty?.map((falcuty: any) => {
                  return (
                    <option key={falcuty?.id} value={falcuty?.id}>
                      {falcuty?.name}
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
            <Input
              register={register}
              errors={errors}
              required
              id="email"
              label="Email"
              type="text"
              placeholder="example@gmail.com"
            />

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

export default CreateCoordinator;

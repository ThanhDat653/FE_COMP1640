/* eslint-disable react/style-prop-object */
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/CustomInput";
import {
  clearMessage,
  createContributorAccount,
} from "../../redux/slices/authSlice";
import { ICreateContributor } from "../../types/user.type";
import Toast from "../../components/Toast";

const registerSchema = Yup.object().shape({
  firstName: Yup.string().required("Enter your first name"),
  lastName: Yup.string().required("Enter your last name"),
  email: Yup.string().email("Invalid email").required("Enter your email"),
});

const CreateContributor = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { message, isError } = useSelector((state: RootState) => state.auth);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(registerSchema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const userInformation = { ...data };

    try {
      await dispatch(
        createContributorAccount(userInformation as ICreateContributor)
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
        <div className=" bg-white/70 mt-5 p-8 rounded shadow-md  w-[600px] z-20">
          <h1 className="text-2xl font-semibold mb-6">
            Create Contributor Account
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

export default CreateContributor;

import React from "react";
import * as yup from "yup";
import Toast from "../Toast";
import Input from "../CustomInput";
import {
  clearProfileMessage,
  updateUserProfile,
} from "../../redux/slices/userSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { RootState } from "../../redux/store";
import useRedux from "../../hooks/useRedux";
import { Link } from "react-router-dom";
import { PATHS } from "../../constants/path";

const schema = yup.object().shape({
  firstName: yup
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(20, "First name must not exceed 20 characters")
    .required("First name is required"),
  lastName: yup
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(20, "Last name must not exceed 20 characters")
    .required("Last name is required"),
  avatarFile: yup.mixed<FileList>(),
});

const EditProfile = () => {
  const { dispatch, appSelector } = useRedux();
  const { userProfile, message } = appSelector(
    (state: RootState) => state.user
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("form submitted successfully");
    console.log(data);
    const formData = new FormData();

    formData.append("firstName", data?.firstName);
    formData.append("lastName", data?.lastName);
    formData.append("avatarFile", data?.avatarFile[0]);

    console.log(formData);

    dispatch(updateUserProfile(formData));
    reset();
  };

  // Dispatch clearMessage action after 3 seconds
  setTimeout(() => {
    dispatch(clearProfileMessage());
  }, 4000);

  return (
    <div className="w-full mt-32">
      <div className="md:w-[500px] lg:w-[600px] h-fit mx-auto bg-white px-8 py-10 rounded-lg shadow-md mt-5">
        {message && <Toast message={message} type="success" />}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            register={register}
            errors={errors}
            required
            id="firstName"
            label="First Name"
            type="text"
          ></Input>
          <Input
            register={register}
            errors={errors}
            required
            id="lastName"
            label="Last Name"
            type="text"
          ></Input>
          <Input
            register={register}
            errors={errors}
            required
            id="avatarFile"
            label="Image"
            type="file"
            accept="image/*"
            labelForLink="Current Image"
            link={userProfile?.avatarUrl}
          ></Input>
          <div className="w-full flex justify-center mt-5">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[280px]"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="md:w-[500px] lg:w-[600px] h-fit mx-auto py-3 rounded-lg mt-5">
        <Link to={`/${PATHS.PROFILE.IDENTITY}/${PATHS.PROFILE.VIEW}`}>
          <button className="inline-flex items-center px-4 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            <svg
              className="rtl:rotate-180 w-3.5 h-3.5 ms-2 mr-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 5H1m0 0 4 4M1 5l4-4"
              />
            </svg>
            Return
          </button>
        </Link>
      </div>
    </div>
  );
};

export default EditProfile;

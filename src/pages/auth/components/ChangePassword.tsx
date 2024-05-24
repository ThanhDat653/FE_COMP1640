import React from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { PATHS } from "../../../constants/path";
import { Link, Navigate } from "react-router-dom";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { changePassword, clearMessage } from "../../../redux/slices/authSlice";
import { IChangePassword } from "../../../types/user.type";
import Input from "../../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import authUtils from "../../../utils/auth";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter your email"),
  newPassword: Yup.string()
    .required("Enter your password")
    .min(8, "Password must be at least 8 characters")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()-+=])[A-Za-z\d!@#$%^&*()-+=]{8,}$/,
      "Password must contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character"
    ),
  confirmNewPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref(" newPassword")], "Passwords do not match"),
});

const ChangePassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(resetPasswordSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isChangePassword, message, isError } = useSelector(
    (state: RootState) => state.auth
  );

  // Get email and token form session storage
  const email = authUtils.getEmail();
  const changeInitialPasswordToken = authUtils.getTempToken();

  //Submit the form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form submitted!");

    const userInformation = {
      ...data,
      changeInitialPasswordToken: changeInitialPasswordToken,
    };

    console.log(userInformation);

    try {
      await dispatch(changePassword(userInformation as IChangePassword));
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
    <>
      {!isChangePassword ? (
        <div>
          <h1 className="text-2xl font-semibold mb-6">
            Change Initial Password
          </h1>
          <div className="bg-stone-200 px-2">
            <p className="mb-3 text-lg font-normal text-slate-600">
              You have logged in into the system in the first time, please
              provide a new password
            </p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              id="email"
              type="text"
              value={email ?? ""}
              placeholder="trung@gmail.com"
              {...register("email")}
              hidden
              autoComplete="User-Email"
            />

            <Input
              register={register}
              errors={errors}
              required
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your new password"
            />

            <Input
              register={register}
              errors={errors}
              required
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your New password"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:opacity-[0.97] text-white p-2 rounded w-full"
            >
              Change
            </button>
          </form>
        </div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="w-full h-60">
            <h1 className="text-2xl font-semibold text-sky-400 text-center">
              Congratulations you have completed the first login procedure. Now
              your account is ready
            </h1>
            <div className="w-full pt-4 text-center">
              <p>
                Please return to the login page to log in again with the newly
                changed password
              </p>
              <Link to={`/auth/${PATHS.AUTH.LOGIN}`}>
                <button className="px-5 py-2 mt-8 bg-stone-400 rounded-md">
                  Login Page
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChangePassword;

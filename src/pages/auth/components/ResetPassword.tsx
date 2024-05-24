import React from "react";
import clsx from "clsx";
import Input from "../../../components/CustomInput";
import * as Yup from "yup";
import authUtils from "../../../utils/auth";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { clearMessage, resetPassword } from "../../../redux/slices/authSlice";
import { IResetPassword } from "../../../types/user.type";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import { PATHS } from "../../../constants/path";
import { Link, Navigate } from "react-router-dom";

const resetPasswordSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter your email"),
  otp: Yup.string().required("OTP is required"),
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

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(resetPasswordSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isResetPassword } = useSelector((state: RootState) => state.auth);

  // Get email form session storage
  const email = authUtils.getEmail();

  //Submit the form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form submitted!");

    const userInformation = {
      ...data,
    };

    console.log(userInformation);

    try {
      await dispatch(resetPassword(userInformation as IResetPassword));
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
      {!isResetPassword ? (
        <div>
          <h1 className="text-2xl font-semibold mb-6">Change Password</h1>
          <div className="bg-amber-100 px-2">
            <p className="mb-3 text-lg font-normal text-slate-600">
              We have sent you an OTP via email, please check your email
            </p>
          </div>

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

            <Input
              register={register}
              errors={errors}
              required
              id="otp"
              label="OTP"
              type="text"
              placeholder="Enter your OTP"
            />

            <Input
              register={register}
              errors={errors}
              required
              id="newPassword"
              label="New Password"
              type="password"
              placeholder="Enter your password"
            />

            <Input
              register={register}
              errors={errors}
              required
              id="confirmNewPassword"
              label="Confirm New Password"
              type="password"
              placeholder="Confirm your password"
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
          <div className="w-full h-40">
            <h1 className="text-2xl font-semibold text-sky-400 text-center">
              Congarulation Your Password has been successfully changed
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

export default ResetPassword;

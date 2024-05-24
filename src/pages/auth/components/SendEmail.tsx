import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import React from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/store";
import {
  SendResetPasswordOTP,
  resetPassword,
} from "../../../redux/slices/authSlice";
import { IResetPassword } from "../../../types/user.type";
import { PATHS } from "../../../constants/path";
import { Navigate } from "react-router-dom";
import authUtils from "../../../utils/auth";
import Input from "../../../components/CustomInput";

const sendOTPSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Enter your email"),
});

const SendEmail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(sendOTPSchema),
  });
  const dispatch = useDispatch<AppDispatch>();
  const { isSendOTP } = useSelector((state: RootState) => state.auth);

  //Submit the form
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log("Form submitted!");

    const userInformation = {
      ...data,
    };

    console.log(userInformation);

    try {
      authUtils.setEmail(data?.email);
      await dispatch(SendResetPasswordOTP(userInformation as IResetPassword));
      console.log(userInformation);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <>
      {isSendOTP && (
        <Navigate
          to={{ pathname: `/${PATHS.AUTH.IDENTITY}/${PATHS.AUTH.RESET_PASS}` }}
          replace
        />
      )}
      <div>
        <h1 className="text-2xl font-semibold mb-6">Please Enter Your Email</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
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
            className="bg-blue-600 hover:opacity-[0.97] text-white p-2 rounded w-full"
          >
            Change
          </button>
        </form>
      </div>
    </>
  );
};

export default SendEmail;

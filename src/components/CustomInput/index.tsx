import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { useEffect, useState } from "react";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  link?: string;
  style?: string;
  accept?: string;
  labelForLink?: string;
}
const Input = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
  value,
  style,
  accept,
  link,
  labelForLink,
}: InputProps) => {
  return (
    <>
      <div className={clsx("mb-3", style?.toString())}>
        <label
          htmlFor={id}
          className="mr-1 text-gray-700 text-base font-normal"
        >
          {label}
        </label>
        {link && (
          <a
            href={link}
            target="_blank"
            className="text-blue-600 text-base"
            rel="noreferrer"
          >
            ({labelForLink})
          </a>
        )}
        <input
          id={id}
          type={type}
          disabled={disabled}
          placeholder={placeholder}
          autoComplete="new-password"
          accept={accept || "text"}
          {...(register && register(id, { required }))}
          onChange={(event) => {
            console.log("value", event.currentTarget);
          }}
          defaultValue={value}
          className={clsx(
            "mt-1 p-2 w-full border rounded outline-gray-700",
            errors?.[id]
              ? "border-rose-500 outline-rose-500 ring-0"
              : "border-gray-400"
          )}
          lang="en"
        />

        {errors?.[id] && (
          <span className="text-red-500 text-xs">
            *{errors?.[id]?.message?.toString()}
          </span>
        )}
      </div>
    </>
  );
};
export default Input;

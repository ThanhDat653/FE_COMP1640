import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { AppDispatch, RootState } from "../../redux/store";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../../components/CustomInput";
import { clearMessage, createAllAccount } from "../../redux/slices/authSlice";
import { ICreateAllAccount } from "../../types/user.type";
import Toast from "../../components/Toast";

const validationSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  firstName: Yup.string()
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be at most 50 characters")
    .required("First name is required"),
  lastName: Yup.string()
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be at most 50 characters")
    .required("Last name is required"),
});

const CreateAllAccount = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faculty } = useSelector((state: RootState) => state.faculty);
  const { role } = useSelector((state: RootState) => state.role);
  const { message, isError } = useSelector((state: RootState) => state.auth);
  const roleRef = useRef<HTMLSelectElement>(null);
  const facultyRef = useRef<HTMLSelectElement>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(validationSchema),
  });

  const managerRoleId = role.find((role) => role.name === "Manager")?.id;
  const adminRoleId = role.find((role) => role.name === "Admin")?.id;

  // Set default value
  const defaultValue: string | undefined =
    faculty.length > 0 ? faculty[0].id : undefined;

  const defaultRoleValue: string | undefined =
    role.length > 0 ? role[0].id : undefined;

  // track current value of role select input
  const handleRoleChange = () => {
    const selectedRoleId = roleRef.current?.value;

    console.log(selectedRoleId);

    if (selectedRoleId === managerRoleId || selectedRoleId === adminRoleId) {
      const facultyInput = facultyRef.current;
      if (facultyInput) {
        facultyInput.setAttribute("disabled", "true");
        facultyInput.value = "";
      }
    } else {
      facultyRef.current?.removeAttribute("disabled");
    }
  };

  // handle submit data
  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const roleId = roleRef.current?.value;
    let facultyId = facultyRef.current?.value;

    if (facultyId === "") facultyId = null as any;

    const userInformation = { ...data, roleId: roleId, facultyId: facultyId };

    try {
      await dispatch(createAllAccount(userInformation as ICreateAllAccount));
      reset();
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
      {isError && message ? (
        <Toast message={message} type="danger" />
      ) : (
        message && <Toast message={message} type="success" />
      )}
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden flex justify-center items-start">
        <div className=" bg-white/70 mt-5 p-8 rounded shadow-md  w-[600px] z-20">
          <h1 className="text-2xl font-semibold mb-6">Create Account</h1>

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
                ref={roleRef}
                onChange={handleRoleChange}
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
                {...(register && register("facultyId", {}))}
                ref={facultyRef}
                disabled={defaultRoleValue ? true : false}
              >
                <option key="0" value={""}>
                  -----
                </option>
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

export default CreateAllAccount;

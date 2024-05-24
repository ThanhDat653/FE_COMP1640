import React, { useEffect, useState } from "react";
import { createPeriod, getPeriod } from "../../../redux/slices/periodSlide";
import useRedux from "../../../hooks/useRedux";
import { RootState } from "../../../redux/store";
import { Link } from "react-router-dom";
import { formatDate } from "../../../utils/functions";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { clearMessage } from "../../../redux/slices/authSlice";
import Toast from "../../../components/Toast";

const schema = yup.object().shape({
  academicYear: yup.number().required("Academic Year is required"),
  firstSubmissionDeadline: yup
    .date()
    .required("First Submission Deadline is required")
    .min(new Date(), "First Submission Deadline must be in the future"),
  secondSubmissionDeadline: yup
    .date()
    .required("Second Submission Deadline is required")
    .min(
      yup.ref("firstSubmissionDeadline"),
      "Second Submission Deadline must be after First Submission Deadline"
    ),
});

const Period = () => {
  const [isVisible, setVisibility] = useState(false);
  const { dispatch, appSelector } = useRedux();
  const { isError, message, isSucess, period } = appSelector(
    (state: RootState) => state.period
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const formaDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const formData = new FormData();

    formData.append("academicYear", data?.academicYear);
    formData.append(
      "firstSubmissionDeadline",
      formaDate(data.firstSubmissionDeadline).toString()
    );
    formData.append(
      "secondSubmissionDeadline",
      formaDate(data.secondSubmissionDeadline).toString()
    );

    console.log(formData);
    dispatch(createPeriod(formData));
  };

  // Dispatch clearMessage action after 3 seconds
  setTimeout(() => {
    dispatch(clearMessage());
  }, 3000);

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") setVisibility(false);
  };

  useEffect(() => {
    dispatch(getPeriod());
  }, [dispatch, isVisible]);

  return (
    <div className="w-[calc(100vw-208px)] ">
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
        <div className="w-full flex justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium test-sm rounded-lg px-5 py-2.5 text-center mr-4 mt-4"
            onClick={() => setVisibility(true)}
          >
            Create period
          </button>
        </div>

        {isVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="wrapper"
            onClick={handleClose}
          >
            {isError && message && <Toast message={message} type="danger" />}
            {isSucess && message && <Toast message={message} type="success" />}
            <div className="w-[600px] flex flex-col">
              <div
                className="text-white text-xl place-self-end cursor-pointer"
                onClick={() => setVisibility(false)}
              >
                X
              </div>

              <div className="text-left w-full">
                <form
                  className="space-y-6 bg-gray-50 p-5"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="academicYear"
                    >
                      Academic Year
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="Academic Year"
                      type="number"
                      placeholder="2024"
                      {...register("academicYear")}
                      required
                    />
                    {errors.academicYear && (
                      <p className="text-red-500 text-xs mb-3">
                        {errors?.academicYear.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="firstSubmissionDeadline"
                    >
                      First Deadline
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="firstSubmissionDeadline"
                      type="date"
                      {...register("firstSubmissionDeadline")}
                      required
                    />
                    {errors.firstSubmissionDeadline && (
                      <p className="text-red-500 text-xs mb-3">
                        {errors?.firstSubmissionDeadline.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="mb-6">
                    <label
                      className="block text-gray-700 text-sm font-bold mb-2"
                      htmlFor="secondSubmissionDeadline"
                    >
                      Second Deadline
                    </label>
                    <input
                      className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                      id="secondSubmissionDeadline"
                      type="date"
                      {...register("secondSubmissionDeadline")}
                      required
                    />
                    {errors.secondSubmissionDeadline && (
                      <p className="text-red-500 text-xs mb-3">
                        {errors.secondSubmissionDeadline.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center justify-center">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      type="submit"
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-center mt-8 p-4 w-full">
          {period.map((p) => (
            <Link to={`${p.id}`} className="w-full md:px-32 lg:px-0">
              <button
                type="button"
                className="w-full py-5 px-8 text-gray-600 text-sm rounded-md bg-white flex flex-col items-start shadow hover:shadow-md transition-all duration-200 "
                key={p.id}
              >
                <div>
                  <span className="font-medium mr-2">Academy year:</span>
                  <span>{p.academicYear}</span>
                </div>
                <div>
                  <span className="font-medium mr-2">First deadline:</span>
                  <span>{formatDate(p.firstSubmissionDeadline)}</span>
                </div>
                <div>
                  <span className="font-medium mr-2">Second deadline:</span>
                  <span>{formatDate(p.secondSubmissionDeadline)}</span>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Period;

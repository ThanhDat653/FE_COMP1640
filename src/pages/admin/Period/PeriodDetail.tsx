import React, { useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import * as yup from "yup";
import { getPeriod, updatePeriod } from "../../../redux/slices/periodSlide";
import useRedux from "../../../hooks/useRedux";
import { RootState } from "../../../redux/store";
import { useParams } from "react-router-dom";
import { clearMessage } from "../../../redux/slices/authSlice";
import Toast from "../../../components/Toast";

const schema = yup.object().shape({
  firstSubmissionDeadline: yup
    .date()
    .typeError("Must be new Date")
    .required("First Submission Deadline is required")
    .min(new Date(), "First Submission Deadline must be in the future"),
  secondSubmissionDeadline: yup
    .date()
    .typeError("Must be new Date")
    .required("Second Submission Deadline is required")
    .min(
      yup.ref("firstSubmissionDeadline"),
      "Second Submission Deadline must be after First Submission Deadline"
    ),
});

const PeriodDetail = () => {
  const { dispatch, appSelector } = useRedux();
  const { id } = useParams<{ id: string }>();
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

  const formDate = (dateTime?: string): string => {
    if (!dateTime) return "";

    const date = new Date(dateTime);

    if (isNaN(date.getTime())) {
      return "";
    }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    if (id) {
      const formData = new FormData();

      formData.append(
        "firstSubmissionDeadline",
        formaDate(data.firstSubmissionDeadline).toString()
      );
      formData.append(
        "secondSubmissionDeadline",
        formaDate(data.secondSubmissionDeadline).toString()
      );

      console.log(formData);
      dispatch(updatePeriod({ data: formData, id: id }));
    }
  };

  // Dispatch clearMessage action after 3 seconds
  setTimeout(() => {
    dispatch(clearMessage());
  }, 3000);

  const selectedPeriod = period.find((p) => p.id == id);

  useEffect(() => {
    dispatch(getPeriod());
  }, [dispatch]);

  return (
    <div className="w-[calc(100vw-208px)] ">
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden flex justify-center items-start">
        <div className=" bg-white/70 mt-5 p-8 rounded shadow-md  w-[600px] z-20">
          {isError && message && <Toast message={message} type="danger" />}
          {isSucess && message && <Toast message={message} type="success" />}
          <div className="py-10">
            <p className="text-2xl font-bold">Update Deadline</p>
          </div>
          <div className="text-left w-full">
            <form
              className="space-y-6 bg-gray-50 p-5"
              onSubmit={handleSubmit(onSubmit)}
            >
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
                  defaultValue={formDate(
                    selectedPeriod?.firstSubmissionDeadline
                  )}
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
                  defaultValue={formDate(
                    selectedPeriod?.secondSubmissionDeadline
                  )}
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
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeriodDetail;

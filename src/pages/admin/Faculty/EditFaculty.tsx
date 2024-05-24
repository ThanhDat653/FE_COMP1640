import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import Toast from "../../../components/Toast";
import useRedux from "../../../hooks/useRedux";
import { editFaculty, getFaculty } from "../../../redux/slices/facultySlice";
import { RootState } from "../../../redux/store";
import { IEditFaculty } from "../../../types/faculty.type";

const schema = yup.object().shape({
  name: yup.string().required("Faculty name is required"),
});

const EditFaculty = () => {
  const { id } = useParams<{ id: string }>();
  const { dispatch, appSelector } = useRedux();
  const { isError, message, faculty, isSuccess } = appSelector(
    (state: RootState) => state.faculty
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const faculty = { ...data, id: id };

    console.log(faculty);
    dispatch(editFaculty(faculty as IEditFaculty));
  };

  return (
    <div className="w-[calc(100vw-208px)] ">
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden flex justify-center items-start">
        <div className=" bg-white/70 mt-5 p-8 rounded shadow-md  w-[600px] z-20">
          {isError && message && <Toast message={message} type="danger" />}
          {isSuccess && message && <Toast message={message} type="success" />}
          <div className="py-10">
            <p className="text-2xl font-bold">Update Faculty</p>
          </div>
          <div className="text-left w-full">
            <form
              className="space-y-6 bg-gray-50 p-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="name"
                >
                  Faculty Name
                </label>
                <input
                  className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                  id="name"
                  type="text"
                  {...register("name")}
                  required
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mb-3">
                    {errors?.name.message?.toString()}
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

export default EditFaculty;

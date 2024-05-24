import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import * as yup from "yup";
import Toast from "../../../components/Toast";
import useRedux from "../../../hooks/useRedux";
import { createFaculty, getFaculty } from "../../../redux/slices/facultySlice";
import { RootState } from "../../../redux/store";
import { ICreateFaculty } from "../../../types/faculty.type";

const schema = yup.object().shape({
  name: yup.string().required("Faculty name is required"),
});

const CreateFaculty = () => {
  const [isVisible, setVisibility] = useState(false);
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
    const faculty = { ...data };

    console.log(faculty);
    dispatch(createFaculty(data as ICreateFaculty));
  };

  const handleClose = (e: any) => {
    if (e.target.id === "wrapper") setVisibility(false);
  };

  useEffect(() => {
    dispatch(getFaculty());
  }, [dispatch, isVisible]);

  return (
    <div className="w-[calc(100vw-208px)] ">
      <div className="w-full px-2 md:px-5 lg:px-5 xl:px-10 py-5 overflow-hidden">
        <div className="w-full flex justify-end">
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none font-medium test-sm rounded-lg px-5 py-2.5 text-center mr-4 mt-4"
            onClick={() => setVisibility(true)}
          >
            Create Faculty
          </button>
        </div>

        {isVisible && (
          <div
            className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center"
            id="wrapper"
            onClick={handleClose}
          >
            {isError && message && <Toast message={message} type="danger" />}
            {isSuccess && message && <Toast message={message} type="success" />}
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
                      htmlFor="name"
                    >
                      Faculty Name
                    </label>
                    <input
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                      id="name"
                      type="text"
                      placeholder="Graphic Design"
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
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 justify-center mt-8 p-4 w-full">
          {faculty.map((p) => (
            <Link to={`${p.id}`} className="w-full md:px-32 lg:px-0">
              <button
                type="button"
                className="w-full py-5 px-8 text-gray-600 text-sm rounded-md bg-white flex flex-col items-start shadow hover:shadow-md transition-all duration-200 "
                key={p.id}
              >
                <div>
                  <span className="font-medium mr-2">Faculty:</span>
                  <span>{p.name}</span>
                </div>
              </button>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateFaculty;

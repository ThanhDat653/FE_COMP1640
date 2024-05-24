import React, { useCallback, useEffect, useMemo, useState } from "react";
import Input from "../../components/CustomInput";
import * as yup from "yup";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  clearContributionMessage,
  contribute,
} from "../../redux/slices/contributionSlice";
import useRedux from "../../hooks/useRedux";
import { RootState } from "../../redux/store";
import { useParams } from "react-router-dom";
import Toast from "../../components/Toast";
import ConfirmModal from "../../components/Modal/ConfirmModal";
import { clearMessage } from "../../redux/slices/authSlice";

const schema = yup.object().shape({
  Title: yup.string().required("Title is required"),
  Description: yup.string().required("Description is required"),
  ImageFile: yup
    .mixed<FileList>()
    .test("require", "Upload your image", (files) => {
      return !!files?.[0];
    })
    .test("fileType", "Unsupported file format", (files) => {
      return (
        !files ||
        files?.[0]?.type === "image/jpeg" ||
        files?.[0]?.type === "image/png"
      );
    })
    .test("fileSize", "File size is too large", (files) => {
      return !files || files?.[0]?.size < 5000000;
    }),
  DocumentFile: yup
    .mixed<FileList>()
    .test("require", "Upload your document", (files) => {
      return !!files?.[0];
    }),
});

const UploadForm = () => {
  const { dispatch, appSelector } = useRedux();
  const { id } = useParams<{ id: string }>();
  const { period } = appSelector((state: RootState) => state.period);
  const { isError, message, isLoading, detail } = appSelector(
    (state: RootState) => state.contribution
  );
  const [isOpenModal, setIsOpenModal] = useState<Boolean>(false);
  const [isConfirm, setIsConfirm] = useState<Boolean>(false);
  const [contributionForm, setContributionForm] = useState<FormData>();

  const closeModal = useCallback(() => {
    setIsOpenModal(false);
  }, []);

  const openModal = useCallback(() => {
    setIsOpenModal(true);
    setIsConfirm(false);
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver<FieldValues>(schema),
  });

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      openModal();

      if (id) {
        const formData = new FormData();

        formData.append("imageFile", data?.ImageFile[0]);
        formData.append("title", data?.Title);
        formData.append("description", data?.Description);
        formData.append("documentFile", data?.DocumentFile[0]);
        formData.append("periodId", id);

        setContributionForm(formData);
      }
    },
    [id, openModal]
  );

  const handleAgree = () => {
    setIsConfirm(true);
    closeModal();
  };

  useEffect(() => {
    if (isConfirm && contributionForm) {
      dispatch(contribute(contributionForm));
      reset();
    }
  }, [isConfirm, contributionForm, dispatch]);

  // Dispatch clearMessage action after 4 seconds
  setTimeout(() => {
    dispatch(clearContributionMessage());
  }, 4000);

  return (
    <div className="w-[calc(100vw-208px)] ">
      {isError && message ? (
        <Toast message={message} type="danger" />
      ) : (
        message && <Toast message={message} type="success" />
      )}

      <div className="relative md:w-[500px] lg:w-[600px] h-fit mx-auto bg-white px-8 py-10 rounded-lg shadow-md mt-5">
        <h2 className="text-2xl font-semibold mb-4">
          Contribution Upload (
          {period.find((item) => item.id === id)?.academicYear})
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ConfirmModal
            message="Are you sure you want to submit?"
            handleAgree={handleAgree}
            handleClose={closeModal}
            isOpen={isOpenModal}
            action="contribute"
          />
          <Input
            register={register}
            errors={errors}
            required
            id="Title"
            label="Title"
            type="text"
          ></Input>
          <Input
            register={register}
            errors={errors}
            required
            id="Description"
            label="Description"
            type="text"
          ></Input>
          <Input
            register={register}
            errors={errors}
            required
            id="ImageFile"
            label="Image"
            type="file"
            accept="image/*"
          ></Input>
          <Input
            register={register}
            errors={errors}
            required
            id="DocumentFile"
            label="Document"
            type="file"
            accept=".pdf, .docx"
          ></Input>
          <div className="w-full flex justify-center mt-5">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 w-[280px]">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadForm;

import React from "react";
import { PATHS } from "../../constants/path";
import { Link } from "react-router-dom";

type IConfirmModalProps = {
  message: string;
  handleClose: () => void;
  isOpen: Boolean;
  handleAgree: () => void;
  action: "contribute" | "feedback";
};

const ConfirmModal = ({
  message,
  handleClose,
  isOpen,
  action,
  handleAgree,
}: IConfirmModalProps) => {
  return (
    <>
      {isOpen && (
        <div className="fixed left-0 right-0 top-0 h-screen flex justify-center items-center bg-black/5 pl-[208px] rounded-lg shadow dark:bg-gray-700">
          <div className="relative w-[420px] bg-white rounded-lg shadow dark:bg-gray-700 mb-5">
            <button
              type="button"
              className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="popup-modal"
              onClick={handleClose}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-4 md:p-5 text-center">
              <svg
                className="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                {message}
              </h3>

              {action === "contribute" && (
                <div className="mb-6">
                  <span>
                    Before you submit your contribution, you must have agree
                    with our
                  </span>
                  <Link
                    to={`/${PATHS.TERM_OF_SERVICE.IDENTITY}/${PATHS.TERM_OF_SERVICE.DETAIL}`}
                    target="_blank"
                  >
                    <a className="text-cyan-500"> Terms Of Service</a>
                  </Link>
                </div>
              )}

              {action === "feedback" && (
                <div className="mb-6">
                  <span>
                    Your feedback must not contain insulting or discriminatory
                    words about anyone's personality, dignity or background
                  </span>
                </div>
              )}

              <button
                data-modal-hide="popup-modal"
                type="button"
                className="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center transition-all duration-200"
                onClick={() => handleAgree()}
              >
                Agree
              </button>
              <button
                data-modal-hide="popup-modal"
                type="button"
                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 transition-all duration-200"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmModal;

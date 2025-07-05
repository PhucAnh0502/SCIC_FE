import React from "react";
import { toast } from "react-toastify";

const ShowDeleteConfirm = ({ onConfirm, message = "Bạn chắc chắn muốn xóa?", icon, buttonClassName }) => {
  const show = () => {
    toast.info(
      ({ closeToast }) => (
        <div>
          <div>{message}</div>
          <div className="flex gap-2 mt-2">
            <button
              className="px-3 py-1 bg-red-600 text-white rounded"
              onClick={() => {
                onConfirm();
                closeToast();
              }}
            >
              Xóa
            </button>
            <button
              className="px-3 py-1 bg-gray-300 rounded"
              onClick={closeToast}
            >
              Hủy
            </button>
          </div>
        </div>
      ),
      { autoClose: false, closeOnClick: false, position: toast.POSITION.TOP_CENTER }
    );
  };

  return (
    <button
      type="button"
      className={buttonClassName || "px-3 py-1 bg-red-600 text-white rounded"}
      onClick={show}
    >
      {icon || "Xóa"}
    </button>
  );
};

export default ShowDeleteConfirm;
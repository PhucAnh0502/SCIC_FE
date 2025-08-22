import React from "react";

const Loading = ({ text = "Đang tải..." }) => {
  return (
    <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 rounded-full animate-spin border-t-transparent mb-4"></div>
          <p className="text-lg font-semibold text-blue-500 animate-pulse">
            {text}
          </p>
        </div>
      </div>
  );
};

export default Loading;

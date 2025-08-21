import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-2xl font-semibold mt-4">Trang không tồn tại</h2>
      <p className="mt-2 text-gray-600 text-center max-w-md">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại.
      </p>

      <button
        onClick={() => navigate("/")}
        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
      >
        Quay về Trang chủ
      </button>
    </div>
  );
};

export default NotFound;

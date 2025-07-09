export const columns = [
  {
    name: "STT",
    selector: (row) => row.sno,
    center: "true",
    width: "70px",
  },
  {
    name: "Thiết bị",
    selector: (row) => row.deviceLabel,
    width: "120px",
  },
  {
    name: "Tên",
    selector: (row) => row.fullName,
    width: "200px",
  },
  {
    name: "Email",
    selector: (row) => row.email,
    width: "200px",
  },
  {
    name: "Vai trò",
    selector: (row) => row.userRoles.map((r) => r).join(", "),
    center: "true",
    width: "180px",
  },
  {
    name: "Trạng thái",
    selector: (row) => row.status,
    cell: (row) => (
      <span
        className={`px-3 py-1 rounded-full text-white text-sm font-semibold
        ${
          row.status === "Check in"
            ? "bg-green-600"
            : row.status === "Check-in late"
            ? "bg-yellow-500"
            : row.role === "Check out"
            ? "bg-blue-500"
            : "bg-gray-400"
        }`}
      >
        {row.status}
      </span>
    ),
    center: "true",
    width: "180px",
  },
  {
    name: "Thời gian",
    selector: (row) => row.time,
    center: "true",
    width: "180px",
  },
];

export const columns = [
    {
      name: "STT",
      selector: (row) => row.sno,
      center: "true",
      width: "100px",
    },
    {
      name: "Tên thiết bị",
      selector: (row) => row.name,
      width: "220px",
    },
    {
      name: "Loại thiết bị",
      selector: (row) => row.type,
      width: "220px",
    },
    {
      name: "Nhãn thiết bị",
      selector: (row) => row.label,
      width: "200px",
    },
    {
      name: "Trạng thái",
      selector: (row) => row.active ? "Đang hoạt động" : "Không hoạt động",
      width: "200px",
    },
    {
      name: "Thao tác",
      selector: (row) => row.action,
      center: "true",
      width: "180px",
    },
  ];
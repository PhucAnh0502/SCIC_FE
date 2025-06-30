export const columns = [
    {
      name: "STT",
      selector: (row) => row.sno,
      center: "true",
      width: "70px",
    },
    {
      name: "Tên giảng viên",
      selector: (row) => row.lecturerUserName,
      width: "140px",
    },
    {
      name: "Mã giảng viên",
      selector: (row) => row.lecturerCode,
      width: "140px",
    },
    {
      name: "Số lượng sinh viên",
      selector: (row) => row.numOfStudents,
      width: "140px",
      center: "true"
    },
    {
      name: "Ngày bắt đầu",
      selector: (row) => row.timeStart, 
      center: "true",
      width: "180px",
    },
    {
      name: "Ngày kết thúc",
      selector: (row) => row.timeEnd, 
      center: "true",
      width: "180px",
    },
    {
      name: "Ngày tạo",
      selector: (row) => row.createdAt, 
      center: "true",
      width: "180px",
    },
    {
      name: "Thao tác",
      selector: (row) => row.action,
      center: "true",
    },
  ];
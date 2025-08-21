export const columns = [
    {
      name: "STT",
      selector: (row) => row.sno,
      center: "true",
      width: "70px",
    },
    {
      name: "Tên đăng nhập",
      selector: (row) => row.userName,
      width: "180px",
    },
    {
      name: "MSSV",
      selector: (row) => row.studentCode,
      width: "180px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "200px",
    },
    {
      name: "Ngày đăng ký",
      selector: (row) => row.enrollDate, 
      center: "true",
      width: "180px",
    },
    {
      name: "Thao tác",
      selector: (row) => row.action,
      center: "true",
    },
  ];
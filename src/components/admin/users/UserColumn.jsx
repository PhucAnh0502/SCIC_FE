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
      width: "150px",
    },
    {
      name: "Họ và tên",
      selector: (row) => row.fullName,
      width: "180px",
    },
    {
      name: "Số CCCD",
      selector: (row) => row.idNumber,
      width: "150px",
    },
    {
      name: "Email",
      selector: (row) => row.email,
      width: "180px",
    },
    {
      name: "Vai trò",
      selector: (row) => row.userRoles.map((r) => r).join(", "),
      center: "true",
      width: "150px",
    },
    {
      name: "Thao tác",
      selector: (row) => row.action,
      center: "true",
    },
  ];
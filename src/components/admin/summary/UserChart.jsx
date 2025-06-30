import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const COLORS = ["#3b82f6", "#22c55e", "#a21caf"];

const UserChart = ({ data, studentCount, lecturerCount, defaultUserCount }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
    <h2 className="text-xl font-semibold mb-4 text-blue-700 text-center">
      Thống kê người dùng
    </h2>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-user-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <ul className="mt-4 space-y-1 text-sm text-center">
      <li>Sinh viên: <b>{studentCount}</b></li>
      <li>Giảng viên: <b>{lecturerCount}</b></li>
      <li>Người dùng mặc định: <b>{defaultUserCount}</b></li>
    </ul>
  </div>
);

export default UserChart;
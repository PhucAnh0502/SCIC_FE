import React from "react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";

const COLORS = ["#3b82f6", "#22c55e"];

const DeviceChart = ({ data, activeDeviceCount, inactiveDeviceCount }) => (
  <div className="bg-white rounded-xl shadow-md p-6 flex flex-col">
    <h2 className="text-xl font-semibold mb-4 text-green-700 text-center">
      Thống kê thiết bị
    </h2>
    <ResponsiveContainer width="100%" height={220}>
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey="value">
          {data.map((entry, index) => (
            <Cell key={`cell-device-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
    <ul className="mt-4 space-y-1 text-sm text-center">
      <li>Đang hoạt động: <b>{activeDeviceCount}</b></li>
      <li>Không hoạt động: <b>{inactiveDeviceCount}</b></li>
    </ul>
  </div>
);

export default DeviceChart;
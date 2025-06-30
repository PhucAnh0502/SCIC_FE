import React from 'react'
import Sidebar from '../components/dashboard/Sidebar'
import Navbar from '../components/dashboard/Navbar'
import { Outlet } from 'react-router-dom'

const AdminDashboard = () => {
  return (
    <div className="flex min-h-screen h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 bg-gray-100 min-h-full w-full flex flex-col h-screen overflow-auto">
        <Navbar />
        <div className="p-2 sm:p-4 md:p-6 flex-1 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
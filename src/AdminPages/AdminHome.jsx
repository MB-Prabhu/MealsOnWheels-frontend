import React from 'react'
import SidebarAdmin from './adminComponents/SidebarAdmin'
import { Outlet, useLocation } from 'react-router-dom'

const AdminHome = () => {
    const location = useLocation()
  return (
    <div className='p-2 flex sm:flex-row flex-col h-[100vh] w-full gap-3'>
        <SidebarAdmin />
       
        <Outlet />
    </div>
  )
}

export default AdminHome
import React from 'react'
import AdminNavbar from './adminComponents/AdminNavbar'
import SidebarAdmin from './adminComponents/SidebarAdmin'

const AdminHome = () => {
  return (
    <div className='p-2 flex sm:flex-row flex-col h-[100vh] w-full'>
        <SidebarAdmin />
        
    </div>
  )
}

export default AdminHome
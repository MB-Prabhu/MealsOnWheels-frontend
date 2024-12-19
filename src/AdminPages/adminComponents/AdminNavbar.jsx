import React from 'react'
import { assets } from '../../assets/assets/admin_assets/assets'
import { Link } from 'react-router-dom'

const AdminNavbar = () => {
  return (
    <div className=' w-full h-20 flex items-center justify-center shadow-lg'>
        <div className='w-[95%] flex items-center justify-between'>
        <div className='hidden md:block'>
        <Link to="/admin">
        <img src={assets.logo} alt="" className='w-36 md:block hidden lg:w-80 sm:w-56'/>
          </Link>
        </div>

        <div className='rounded-full'>
            <Link to="/adminprofile">
            <img src={assets.profile_image} alt="" className='size-6 lg:size-8 cursor-pointer rounded-full' />
            </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminNavbar
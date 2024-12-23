import React, { useContext } from 'react'
import { assets } from '../../assets/assets/admin_assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@mui/material';
import { LogOut } from 'lucide-react';
import { StoreContext } from '../../context/StoreContext'


const AdminNavbar = () => {

  const {setToken, setshowAdminLogin}= useContext(StoreContext)

  let navigate = useNavigate()
  
  const handleLogout = ()=>{
    localStorage.removeItem("admintoken")
    setToken("")
    // navigate("/")
    setshowAdminLogin(false)
  }

  return (
    <div className=' w-full h-20 flex items-center justify-center shadow-lg'>
        <div className='w-[95%] flex items-center justify-between'>
        <div className=' md:block'>
        <Link to="/adminhome">
        <img src={assets.logo} alt="" className='w-36 lg:w-80 block sm:w-56'/>
       <p className='text-lg sm:text-2xl lg:text-2xl ml-1 font-semibold'>Admin Panel</p>
          </Link>
        </div>

        <div className='rounded-full'>
            <Link to="/" >
            {/* <img src={assets.profile_image} alt="" className='size-6 lg:size-8 cursor-pointer rounded-full' /> */}
            <Button variant="contained" color="error" onClick={handleLogout}>
            <LogOut />
              Logout
            </Button>
            </Link>
            </div>
        </div>
    </div>
  )
}

export default AdminNavbar
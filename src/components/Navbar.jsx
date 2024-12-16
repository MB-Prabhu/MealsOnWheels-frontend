import React, { useState } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Navbar = () => {
    const [menuActive, setmenuActive] = useState("")

  return (
    <div className='border-2 border-black w-full h-20 flex items-center justify-center shadow-lg  fixed z-10'>
        <div className='border-2 border-black w-[97%] flex items-center justify-between'>
        <img src={assets.logo} alt="" className='w-36 lg:w-80 sm:w-56'/>

        <ul className='flex gap-1 sm:gap-2 lg:text-lg '>
            <li onClick={()=> setmenuActive("Home")} className={`${menuActive==="Home"? "underline underline-offset-2": ""}  hover:underline hover:underline-offset-4`}>Home</li>
            <li onClick={()=> setmenuActive("Menu")} className={` ${menuActive==="Menu"? "underline underline-offset-2": ""} hover:underline hover:underline-offset-4`}>Menu</li>
            <li onClick={()=> setmenuActive("Contact Us")} className={`${menuActive==="Contact Us"? "underline underline-offset-2": ""}  hover:underline hover:underline-offset-4`}>Contact Us</li>
            <li onClick={()=> setmenuActive("About Us")} className={`${menuActive==="About Us"? "underline underline-offset-2": ""} hover:underline hover:underline-offset-4`}>About Us</li>

            {/* 
            <Link clasName="hover:underline">Home</Link>
            <Link clasName="hover:underline">Menu</Link>
            <Link clasName="hover:underline">Contact Us</Link>
            <Link clasName="hover:underline">About Us</Link> */}
        </ul>

       
       <div className='flex items-center justify-between lg:gap-4 lg:w-48 sm:gap-2 border-2 border-[#000]'>
            <img src={assets.search_icon} alt="" className='size-6 lg:size-6 cursor-pointer' />
            <div className='relative'>
            <img src={assets.basket_icon} alt="" className='size-6 lg:size-6 cursor-pointer' />
                { <div className='size-3 rounded-lg bg-[#eb6a32] absolute top-0 right-[-5px]'></div>}
            </div>
            <button className='p-2 rounded-lg sm:text-sm lg:text-lg bg-[#eb6a32] active:bg-[#eba689]'>sign in</button>
       </div>
       
        </div>
       
    </div>
  )
}

export default Navbar
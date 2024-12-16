import React, { useState } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'

const Navbar = () => {
    const [menuActive, setmenuActive] = useState("")

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='border-2 border-black w-full h-20 flex items-center justify-center shadow-lg '>
        <div className='border-2 border-black w-[97%] flex items-center justify-between'>
        <img src={assets.logo} alt="" className='w-36 md:block hidden lg:w-80 sm:w-56'/>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>
        {/* <ul 
        // className='flex gap-1 sm:gap-2 lg:text-lg '
        className={`lg:flex gap-8 items-center ${
            isMenuOpen ? "block" : "hidden"
          } lg:block absolute lg:static top-16 left-0 w-full bg-gray-800 lg:bg-transparent`}
       
        > 
            <Link to="/" 
            onClick={()=> setmenuActive("Home")} 
            className={`${menuActive==="Home"? "underline underline-offset-2": ""}  hover:underline hover:underline-offset-4`}>
                Home</Link>
            <Link 
            to="/cart"
            onClick={()=> setmenuActive("Menu")} 
            className={` ${menuActive==="Menu"? "underline underline-offset-2": ""} hover:underline hover:underline-offset-4`}>
                Menu</Link>
            <Link 
            to="/placeorder"
            onClick={()=> setmenuActive("Contact Us")} 
            className={`${menuActive==="Contact Us"? "underline underline-offset-2": ""}  hover:underline hover:underline-offset-4`}>
                Contact Us</Link>
            <Link 
            onClick={()=> setmenuActive("About Us")} 
            className={`${menuActive==="About Us"? "underline underline-offset-2": ""} hover:underline hover:underline-offset-4`}>
                About Us</Link>
        </ul> */}

        <div className='md:block hidden'>
        <ul
        className={`flex gap-1`}
      >
        <li className="lg:px-4 py-2 hover:bg-gray-700 text-center">Home</li>
        <li className="lg:px-4 py-2 hover:bg-gray-700 text-center">Menu</li>
        <li className="lg:px-4 py-2 hover:bg-gray-700 text-center">Contact Us</li>
        <li className="lg:px-4 py-2 hover:bg-gray-700 text-center">About Us</li>
      </ul>
        </div>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

       <div className={`flex items-center justify-between w-44 lg:gap-4 lg:w-48 sm:gap-2 border-2 border-[#000]`}>
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
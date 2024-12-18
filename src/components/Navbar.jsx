import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { StoreContext } from '../context/StoreContext'

const Navbar = () => {

    const {showLogin, setShowLogin, cartItem} = useContext(StoreContext) 
       const [menuActive, setmenuActive] = useState("")

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='border-2 border-black w-full h-20 flex items-center justify-center shadow-lg '>
        <div className='border-2 border-black w-[97%] flex items-center justify-between'>
        <div className='hidden md:block'>
        <Link to="/">
        <img src={assets.logo} alt="" className='w-36 md:block hidden lg:w-80 sm:w-56'/>
          </Link>
        </div>
        <button
          className="md:hidden text-2xl"
          onClick={() => setIsMenuOpen(true)}
        >
          ☰
        </button>

        <div className='md:block hidden'>
        <ul
        className={`flex gap-1`}
      >
        <li className="lg:px-4 py-2 hover:underline text-center">Home</li>
        <li className="lg:px-4 py-2 hover:underline text-center">Menu</li>
        <li className="lg:px-4 py-2 hover:underline text-center">Contact Us</li>
        <li className="lg:px-4 py-2 hover:underline text-center">About Us</li>
      </ul>
        </div>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

       <div className={`flex items-center justify-between w-44 lg:gap-4 lg:w-48 sm:gap-2 border-2 border-[#000]`}>
        
            <img src={assets.search_icon} alt="" className='size-6 lg:size-6 cursor-pointer' />
            <div className='relative'>
            <Link to="/cart">
            <img src={assets.basket_icon} alt="" className='size-6 lg:size-6 cursor-pointer' />
            </Link>
                {Object.keys(cartItem).length>0 && <div className='size-3 rounded-lg bg-[#eb6a32] absolute top-0 right-[-5px]'>
                  {Object.keys(cartItem).length}
                  </div>}
            </div>
            <button className='p-2 rounded-lg sm:text-sm lg:text-lg bg-[#eb6a32] active:bg-[#eba689]' onClick={()=> setShowLogin(true)}>sign in</button>
       </div>
       
        </div>
       
    </div>
  )
}

export default Navbar
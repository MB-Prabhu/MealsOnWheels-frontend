import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { StoreContext } from '../context/StoreContext'
import ProfileIcon from './ProfileIcon'

const Navbar = () => {

    const {showLogin, setShowLogin, cartItem, token, setToken} = useContext(StoreContext) 
      //  const [menuActive, setmenuActive] = useState("")

    const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className='w-full h-20 flex items-center justify-center shadow-lg'>
        <div className='w-[95%] flex items-center justify-between'>
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
        <Link to="/" className="lg:px-4 py-2 hover:underline cursor-pointer text-center">Home</Link>
        <Link className="lg:px-4 py-2 hover:underline cursor-pointer text-center">Menu</Link>
        <Link className="lg:px-4 py-2 hover:underline cursor-pointer text-center">Contact Us</Link>
        <Link className="lg:px-4 py-2 hover:underline cursor-pointer text-center">About Us</Link>
      </ul>
        </div>

      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

       <div className={`flex items-center justify-between w-44 lg:gap-4 lg:w-48 sm:gap-2`}>
        
            <img src={assets.search_icon} alt="" className='size-6 lg:size-8 cursor-pointer' />
            <div className='relative'>
            <Link to="/cart">
            <img src={assets.basket_icon} alt="" className='size-6 lg:size-8 cursor-pointer' />
            </Link>
                {Object.keys(cartItem).length>0 && <div className='size-5 cursor-pointer rounded-lg bg-[#eb6a32] absolute top-[-10px] right-[-10px] text-white text-[18px] flex justify-center items-center'>
                  {Object.keys(cartItem).length}
                  </div>}
            </div>
            {token ? <ProfileIcon />: 
            <button className='p-2 rounded-lg sm:text-sm lg:text-lg bg-[#eb6a32] active:bg-[#eba689]' onClick={()=> setShowLogin(true)}>sign in</button>
            }
       </div>
       
        </div>
       
    </div>
  )
}

export default Navbar
import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import { StoreContext } from '../context/StoreContext'
import ProfileIcon from './ProfileIcon'

const Navbar = () => {

    const {setShowLogin,showUserLogo, cartItem, token, setshowAdminLogin} = useContext(StoreContext) 

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showAdminLogo, setShowAdminLogo] = useState(false);

    let handleShowAdminLogo = ()=>{
      if(!localStorage.key(0)){
        setShowAdminLogo(true)
        // return;
      }
      else if(localStorage.getItem("usertoken")){
          setShowAdminLogo(false)
        }
  }

  useEffect(()=>{
    handleShowAdminLogo()
  }, [token])

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
        <Link to="/" className="lg:px-4 py-2 hover:underline lg:text-xl md:text-xl   cursor-pointer text-center">Home</Link>
        {/* <Link className="lg:px-4 py-2 hover:underline lg:text-xl md:text-xl   cursor-pointer text-center">Menu</Link> */}
        <a href="#contact" className="lg:px-4 py-2 hover:underline lg:text-xl md:text-xl   cursor-pointer text-center">Contact Us</a>
      </ul>
        </div>
 
      <Sidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

       <div className={`flex items-center justify-around w-44 lg:gap-4 lg:w-48 sm:gap-2`}>
        
            <div className='relative'>
            <Link to="/cart">
            <img src={assets.basket_icon} alt="" className='size-6 lg:size-8 cursor-pointer' />
            </Link>
                {Object.keys(cartItem).length>0 && <div className='size-5 cursor-pointer rounded-lg bg-[#eb6a32] absolute top-[-10px] right-[-10px] text-white text-[18px] flex justify-center items-center'>
                  {Object.keys(cartItem).length}
                  </div>}
            </div>

            {token && showUserLogo ? <ProfileIcon />: 
            <button className='p-2 rounded-lg sm:text-sm lg:text-lg bg-[#eb6a32] active:bg-[#eba689]' onClick={()=> setShowLogin(true)}>signin</button>
            }

           {showAdminLogo && <div>
                <Link className='px-2 rounded-full py-2'>
                  <button onClick={()=> setshowAdminLogin(true)}>
                  <img src={assets.settings} alt="" className='bg-contain rounded-full h-12 w-12 border border-black p-1' />
                  </button>
                </Link>
            </div>}
       </div>
       
        </div>
       
    </div>
  )
}

export default Navbar
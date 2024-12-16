import React from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'

const Header = () => {
  return (

<div className="relative w-[90%] h-[250px] sm:h-[420px] mt-4 mx-auto rounded-lg ">
<img
  src={assets.header_img} 
  alt="foodImage"
  className="w-full h-full object-cover bg-contain rounded-lg"
/>
<div className="absolute bottom-2 left-10 w-[70%] sm:bottom-[20px] sm:w-[80%] lg:bottom-24 text-white lg:space-y-6 sm:space-y-2 space-y-2">
  <p className="sm:text-5xl font-semibold text-xl leading-[20px]">Order your favourite food here...</p>
  <p className="sm:text-2xl font-medium leading-[17px]">Available multiple favourite food items, don't miss to check it out...</p>
  <button className='p-1 sm:p-2 rounded-full bg-white text-[#e86613] text-[14px]'>View menu</button>
  
</div>
</div>



  )
}

export default Header
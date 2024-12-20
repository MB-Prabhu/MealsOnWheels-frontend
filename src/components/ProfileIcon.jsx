import React from 'react'
// import { assets } from '../assets/assets/admin_assets/assets'
import { assets } from '../assets/assets/frontend_assets/assets'

const ProfileIcon = () => {
  return (
    <div className='border relative border-black rounded-full flex items-center justify-center cursor-pointer size-[45px] group'>
        <img src={assets.profile_icon} alt="" className='bg-contain' /> 

        <div className='hidden px-10 absolute bottom-[-99px] right-0 bg-slate-50 z-50 group-hover:block'>
            <ul>
                <li className='flex hover:text-orange-500 gap-2 py-2 items-center justify-center'>
                    <div className='flex gap-2 items-center justify-center'>
                    <img src={assets.bag_icon} alt="" /> 
                    <p>orders</p>
                    </div>
                </li>
                <span className='block absolute left-3 right-3 border border-[#a4a2a2]'></span>
                <li className='flex hover:text-orange-500 gap-2  py-2 items-center justify-center'>
                
                <div className='flex gap-2 items-center justify-center'>
                <img src={assets.logout_icon} alt="" /> 
                    <p className='hover:text-orange-500'>Logout</p>
                </div>

                </li>
            </ul>
        </div>
    </div>
  )
}

export default ProfileIcon
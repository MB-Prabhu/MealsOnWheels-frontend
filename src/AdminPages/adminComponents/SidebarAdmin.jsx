import React from 'react'
import { assets } from '../../assets/assets/admin_assets/assets'

const SidebarAdmin = () => {
  return (
    <div className='shadow-lg w-[100%] sm:w-[30%] lg:w-[25%] xl:w-[20%] sm:h-[100%] h-[10%]'>
       <div className='flex sm:justify-start justify-between rounded-lg w-full items-center border px-2 py-2 border-black sm:flex-col flex-row gap-9 h-[100%]'>
       <div className='flex sm:px-10 items-center w-full justify-around sm:py-2 pb-2 sm:border-b-2'>
            <img src={assets.add_icon} alt="" />
            <p>Add Items</p>
        </div>

        <div className='flex sm:px-10 items-center w-full justify-around pb-2 sm:border-b-2'>
            <img src={assets.order_icon} alt="" />
            <p>List Items</p>
        </div>

        <div className='flex sm:px-10 items-center w-full justify-around pb-2 sm:border-b-2'>
            <img src={assets.order_icon} alt="" />
            <p>Orders</p>
        </div>
        </div>  
    </div>
  )
}

export default SidebarAdmin
import React, { useContext } from 'react'
import { assets } from '../assets/assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'

const SingleFoodItem = ({_id, name, image, price, description}) => {
  const {removeCartItem, addCartItem, cartItem, apiUrl} = useContext(StoreContext)

  return (
    <div className="food-item opacity-0 translate-y-10 transition duration-700 delay-200">
    <div className='w-52 md:w-56 shadow-md bg-[#ffffff]  flex flex-col gap-2'>
        <div className='relative w-[100%] '>
        <img src={`${apiUrl}/images/${image}`} alt="" className='w-[100%]'/>
        <div className='absolute right-2 bottom-2 flex'>
        {
           !cartItem[_id] ? 
           <img src={assets.add_icon_white} alt='' 
           onClick={()=> addCartItem(_id)} 
           className='w-[40px] cursor-pointer'/> :
           <div className='flex items-center justify-center gap-2 bg-[#f4f4f4] rounded-full'> 
               <img src={assets.remove_icon_red} alt=""
               onClick={()=> removeCartItem(_id)} 
               className='cursor-pointer' />
               {cartItem[_id]}
              <img src={assets.add_icon_green} alt='' 
               onClick={()=> addCartItem(_id)}
               className='cursor-pointer' />
           </div>
        }
          </div>
          
        </div>
        <div className='p-2'>
        <p className='text-lg font-semibold sm:text-2xl'>{name}</p>
        <p className='leading-4 text-[#676767] mt-2'>{description}</p>
        <p className='text-green-500 text-lg mt-2'>${price}</p>
        </div>
        
    </div>
    </div>
  )
}

export default SingleFoodItem
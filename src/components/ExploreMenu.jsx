import React from 'react'
import { menu_list } from '../assets/assets/frontend_assets/assets'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='w-full mt-4 flex justify-center items-center'>
        <div className="w-[90%] border-2 border-white">
        <h1 className='sm:text-2xl font-medium sm:font-semibold lg:font-bold my-2'>Explore our menu</h1>
        <p className='sm:text-lg'>Choose from a diverse meby featureing a delicious dishes.</p>
        <div className='flex justify-between py-2 mt-1 items-center gap-[30px] text-center border border-black overflow-x-scroll custom-menu'>
        {menu_list.map(ele=>{
            return(
                <div
                onClick={()=> setCategory((prev)=> prev==ele.menu_name? "all": ele.menu_name)} 
                 className='flex flex-col items-center gap-1 border border-black min-w-[200px]'>
                <img src={ele.menu_image} alt="" className={`${category===ele.menu_name?"p-1 border-[#e86613]":""} border-2 rounded-full mt-2`} />
                <p>{ele.menu_name}</p>
                </div> 
            )
        })}
        </div>
       
        </div>
       
    </div>
  )
}

export default ExploreMenu
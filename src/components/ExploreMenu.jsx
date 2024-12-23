import React, { useContext } from 'react'
import { menu_list } from '../assets/assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'

const ExploreMenu = ({category, setCategory}) => {

  return (
    <div className='w-full mt-4 flex justify-center items-center'>
        <div className="w-[90%] ">
        <p className='text-2xl text-orange-500 sm:text-3xl sm:font-bold'>Explore our menu</p>

        {/* <h1 className='sm:text-2xl text-xl font-bold sm:font-semibold lg:font-bold my-2'>Explore our menu</h1> */}
        <p className='sm:text-lg'>Choose from a diverse meby featureing a delicious dishes.</p>
        <div className='flex justify-between sm:py-2 mt-1 items-center gap-[30px] text-cente overflow-x-scroll custom-menu'>
        {menu_list.map((ele,idx)=>{
            return(
                <div key={idx}
                onClick={()=> setCategory((prev)=> prev==ele.menu_name? "all": ele.menu_name)} 
                 className='flex flex-col items-center gap-1  min-w-[200px]'>
                <img src={ele.menu_image} alt="" className={`${category===ele.menu_name?"p-1 border-[#e86613]":""} border-2 rounded-full mt-2 sm:size-[150px] size-[100px]`} />
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
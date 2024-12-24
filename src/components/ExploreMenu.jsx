import React, { useContext } from 'react'
import { menu_list } from '../assets/assets/frontend_assets/assets'
import { StoreContext } from '../context/StoreContext'

const ExploreMenu = () => {
  const {category, setCategory} = useContext(StoreContext)

  return (
    <div className='w-full mt-4 flex justify-center items-center'>
        <div className="w-[90%] ">
        <p className='text-2xl text-orange-500 sm:text-3xl sm:font-bold'>Explore our menu</p>

        <p className='sm:text-lg'>Choose from a diverse menu featuring a delicious dishes...</p>
        <div className='flex justify-between sm:py-2 mt-1 items-center sm:gap-[30px] text-center overflow-x-scroll custom-menu scroll-menu'>
        {menu_list.map((ele,idx)=>{
            return(
                <div key={idx}
                onClick={()=> setCategory((prev)=> prev==ele.menu_name? "": ele.menu_name)} 
                 className='flex flex-col items-center gap-1  min-w-[200px] scroll-item'>
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
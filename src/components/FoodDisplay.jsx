import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import SingleFoodItem from './SingleFoodItem'
import LoadingSpinner from './LoadingSpinner'

const FoodDisplay = ({selectedCategory}) => {
    const {food_list, errorMsg, loading} = useContext(StoreContext)
 
    const isSelectedAvailable = ()=>{
      let isAvailable = true;
      if(selectedCategory!=="all"){
        isAvailable = food_list.some(ele=>{
         return ele.category === selectedCategory
       })
      }
      return isAvailable;
    }

    console.log(isSelectedAvailable())
  return (
    <div className='w-full flex flex-col items-center'>

        <div className='w-[90%] mt-4'>
        <p className='text-2xl sm:text-3xl sm:font-semibold'>your selected Food Items</p>
        </div>


      {loading && <div className='flex justify-center items-center min-h-[20vh]'><LoadingSpinner />  </div>}
      {!isSelectedAvailable() && <div className='flex justify-center font-bold text-xl sm:text-2xl lg:text-3xl items-center min-h-[20vh]'>No Foods Available for the selected category  </div>}

            {!loading && errorMsg && <div className='w-full text-center py-7 text-2xl sm:text-2xl sm:font-semibold '><p>{errorMsg}</p></div>}        
        <div className='mt-2 w-[90%]  py-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10'>

            {isSelectedAvailable && !loading && !errorMsg && food_list.length>0 && food_list.map(({_id, name, image, price, description,category})=>{
                        if(selectedCategory==="all"){
                          return <SingleFoodItem key={_id} _id={_id} name={name} image={image} price={price} description={description} category={category}  />
                        }
                        else if(category===selectedCategory){
                           return <SingleFoodItem key={_id} _id={_id} name={name} image={image} price={price} description={description} category={category}  />
                          }
                    })}
        </div>
    </div>
    
  )
}

export default FoodDisplay
import React, { useContext, useState } from 'react'
import { StoreContext } from '../context/StoreContext'
import SingleFoodItem from './SingleFoodItem'
import LoadingSpinner from './LoadingSpinner'

const FoodDisplay = ({category}) => {
    const {food_list, errorMsg, loading} = useContext(StoreContext)

 

  return (
    <div className='w-full flex flex-col items-center'>

        <div className='w-[90%] mt-4'>
        <p className='text-2xl sm:text-3xl sm:font-semibold'>your selected Food Items</p>
        </div>



      {loading && <div className='flex justify-center items-center min-h-[20vh]'><LoadingSpinner />  </div>}

        <div className='mt-2 w-[90%] py-8 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-10'>
            {!loading && errorMsg && <div className='w-full text-center mx-auto text-2xl sm:text-3xl sm:font-semibold'>{errorMsg}</div>}        
            {!loading && !errorMsg && food_list.length>0 && food_list.map(({_id, name, image, price, description,category})=>{
                        return(
                            <SingleFoodItem key={_id} _id={_id} name={name} image={image} price={price} description={description} category={category} />
                        )
                    })}
        </div>
    </div>
    
  )
}

export default FoodDisplay
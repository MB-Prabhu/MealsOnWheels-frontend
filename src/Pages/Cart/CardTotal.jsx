import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const CardTotal = () => {
  let navigate = useNavigate()
    const {getTotalAmount} = useContext(StoreContext)
  return (
    <div className='w-[70%] lg:w-[35%] sm:w-[50%]'>
        <h2 className='md:text-xl text-2xl text-[#ff7722] font-bold my-2'>Card Total</h2>
        
        <div className='flex flex-col gap-2'>
            <p className='flex justify-between font-semibold'>SubTotal <span className='font-normal'>${getTotalAmount() || 0}</span></p>
            <hr className='bg-[#676767]' />
            <p className='flex justify-between font-semibold'>Delivery Fee <span className='font-normal'>${getTotalAmount()>0 ? 2: 0}</span></p>
            <hr className='bg-[#676767]' />
            <p className='flex justify-between font-semibold'>Total <span className='font-bold'>${getTotalAmount()>0 ? getTotalAmount()+2 : 0 || 0}</span></p>
        </div>

        <Button variant='contained'
        onClick={()=> navigate('/placeorder')}
         className='px-4 py-1 text-white' sx={{backgroundColor: "orangered", margin: "10px 0"}}>
            Proceed to Checkout
        </Button>

    </div>
  )
}

export default CardTotal
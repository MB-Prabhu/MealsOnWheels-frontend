import React, { useContext } from 'react'
import { Button } from '@mui/material';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const CardTotal = () => {
  let navigate = useNavigate()
    const {getTotalAmount} = useContext(StoreContext)
  return (
    <div className='w-[50%] lg:w-[30%]'>
        <h2 className='md:text-xl text-lg font-bold my-2'>Card Total</h2>
        
        <div className='flex flex-col gap-2'>
            <p className='flex justify-between'>SubTotal <span>{getTotalAmount() || 0}</span></p>
            <hr className='bg-[#676767]' />
            <p className='flex justify-between'>Delivery Fee <span>2</span></p>
            <hr className='bg-[#676767]' />
            <p className='flex justify-between'>Total <span>0</span></p>
        </div>

        <Button variant='contained' className='px-4 py-1 text-white' sx={{backgroundColor: "orangered", margin: "10px 0"}}>
            Proceed to Checkout
        </Button>

    </div>
  )
}

export default CardTotal